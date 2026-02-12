import styled from 'styled-components';
import Header from './Header';


const WidgetWrapper = styled.div`
display: flex;
flex-direction: column;
// flex-grow: 1;
// flex-shrink: 0;
// flex-basis: 0;
// min-width: 0;

// width: 100%;
height: 100%;
// border: 1px #666 solid;
margin-bottom: 20px;
margin: 0 0 0 10px;
// border-radius: 10px;
// box-shadow: 0px 5px 5px rgba(0, 0, 0, .4);

`;


const withWidget = () => {
  return (WrappedComponent) => {
    return function WithColumn({ title, ...restProps }) {
      return (
        <WidgetWrapper>
          {/* <Header title={title} /> */}
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
