import { useState } from "react";
import styled from "styled-components";
import copyIcon from "../../assets/icons/copy.svg"
import closeIcon from "../../assets/icons/close-x.svg"
import { COLORS } from "../../constants/gameInitial";
import gameStore from "../../store/gameStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";

const InviteLinkContainer = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
min-width: 600px;
// height: 60px;
border: 1px #333 solid;
// padding: 20px;
font-size: 1.1rem;
`

const InviteLinkWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 50%;
font-size: 1.2rem;
color: ${props => props.$isCopied ? '#4CAF50' : COLORS.blackCell};
// color: ${props => props.$isCopied ? '#4CAF50' : COLORS.primary};
font-weight: bold;
// border: 1px #666 solid;
padding: 15px;
`

const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding: 5px 10px 5px 20px;
border-bottom: 1px #666 solid;
`

const CopyIconWrapper = styled.button`
display: flex;
justify-content: center;
align-items: center;
// width: 20px;
// height: 20px;
padding: 3px;
cursor: ${props => props.$isCopied ? 'default' : 'pointer'};
// background-color: ${props => props.$isCopied ? '#4CAF50' : 'transparent'};
background-color: transparent;
color: white;
border: none;
margin-left: 5px;
// border-radius: 5px;
`
const Icon = styled.img`
width: 1.5rem;
height: 1.5rem;
&:hover {
  background-color: ${COLORS.errorCell};
}
`



const InviteLink = observer(() => {
  const [isCopied, setIsCopied] = useState(false)

  const { gameId } = useParams()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gameStore.inviteLink)
      setIsCopied(true)
      // Сбрасываем статус через 2 сек
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Не удалось скопировать:', err)
    }
  }

  const cancelGame = () => {
    gameStore.removeGame(gameId)
  }



  return (
    <InviteLinkContainer>
      <Header>
        <span>Ссылка-приглашение:</span>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <CopyIconWrapper onPointerDown={copyToClipboard} $isCopied={isCopied}>
            <Icon src={copyIcon} alt='copy' />
          </CopyIconWrapper>
          <CopyIconWrapper onPointerDown={cancelGame}>
            <Icon src={closeIcon} alt='close' />
          </CopyIconWrapper>
        </div>
      </Header>

      <InviteLinkWrapper $isCopied={isCopied}>
        {/* <p style={{ color: '#000', marginBottom: '10px' }}>Ссылка-приглашение:</p> */}
        {isCopied ? 'Ссылка скопирована!' : gameStore.inviteLink}
      
      </InviteLinkWrapper>

    </InviteLinkContainer>
  )
})

export default InviteLink