import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Olha amor,</h1>
      <p>já consegui fazer o site ficar online. Agora é só colocar mais coisas :)</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          contador está em {count}
        </button>
      </div>
    </>
  )
}

export default App
