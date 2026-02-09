import React, { useEffect } from 'react';
import AppStore from '../../store/AppStore';


const RateGamePage = () => {

  useEffect(() => {
    AppStore.setCurrentPage('rategame')
  }, [])

  return (
    <>
      <h1>RateGamePage</h1>
    </>
  )
}

export default RateGamePage