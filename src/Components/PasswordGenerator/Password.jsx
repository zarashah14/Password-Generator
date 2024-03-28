
import React, { useState, useCallback , useEffect , useRef} from 'react'
import Container from '../../Container/Container';
function Password() {
    const [length , setLength] = useState (8)
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState ("")
    const [password , setPassword] = useState ("")


    //useref hook user interface ka interactive ka liya
    const passwordRef = useRef (null)

    //memorization ka liya is ma ak fn , dependancy array hota ha
    const passwordGenerator = useCallback (()  => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (numberAllowed) str += "0123456789"
        if (charAllowed) str += "~`! @#$%^&*()_-+={[}]|\:;<,>.?/"

        for (let i=1; i<= length; i++){
            let char = Math.floor(Math.random()* str.length+1)
            pass += str.charAt(char)
        }
        setPassword(pass)
        
    } ,[length , numberAllowed, charAllowed, setPassword])
  
    //password copy part
  const copyPasswordToClipboard = useCallback (() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)    //password clipboard pr copy ka liya
  },
  [password])

  // fn , dependancy array hota ha page first time load hoga
     useEffect(()=>{
    passwordGenerator()
   },[length , numberAllowed, 
    charAllowed, passwordGenerator])

  return (
           <Container>
            <div className=' bg-blue-300 h-screen py-4'>
         <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-10 text-orange-500 bg-gray-800'>
            <h1 className='text-white text-center my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
               <input 
               type='text'
               value={password}      
               className='outline-none w-full py-1 px-3 text-gray-500'
               placeholder='password'
               readOnly
               ref={passwordRef}            //jis pr effect krna ha odhr ref pass krna ha
               />
               <button 
               onClick={copyPasswordToClipboard}         //copy
               className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
                copy
               </button>
          </div>
           <div className='flex lg:flex-row sm:flex-col text-sm gap-x-2'>
             <div className='flex items-center gap-x-1'>
                <input 
                type='range' 
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) =>{setLength(e.target.value)}}  //length
                />
                <label>Length: {length} </label>
             </div>

             <div className='flex items-center gap-x-1'>
                <input 
                    type='checkbox'
                    defaultChecked = {numberAllowed}
                    id="numberInput"
                    onChange={() =>{
                        setNumberAllowed((prev) => !prev);      //number add krna ka liya
                    }}
                />
                 <label htmlFor="numberInput">Numbers</label>
             </div>

             <div className='flex items-center gap-x-1'>
                <input 
                    type='checkbox'
                    defaultChecked = {charAllowed}
                    id="numberInput"
                    onChange={() =>{
                        setCharAllowed((prev) => !prev);    //character add krna ka lia
                    }}
                />
                 <label htmlFor="characterInput">Characters</label>
             </div>
            
           </div>
            
         </div>
         </div>
         </Container>
  )
}

export default Password


