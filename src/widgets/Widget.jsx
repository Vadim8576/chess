import styled from 'styled-components';
import Header from './Header';


const WidgetWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 20%;
// border: 1px #666 solid;
margin-bottom: 20px;
border-radius: 10px;
// box-shadow: 0px 5px 5px rgba(0, 0, 0, .4);
`;


const withWidget = () => {
  return (WrappedComponent) => {
    return function WithColumn({ title, ...restProps }) {
      return (
        <WidgetWrapper>
          <Header title={title} />
          {WrappedComponent ? (
            <WrappedComponent {...restProps} />
          ) : (
            restProps.children
          )}
        </WidgetWrapper >
      )
    }
  }
}

const Widget = withWidget()(null)

export default Widget
