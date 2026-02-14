import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/gameInitial';


const Svg = styled.svg`
width: auto;
height: 100%;
color: ${COLORS.primary};
`

const CloseIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>Закрыть</title><path fill="currentColor" d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"></path></Svg>
  )
}

export default CloseIcon