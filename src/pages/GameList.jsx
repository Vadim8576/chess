import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";
import gameStore from "../store/gameStore";
import { useAuth } from "../hooks/useAuth";
import AppStore from "../store/AppStore";
import PageWrapper from "./PageWrapper";


const ListWrapper = styled.ul`
width: 50%;
max-width: 400px;
list-style: none;
`

const Item = styled.ul`
width: 100%;
padding: 10px;
`


// const fastGameList = ['HEiDBwFx3chFKQK82Ej1', '4eiDBwFx3chFKQK82E33']

const GameList = observer(() => {

  const { isAuth, startAuth } = useAuth()


  useEffect(() => {
    AppStore.setCurrentPage('gamelist')
    startAuth()
  }, [])


  useEffect(() => {
    if (!isAuth) return
    gameStore.getAllGamesId()
  }, [isAuth])

  const removeItem = (id) => {
    gameStore.removeGame(id)
    console.log('Удалить ', id)
  }


  return (
    <PageWrapper>
      <ListWrapper>
        {
          gameStore.fastGameList.length> 0
            ? gameStore.fastGameList.map((item) => (
              <Item key={item.id}>
                {item.id}
                <button style={{ marginLeft: '20px', padding: '5px' }} onMouseDown={() => removeItem(item.id)}>X</button>
              </Item>
            ))
            : <Item>Нет игр</Item>
        }
      </ListWrapper>
    </PageWrapper>
  )
})

export default GameList