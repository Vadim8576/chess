import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import useWindowResizeThrottle from '../hooks/useWindowResizeThrottle';
import { COLORS, FOOTER_HEIGHT, HEADER_HEIGHT } from '../constants/gameInitial';
import AppStore from '../store/AppStore';
import CapturedArea from '../components/UI/CapturedArea';
import ChessBoardContainer from './ChessBoardContainer';
import Widget from '../widgets/Widget';
import GameStatus from '../widgets/GameStatus';
import PawnPromotion from '../components/UI/PawnPromotion';
import ChessClock from '../components/boardElements/ChessClock';
import GameDialogs from '../components/UI/GameDialogs';
import GameController from '../components/ChessBoard/GameController';
import PageWrapper from './PageWrapper';
import { useGamepad } from '../hooks/useGamepad';


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





const Game = observer(() => {

	const [cellSize, setCellSize] = useState(null)

	const { width, height } = useWindowResizeThrottle(300)
	const { isConnected, isButtonPressed } = useGamepad()


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








	return (
		<PageWrapper>
			<GameController />
			{cellSize && <Grid $size={cellSize * 12}>
				<CapturedAreaUp>
					<CapturedArea player={AppStore.whiteBottom ? 'w' : 'b'} />
				</CapturedAreaUp>
				<CapturedAreaDown>
					<CapturedArea player={AppStore.whiteBottom ? 'b' : 'w'} />
				</CapturedAreaDown>

				<ChessBoardContainer windowSize={{ width, height }} />


				<Widget
					gridColumn={'9 / 13'}
					gridRow={'3 / 5'}
				>
					<GameStatus />
				</Widget>



				{/* <Widget
						gridColumn={'9 / 13'}
						gridRow={'6 / 7'}
					>
						<Timer maxTime={AppStore.whiteBottom ? 300 : 600} />
					</Widget>

					<Widget
						gridColumn={'9 / 13'}
						gridRow={'7 / 8'}
					>
						<Timer maxTime={AppStore.whiteBottom ? 600 : 300} />
					</Widget> */}




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


				<GameDialogs isConnected={isConnected} isButtonPressed={isButtonPressed} />


				{/* <PawnPromotion /> */}
			</Grid>}

			{/* <Menu /> */}

		</PageWrapper>
	)
})

export default Game