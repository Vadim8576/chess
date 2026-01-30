import { observer } from "mobx-react-lite";
import styled from "styled-components";
import AppStore from "../store/AppStore";
import { COLORS } from "../constants/gameInitial";
import { useAutoScroll } from "../hooks/useAutoScroll";


const HEADER_HEIGHT = 30

const History = styled.div`
// height: calc(100% - 35px);
flex-grow: 1;
overflow-y: auto;
padding: 10px;
// border-radius: 0 0 10px 10px;
border: 1px ${COLORS.neutral} solid;
`;

const Text = styled.p`
// font-size: clamp(8px, 2.5vw, 14px);
font-size: 2.2vmin;
`


const HistoryList = observer(() => {
  console.log('HistoryList')

  const historyList = AppStore.historyList

  const scrollRef = useAutoScroll(historyList, { smooth: true })


  return (
    <History ref={scrollRef}>
      {historyList.map((list, key) => (
        <Text key={crypto.randomUUID()}>{`${key + 1}) ${list.color === 'w' ? 'Б' : 'Ч'}: ${list.move} ${list.status ? list.status : ''}`}</Text>
      ))}
    </History>
  )
})

export default HistoryList