import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AppStore from "../../store/AppStore";
import gameStore from "../../store/gameStore";
import Game from "../Game";
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
		<Game />
	)
})

export default LocalGamePage