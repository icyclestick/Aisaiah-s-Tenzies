import { useState, useRef, useEffect } from 'react'
import './App.css'
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())

  const buttonRef = useRef(null)

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => (
    dice[0].value == die.value
  ))

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die => (
      die.id === id ?
        { ...die, isHeld: !die.isHeld } : die
    )))
  }

  function rollDice() {
    if (!gameWon) {
      setDice(dice => (
        dice.map(die => (
          die.isHeld ?
            die :
            { ...die, value: Math.ceil(Math.random() * 6) }
        ))
      )
      )
    }
    else {
      setDice(() => generateAllNewDice())
    }
  }


  const diceElements = dice.map(dieObj => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ))

  return (
    <>
      <main>
        {gameWon && <Confetti />}
        <div aria-live='polite' className='sr-only'>
          Congratulations! You Won!
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice} ref={buttonRef}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  )
}

export default App
