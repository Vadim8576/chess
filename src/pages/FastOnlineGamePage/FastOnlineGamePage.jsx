import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import AppStore from "../../store/AppStore";
import { useAuth } from "../../hooks/useAuth";
import gameStore from "../../store/gameStore";
import CommonPageElements from "../CommonPageElements";
import authStore from "../../store/authStore";
import { useLocation } from "react-router";




const FastOnlineGamePage = observer(() => {

	// const { user, loading } = useAuth()

	// console.log('user ',  user.uid)

	// console.log('AnonymousGame')

	const [pageId, setPageId] = useState(null)
	const location = useLocation()




	useEffect(() => {
		const pathParts = location.pathname.split('/')
		const lastSegment = pathParts[pathParts.length - 1]
		console.log(location)
		console.log(lastSegment)
		setPageId(lastSegment)
	}, [])


	useEffect(() => {
		gameStore.setCurrentGameId(pageId)

		console.log(authStore.user)
		console.log(gameStore.currentGameId)

		if (pageId === 'local') return

		console.log('----------- Подписка на игру ---------------')

		const unsubscribe = gameStore.gameSubscribe()
		return () => {
			console.log('----------- Отписался от игры ---------------')
			return unsubscribe
		}
	}, [authStore.user, pageId])


	useEffect(() => {
		AppStore.setGameType('fastGame')
	}, [])

	return (
		<CommonPageElements />
	)
})

export default FastOnlineGamePage