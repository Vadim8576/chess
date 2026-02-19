import { observer } from "mobx-react-lite";
import PageWrapper from "./PageWrapper";
import { useEffect, useState } from "react";
import { COLORS, figure } from "../constants/gameInitial";
import styled from "styled-components";
import gameStore from "../store/gameStore";
import CapturedFigure from "../components/boardElements/CapturedFigure";
import OnlineGameTable from "../components/UI/OnlineGameTable";
import Button from "../components/UI/Button";


const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  height: 50%;
  padding: 30px 40px;
  // margin: 30px 0 0;
  overflow-x: auto;
`

const CreateOnlineGameWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 50%;
max-width: 300px;
min-width: 200px;
// max-height: 70%;
// min-height: 300px;
justify-content: flex-start;
border: 1px ${COLORS.neutral} solid;
padding: 10px;
opacity: ${props => props.inert ? .6 : 1}
`


// const MenuButton = styled.button`
// display: flex;
// justify-content: center;
// align-items: center;
// // width: 50%;
// height: min-content;
// border: none;
// margin: 0;
// // padding: 10px;
// min-height: 30px;
// min-width: 30px;
// padding: 4px 8px;
// font-size: 1.6vmin;
// cursor: pointer;
// opacity: ${props => props.$opacity ? .5 : 1};
// color: ${COLORS.background};
// background-color: ${COLORS.secondary};
// &:hover {
//   background-color: ${COLORS.primary};
// }
// `

const PlayerColorWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 15px;
width: 80%;
// min-width: 200px;
margin-bottom: 20px;
`

const PlayerColor = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
flex: ${props => props.$flex};
min-width: 0;
aspect-ratio: 1 / 1;
border: 1px ${COLORS.neutral} solid;
overflow: hidden;
cursor: pointer;
background-color: ${props => props.$checked ? COLORS.lastCell : 'none'};
  &:hover {
    background-color: ${props => props.$checked ? 'none' : COLORS.neutral};
    color: #fff;
  }
`

const PlayerRandomColor = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
pointer-events: none;
width: 100%;
height: 100%;
// border: 1px #999 solid;
overflow: hidden;
`

const Figure = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
width: 100%;
height: 100%;
overflow: hidden;
pointer-events: none;
`


const CreateOnlineGamePage = observer(() => {
  const [creatorColor, setCreatorColor] = useState('w')
  const [isGameIdLoading, setIsGameIdLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [removingId, setRemovingId] = useState(null)

  useEffect(() => {
    if (!gameStore.inviteLink) return
    setIsCreating(false)
  }, [gameStore.inviteLink])



  const createFastGame = async () => {
    console.log('createFastGame')
    setIsCreating(true)
    gameStore.setInviteUrl(null)
    // startAuth()
    await gameStore.createFastOnlineGame(creatorColor)
    setIsCreating(false)
    setIsGameIdLoading(true)
    await gameStore.getAllGamesInfo()
    setIsGameIdLoading(false)
  }

  const CreateButtonInside = observer(({ isCreating }) => {
    if (isCreating) return '...Создание игры'
    return <>Создать игру</>
  })



  return (
    <PageWrapper>
      <Container>
        <OnlineGameTable
          setIsGameIdLoading={setIsGameIdLoading}
          isGameIdLoading={isGameIdLoading}
          setRemovingId={setRemovingId}
          removingId={removingId}
        />
      </Container>

      <Container>
        <CreateOnlineGameWrapper inert={gameStore?.fastGameList === null || isCreating}>
          <PlayerColorWrapper>
            <PlayerColor $flex={1}
              $checked={creatorColor === 'w'}
              onClick={() => setCreatorColor('w')}
            >
              <CapturedFigure src={figure['kw']} />
            </PlayerColor>
            <PlayerColor $flex={1.2}
              $checked={creatorColor === 'wb'}
              onClick={() => setCreatorColor('wb')}
            >
              <PlayerRandomColor style={{ left: '-50%' }}>
                <Figure style={{ left: '50%' }}>
                  <CapturedFigure src={figure['kw']} />
                </Figure>
              </PlayerRandomColor>
              <PlayerRandomColor style={{ left: '50%' }} >
                <Figure style={{ left: '-50%' }}>
                  <CapturedFigure src={figure['kb']} />
                </Figure>
              </PlayerRandomColor>
          </PlayerColor>
          <PlayerColor $flex={1}
            $checked={creatorColor === 'b'}
            onClick={() => setCreatorColor('b')}
          >
            <CapturedFigure src={figure['kb']} />
          </PlayerColor>
        </PlayerColorWrapper>
        {/* <MenuButton
            $opacity={gameStore?.fastGameList === null}
            onClick={createFastGame}
          > */}
        <Button onClick={createFastGame}>
          <CreateButtonInside isCreating={isCreating} />
        </Button>
        {/* <CreateButtonInside isCreating={isCreating} /> */}
        {/* </MenuButton> */}
      </CreateOnlineGameWrapper>
    </Container>
    </PageWrapper >
  )
})

export default CreateOnlineGamePage