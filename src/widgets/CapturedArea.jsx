import { observer } from "mobx-react-lite";
import styled from "styled-components";
import appStore from "../store/appStore";
import CapturedFigure from "../components/boardElements/CapturedFigure";
import { figure } from "../constants/boardInitial";



// const Wrapper = styled.div`
// width: 100%;
// height: 100%;
// // height: calc(100% - ${headerHeight}px);
// border: 1px #666 solid;
// `;

const Area = styled.div`
flex-grow: 1;
overflow-y: auto;
display: flex;
flex-wrap: wrap;
align-content: flex-start;
width: 100%;
height: 50%;
`;



// const Separator = styled.div`
// width: 100%;
// height: 1px;
// background-color: #666;
// `;



const CapturedArea = observer(() => {
  const topFigures = appStore.whiteBottom ? appStore.capturedFigures['w'] : appStore.capturedFigures['b']

  return (
    <>
      <Area>
        {topFigures.map((cf, key) => (
          <CapturedFigure
            key={key}
            src={figure[cf]}
          />
        ))}
      </Area>
      {/* <Separator /> */}
      {/* <Area>
          {botomFigures.map((cf, key) => (
            <CapturedFigure
              key={key}
              src={figure[cf]}
            />
          ))}
        </Area> */}
    </>
  )
})

export default CapturedArea