import { observer } from "mobx-react-lite";
import styled from "styled-components";
import CapturedFigure from "../../components/boardElements/CapturedFigure";
import { figure } from "../../constants/boardInitial";


const Area = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 50px;
background-color: #A68A64;
`;


const CapturedArea = observer(({ capturedFigures }) => {
  return (
    <Area>
      {capturedFigures.map((cf, key) => (
        <CapturedFigure
          key={key}
          src={figure[cf]}
        />
      ))}
    </Area>
  )
})

export default CapturedArea