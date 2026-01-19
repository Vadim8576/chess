
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
import { gameColors } from "../../constants/gameInitial";

const headerHeight = 50

const PageContainer = styled.div`
width: 100%;
height: 100%;
min-height: 500px;
background-color: ${gameColors.background};
`;


const PageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: calc(100% - ${headerHeight}px	);

`;


const Grid = styled.div`
display: flow-root;
padding-top: 1px;
width: ${props => props.$width}px;
height: ${props => props.$width}px;
// max-width: 400px;
// max-height: 400px;
// height: 500px;
margin: 0;
display: grid;
grid-template-columns: repeat(11, 1fr);
grid-template-rows: repeat(11, 1fr);
border: 1px #666 solid;
aspect-ratio: 1 / 1;
`;


// const PanelWrapper = styled.div`
// display: flex;
// max-width: 1437px;
// padding: 0 40px;
// min-height: 100px;
// margin: 0 auto;
// flex: 0 0 70%;
// max-width: 70%;
// min-width: 768px;
// `;

const Status = styled.div`
grid-column: 9 / 12; /* занимает столбцы с 1‑й по 2‑ю линию (2 столбца) */
grid-row: 2 / 4;    /* занимает строки со 2‑й по 3‑ю линию (2 строки) */
`


const History = styled.div`
grid-column: 9 / 12; /* занимает столбцы с 1‑й по 2‑ю линию (2 столбца) */
grid-row: 4 / 10;    /* занимает строки со 2‑й по 3‑ю линию (2 строки) */
`


const CapturedAreaBlack = styled.div`
grid-column: 1 / 9; /* занимает столбцы с 1‑й по 2‑ю линию (2 столбца) */
grid-row: 1 / 2;    /* занимает строки со 2‑й по 3‑ю линию (2 строки) */

display: grid;
grid-template-columns: repeat(16, 1fr);
grid-template-rows: repeat(1, 1fr);
`

const CapturedAreaWhite = styled.div`
grid-column: 1 / 9; /* занимает столбцы с 1‑й по 2‑ю линию (2 столбца) */
grid-row: 10 / 11;    /* занимает строки со 2‑й по 3‑ю линию (2 строки) */


display: grid;
grid-template-columns: repeat(16, 1fr);
grid-template-rows: repeat(1, 1fr);
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
			<Header headerHeight={headerHeight} />
			<PageWrapper>

				<Grid
					$width={height - headerHeight}
				// $height={height - headerHeight}
				>
					{/* <Panel>
					<Widget title={{
						title: 'Взятые фигуры',
						color: '#fff',
						background: gameColors.secondary
					}}>
						<CapturedArea player={appStore.whiteBottom ? 'w' : 'b'} />
					</Widget>
					<Widget title={{
						title: 'Взятые фигуры',
						color: '#fff',
						background: gameColors.secondary
					}}>
						<CapturedArea player={appStore.whiteBottom ? 'b' : 'w'} />
					</Widget>
				</Panel> */}
					{/* <Panel grow={3}> */}
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
							background: gameColors.secondary
						}}
						>
							<GameStatus />
						</Widget>
					</Status>

					<History>
						<Widget title={{
							title: 'История',
							color: '#fff',
							background: gameColors.secondary
						}}
						>
							<HistoryList />
						</Widget>
					</History>


					{/* </Panel> */}
					{/* <Panel>
					<Widget title={{
						title: 'Статус игры',
						color: '#fff',
						background: gameColors.secondary
					}}
					>
						<GameStatus />
					</Widget>
					<Widget title={{
						title: 'История',
						color: '#fff',
						background: gameColors.secondary
					}}
					>
						<HistoryList />
					</Widget>
				</Panel> */}
				</Grid>
			</PageWrapper>
		</PageContainer>
	)
	// return (
	// 	<PageContainer>
	// 		<Header headerHeight={headerHeight} />
	// 		<PanelWrapper>
	// 			<Panel>
	// 				<Widget title={{
	// 					title: 'Взятые фигуры',
	// 					color: '#fff',
	// 					background: gameColors.secondary
	// 				}}>
	// 					<CapturedArea player={appStore.whiteBottom ? 'w' : 'b'} />
	// 				</Widget>
	// 				<Widget title={{
	// 					title: 'Взятые фигуры',
	// 					color: '#fff',
	// 					background: gameColors.secondary
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
	// 					background: gameColors.secondary
	// 				}}
	// 				>
	// 					<GameStatus />
	// 				</Widget>
	// 				<Widget title={{
	// 					title: 'История',
	// 					color: '#fff',
	// 					background: gameColors.secondary
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