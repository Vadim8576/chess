
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
background-color: ${gameColors.background};
`;
const PanelWrapper = styled.div`
display: flex;
width: 100%;
height: calc(100% - ${headerHeight}px);
`;



const MainPage = observer(() => {
	console.log('MainPage')

	const ref = useRef(null)
	const [bodyRect, setBodyRect] = useState({ width: 0, height: 0 })

	const { width, height } = useWindowResizeThrottle(100)

	useEffect(() => {
		const bodyRect = document.body.getBoundingClientRect()
		setBodyRect({
			width: bodyRect.width,
			height: bodyRect.height
		})
	}, [width, height])

	/*
		useEffect(() => {
			// appStore.chess.load('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3') // Мат
			// appStore.chess.load('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2')
	
	
	
	
		}, [width, height])
	*/
	return (
		<PageContainer>
			<Header headerHeight={headerHeight} />
			<PanelWrapper>
				<Panel>
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
				</Panel>
				<Panel grow={3}>
					<BoardContainer windowSize={{
						width: bodyRect.width,
						height: bodyRect.height
					}}
					/>
				</Panel>
				<Panel>
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
				</Panel>
			</PanelWrapper>
		</PageContainer>
	)
})

export default MainPage