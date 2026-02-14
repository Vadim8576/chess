import styled from "styled-components";
import { useNavigate } from "react-router";
import { COLORS } from "../constants/gameInitial";

const PageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
height: 100%;
`


const Title = styled.h2`
margin-bottom: 40px;
`


const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: .6rem 1rem;
// padding: 10px 20px;
border: 1px ${COLORS.neutral} solid;
background-color: #fff;
color: ${COLORS.primary};
// text-transform: uppercase;
cursor: pointer;
font-weight: normal;
font-size: 1.6vmin;
overflow: hidden;
&:hover {
  background-color: ${COLORS.neutral};
  color: #fff;
}
`


const GameDoesNotExist = () => {
  const navigate = useNavigate()

  const goToMainPage = () => {
    navigate('/')
  }

  return (
    <PageWrapper>
      <Title>{'Игра не существует :('}</Title>
      <Button onClick={goToMainPage}>
        На главную
      </Button>
    </PageWrapper>
  );
};

export default GameDoesNotExist