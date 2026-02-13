import styled from "styled-components";
import { COLORS } from "../../constants/gameInitial";
import Spinner from "./Spinner";


const CustomButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 8px 15px;
  border: 1px ${COLORS.neutral} solid;
  // border: none;
  // border-radius: 5px;
  // background-color: ${props => props.$backgroundColor};
  background-color: #fff;
  color: ${props => props.inert ? COLORS.neutral : COLORS.primary};
  text-transform: uppercase;
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
  font-size: 1.5vmin;
  // opacity: ${props => props.inert ? .5 : 1};
  &:hover {
    background-color: ${COLORS.primary};
    color: #fff;
  }
`

const Button = ({ text, color, backgroundColor, onClick, inert = false }) => {
  return (
    <CustomButton
      // $backgroundColor={backgroundColor}
      color={color}
      onClick={onClick}
      inert={inert}
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
      {text}
    </CustomButton>
  )
}

export default Button