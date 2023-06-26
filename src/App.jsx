import React, { useEffect, useState } from 'react'
import './App.scss'
import Dice from "./assets/images/icon-dice.svg"
import DividerDesktop from "./assets/images/pattern-divider-desktop.svg"

const App = () => {

  const [advice, setAdvice] = useState({
    id: 0,
    advice: "Never regret. If it's good, it's wonderful. If it's bad, it's experience."
  })

  const fetchAdvice = async () => {

    try {
      const response = await fetch('https://api.adviceslip.com/advice')
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAdvice(data.slip)
      console.log(data)

    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {fetchAdvice()},[])
  useEffect(() => {
    const intervalId = setInterval(fetchAdvice, 2000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className='advice-container'>
      <h4 className="advice-id">{'ADVICE #' + advice.id}</h4>
      <div className='advice'>
        <p className='advice-text'>{'"' + advice.advice + '"'}</p>
      </div>
      <img src={DividerDesktop} alt="Divider" />
      <button className='button' type='button' onClick={fetchAdvice}>
        <img src={Dice} alt="Dice" className='dice' />
        {/* <Dice className="Dice" /> */}
      </button>
    </div>
  )
}

export default App