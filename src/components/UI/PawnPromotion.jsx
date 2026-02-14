import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import AppStore from '../../store/AppStore';
import { COLORS, figure } from '../../constants/gameInitial';
import CapturedFigure from '../boardElements/CapturedFigure';
import CloseIcon from './icons/CloseIcon';

const PromotionContainer = styled.div`
position: absolute;
top: ${props => props.$top}px;
left: ${props => props.$left}px;
width: ${props => props.$width}px;
height: ${props => props.$height}px;
display: flex;
flex-direction: column;
border: 1px ${COLORS.neutral} solid;
// background-color: rgba(255, 255, 255, 1);
background-color: ${COLORS.background};
z-index: 150;
box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
`

const Icon = styled.img`
position: absolute;
top: 5px;
right: 5px;
width: 1.5rem;
height: 1.5rem;
cursor: pointer;
&:hover {
  background-color: ${COLORS.errorCell};
}
`

const PromotionWrapper = styled.div`
// position: absolute;
// top: ${props => props.$top}px;
// left: ${props => props.$left}px;
// width: ${props => props.$width}px;
// height: ${props => props.$height}px;
width: 100%;
height: 50%;
display: flex;
justify-content: space-around;
align-items: center;
// background-color: rgba(255, 255, 255, .8);
// padding: 10px;
// border-top: 1px #999 solid;
`
const FigureWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: ${props => props.$width - 10}px;
height: ${props => props.$height - 10}px;
cursor: pointer;
user-select: none;
touch-action: none;
&:hover {
  background-color: ${COLORS.possibleCell};
  // transform: scale(1.05);
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
`;

const Message = styled.div`
font-size: 1.8vmin;
// font-weight: bold;
`



const PawnPromotion = observer(() => {

  const cellSize = AppStore?.board?.cellSize
  const player = AppStore.chess.turn()
  const promotionListTemp = ['n', 'b', 'r', 'q']
  const promotionList = promotionListTemp.map(item => `${item}${player}`)


  const choiceOfFigure = (e, choice) => {
    const choiceFigureWithoutColor = choice[0]
    AppStore.makeMove(AppStore.promotion, choiceFigureWithoutColor)
  }

  const close = () => {
    AppStore.setPromotion(null)
    AppStore.setLastMoveCells([])
  }

  return (
    <PromotionContainer
      $top={cellSize * 5}
      $left={cellSize * 2}
      $width={cellSize * 4}
      $height={cellSize * 2}
    >
      <PromotionWrapper>
        <Message>Выберите фигуру</Message>
        <CloseIcon onClick={close} />
      </PromotionWrapper>
      <PromotionWrapper>
        {promotionList.map((item, i) => (
          <FigureWrapper
            onPointerDown={(e) => choiceOfFigure(e, item)}
            key={`${item}-${i}`}
            $width={cellSize}
            $height={cellSize}
          >
            <CapturedFigure
              src={figure[item]}
            />
          </FigureWrapper>

        ))}
      </PromotionWrapper>
    </PromotionContainer>
  )
})

export default PawnPromotion