import { observer } from "mobx-react-lite";
import styled from "styled-components";
import appStore from "../store/appStore";
import { GAME_COLORS } from "../constants/gameInitial";


const HEADER_HEIGHT = 30

const History = styled.div`
height: calc(100% - 35px);
overflow-y: auto;
padding: 10px;
// border-radius: 0 0 10px 10px;
border: 1px ${GAME_COLORS.neutral} solid;
`;

const Text = styled.p`
font-size: .8rem;
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