
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import AppStore from "../store/AppStore";
import gameStore from "../store/gameStore";
import { COLORS } from "../constants/gameInitial";
import Spinner from "../components/UI/Spinner";
import { gameStatus } from "../utils/gameStatus";
import { useEffect } from "react";


const Status = styled.div`
// text-align: center;
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-grow: 1;
height: calc(100% - 35px);
color: ${COLORS.neutral};
font-size: 2.2vmin;
font-weight: normal;
// background-color: #414833;
// padding: 10px;
// border-radius: 0 0 10px 10px;
// border: 1px ${COLORS.neutral} solid;
`;

const GameStatus = observer(() => {



	console.log(gameStore.isLoading)

	console.log('GameStatus ', AppStore.statusMessage)

	return (
		<Status>
			{gameStore?.gameData?.status === 'waiting' && gameStore.isLoading && AppStore.gameType !== 'local'
				?
				'...'
				:
				<>{AppStore.statusMessage}</>
			}
		</Status>
	)
})

export default GameStatus