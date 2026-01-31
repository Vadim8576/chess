
import app from './firebaseConfig';

import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';


const DB_NAME = 'list';


export const auth = getAuth()
export const db = getFirestore(app)



export const fb = {

  createNewAnonymousGame: async (initialBoardFen) => {
    const user = auth.currentUser

    if (user) {
      try {
        const gamesCollectionRef = collection(db, 'games')

        const initialGameData = {
          creatorUid: user.uid,
          joinerUid: null,
          status: 'waiting',
          whitePlayerUid: user.uid, // Создатель пока играет белыми по умолчанию
          blackPlayerUid: null,
          isTimed: false,
          timeControl: null,
          whiteTimeLeft: null,
          blackTimeLeft: null,
          boardState: initialBoardFen,
          currentTurn: 'white',
          movesHistory: [],
          lastMoveTimestamp: new Date(),
          winnerUid: null,
          loserUid: null,
          drawOffer: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const docRef = await addDoc(gamesCollectionRef, initialGameData)

        console.log('Документ игры успешно создан с ID: ', docRef.id)
        return docRef.id
      } catch (e) {
        console.error('Ошибка при добавлении документа: ', e)
        throw e
      }

    }

  },







  gameSubscribe: (gameIdToSubscribe, loadGame, setIsLoading) => {
    const user = auth.currentUser
    // console.log('gameSubscribe', user.uid)
    if (user) {
      const gameRef = doc(db, "games", gameIdToSubscribe)

      const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
        if (docSnapshot.exists()) {


          const isFromCache = docSnapshot.metadata.fromCache;
          const hasPendingWrites = docSnapshot.metadata.hasPendingWrites;

          console.log(`Получен Snapshot: isFromCache=${isFromCache}, hasPendingWrites=${hasPendingWrites}`);

  
          if (!isFromCache && !hasPendingWrites) {
            console.log('Данные получены с сервера и готовы к отображению.')
            setIsLoading(false)
          }



          const gameData = docSnapshot.data()
          console.log("Current game data:", gameData)

          // if (gameData.currentPlayer) {
          //   displayCurrentPlayer(gameData.currentPlayer);
          // }

          if (gameData.boardState) {
            loadGame(gameData.boardState)
          }



        } else {

          console.log("Документ был удален или никогда не существовал!")
        }
        return unsubscribe
      }, (error) => {
        console.error("Не удалось прослушать документ:", error)
      })
    }
  },


  updateBoard: (gameId, newBoardState) => {
    const user = auth.currentUser
    if (user) {
      const gameRef = doc(db, "games", gameId)

      updateDoc(gameRef, {
        boardState: newBoardState
      })
        .then(() => {
          console.log("Поле boardState успешно обновлено!")
        })
        .catch((error) => {
          console.error("Ошибка при обновлении boardState:", error)
        });
    }
  },
































  singIn: async (email, password) => {
    const a = await signInWithEmailAndPassword(auth, email, password)
    // .then(() => {
    //   // setSuccessMessage()
    // })
    // .catch((error) => {
    //   setErrorMessage()
    // })
  },

  logOut: () => {
    signOut(auth)
      .then(() => {
        // setSuccessMessage()
      })
      .catch((error) => {
        setErrorMessage()
      })
  },

  createUser: (newUserData) => {

    const { email, password, nickName, setNewUserCreated } = newUserData

    // const email = '1@mail.ru'
    // const nickName = ''

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;

        const data = {
          email,
          nickName,
          friends: [],
          id: user.uid
        }

        const collectionRef = collection(db, 'users')
        const newDocRef = doc(collectionRef)

        setDoc(newDocRef, data)
          .then(() => {
            console.log('Пользователь успешно добавлен.');
            setNewUserCreated('yes')
          })
          .catch((error) => {
            console.log('Ошибка при добавлении данных пользователя', error)
            setErrorMessage()
            setNewUserCreated('error')
          })
      })
      .catch((error) => {
        console.log('Ошибка при добавлении пользователя', error)
        setErrorMessage()
        setNewUserCreated('error')
      })

  },

  getFavoriteUsers: async (userId) => {

    if (!userId) return []

    try {
      const q = query(collection(db, 'users'), where('id', '==', userId));

      const docs = await getDocs(q)
      const favoriteUsersIds = docs.docs[0].data().friends

      if (favoriteUsersIds.length === 0) return []

      const favoriteUsersPromises = favoriteUsersIds.map(async (id) => {
        const q = query(collection(db, 'users'), where('id', '==', id));
        const favoriteUser = await getDocs(q)

        if (!favoriteUser) return null

        return {
          nickName: favoriteUser.docs[0].data().nickName,
          id: favoriteUser.docs[0].data().id,
        }
      })

      const favoriteUsers = await Promise.all(favoriteUsersPromises);
      console.log('favoriteUsers = ', favoriteUsers)

      return favoriteUsers

    } catch (error) {
      console.error('Ошбика получения избранных пользователей', error)
      setErrorMessage()
    }


  },





  getMembersById: async (ids) => {

    if (!ids) return []

    try {

      const membersPromises = ids.map(async (memberId) => {

        const q = query(collection(db, 'users'), where('id', '==', memberId));
        const member = await getDocs(q)

        const id = member.docs[0].data().id
        const nickName = member.docs[0].data().nickName

        return { id, nickName }
      })

      const members = await Promise.all(membersPromises);


      // console.log('111111111111111111111111111111111111111111111111111111111 ', members)
      // console.log('id = ', id, 'nickName = ', nickName)

      return members

    } catch (error) {
      console.error('Ошбика получения участников по id', error)
      setErrorMessage()
    }
  },




  addFavoriteUser: async (ids) => {
    const { userId, friendId } = ids

    if (!userId && !friendId) return


    console.log('firebase addFavoriteUser')
    try {
      const q = query(collection(db, 'users'), where('id', '==', userId));

      const user = await getDocs(q)

      if (user) {
        const friends = [...user.docs[0].data().friends, friendId]
        const docId = user.docs[0].id

        // console.log('friends = ', user.docs[0].data())
        const newDocRef = doc(db, 'users', docId);

        await updateDoc(newDocRef, {
          friends
        })

      }
    } catch (error) {
      console.log('Ошибка получения документа для обновления', error)
      setErrorMessage()
    }

  },



  removeFavoriteUser: async (ids) => {

    const { userId, friendId } = ids

    console.log('friendId = ', friendId)
    console.log('userId = ', userId)

    if (!userId && !friendId) return

    const q = query(collection(db, 'users'), where('id', '==', userId));


    await getDocs(q)
      .then((data) => {
        const friends = data.docs[0].data().friends.filter(id => id !== friendId)

        const docId = data.docs[0].id


        console.log('updateFriends = ', friends)



        const newDocRef = doc(db, 'users', docId);


        updateDoc(newDocRef, {
          friends
        })
          .then(() => {
            console.log('Друг успешно удален')

            // setSuccessMessage()
          })
          .catch((error) => {
            console.log('Ошибка при удалении друга: ', error)
            setErrorMessage()
          })

      })
      .catch((error) => {
        console.log('Ошибка получения документа для удаления', error)
        setErrorMessage()
      })

  },



  removeMember: async (ids) => {

    const { taskListId, memberId } = ids

    console.log('memberId = ', memberId)
    console.log('taskListId = ', taskListId)


    if (!memberId && !taskListId) return

    const q = query(collection(db, 'grouplist'), where('taskListId', '==', taskListId));



    // X4hFQZ8eNwROulLW4BRY4b70gmA3
    // y4Q2IaI2TSSAhPEmJGC1SvhnCnz1

    await getDocs(q)
      .then((data) => {
        const membersIds = data.docs[0].data().membersIds.filter(id => id !== memberId)

        const docId = data.docs[0].id


        console.log('update membersIds = ', membersIds)
        console.log('docId = ', docId)

        const newDocRef = doc(db, 'grouplist', docId);

        updateDoc(newDocRef, {
          membersIds
        })
          .then(() => {
            console.log('Участник успешно удален')

            // setSuccessMessage()
          })
          .catch((error) => {
            console.log('Ошибка при удалении участника: ', error)
            setErrorMessage()
          })

      })
      .catch((error) => {
        console.log('Ошибка получения документа для удаления участника', error)
        setErrorMessage()
      })

  },







  taskListSnapshot: (payload) => {
    const { setTaskList, userId, collectionId } = payload

    console.log('taskListSnapshot = ', collectionId)

    if (!userId || !collectionId) return



    const q = query(collection(db, collectionId), where('creatorId', '==', userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allDocs = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()

        allDocs.push({
          taskListId: doc.id,
          title: data.title,
          createdAt: data.createdAt,
          tasks: data.tasks,
          creatorId: data.creatorId,
          membersIds: collectionId === 'grouplist' ? data.membersIds : null
        })

      })


      // console.log('allDocs = ', allDocs)
      setTaskList(allDocs)
    })


    return unsubscribe
  },


  addTaskList: (payload) => {
    const { userId, title, createdAt, collectionId } = payload

    console.log('collectionId = ', collectionId)

    if (title === '') return

    const data = {
      title: title,
      createdAt,
      creatorId: userId,
      membersIds: []
    }

    const collectionRef = collection(db, collectionId)
    const newDocRef = doc(collectionRef)

    setDoc(newDocRef, data)
      .then(() => {
        firstDocAdded = true;
        console.log('Документ успешно добавлен в коллекцию.');

        const docId = newDocRef.id;
        const updatedData = { ...data, taskListId: docId };

        setDoc(newDocRef, updatedData)
          .then(() => {
            console.log('ID успешно добавлен в данные документа.');
            // setSuccessMessage()
          })
          .catch((error) => {
            console.error('Ошибка при добавлении ID в данные документа:', error);
            setErrorMessage()
            if (firstDocAdded) {
              deleteDoc(newDocRef).then(() => {
                console.log('Первый документ успешно удален.');
              })
                .catch((deleteError) => {
                  console.error('Ошибка при удалении первого документа:', deleteError);
                })
            }
          })
      })
  },

  updateTaskList: (payload) => {
    const { title, listId, collectionId } = payload
    if (!listId || !collectionId) return

    const docRef = doc(db, collectionId, listId);

    updateDoc(docRef, {
      title: title
    })
      .then((doc) => {
        console.log('Список задач успешно обновлен')
        // setSuccessMessage()
      })
      .catch((error) => {
        console.log('Ошибка обновления названия списка задач', error)
        setErrorMessage()
      })
  },

  removeTaskList: (payload) => {
    const { listId, collectionId } = payload
    deleteDoc(doc(db, collectionId, listId))
      .then(() => {
        // setSuccessMessage()
      })
      .catch((error) => {
        setErrorMessage()
        console.log('Ошбика удаления списка задач: ', error)
      })
  },

  removeSelectedTaskList: async (payload) => {

    const { selectedItemsIds, collectionId } = payload
    const removePromise = selectedItemsIds.map(async (id) => {

      try {
        await deleteDoc(doc(db, collectionId, id))
      } catch (error) {
        setErrorMessage()
        console.log('Ошбика удаления списка задач c id: ', id, error)
      }
      return id
    })

    const removeIds = await Promise.all(removePromise);

  },





  // subTaskListSnapshot: (payload) => {
  //   const { setSubTaskList, taskListId } = payload

  //   if (!taskListId) return

  //   const q = query(collection(db, 'subtasklist'), where('taskListId', '==', taskListId));

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const allDocs = []
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data()

  //       allDocs.push({
  //         title: data.title,
  //         comment: data.comment,
  //         subTaskListId: data.subTaskListId,
  //         complited: data.complited
  //       })
  //     })

  //     // console.log('allDocs = ', allDocs)
  //     setSubTaskList(allDocs)
  //   })


  //   return unsubscribe
  // },

  addTask: (payload) => {
    const { title, comment, listId } = payload

    if (!listId && title === '') return

    const data = {
      title,
      comment,
      complited: false,
      taskListId: listId
    }

    const collectionRef = collection(db, 'subtasklist')
    const newDocRef = doc(collectionRef)

    setDoc(newDocRef, data)
      .then(() => {
        // console.log('Задача успешно добавлена.');

        firstDocAdded = true;

        const docId = newDocRef.id;
        const updatedData = { ...data, subTaskListId: docId };

        setDoc(newDocRef, updatedData)
          .then(() => {
            console.log('ID успешно добавлен в данные документа.');
            // setSuccessMessage()
          })
          .catch((error) => {
            console.error('Ошибка при добавлении ID в данные документа:', error);
            setErrorMessage()
            if (firstDocAdded) {
              deleteDoc(newDocRef).then(() => {
                console.log('Документ удален, так как взникла ошибка.');
              })
                .catch((deleteError) => {
                  console.error('Ошибка при удалении первого документа:', deleteError);
                })
            }
          })
      })
      .catch((deleteError) => {
        console.error('Ошибка при добавлении задачи:', deleteError);
        setErrorMessage()
      })

  },
  // addTask: (payload) => {
  //   const { title, comment, taskListId } = payload
  //   console.log(title, comment, taskListId)

  //   if (!taskListId) return

  //   const docRef = doc(db, DB_NAME, taskListId);

  //   getDoc(docRef)
  //     .then((doc) => {
  //       const tasks = doc.data().tasks

  //       updateDoc(docRef, {
  //         tasks: [
  //           ...tasks,
  //           {
  //             title: title,
  //             comment: comment,
  //             complited: false
  //           }
  //         ]
  //       })
  //         .then(() => {
  //           console.log('Таска успешно добавлена')
  //         })
  //         .catch((error) => {
  //           console.log('Ошибка добавления таски: ', error)
  //           setErrorMessage()
  //         })
  //     })
  //     .catch((error) => {
  //       console.log('Ошибка получения документа для обновления', error)
  //       setErrorMessage()
  //     })

  // },

  updateTask: (payload) => {

    const { listId, ...updateData } = payload
    console.log('listId ', listId)
    if (!listId) return

    // console.log('updateData ', updateData)

    const docRef = doc(db, 'subtasklist', listId);

    updateDoc(docRef,
      updateData
    )
      .then(() => {
        console.log('Таска успешно обновлена')
      })
      .catch((error) => {
        console.log('Ошибка обновления таски: ', error)
        setErrorMessage()
      })


  },
  // updateTask: (payload) => {
  //   const { taskIndex, title, comment, complited = null, taskListId } = payload
  //   if (!taskListId) return

  //   const docRef = doc(db, DB_NAME, taskListId);

  //   getDoc(docRef)
  //     .then((doc) => {
  //       const tasks = doc.data().tasks

  //       tasks[taskIndex] = {
  //         ...tasks[taskIndex],
  //         complited: complited != null ? complited : tasks[taskIndex].complited,
  //         title,
  //         comment
  //       }

  //       updateDoc(docRef, {
  //         tasks: [
  //           ...tasks
  //         ]
  //       })
  //         .then(() => {
  //           console.log('Таска успешно обновлена')
  //         })
  //         .catch((error) => {
  //           console.log('Ошибка обновления таски: ', error)
  //           setErrorMessage()
  //         })
  //     })
  //     .catch((error) => {
  //       console.log('Ошибка получения документа для обновления', error)
  //       setErrorMessage()
  //     })

  // },

  removeTask: (listId) => {



    if (!listId) return


    deleteDoc(doc(db, 'subtasklist', listId))
      .then(() => {
        // setSuccessMessage()
      })
      .catch((error) => {
        setErrorMessage()
      })

    // const docRef = doc(db, 'subtasklist', listId);

    // getDoc(docRef)
    //   .then((doc) => {
    //     const tasks = doc.data().tasks

    //     const newTasks = tasks.filter((_, index) => index !== taskIndex)

    //     updateDoc(docRef, {
    //       tasks: [
    //         ...newTasks
    //       ]
    //     })
    //       .then(() => {
    //         console.log('Таска успешно удалена')
    //         // setSuccessMessage()
    //       })
    //       .catch((error) => {
    //         console.log('Ошибка удаления таски: ', error)
    //         setErrorMessage()
    //       })
    //   })
    //   .catch((error) => {
    //     console.log('Ошибка получения документа для обновления', error)
    //     setErrorMessage()
    //   })

  },


  removeSelectedTask: async (ids) => {

    const removePromise = ids.map(async (id) => {

      try {
        await deleteDoc(doc(db, 'subtasklist', id))
      } catch (error) {
        setErrorMessage()
        console.log('Ошбика удаления задач c id: ', id, error)
      }
      return id
    })

    const removeIds = await Promise.all(removePromise);

  },


  removeAllTaskList: () => {

    const collectionRef = collection(db, DB_NAME)
    getDocs(collectionRef)
      .then((docs) => {
        docs.forEach((doc) => {
          deleteDoc(doc.ref)
            .then(() => {
              console.log(`Документ ${doc.id} успешно удален`)
            })
            .catch((error) => {
              console.error(`Ошибка при удалении документа ${doc.id}:`, error)
              setErrorMessage()
            })
        })
        // setSuccessMessage()
      })
      .catch((error) => {
        setErrorMessage()
      })

  }
}




