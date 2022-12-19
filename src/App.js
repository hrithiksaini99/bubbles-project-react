import './App.css'
import { useState } from 'react'

function App() {
  const [bubbles, setBubbles] = useState([])
  const [poppedBubbles, setPoppedBubbles] = useState([])
  function addBubble(e) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    setBubbles([
      ...bubbles,
      { x: e.clientX, y: e.clientY, color: `#${randomColor}` },
    ])
    console.log(bubbles)
  }
  function undoBubble() {
    if (!bubbles.length) return
    const newBubbles = [...bubbles]
    const poppedBubble = newBubbles.pop()
    setBubbles(newBubbles)
    setPoppedBubbles([...poppedBubbles, poppedBubble])
  }
  function redoBubble() {
    if (!poppedBubbles) return
    setBubbles([...bubbles, poppedBubbles.pop()])
  }
  function clearBubble() {
    setBubbles([])
    setPoppedBubbles([])
  }

  return (
    <>
      <div className="buttons">
        <button
          className="button"
          disabled={!bubbles.length}
          onClick={() => undoBubble()}
        >
          Undo
        </button>
        <button
          className="button"
          disabled={!poppedBubbles.length}
          onClick={() => redoBubble()}
        >
          Redo
        </button>
        <button
          className="button"
          disabled={!poppedBubbles.length && !bubbles.length}
          onClick={() => clearBubble()}
        >
          Clear
        </button>
      </div>
      <div className="App" onClick={(e) => addBubble(e)}>
        {bubbles?.map((bubble, _id) => {
          return (
            <div
              key={_id}
              className="bubble"
              style={{
                position: 'absolute',
                top: bubble.y,
                left: bubble.x,
                backgroundColor: bubble.color,
                marginLeft: -8,
                marginTop: -8,
              }}
            ></div>
          )
        })}
      </div>
    </>
  )
}

export default App
