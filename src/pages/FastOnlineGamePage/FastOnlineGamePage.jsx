import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AppStore from "../../store/AppStore";
import gameStore from "../../store/gameStore";
import CommonPageElements from "../CommonPageElements";
import authStore from "../../store/authStore";
import { useLocation } from "react-router";




const FastOnlineGamePage = observer(() => {
	// console.log('FastOnlineGamePage')

	// const { user, loading } = useAuth()

	// console.log('user ',  user.uid)


	// const [pageId, setPageId] = useState(null)
	// const location = useLocation()



	useEffect(() => {
		AppStore.setGameType('fastGame')

		console.log('ID создателя игры', authStore.creatorUid)
		console.log('ID присоединившегося', authStore.joinerUid)
	}, [])



	// useEffect(() => {
	// 	const pathParts = location.pathname.split('/')
	// 	const lastSegment = pathParts[pathParts.length - 1]
	// 	console.log(location)
	// 	console.log(lastSegment)
	// 	setPageId(lastSegment)
	// }, [])


	useEffect(() => {
		// console.log(authStore.user)
		// console.log(gameStore.currentGameId)

		console.log('----------- Подписка на игру ---------------')
		const unsubscribe = gameStore.gameSubscribe()
		return () => {
			console.log('----------- Отписался от игры ---------------')
			return unsubscribe
		}
	}, [authStore.user])


	

	return (
		<CommonPageElements />
	)
})

export default FastOnlineGamePage