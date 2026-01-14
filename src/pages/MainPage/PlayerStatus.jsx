
import styled from "styled-components";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";


const Status = styled.div`
text-align: center;
display: flex;
justify-content: center;
align-items: center;
width: 80%;
height: 30px;
color: #fff;
font-size: 14px;
font-weight: bold;
background-color: #414833;
// border-radius: ${props => props.$position === 'top' ? '0 0 20px 20px' : '20px 20px 0 0'};
`;

const PlayerStatus = observer(({status, position}) => {
	
	return (
		<Status $position={position}>
			{`${status}`}
		</Status>
	)
})

export default PlayerStatus