import styled from 'styled-components';


const Column = styled.div`
  flex: ${props => props.$grow} 1 0%;
  height: 100%;
  flex-shrink: 0;
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
