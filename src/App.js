import { FaNewspaper, FaArrowRight } from "react-icons/fa"
import React, { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from 'openai'

function App() {
  const [userInput, setUserInput] = useState('')
  const [userInputsArray, setUserInputsArray] = useState([])
  const [converstaionArr, setConversationArr] = useState('')
  
  const configuration = new Configuration({
    apiKey: ""
  })
  const openai = new OpenAIApi(configuration)

  const insturctionObj = [{
    role: 'system',
    content: 'Friendly short message generator that encourages what the user said. '
  }]

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (userInput) {
      setConversationArr((prevConversationArr) => [
        ...insturctionObj,
        ...prevConversationArr,
        {
          role:'user',
          content: userInput,
        },
      ])
      console.log(converstaionArr)
      setUserInput('')
      fetchReply(userInput)
    }
  }

    const fetchReply = async () => {
      try {
        const response = await openai.createCompletion({
          model: 'gpt-4',
          messages: converstaionArr
        })
        setConversationArr((prevConversationArr)=>[
          ...prevConversationArr,
          response.data.choices[0].message
        ])
        console.log(converstaionArr)
      } catch (error) {
        console.error('Error:', error)
      }
    }



  return (
    <div className="bg-slate-300 flex justify-center items-center h-screen">
      <div className="bg-slate-500 w-1/3 h-2/3 justify-between rounded-md items-center flex flex-col">
        <div className="flex w-full justify-between items-center p-8">
          <FaNewspaper />
          <div className="flex flex-col">
            <h2 className="text-white">MeBot</h2>
            <h2>Ask me anything!</h2>
          </div>
        </div>
        <div className="h-full w-full bg-white justify-between rounded-b-md flex flex-col overflow-y-scroll">
          {/* <div className="h-full w-full flex flex-col">
          {userInputsArray.map((input, index) => (
            <div key={index}>{input}</div>
          ))}
          </div> */}
          <form className="mt-auto" onSubmit={handleSubmit}>
            <div className="flex justify-between border-slate-700 border-2">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="w-3/4 mt-auto"
              />
              <button type="submit"><FaArrowRight /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;



// Below are first testing of ChatBot using text-davinci-003, only generating single-turn task
// const handleInputChange = (event) => {
//   setUserInput(event.target.value)
// }

// const handleSubmit = (event) => {
//   event.preventDefault()
//   if (userInput) {
//     setUserInputsArray((prevUserInputsArray) => [
//       ...prevUserInputsArray,
//       userInput,
//     ])
//     console.log(userInputsArray)
//     setUserInput('')
//     fetchReply(userInput)
//   }
// }

//   const fetchReply = async (outline) => {
//     try {
//       const response = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: `Generate a short message replying to "${outline}" and sound interesting. Mention one aspect of the sentence.`,
//         max_tokens: 60
//       })
//       const replyText = response.data.choices[0].text.trim()
//       console.log(replyText)
//       setUserInputsArray(prevUserInputsArray => [...prevUserInputsArray, replyText])
//       console.log(userInputsArray)

//     } catch (error) {
//       console.error('Error:', error)
//     }
//   }

