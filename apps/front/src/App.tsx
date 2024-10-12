import { useState } from 'react'


function App() {

  const handleButtonClick = async () => {
    const response = await fetch('/api')
  }

  return (
    <>
      <h1>Hello Vite + React!</h1 >
    </>
  )
}

export default App
