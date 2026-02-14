import { observer } from "mobx-react-lite";
import AppStore from "../../store/AppStore";
import gameStore from "../../store/gameStore";
import Dialog from "./Dialog";
import RightSideMenu from "../../widgets/RightSideMenu";
import { useState } from "react";
import { useNavigate } from "react-router";



const GameDialogs = observer(() => {

  const [dialogType, setDialogType] = useState(null) // null || 'resignation' || 'drawOffer'

  // dialogType - если нажал кнопку "Ничья" или "Сдаться"
  //'drawOfferAnswer' - если вопрос пришел с сервера (Хотите согласиться?)
  const type = dialogType || 'drawOfferAnswer'


  const navigate = useNavigate()


  const dialog = {
    'home': {
      text: 'Вернуться на главную?',
      onOk: () => {
        setDialogType(null)
        gameStore.setShowDrawDialog(false)
        navigate('/')
      },
      onCancel: () => {
        setDialogType(null)
        gameStore.setShowDrawDialog(false)
      }
    },

    'restart': {
      text: 'Новая игра?',
      onOk: () => {
        setDialogType(null)
        gameStore.setShowDrawDialog(false)
        AppStore.restartGame()
      },
      onCancel: () => {
        setDialogType(null)
        gameStore.setShowDrawDialog(false)
      }
    },

    'resignation': {
      text: 'Хотите сдаться?',
      onOk: () => {
        console.log('Сдался')
        setDialogType(null)
        gameStore.setShowDrawDialog(false)
        gameStore.resign()
      },
      onCancel: () => {
        console.log('Отмена')
        setDialogType(null)
        gameStore.setShowDrawDialog(false)
      }
    },

    'drawOffer': {
      text: 'Предложить ничью?',
      onOk: () => {
        console.log('Предложил ничью')
        setDialogType(null)
        gameStore.setShowDrawDialog(false)
        gameStore.drawOffer('draw')
      },
      onCancel: () => {
        console.log('Отмена')
        setDialogType(null)
        gameStore.setShowDrawDialog(false)
      }
    },

    'drawOfferAnswer': {
      text: 'Соперник предлагает ничью. Вы согласны?',
      onOk: () => {
        console.log('Согласился')
        setDialogType(null)
        gameStore.drawOffer('ok')
        gameStore.setShowDrawDialog(false)
      },
      onCancel: () => {
        console.log('Не согласился')
        setDialogType(null)
        gameStore.drawOffer('cancel')
        gameStore.setShowDrawDialog(false)
      }
    }
  }

  return (
    <>
      {gameStore.showDrawDialog && <Dialog dialog={dialog[type]} />}
      {/* <Dialog dialog={dialog[type]} /> */}

      <RightSideMenu setDialogType={setDialogType} />
    </>
  )
})

export default GameDialogs