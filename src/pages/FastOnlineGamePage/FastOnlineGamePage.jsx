import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AppStore from "../../store/AppStore";
import gameStore from "../../store/gameStore";
import CommonPageElements from "../CommonPageElements";
import authStore from "../../store/authStore";
import { useLocation, useParams } from "react-router";




const FastOnlineGamePage = observer(() => {
	const { gameId } = useParams()



	useEffect(() => {
		AppStore.setCurrentPage('fastgame')
		AppStore.setGameType('fastGame')
	}, [])

	useEffect(() => {
		let unsubscribe
		if (gameId && authStore.userId) {
			console.log('setCurrentGameId(gameId) gameId = ', gameId)
			gameStore.setCurrentGameId(gameId)
			unsubscribe = gameStore.gameSubscribe(gameId)
		}

		return () => {
			if (unsubscribe) {
				unsubscribe()
			}
		};
	}, [authStore.userId, gameId])



	return (
		<CommonPageElements />
	)
})

export default FastOnlineGamePage