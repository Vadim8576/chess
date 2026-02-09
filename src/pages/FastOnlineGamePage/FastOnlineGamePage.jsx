import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AppStore from "../../store/AppStore";
import gameStore from "../../store/gameStore";
import Game from "../Game";
import authStore from "../../store/authStore";
import { useLocation, useParams } from "react-router";
import GameLobby from "../GameLobby";




const FastOnlineGamePage = observer(() => {
	const { gameId } = useParams()



	useEffect(() => {
		AppStore.setCurrentPage('fastgame')
		AppStore.setGameType('fastGame')
	}, [])

	useEffect(() => {
		let unsubscribe
		if (gameId && authStore.creatorUid || authStore.joinerUid) {
			gameStore.setCurrentGameId(gameId)
			unsubscribe = gameStore.gameSubscribe(gameId)
		}

		return () => {
			if (unsubscribe) {
				unsubscribe()
			}
		};
	}, [gameId, authStore.creatorUid, authStore.joinerUid])



	return (
		<>
			{
				gameStore?.gameData?.status === 'playing'
					? <Game />
					: <GameLobby />
			}
		</>
	)
})

export default FastOnlineGamePage