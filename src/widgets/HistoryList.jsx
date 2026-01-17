import { observer } from "mobx-react-lite";
import styled from "styled-components";
import appStore from "../store/appStore";
import { gameColors } from "../constants/gameInitial";


const headerHeight = 30

const History = styled.div`
height: 100%;
overflow-y: auto;
padding: 10px;
border-radius: 0 0 10px 10px;
border: 1px ${gameColors.neutral} solid;
`;

const Text = styled.p`
font-size: 1rem;
`


const HistoryList = observer(() => {
  console.log('HistoryList')
  return (
    <History>
      {appStore.historyList.map((list, key) => (
        <Text key={key}>{`${list.from} - ${list.to} ${list.status ? list.status : ''}`}</Text>
      ))}
    </History>
  )
})

export default HistoryList