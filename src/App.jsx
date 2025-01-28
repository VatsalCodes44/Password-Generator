import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  const passwordGenerator = useCallback( () => {
   let pass = ""
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
   if(numberAllowed) {
    str += "0123456789"
   }
   if(charAllowed){
    str += "!@#$%^&*()_+-=[]{}|;':,./<>?~`"
   }
   for (let i=1; i<length; i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass += str.charAt(char)
   }
   setPassword(pass)
  } ,[length, numberAllowed, charAllowed])



  useEffect(() => {
      passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator] )


  const passwordRef = useRef(null)
  const copyPasswordClipbord = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-gray-800 bg-gray-800'>


        <h1 className='text-white text-center my-3' >Password Generator</h1>


        <div className='bg-white flex shadow rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3' type="text" ref={passwordRef} value={password} placeholder='password' readOnly />
          <button onClick={copyPasswordClipbord} className='outline-none bg-blue-700 text-white px-3 py-.05 shrink-0'>copy</button>
        </div>


        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={50} className='cursor-pointer' onChange={(event)=> {
                setLength(event.target.value)
              }} />
              <label className='text-orange-600'>Length: ({length})</label>
            </div>
            
            
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={numberAllowed} onChange={(event) => {
                setNumberAllowed((prev) => !prev)
              }}/>
              <label className='text-orange-600'>Numbers</label> 
            </div>
            
            
            <div>
            <input type="checkbox" defaultChecked={charAllowed} onChange={(event) => {
                setCharAllowed((prev) => !prev)
              }} /> 
              <label className='text-orange-600'>Characters</label>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default App

