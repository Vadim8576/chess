
import styled from "styled-components";
import Panel from "./Panel";
import CapturedArea from "../../widgets/CapturedArea";
import BoardContainer from "./BoardContainer";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";
import useWindowResizeThrottle from "../../hooks/useWindowResizeThrottle";
import { useRef } from "react";
import Header from "./Header";
import HistoryList from "../../widgets/HistoryList";
import GameStatus from "../../widgets/GameStatus";
import Widget from "../../widgets/Widget";

const headerHeight = 40

const PageContainer = styled.div`
width: 100%;
height: 100%;
`;
const PanelWrapper = styled.div`
display: flex;
width: 100%;
height: calc(100% - ${headerHeight}px);
`;



const MainPage = observer(() => {
	const ref = useRef(null)
	// const headerHeight = 40

	console.log('MainPage')

	const { width, height } = useWindowResizeThrottle(100)
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
					<Widget
						title={{ title: 'Взятые фигуры', color: '#fff', background: '#666' }}
					>
						<CapturedArea />
					</Widget>
					<Widget
						title={{ title: 'Взятые фигуры', color: '#fff', background: '#666' }}
					>
						<CapturedArea />
					</Widget>
				</Panel>
				<Panel grow={2}>
					<BoardContainer windowSize={{ width, height }} />
				</Panel>
				<Panel>
					<Widget
						title={{ title: 'Статус игры', color: '#fff', background: '#666' }}
					>
						<GameStatus status={appStore.whiteBottom ? appStore.blackStatus : appStore.whiteStatus} />
					</Widget>
					<Widget
						title={{ title: 'История', color: '#fff', background: '#666' }}
					>
						<HistoryList />
					</Widget>
				</Panel>
			</PanelWrapper>
		</PageContainer>
	)
})

export default MainPage