
import styled from "styled-components";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";


const Status = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 40%;
height: 30px;
margin-left: 30%;
color: #fff;
font-size: 14px;
font-size: bold;
background-color: #414833;
border-radius: ${props => props.$position === 'top' ? '0 0 20px 20px' : '20px 20px 0 0'};
`;

const PlayerStatus = observer(({status, position}) => {
	
	return (
		<Status $position={position}>
			{`${status}`}
		</Status>
	)
})

export default PlayerStatus