
import styled from "styled-components";
import Panel from "./Panel";
import CapturedArea from "./CapturedArea";
import PlayerStatus from "./PlayerStatus";
import BoardContainer from "./BoardContainer";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";
import useWindowResizeThrottle from "../../hooks/useWindowResizeThrottle";
import { useEffect } from "react";



const PageContainer = styled.div`
display: flex;
width: 100%;
height: 100%;
`;



const MainPage = observer(() => {

	console.log('MainPage')

	const { width, height } = useWindowResizeThrottle(100)

	useEffect(() => {
		// appStore.chess.load('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3') // Мат
		appStore.chess.load('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2')
	}, [])

	return (
		<PageContainer>
			<Panel grow={1}></Panel>
			<Panel grow={3}>
				<PlayerStatus position={'top'} status={appStore.whiteBottom ? appStore.blackStatus : appStore.whiteStatus} />
				<CapturedArea capturedFigures={appStore.whiteBottom ? appStore.capturedFigures['w'] : appStore.capturedFigures['b']} />
				<BoardContainer windowSize={{width, height}} />
				<CapturedArea capturedFigures={appStore.whiteBottom ? appStore.capturedFigures['b'] : appStore.capturedFigures['w']} />
				<PlayerStatus position={'bottom'} status={appStore.whiteBottom ? appStore.whiteStatus : appStore.blackStatus} />
			</Panel>
			<Panel grow={1}></Panel>
		</PageContainer>
	)
})

export default MainPage