import { observer } from "mobx-react-lite";
import styled from "styled-components";
import appStore from "../../store/appStore";
import useWindowResizeThrottle from "../../hooks/useWindowResizeThrottle";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import HistoryList from "../../widgets/HistoryList";
import GameStatus from "../../widgets/GameStatus";
import Widget from "../../widgets/Widget";
import CapturedArea from "../../widgets/CapturedArea";
import { FOOTER_HEIGHT, COLORS, HEADER_HEIGHT } from "../../constants/gameInitial";
import Footer from "./Footer";
import { useEffect, useState } from "react";



const PageContainer = styled.div`
width: 100%;
height: 100%;
background-color: ${COLORS.background};
`;

const PageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: calc(100% - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
`;

const Grid = styled.div`
// border: 1px pink solid;
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-template-rows: repeat(12, 1fr);
width: ${props => props.$size}px;
height: ${props => props.$size}px;
// width: 450px;
// height: 450px;
// min-width: 450px;
// min-height: 450px;
aspect-ratio: 1 / 1;
`

const Status = styled.div`
grid-column: 9 / 13;
grid-row: 3 / 5;
`

const History = styled.div`
grid-column: 9 / 13;
grid-row: 6 / 11;
`

const CapturedAreaBlack = styled.div`
display: grid;
grid-template-columns: repeat(16, 1fr);
grid-template-rows: repeat(1, 1fr);
grid-column: 1 / 9;
grid-row: 2 / 3;
`

const CapturedAreaWhite = styled.div`
display: grid;
grid-template-columns: repeat(16, 1fr);
grid-template-rows: repeat(1, 1fr);
grid-column: 1 / 9;
grid-row: 11 / 12;
`


const MainPage = observer(() => {
	console.log('MainPage')

	const [cellSize, setCellSize] = useState(null)
	const { width, height } = useWindowResizeThrottle(300)

	useEffect(() => {

		let cellSize

		if ((height - HEADER_HEIGHT - FOOTER_HEIGHT) <= width) {
			cellSize = (height - HEADER_HEIGHT - FOOTER_HEIGHT) / 14
			console.log('h < w', cellSize, width, cellSize * 12)
		} else {
			cellSize = width / 14
			console.log('h > w', cellSize, width, cellSize * 12)
		}

		cellSize = Math.round(cellSize)

		setCellSize(cellSize)

		appStore.setBoard({
			cellSize,
			width: cellSize * 8
		})
	}, [width, height])



	useEffect(() => {
		// ['e2e4', 'e7e5', 'f1c4', 'd7d6'].forEach(move => appStore.chess.move(move))

		// appStore.chess.load('rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2')
		// appStore.chess.load('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2')
	}, [width, height])



	const testFN = (cl) => {
		cl()
	}


	return (
		<PageContainer>
			<Header />
			<PageWrapper>
				{cellSize && <Grid $size={cellSize * 12}>
					<CapturedAreaBlack>
						<CapturedArea player={appStore.whiteBottom ? 'w' : 'b'} />
					</CapturedAreaBlack>
					<CapturedAreaWhite>
						<CapturedArea player={appStore.whiteBottom ? 'b' : 'w'} />
					</CapturedAreaWhite>
					<BoardContainer windowSize={{ width, height }} />
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
					<History>
						<Widget title={{
							title: 'История',
							color: '#fff',
							background: COLORS.secondary
						}}
						>
							<HistoryList />
						</Widget>
					</History>
				</Grid>}
			</PageWrapper>
			<Footer />
		</PageContainer>
	)
})

export default MainPage