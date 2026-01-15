import { observer } from "mobx-react-lite";
import styled from "styled-components";
import appStore from "../store/appStore";


const headerHeight = 30

const History = styled.div`
flex-grow: 1;
overflow-y: auto;
`;



const HistoryList = observer(() => {

  return (
    <History>
      {appStore.historyList.map((list, key) => (
        <p key={key}>{`${list.from} - ${list.to}`}</p>
      ))}
    </History>
  )
})

export default HistoryList