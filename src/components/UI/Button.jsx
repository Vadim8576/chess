import styled from "styled-components";
import { COLORS } from "../../constants/gameInitial";
import Spinner from "./Spinner";
import AppStore from "../../store/AppStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";


const CustomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 87.5%;
  // width: 87.5%;
  width: ${props => props.$cellSize - 1}px;
  height: ${props => props.$cellSize - 1}px;
  // flex-grow: 1;
  margin-bottom: 1px;
  padding: 5px;
  border: 1px ${COLORS.neutral} solid;
  // border: none;
  // border-radius: 5px;
  // background-color: ${props => props.$backgroundColor};
  background-color: #fff;
  color: ${props => props.inert ? COLORS.neutral : COLORS.neutral};
  text-transform: uppercase;
  cursor: pointer;
  font-weight: normal;
  font-size: 1.5vmin;
  overflow: hidden;
  &:hover {
    background-color: ${COLORS.neutral};
    color: #fff;
  }
`

const Icon = styled.span`
aspect-ratio: 1 / 1;
height: 90%;
// padding-right: 10px;
`

const Button = observer(({
  icon = null,
  text,
  color,
  backgroundColor,
  onClick,
  inert = false
}) => {

  const cellSize = AppStore.board.cellSize
  if (!cellSize) return

  // const [cellSize, setCellSize] = useState(AppStore.board.cellSize)



  return (
    <CustomButton
      // $backgroundColor={backgroundColor}
      color={color}
      onClick={onClick}
      inert={inert}
      $cellSize={cellSize * 2 / 3}
      
    >
      {inert && (
        <>
          <Spinner scale={.3} />
          <div style={{
            display: 'inline-block',
            width: '5px'
          }}
          />
        </>)}
      {icon && <Icon>{icon}</Icon>}
      {/* {text} */}
    </CustomButton>
  )
})

export default Button