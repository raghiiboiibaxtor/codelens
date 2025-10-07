import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/button'
import CodeIO from './components/codeblock'
import CodeBlock from './components/codeblock'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <CodeBlock></CodeBlock>
    </>
  )
}

export default App
