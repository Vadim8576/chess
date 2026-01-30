import { observer } from "mobx-react-lite";
import styled from "styled-components";
import AppStore from "../store/AppStore";
import CapturedFigure from "../components/boardElements/CapturedFigure";
import { figure, COLORS } from "../constants/gameInitial";
import { toJS } from 'mobx';


// const Wrapper = styled.div`
// width: 100%;
// height: 100%;
// // height: calc(100% - ${HEADER_HEIGHT}px);
// border: 1px #666 solid;
// `;

const Area = styled.div`
// width: 100%;
// display: grid;
// grid-template-columns: repeat(4, 1fr);
// grid-template-rows: repeat(4, 1fr);
// // padding-top: 100%;
// aspect-ratio: 1 / 1; 
// // gap: 10px;
// // flex-grow: 1;
// // flex-grow: 1;
display: flex;
// // flex-wrap: wrap;
justify-content: center;
align-content: center;
// padding: 10px;
// border-radius: 0 0 10px 10px;
// border: 1px ${COLORS.neutral} solid;

`;





const CapturedArea = observer(({ player }) => {
  const figureList = AppStore.capturedFigures[player] // player 'w' || 'b'

  console.log('CapturedArea')
  // console.log(toJS(figureList))

  return (
    <>
      {figureList.map((cf, key) => {
        console.log(figure[cf])
        return (
          <CapturedFigure
            key={key}
            src={figure[cf]}
          />
        )
      }
      )}
    </>
  )
})

export default CapturedArea