import { observer } from "mobx-react-lite";
import gameStore from "../store/gameStore";
import Dialog from "./UI/Dialog";
import { useState } from "react";

const GameDialogs = observer(({ dialogType, setDialogType }) => {


  // dialogType - если нажал кнопку "Ничья" или "Сдаться"
  //'drawOfferAnswer' - если вопрос пришел с сервера (Хотите согласиться?)
  const type = dialogType || 'drawOfferAnswer' 


  const dialog = {
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
      {
        {
          'resignation': <Dialog dialog={dialog[type]} />,
          'drawOffer': <Dialog dialog={dialog[type]} />,
          'drawOfferAnswer': <Dialog dialog={dialog[type]} />
        }[type]
      }
    </>
  )
})

export default GameDialogs