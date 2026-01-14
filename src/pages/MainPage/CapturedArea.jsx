import { observer } from "mobx-react-lite";
import styled from "styled-components";
import CapturedFigure from "../../components/boardElements/CapturedFigure";
import { figure } from "../../constants/boardInitial";
import appStore from "../../store/appStore";

const headerHeight = 30

const Wrapper = styled.div`
width: 100%;
height: calc(100% - ${headerHeight}px);
border: 1px #666 solid;
`;

const Area = styled.div`
display: flex;
flex-wrap: wrap;
align-content: flex-start;
width: 100%;
height: 50%;
`;

const Header = styled.div`
width: 100%;
height: ${headerHeight}px;
background-color: #666;
`;

const Separator = styled.div`
width: 100%;
height: 1px;
background-color: #666;
`;



const CapturedArea = observer(() => {
  const topFigures = appStore.whiteBottom ? appStore.capturedFigures['w'] : appStore.capturedFigures['b']
  const botomFigures = appStore.whiteBottom ? appStore.capturedFigures['b'] : appStore.capturedFigures['w']
  return (
    <>
      <Header>Взятые фигуры</Header>
      <Wrapper>
        <Area>
          {topFigures.map((cf, key) => (
            <CapturedFigure
              key={key}
              src={figure[cf]}
            />
          ))}
        </Area>
        <Separator />
        <Area>
          {botomFigures.map((cf, key) => (
            <CapturedFigure
              key={key}
              src={figure[cf]}
            />
          ))}
        </Area>
      </Wrapper>
    </>
  )
})

export default CapturedArea