import { FaNewspaper, FaArrowRight } from "react-icons/fa"
import React, { useState, useEffect, useRef  } from 'react'

function App() {
  const [userInput, setUserInput] = useState('')
  const [conversationArr, setConversationArr] = useState([])
  
  useEffect(() => {
    setConversationArr(() => [
      {
        role: 'system',
        content: 'Friendly short message, 10 words or less, generator that encourages what the user said. ',
      },
    ])
  },[])

  // const insturctionObj = [{
  //   role: 'system',
  //   content: 'Friendly short message generator that encourages what the user said. '
  // }]

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (userInput) {
      const newMessage = {
        role: 'user',
        content: userInput,
      }
      const updatedConversation = [...conversationArr, newMessage]
      setConversationArr(updatedConversation)
      setUserInput('')
      console.log(updatedConversation)
      fetchReply(updatedConversation)
    }
  }

    const fetchReply = async (conversation) => {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions",{
          method: "POST",
          headers: {
            "Authorization": "Bearer sk-",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages" : conversation
          })        
        })
        const data = await response.json()
        const updatedConversationBot = [...conversation, data.choices[0].message]
        setConversationArr(updatedConversationBot)
        console.log(data.choices[0].message)
        console.log(updatedConversationBot)
      } catch (error) {
          console.error('Error:', error)
        }
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(scrollToBottom, [conversationArr]);

  
    return (
      <div className="bg-slate-300 flex justify-center items-center h-screen">
        <div className="bg-slate-500 w-[600px] h-2/3 justify-between rounded-md items-center flex flex-col">
          <div className="flex w-full justify-between items-center p-8">
            <FaNewspaper />
            <div className="flex flex-col">
              <h2 className="text-white">MeBot</h2>
              <h2>Ask me anything!</h2>
            </div>
          </div>
          <div className="h-full w-full bg-white justify-between rounded-b-md flex flex-col ">
            <div className="overflow-y-auto h-96 flex-grow  ">
              <div className="text-red-500 border border-gray-600 p-4 m-4 rounded-md w-3/4 self-start">Hello, my name is MeBot, feel free to ask me anything!</div>
              {conversationArr.map((message, index) => {
                if (index === 0) return null
                return (
                  <div 
                  key={index} 
                  className={`${message.role === "user" ? "ml-[132px] justify-end text-blue-500 self-end" : "justify-start text-red-500 self-start"} 
                    border border-gray-600
                    p-4
                    m-4 
                    rounded-md
                    w-3/4
                  `}
                >
                  <p>{message.content}</p>
                </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
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

export default App



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

