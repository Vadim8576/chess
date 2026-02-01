import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AppStore from "../../store/AppStore";
import { useAuth } from "../../hooks/useAuth";
import gameStore from "../../store/gameStore";
import CommonPageElements from "../CommonPageElements";




const FastOnlineGamePage = observer(() => {

	const { user, loading } = useAuth()

	// console.log('user ',  user.uid)

	// console.log('AnonymousGame')

	



	useEffect(() => {
		if (!user) return
		const unsubscribe = gameStore.gameSubscribe()
		return unsubscribe
	}, [gameStore.fastOnlineGameId, user])

	useEffect(() => {
		AppStore.setGameType('fastGame')
		gameStore.setCurrentGameId(gameStore.fastOnlineGameId)
		AppStore.createNewChess()
		AppStore.loadCapturedFiguresFromLocalStorage()
	}, [])

	return (
		<CommonPageElements />
	)
})

export default FastOnlineGamePage