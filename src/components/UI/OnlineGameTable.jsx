import { observer } from "mobx-react-lite";
import styled from "styled-components";
import gameStore from "../../store/gameStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "./Spinner";
import AppStore from "../../store/AppStore";
import { formatTimestamp } from "../../utils/formatTimestamp";
import Button from "./Button";


const TableContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  margin-top: 10px;
  min-width: 300px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  // box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  font-size: 2.2vmin;
  table-layout: auto;
`;

const Thead = styled.thead`
  // background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  background-color: white;
  color: white;
  font-size: 1.5vmin;
  position: sticky;
  top: 0;
  z-index: 10;
  display: table;
  width: 100%;
`;

const Tbody = styled.tbody`
  display: block;
  height: 100%;
  overflow-y: auto;
  width: 100%;
`;

const Tr = styled.tr`
  display: table;
  table-layout: fixed;
  width: 100%;
  background-color: transparent;
  color: #666;
`;

const Th = styled.th`
  display: table-cell;
  padding: 10px 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  white-space: normal;
  width: ${props => props.$name === 'number' ? '40px' : 'auto'}
`;

const Td = styled.td`
  display: table-cell;
  padding: 10px 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  white-space: normal;
  width: ${props => props.$name === 'number' ? '40px' : 'auto'}
`;



const OnlineGameTable = observer(({ setIsGameIdLoading, isGameIdLoading, setRemovingId, removingId }) => {

  
  const { isAuth, startAuth, userId } = useAuth()

  const navigate = useNavigate()


  useEffect(() => {
    // AppStore.setCurrentPage('create game')
    startAuth()
  }, [])

  useEffect(() => {
    if (!isAuth) return
    // gameStore.getAllGamesInfo()

    let isCancelled = false

    const loadGamesIds = async () => {
      if (isCancelled) return
      await gameStore.getAllGamesInfo()
      setIsGameIdLoading(false)
    }

    loadGamesIds()

    return () => {
      isCancelled = true
    }
  }, [isAuth])



  const removeItem = async (id) => {
    setRemovingId(id)
    await gameStore.removeGame(id)
    await gameStore.getAllGamesInfo()
    setRemovingId(null)
    console.log('Удалить ', id)
  }


  const inviteGame = async (gameId) => {
    navigate(`/fastgame/${gameId}`)
  }



  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th $name={'number'}>N</Th>
            <Th>Game Id</Th>
            <Th>Creator</Th>
            <Th>CreatedAt</Th>
            <Th>Статус</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {!isGameIdLoading
            ? gameStore.fastGameList.length > 0
              ? gameStore.fastGameList.map((game, i) => (

                <Tr key={game.id}>
                  <Td $name={'number'}>{i + 1}.</Td>
                  <Td>{game.id}</Td>
                  <Td>{userId == game.creatorUid ? 'Вы' : 'Соперник'}</Td>
                  <Td>{formatTimestamp(game.createdAt.seconds)}</Td>
                  <Td>{game.status}</Td>
                  <Td>
                    <Button
                      onClick={() => inviteGame(game.id)}
                      style={{ fontSize: '1.6vmin', padding: '5px 7px' }}
                    >
                      В игру
                    </Button>
                  </Td>
                  <Td>
                    {removingId === game.id ? (
                      <Spinner scale={0.5} />
                    ) : (
                      <Button
                        style={{ padding: '2px 5px' }}
                        onMouseDown={() => removeItem(game.id)}
                      >
                        X
                      </Button>
                    )}
                  </Td>
                </Tr>

              ))
              : <Tr>
                <Td colSpan="6" style={{ textAlign: 'center' }}>
                  Игры не найдены
                </Td>
              </Tr>

            : (

              <Tr style={{ textAlign: 'center', flex: '1', height: '100%' }}>
                <Td colSpan="6" style={{ textAlign: 'center' }}>
                  <Spinner scale={.7} />
                </Td>
              </Tr>
            )}
        </Tbody>
      </Table>

    </TableContainer>
  )
})

export default OnlineGameTable