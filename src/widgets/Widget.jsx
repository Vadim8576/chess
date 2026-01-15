import styled from 'styled-components';
import Header from './Header';


const WidgetWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 50%;
border: 1px #666 solid;
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
