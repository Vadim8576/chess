import styled from 'styled-components';
import Header from './Header';


const WidgetWrapper = styled.div`
display: flex;
flex-grow: 1;
flex-direction: column;
width: 100%;
// height: 40%;
// border: 1px #666 solid;
margin-bottom: 20px;
border-radius: 10px;
// box-shadow: 0px 5px 5px rgba(0, 0, 0, .4);
`;


const withWidget = (options = {}) => {
  return (WrappedComponent) => {
    return function WithColumn({ title, ...restProps }) {
      return (
        <WidgetWrapper>
          <Header
            title={title}
          />
          {WrappedComponent ? (
            <WrappedComponent {...restProps} />
          ) : (
            restProps.children // если компонента нет — рендерим children
          )}
        </WidgetWrapper >
      )
    }
  }
}

const Widget = withWidget({ title: '', titleColors: {color: '#fff', background: '#999'} })(null)

export default Widget
