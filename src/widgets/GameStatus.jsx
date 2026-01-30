
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import AppStore from "../store/AppStore";
import { COLORS } from "../constants/gameInitial";


const Status = styled.div`
text-align: center;
display: flex;
justify-content: center;
align-items: center;
flex-grow: 1;
height: calc(100% - 35px);
color: #000;
font-size: 2.2vmin;
font-weight: bold;
// background-color: #414833;
padding: 10px;
// border-radius: 0 0 10px 10px;
border: 1px ${COLORS.neutral} solid;
`;

const GameStatus = observer(() => {

	console.log('GameStatus')

	return (
		<Status>
			{AppStore.status}
		</Status>
	)
})

export default GameStatus