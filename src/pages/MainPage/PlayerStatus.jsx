
import styled from "styled-components";
import appStore from "../../store/appStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";


const Status = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 30px;
background-color: #A4AC86;
`;

const PlayerStatus = observer(({status}) => {
	return (
		<Status>
			{`${status}`}
		</Status>
	)
})

export default PlayerStatus