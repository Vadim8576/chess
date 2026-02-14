import styled from 'styled-components';
import Header from './Header';
import AppStore from '../store/AppStore';
import { observer } from 'mobx-react-lite';


const WidgetWrapper = styled.div`
display: flex;
flex-direction: column;

// width: 100%;
height: 100%;

margin-left: ${props => props.$marginLeft}px;

grid-column:${props => props.$gridColumn};
grid-row:${props => props.$gridRow};
`;


const Widget = observer(({gridColumn, gridRow, children }) => {
  const cellSize = AppStore.board.cellSize
  if (!cellSize) return
  return (
    <WidgetWrapper
      $marginLeft={cellSize / 2}
      $gridColumn={gridColumn}
      $gridRow={gridRow}
    >
      {children}
    </WidgetWrapper>
  )
})

// const Widget = withWidget()(null)
// const withWidget = () => {
//   const cellSize = AppStore.board.cellSize
//   if (!cellSize) return
//   return (WrappedComponent) => {
//     // return function WithColumn({ title, ...restProps }) {
//     return function WithColumn({ ...restProps }) {
//       return (
//         <WidgetWrapper
//           $marginLeft={cellSize / 2}
//         >
//           {/* <Header title={title} /> */}
//           {WrappedComponent ? (
//             <WrappedComponent {...restProps} />
//           ) : (
//             restProps.children
//           )}
//         </WidgetWrapper >
//       )
//     }
//   }
// }

// const Widget = withWidget()(null)

export default Widget
