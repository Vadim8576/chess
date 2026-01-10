
import styled from "styled-components";
import Header from "./Header";
import GameContainer from "./GameContainer";



const PageContainer = styled.div`
width: 100%;
height: 100%;

`;

const MainPage = () => {

	return (
		<PageContainer>
			<Header />
			<GameContainer />
		</PageContainer>
	)
}

export default MainPage