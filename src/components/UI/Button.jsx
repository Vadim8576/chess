import styled from "styled-components";


const CustomButton = styled.button`
  padding: 8px;
  border: 1px #999 solid;
  // border-radius: 5px;
  background-color: ${props => props.$backgrounColor};
  color: ${props => props.color};
  text-transform: uppercase;
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
  font-size: 1.5vmin;
`

const Button = ({ text, color, backgrounColor, onClick }) => {
  return (
    <CustomButton
      $backgrounColor={backgrounColor}
      color={color}
      onClick={onClick}
    >
      {text}
    </CustomButton>
  )
}

export default Button