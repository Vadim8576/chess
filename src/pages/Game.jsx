import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useWindowResizeThrottle from '../hooks/useWindowResizeThrottle';
import { COLORS, FOOTER_HEIGHT, HEADER_HEIGHT } from '../constants/gameInitial';
import AppStore from '../store/AppStore';
import CapturedArea from '../widgets/CapturedArea';
import ChessBoardContainer from './ChessBoardContainer';
import Widget from '../widgets/Widget';
import GameStatus from '../widgets/GameStatus';
import { observer } from 'mobx-react-lite';
import PawnPromotion from '../components/UI/PawnPromotion';
import Dialog from '../components/UI/Dialog';
import Menu from '../components/UI/Menu';
import ChessClock from '../components/boardElements/ChessClock';
import Timer from '../components/UI/Timer';
import Button from '../components/UI/Button';
import gameStore from '../store/gameStore';
import GameDialogs from '../components/GameDialogs';


const PageContainer = styled.div`
width: 100%;
height: 100%;
background-color: ${COLORS.background};
`;

const PageContentWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`

const Grid = styled.div`
position: relative;
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-template-rows: repeat(12, 1fr);
width: ${props => props.$size}px;
height: ${props => props.$size}px;
aspect-ratio: 1 / 1;
`

const History = styled.div`
grid-column: 9 / 13;
grid-row: 6 / 11;
`
const CapturedAreaUp = styled.div`
display: grid;
grid-template-columns: repeat(16, 1fr);
grid-template-rows: repeat(1, 1fr);
grid-column: 1 / 9;
grid-row: 2 / 3;
`
const CapturedAreaDown = styled.div`
display: grid;
grid-template-columns: repeat(16, 1fr);
grid-template-rows: repeat(1, 1fr);
grid-column: 1 / 9;
grid-row: 11 / 12;
`

const Status = styled.div`
grid-column: 9 / 13;
grid-row: 3 / 5;
`

const ClockTop = styled.div`
grid-column: 9 / 13;
grid-row: 5 / 6;
max-height: 100%;
overflow: hidden;
`

const ClockBottom = styled.div`
grid-column: 9 / 13;
grid-row: 10 / 11;
max-height: 100%;
overflow: hidden;
`

const Button1 = styled.div`
grid-column: 9 / 13;
grid-row: 7 / 8;
max-height: 100%;
overflow: hidden;
`

const Button2 = styled.div`
grid-column: 9 / 13;
grid-row: 8 / 9;
max-height: 100%;
overflow: hidden;
`







const Game = observer(() => {

	const [dialogType, setDialogType] = useState(null) // null || 'resignation' || 'drawOffer'
	const [cellSize, setCellSize] = useState(null)

	const { width, height } = useWindowResizeThrottle(300)

	useEffect(() => {

		let cellSize

		if ((height - HEADER_HEIGHT - FOOTER_HEIGHT) <= width) {
			cellSize = (height - HEADER_HEIGHT - FOOTER_HEIGHT) / 14
			// console.log('h < w', cellSize, width, cellSize * 12)
		} else {
			cellSize = width / 14
			// console.log('h > w', cellSize, width, cellSize * 12)
		}

		cellSize = Math.round(cellSize)

		setCellSize(cellSize)

		AppStore.setBoard({
			cellSize,
			width: cellSize * 8
		})
	}, [width, height])






	// const dialog = {
	// 	'resignation': {
	// 		text: 'Хотите сдаться?',
	// 		onOk: () => {
	// 			console.log('Сдался')
	// 			setShowDialog(false)

	// 		},
	// 		onCancel: () => {
	// 			console.log('Отмена')
	// 			setShowDialog(false)
	// 		}
	// 	},

	// 	'drawOffer': {
	// 		text: 'Предложить ничью?',
	// 		onOk: () => {
	// 			console.log('Предложил ничью')
	// 			setShowDialog(false)
	// 			gameStore.drawOffer('draw')
	// 		},
	// 		onCancel: () => {
	// 			console.log('Отмена')
	// 			setShowDialog(false)
	// 		}
	// 	},

	// 	'drawOfferAnswer': {
	// 		text: 'Соперник предлагает ничью. Хотите согласиться?',
	// 		onOk: () => {
	// 			console.log('Согласился')
	// 			setShowDialog(false)
	// 			gameStore.drawOffer('ok')
	// 		},
	// 		onCancel: () => {
	// 			console.log('Не согласился')
	// 			setShowDialog(false)
	// 			gameStore.drawOffer('cancel')
	// 		}
	// 	}
	// }



	// useEffect(() => {
	// 	if(!gameStore?.gameData?.drawOffer) return
	// 	if (gameStore.gameData.drawOffer.split('-')[1] === 'draw') {
	// 		setDialogType('drawOfferAnswer')
	// 	}

	// }, [gameStore.showDrawDialog])



	// console.log(gameStore.status)
	// console.log('showDialog = ', showDialog)



	return (
		<PageContainer>
			<PageContentWrapper>
				{cellSize && <Grid $size={cellSize * 12}>
					<CapturedAreaUp>
						<CapturedArea player={AppStore.whiteBottom ? 'w' : 'b'} />
					</CapturedAreaUp>
					<CapturedAreaDown>
						<CapturedArea player={AppStore.whiteBottom ? 'b' : 'w'} />
					</CapturedAreaDown>

					<ChessBoardContainer windowSize={{ width, height }} />


					<Status>
						<Widget title={{
							title: 'Статус игры',
							color: '#fff',
							background: COLORS.secondary
						}}
						>
							<GameStatus />
						</Widget>
					</Status>


					<ClockTop>
						<Timer maxTime={AppStore.whiteBottom ? 300 : 600} />
					</ClockTop>


					{(AppStore.gameStatus !== 'finished' && !gameStore.showDrawDialog) && (
						<>
							<Button1>
								<Button
									text={'Ничья?'}
									onClick={() => {
										setDialogType('drawOffer')
										gameStore.setShowDrawDialog(true)
									}}
									inert={gameStore.drawRequest}
								/>
							</Button1>
							<Button2>
								<Button
									text={'Сдаться!'}
									onClick={() => {
										setDialogType('resignation')
										gameStore.setShowDrawDialog(true)
									}}
								/>
							</Button2>
						</>
					)}

					<ClockBottom>
						<Timer maxTime={AppStore.whiteBottom ? 600 : 300} />
					</ClockBottom>


					{/* <ChessClock /> */}
					{/* <History>
						<Widget title={{
							title: 'История',
							color: '#fff',
							background: COLORS.secondary
						}}
						>
							<HistoryList />
						</Widget>
					</History> */}

					{AppStore.promotion !== null && <PawnPromotion />}

					{/* {showDialog && <Dialog dialog={dialog[dialogType]} />} */}

					{gameStore.showDrawDialog && (
						<GameDialogs
							dialogType={dialogType}
							setDialogType={setDialogType}
						/>
					)}

					{/* <PawnPromotion /> */}
				</Grid>}

				{/* <Menu /> */}

			</PageContentWrapper>
		</PageContainer>
	)
})

export default Game