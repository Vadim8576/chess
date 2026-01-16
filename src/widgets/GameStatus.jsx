
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import Header from "./Header";
import appStore from "../store/appStore";
import { gameColors } from "../constants/gameInitial";


// const Wrapper = styled.div`
// width: 100%;
// height: 50%;
// border: 1px #666 solid;
// `;

const Status = styled.div`
text-align: center;
display: flex;
justify-content: center;
align-items: center;
flex-grow: 1;
overflow-y: auto;
color: ${gameColors.neutral};
font-size: 14px;
font-weight: bold;
// background-color: #414833;
padding: 10px;
border-radius: 0 0 10px 10px;
border: 1px ${gameColors.neutral} solid;
`;

const GameStatus = observer(() => {

	return (
		<Status>
			{appStore.status}
		</Status>
	)
})

export default GameStatus