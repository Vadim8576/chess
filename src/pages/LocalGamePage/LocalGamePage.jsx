import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AppStore from "../../store/AppStore";
import gameStore from "../../store/gameStore";
import CommonPageElements from "../CommonPageElements";
import { useParams } from "react-router";



const LocalGamePage = observer(() => {

	const { gameId } = useParams()
	console.log('gameId = ', gameId)


	useEffect(() => {
		AppStore.setCurrentPage('local')
		AppStore.setGameType('local')
		gameStore.setCurrentGameId('local')
	}, [])



	return (
		<CommonPageElements />
	)
})

export default LocalGamePage