import styled from "styled-components";


const Ul = styled.ul`
    box-shadow: 0 0 0 1px rgba(17,20,24,.1),0 1px 1px rgba(17,20,24,.2);
    background: #fff;
    border-radius: 4px;
    color: #1c2127;
    list-style: none;
    min-width: 180px;
    padding: 4px;
    text-align: left;
    margin: 20px;
    max-width: 280px;
  `
const Link = styled.a`
    -webkit-text-size-adjust: 100%;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,blueprint-icons-16,sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
    list-style: none;
    text-align: left;
    box-sizing: inherit;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-radius: 4px;
    color: inherit;
    line-height: 22px;
    padding: 4px 8px;
    text-decoration: none;
    user-select: none;
  `

const Item = styled.li`
    -webkit-text-size-adjust: 100%;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.28581;
    text-transform: none;
    color: #1c2127;
    list-style: none;
    text-align: left;
    box-sizing: inherit;
  `

const Span = styled.span`
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    height: 22px;
    justify-content: center;
    color: #5f6b7c;
  `
const Text = styled.span`
         -webkit-text-size-adjust: 100%;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,blueprint-icons-16,sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
    list-style: none;
    text-align: left;
    color: inherit;
    line-height: 22px;
    user-select: none;
    box-sizing: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    flex-grow: 1;
    flex-shrink: 1;
    margin-right: 0;
    word-break: break-word;
  `



const Menu = () => {


  return (
    <Ul>
      <Item>
        <Link>
          <Span>
            <svg width="16" height="16" viewBox="0 0 18 23" xmlns="http://www.w3.org/2000/svg"><path d="M16.718 16.653L9 20.013l-7.718-3.36L0 19.133 9 23l9-3.868-1.282-2.48zM9 14.738c-3.297 0-5.97-2.696-5.97-6.02C3.03 5.39 5.703 2.695 9 2.695c3.297 0 5.97 2.696 5.97 6.02 0 3.326-2.673 6.022-5.97 6.022zM9 0C4.23 0 .366 3.9.366 8.708c0 4.81 3.865 8.71 8.634 8.71 4.77 0 8.635-3.9 8.635-8.71C17.635 3.898 13.77 0 9 0z"></path></svg>
          </Span>
          <Text>Custom SVG icon</Text>
        </Link>
      </Item>
      <Item>
        <Link>
          <Span>
            <svg data-icon="new-text-box" height="16" role="img" viewBox="0 0 16 16" width="16"><path d="M5 6.5c0 .28.22.5.5.5H7v3.5c0 .28.22.5.5.5s.5-.22.5-.5V7h1.5c.28 0 .5-.22.5-.5S9.78 6 9.5 6h-4c-.28 0-.5.22-.5.5zM15 2h-1V1c0-.55-.45-1-1-1s-1 .45-1 1v1h-1c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .55.45 1 1 1s1-.45 1-1V4h1c.55 0 1-.45 1-1s-.45-1-1-1zm-2 5c-.55 0-1 .45-1 1v5H3V4h5c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1z"></path></svg>
          </Span>
          <Text>
            New text box
          </Text>
        </Link>
      </Item>
      <Item>
        <Link>
          <Span>
            <svg data-icon="new-object" height="16" role="img" viewBox="0 0 16 16" width="16"><path d="M8 4c0 .6.4 1 1 1h2v2c0 .6.4 1 1 1s1-.4 1-1V5h2c.6 0 1-.4 1-1s-.4-1-1-1h-2V1c0-.6-.4-1-1-1s-1 .4-1 1v2H9c-.6 0-1 .5-1 1zm6.5 2.5V7c0 1.4-1.1 2.5-2.5 2.5S9.5 8.4 9.5 7v-.5H9C7.6 6.5 6.5 5.4 6.5 4S7.6 1.5 9 1.5h.5V1c0-.3.1-.6.1-.8C9.1.1 8.6 0 8 0 3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8c0-.6-.1-1.3-.2-1.9-.4.3-.8.4-1.3.4z"></path></svg>
          </Span>
          <Text>New object</Text>
        </Link>
      </Item>
      <Item>
        <Link>
          <Span>
            <svg data-icon="new-link" height="16" role="img" viewBox="0 0 16 16" width="16"><path d="M15 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1h-1c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .55.45 1 1 1s1-.45 1-1V5h1c.55 0 1-.45 1-1s-.45-1-1-1zm-3.5 6a2.5 2.5 0 00-2.45 2h-4.1a2.5 2.5 0 100 1h4.1a2.5 2.5 0 102.45-3z"></path></svg>
          </Span>
          <Text>New link</Text>
        </Link>
      </Item>
    </Ul>
  );
};

export default Menu



