import { observer } from "mobx-react-lite";
import styled from "styled-components";
import appStore from "../store/appStore";
import CapturedFigure from "../components/boardElements/CapturedFigure";
import { figure, gameColors } from "../constants/gameInitial";
import { toJS } from 'mobx';


// const Wrapper = styled.div`
// width: 100%;
// height: 100%;
// // height: calc(100% - ${headerHeight}px);
// border: 1px #666 solid;
// `;

const Area = styled.div`
flex-grow: 1;
min-height: 40%;
// overflow-y: auto;
display: flex;
flex-wrap: wrap;
align-content: flex-start;
padding: 10px;
border-radius: 0 0 10px 10px;
border: 1px ${gameColors.neutral} solid;
`;





const CapturedArea = observer(({ player }) => {
  const figureList = appStore.capturedFigures[player] // player 'w' || 'b'

  console.log('CapturedArea')
  // console.log(toJS(figureList))

  return (
    <Area>
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
    </Area>
  )
})

export default CapturedArea