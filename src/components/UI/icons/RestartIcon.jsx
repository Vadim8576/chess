import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/gameInitial';


const Svg = styled.svg`
width: auto;
height: 100%;
color: ${COLORS.primary};
`

const RestartIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Новая игра</title><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3a9 9 0 1 1-5.657 2"></path><path d="M3 4.5h4v4"></path></g></Svg>
  )
}

export default RestartIcon