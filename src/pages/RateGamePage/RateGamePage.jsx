import React, { useEffect } from 'react';


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