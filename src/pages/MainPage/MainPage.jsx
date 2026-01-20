
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import appStore from "../../store/appStore";
import useWindowResizeThrottle from "../../hooks/useWindowResizeThrottle";
import Panel from "./Panel";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import HistoryList from "../../widgets/HistoryList";
import GameStatus from "../../widgets/GameStatus";
import Widget from "../../widgets/Widget";
import CapturedArea from "../../widgets/CapturedArea";
import { FOOTER_HEIGHT, GAME_COLORS, HEADER_HEIGHT } from "../../constants/gameInitial";
import Footer from "./Footer";



const PageContainer = styled.div`
width: 100%;
height: 100%;
background-color: ${GAME_COLORS.background};
`;

const PageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: calc(100% - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
`;

const Grid = styled.div`

display: grid;
grid-template-columns: repeat(12, 1fr);
grid-template-rows: repeat(12, 1fr);
width: ${props => props.$width}px;
height: ${props => props.$width}px;
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


	const { width, height } = useWindowResizeThrottle(300)


	/*
		useEffect(() => {
			// appStore.chess.load('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3') // Мат
			// appStore.chess.load('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2')
		}, [width, height])
	*/

	return (
		<PageContainer>
			<Header />
			<PageWrapper>

				<Grid $width={height > 500 ? (height - HEADER_HEIGHT - FOOTER_HEIGHT) : 500}>
					<CapturedAreaBlack>
						<CapturedArea player={appStore.whiteBottom ? 'w' : 'b'} />
					</CapturedAreaBlack>
					<CapturedAreaWhite>
						<CapturedArea player={appStore.whiteBottom ? 'b' : 'w'} />
					</CapturedAreaWhite>
					<BoardContainer
						windowSize={{
							width,
							height
						}}
					/>
					<Status>
						<Widget title={{
							title: 'Статус игры',
							color: '#fff',
							background: GAME_COLORS.secondary
						}}
						>
							<GameStatus />
						</Widget>
					</Status>

					<History>
						<Widget title={{
							title: 'История',
							color: '#fff',
							background: GAME_COLORS.secondary
						}}
						>
							<HistoryList />
						</Widget>
					</History>
				</Grid>
			</PageWrapper>
			<Footer />
		</PageContainer>
	)



	// return (
	// 	<PageContainer>
	// 		<Header HEADER_HEIGHT={HEADER_HEIGHT} />
	// 		<PanelWrapper>
	// 			<Panel>
	// 				<Widget title={{
	// 					title: 'Взятые фигуры',
	// 					color: '#fff',
	// 					background: GAME_COLORS.secondary
	// 				}}>
	// 					<CapturedArea player={appStore.whiteBottom ? 'w' : 'b'} />
	// 				</Widget>
	// 				<Widget title={{
	// 					title: 'Взятые фигуры',
	// 					color: '#fff',
	// 					background: GAME_COLORS.secondary
	// 				}}>
	// 					<CapturedArea player={appStore.whiteBottom ? 'b' : 'w'} />
	// 				</Widget>
	// 			</Panel>
	// 			<Panel grow={3}>
	// 				<BoardContainer windowSize={{
	// 					width,
	// 					height
	// 				}}
	// 				/>
	// 			</Panel>
	// 			<Panel>
	// 				<Widget title={{
	// 					title: 'Статус игры',
	// 					color: '#fff',
	// 					background: GAME_COLORS.secondary
	// 				}}
	// 				>
	// 					<GameStatus />
	// 				</Widget>
	// 				<Widget title={{
	// 					title: 'История',
	// 					color: '#fff',
	// 					background: GAME_COLORS.secondary
	// 				}}
	// 				>
	// 					<HistoryList />
	// 				</Widget>
	// 			</Panel>
	// 		</PanelWrapper>
	// 	</PageContainer>
	// )
})

export default MainPage