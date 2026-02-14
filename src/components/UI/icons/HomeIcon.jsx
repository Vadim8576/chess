import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/gameInitial';


const Svg = styled.svg`
width: auto;
height: 100%;
color: ${COLORS.primary};
`

const HomeIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><title>На главную</title><g fill="none" fillRule="evenodd" stroke="currentColor"><path d="m1.5 10.5l9-9l9 9"></path><path d="M3.5 8.5v8a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-8"></path></g></Svg>
  )
}

export default HomeIcon