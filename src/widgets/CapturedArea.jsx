import { observer } from "mobx-react-lite";
import styled from "styled-components";
import AppStore from "../store/AppStore";
import CapturedFigure from "../components/boardElements/CapturedFigure";
import { figure, COLORS } from "../constants/gameInitial";
import { toJS } from 'mobx';
import gameStore from "../store/gameStore";
import { useEffect } from "react";
import { useState } from "react";
import { useCapturedFiguresFilter } from "../hooks/useCapturedFiguresFilter";


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

  // if(gameStore.isLoading) return null
  // if(AppStore.gameType !== 'local' && gameStore.isLoading) return null

  // const capturedFigures = AppStore.gameType === 'local'
  //   ? useCapturedFiguresFilter(AppStore.capturedFigures, player)
  //   : useCapturedFiguresFilter(gameStore.gameData.capturedFigures, player)
  
  const capturedFigures = useCapturedFiguresFilter(AppStore.capturedFigures, player)



  if (!capturedFigures || capturedFigures.length === 0) return null

  // console.log(toJS(capturedFigures))

  return (
    <>
      {capturedFigures.map((cf, key) => {
        return (
          <CapturedFigure
            key={key}
            src={figure[cf]}
            cursor={'auto'}
            action={null}
          />
        )
      }
      )}
    </>
  )
})

export default CapturedArea