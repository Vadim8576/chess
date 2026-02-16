import styled from "styled-components";

const Wrapper = styled.div`
position: relative;
display: flex;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
flex-direction: column;
`


const PageWrapper = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};




export default PageWrapper