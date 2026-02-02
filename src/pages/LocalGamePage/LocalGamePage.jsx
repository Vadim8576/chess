import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AppStore from "../../store/AppStore";
import gameStore from "../../store/gameStore";
import CommonPageElements from "../CommonPageElements";



const LocalGamePage = observer(() => {

	useEffect(() => {
		AppStore.setGameType('local')
		gameStore.setCurrentGameId('local')
	}, [])

	

	return (
		<CommonPageElements />
	)
})

export default LocalGamePage