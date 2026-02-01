import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AppStore from "../../store/AppStore";
import gameStore from "../../store/gameStore";
import CommonPageElements from "../CommonPageElements";



const LocalGamePage = observer(() => {

	// const {user, loading } = useAuth()

	useEffect(() => {
		AppStore.setGameType('local')
		console.log('useEffect AppStore.setGameType(local)')
		gameStore.setCurrentGameId('local')
		AppStore.loadCapturedFiguresFromLocalStorage()
	}, [])

	

	return (
		<CommonPageElements />
	)
})

export default LocalGamePage