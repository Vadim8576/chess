import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants/gameInitial";
import gameStore from "../../store/gameStore";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router";
import CloseIcon from "./icons/CloseIcon";


const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding: 5px 10px 5px 20px;
border-bottom: 1px #666 solid;
font-size: 1.4vmin;
`


const InviteLinkContainer = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
min-width: 300px;
// height: 60px;
border: 1px #333 solid;
// padding: 20px;
// font-size: 1.1rem;
`

const InviteLinkWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 50%;
font-size: 1.5vmin;
color: ${props => props.$isCopied ? COLORS.primary : COLORS.blackCell};
// color: ${props => props.$isCopied ? '#4CAF50' : COLORS.primary};
font-weight: bold;
// border: 1px #666 solid;
padding: 20px 30px;
`



const CloseButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
font-size: 1.6vmin;
cursor: ${props => props.$isCopied ? 'default' : 'pointer'};
background-color: transparent;
border: none;
&:hover {
  background-color: ${COLORS.neutral};
  color: #fff;
}
`


const ButtonWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 50%;
padding: 0 0 20px;
`

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 48%;
padding: 10px 5px;
// padding: 10px 20px;
border: 1px ${COLORS.neutral} solid;
background-color: #fff;
color: ${COLORS.primary};
// text-transform: uppercase;
cursor: pointer;
font-weight: normal;
font-size: 1.3vmin;
overflow: hidden;
&:hover {
  background-color: ${COLORS.neutral};
  color: #fff;
}
`


const InviteLink = observer(() => {
  const [isCopied, setIsCopied] = useState(false)

  const { gameId } = useParams()

  const navigate = useNavigate()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gameStore.inviteLink)
      setIsCopied(true)
      // Сбрасываем статус через 2 сек
      setTimeout(() => setIsCopied(false), 1000)
    } catch (err) {
      console.error('Не удалось скопировать:', err)
    }
  }

  const cancelGame = () => {
    gameStore.removeGame(gameId)
    navigate('/')
  }



  return (
    <InviteLinkContainer>
      <Header>
        <span>Ссылка-приглашение:</span>
        <CloseButton onClick={cancelGame}>
          <CloseIcon />
        </CloseButton>
      </Header>

      <InviteLinkWrapper $isCopied={isCopied}>
        {/* {isCopied ? 'Ссылка скопирована!' : gameStore.inviteLink} */}
        {gameStore.inviteLink}
      </InviteLinkWrapper>

      <ButtonWrapper>
        <Button onClick={copyToClipboard}>Скопировать</Button>
        <Button onClick={cancelGame}>Отмена</Button>
      </ButtonWrapper>

    </InviteLinkContainer>
  )
})

export default InviteLink