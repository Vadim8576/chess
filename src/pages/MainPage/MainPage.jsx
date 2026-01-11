
import styled from "styled-components";
import Panel from "./Panel";
import CapturedArea from "./CapturedArea";
import PlayerStatus from "./PlayerStatus";
import BoardContainer from "./BoardContainer";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";



const PageContainer = styled.div`
display: flex;
width: 100%;
height: 100%;
`;



const MainPage = observer(() => {

	return (
		<PageContainer>
			<Panel grow={1}></Panel>
			<Panel grow={3}>
				<PlayerStatus status={appStore.whiteBottom ? appStore.blackStatus : appStore.whiteStatus} />
				<CapturedArea capturedFigures={appStore.whiteBottom ? appStore.capturedFigures['w'] : appStore.capturedFigures['b']} />
				<BoardContainer />
				<CapturedArea capturedFigures={appStore.whiteBottom ? appStore.capturedFigures['b'] : appStore.capturedFigures['w']} />
				<PlayerStatus status={appStore.whiteBottom ? appStore.whiteStatus : appStore.blackStatus} />
			</Panel>
			<Panel grow={1}></Panel>
		</PageContainer>
	)
})

export default MainPage