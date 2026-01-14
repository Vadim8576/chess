import { observer } from "mobx-react-lite";
import styled from "styled-components";
import appStore from "../../store/appStore";

const headerHeight = 30

const Wrapper = styled.div`
width: 100%;
height: calc(100% - ${headerHeight}px);
border: 1px #666 solid;
`;

const Area = styled.div`
// display: flex;
// flex-wrap: wrap;
// align-content: flex-start;
width: 100%;
height: 50%;
`;

const Header = styled.div`
width: 100%;
height: ${headerHeight}px;
background-color: #666;
`;




const HistoryList = observer(() => {
  
  return (
    <>
      <Header>История</Header>
      <Wrapper>
        <Area>
          {appStore.history.map((history, key) => (
            <p key={key}>{history}</p>
          ))}
        </Area>
      </Wrapper>
    </>
  )
})

export default HistoryList