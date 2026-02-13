import styled from "styled-components";
import { COLORS } from "../../constants/gameInitial";


const CustomButton = styled.button`
  padding: 8px 15px;
  border: 1px ${COLORS.neutral} solid;
  // border: none;
  // border-radius: 5px;
  // background-color: ${props => props.$backgroundColor};
  background-color: #fff;
  color: ${COLORS.primary};
  text-transform: uppercase;
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
  font-size: 1.5vmin;
  &:hover {
    background-color: ${COLORS.primary};
    color: #fff;
  }
`

const Button = ({ text, color, backgroundColor, onClick, inert = false}) => {
  return (
    <CustomButton
      // $backgroundColor={backgroundColor}
      color={color}
      onClick={onClick}
      inert={inert}
    >
      {text}
    </CustomButton>
  )
}

export default Button