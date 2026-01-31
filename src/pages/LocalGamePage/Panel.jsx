import styled from 'styled-components';


const Column = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: ${props => props.$grow} 1 0%;
  min-width: ${props => props.$grow * 200}px;
  height: 100%;
  // flex-shrink: 0;
  padding: ${props => props.$grow === 3 ? '0' : '20px'} 10px 0 10px;
`;

const withColumn = (options = {}) => {
  return (WrappedComponent) => {
    return function WithColumn({ grow, ...restProps }) {
      return (
        <Column $grow={grow || options.defaultGrow || 1}>
          {WrappedComponent ? (
            <WrappedComponent {...restProps} />
          ) : (
            restProps.children // если компонента нет — рендерим children
          )}
        </Column>
      )
    }
  }
}

const Panel = withColumn({ defaultGrow: 1 })(null)

export default Panel
