import styled from "styled-components";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router";

const PageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
height: 100%;
`


const GameDoesNotExist = () => {
  const navigate = useNavigate()

  const goToMainPage = () => {
    navigate('/')
  }

  return (
    <PageWrapper>
      <h2>Игра не существует!</h2>
      <Button text={'На главную'} onClick={goToMainPage} />
    </PageWrapper>
  );
};

export default GameDoesNotExist