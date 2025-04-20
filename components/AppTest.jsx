import React from "react"
import DieTest from "./DieTest"
import Confetti from "react-confetti"
export default function AppTest() {

    const [dice, setDice] = React.useState(generateAllNewDice())
    const buttonRef = React.useRef(null)

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    React.useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    const diceElements = dice.map(die => (
        <DieTest
            id={die.id}
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            hold={() => hold(die.id)}
        />
    ))

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map((item, index) => ({
                id: index,
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            }))
    }

    function changeDice() {

        if (!gameWon) {
            setDice(predice => {
                return predice.map(die => {
                    return die.isHeld ?
                        die :
                        { ...die, value: Math.ceil(Math.random() * 6) }
                })
            })
        }
        else {
            setDice(generateAllNewDice())
        }
    }

    function hold(id) {
        console.log(id)
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
        console.log(dice)
    }

    function roolDice() { }

    return (
        <main>
            {gameWon && <Confetti />}
            <div className="text">
                <h1>Scrimba Dice</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="container">
                {/* <DieTest value = {12}/>
                <DieTest value = {12}/>
                <DieTest value = {12}/>
                <DieTest value = {12}/>
                <DieTest value = {12}/>
                <DieTest value = {12}/>
                <DieTest value = {12}/>
                <DieTest value = {12}/>
                <DieTest value = {12}/>
                <DieTest value = {12}/> */}
                {diceElements}
            </div>
            <button 
            ref={buttonRef} 
            onClick={changeDice} 
            className="btn">
                {gameWon ? "New Game" : "Roll Dice"}
            </button>
        </main>

    )
}