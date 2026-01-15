
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import Header from "./Header";


// const Wrapper = styled.div`
// width: 100%;
// height: 50%;
// border: 1px #666 solid;
// `;

const Status = styled.div`
text-align: center;
display: flex;
justify-content: center;
align-items: center;
flex-grow: 1;
overflow-y: auto;
color: #fff;
font-size: 14px;
font-weight: bold;
background-color: #414833;
`;

const GameStatus = observer(({ status }) => {

	return (
		<Status>
			{`${status}`}
		</Status>
	)
})

export default GameStatus