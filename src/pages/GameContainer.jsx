import styled from "styled-components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Container = styled.div`
width: 100%;
height: calc(100% - 50px);
`;
const GameStatus = styled.div`
width: 100%;
height: 30px;
background-color: #A4AC86;
`;
const SideWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: calc(100% - 30px);
background-color: #C2C5AA;
`;

const GameContainer = () => {

	return (
		<Container>
			<GameStatus />
			<SideWrapper>
				<LeftSide />
				<RightSide />
			</SideWrapper>
		</Container>
	)
}

export default GameContainer