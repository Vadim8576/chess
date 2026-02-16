import { observer } from "mobx-react-lite";
import PageWrapper from "./PageWrapper";
import { useEffect, useState } from "react";
import AppStore from "../store/AppStore";
import { useAuth } from "../hooks/useAuth";
import gameStore from "../store/gameStore";
import Spinner from "../components/UI/Spinner";
import { COLORS } from "../constants/gameInitial";
import { useNavigate } from "react-router";

import styled from "styled-components";

const TableContainer = styled.div`
width: 100%;
max-width: 700px;
max-height: 40%;
margin: 20px 0 40px;
padding: 0 20px;
overflow-x: auto;
`

const Table = styled.table`
width: 100%;
border-collapse: collapse;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
overflow: hidden;
font-size: 2vmin;
table-layout: fixed;
`

const Thead = styled.thead`
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
color: #999;
position: sticky;
`

const Th = styled.th`
padding: 12px 15px;
text-align: left;
border-bottom: 1px solid #ddd;
color: #999;
`
const Td = styled.td`
padding: 12px 15px;
text-align: left;
border-bottom: 1px solid #ddd;
color: #666;
overflow: hidden;
`

const Tr = styled.tr`
background-color: #f8f9fa;
border-bottom: none;
color: #999;
`


const Tbody = styled.tbody`
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
color: white;
`


const CreateOnlineGameWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 50%;
max-width: 400px;
// max-height: 70%;
// min-height: 300px;
justify-content: flex-start;
// border: 1px #666 solid;
`




const MenuButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 200px;
height: min-content;
border: none;
margin: 0;
padding: 20px;
font-size: 2.2vmin;
cursor: pointer;
opacity: ${props => props.$opacity ? .5 : 1};
color: ${COLORS.background};
background-color: ${COLORS.secondary};
&:hover {
  background-color: ${COLORS.primary};
}
`




const CreateOnlineGamePage = observer(() => {
  const [creatorColor, setCreatorColor] = useState('w')
  const [isGameIdLoading, setIsGameIdLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(true)
  const [removingId, setRemovingId] = useState(null)
  const { isAuth, startAuth } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    AppStore.setCurrentPage('gamelist')
    startAuth()
  }, [])


  useEffect(() => {
    if (!isAuth) return
    gameStore.getAllGamesId()


    let isCancelled = false

    const loadGamesIds = async () => {
      if (isCancelled) return
      await gameStore.getAllGamesId()
      setIsGameIdLoading(false)
    }

    loadGamesIds()

    return () => {
      isCancelled = true
    }

  }, [isAuth])


  // useEffect(() => {
  //   if (!isAuth) return
  //   gameStore.createFastOnlineGame(creatorColor)
  // }, [isAuth])


  useEffect(() => {
    if (!gameStore.inviteLink) return
    setIsCreating(false)
  }, [gameStore.inviteLink])


  const removeItem = async (id) => {
    setRemovingId(id)
    await gameStore.removeGame(id)
    await gameStore.getAllGamesId()
    setRemovingId(null)
    console.log('Удалить ', id)
  }

  const createFastGame = async () => {
    console.log('createFastGame')
    setIsCreating(true)
    gameStore.setInviteUrl(null)
    // startAuth()
    await gameStore.createFastOnlineGame(creatorColor)
    setIsGameIdLoading(true)
    await gameStore.getAllGamesId()
    setIsGameIdLoading(false)
  }

  const inviteGame = async () => {
    // setInviteUrl(null)
    // navigate(`/fastgame/${gameStore.fastOnlineGameId}`)
    navigate(`/fastgame/${gameStore.fastOnlineGameId}`)
  }



  const CreateButtonInside = observer(({ isCreating }) => {

    // if (isCreating && !gameStore.inviteLink) return <Spinner scale={1} />
    if (!isCreating && gameStore.inviteLink) return 'В игру'
    return <>Быстрая игра по сети</>
  })


  return (
    <PageWrapper>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Td>Game Id</Td>
              <Td>Creator</Td>
              <Td>CreatedAt</Td>
              <Td>Статус</Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Thead>
          <Tbody>
            {
              !isGameIdLoading
                ? gameStore.fastGameList.lengtn > 0
                  ? gameStore.fastGameList.map((game) => (
                    <Tr key={game.id}>
                      <Td>{game.id}</Td>
                      <Td>Создатель Id</Td>
                      <Td>00:00:00</Td>
                      <Td>Закончена</Td>
                      <Td>В игру</Td>
                      <Td>
                        {(removingId === game.id)
                          ? <Spinner scale={.5} />
                          : <button style={{ padding: '2px 5px' }} onMouseDown={() => removeItem(game.id)}>X</button>
                        }
                      </Td>
                    </Tr>
                  ))
                  : <Tr><Td colSpan="6" style={{textAlign: 'center'}}>Игры не найдены</Td></Tr>
                : (
                  <Tr><Td colSpan="6" style={{textAlign: 'center'}}><Spinner scale={.5} /></Td></Tr>    
                )
            }
          </Tbody>
        </Table>
      </TableContainer>

      <CreateOnlineGameWrapper>
        <MenuButton
          inert={gameStore?.fastGameList === null}
          $opacity={gameStore?.fastGameList === null}
          onClick={
            (!isCreating && gameStore.inviteLink)
              ? () => inviteGame()
              : () => createFastGame()
          }
        >
          <CreateButtonInside isCreating={isCreating} />
        </MenuButton>
      </CreateOnlineGameWrapper>

    </PageWrapper>
  )
})

export default CreateOnlineGamePage