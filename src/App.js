import {FaArrowRight } from "react-icons/fa"
import React, { useState, useEffect, useRef  } from 'react'
import { process } from "./env"

function App() {
  const [userInput, setUserInput] = useState('')
  const [conversationArr, setConversationArr] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const apiKey = process.env.OPENAI_API_KEY

  useEffect(() => {
    setConversationArr(() => [
      {
        role: 'system',
        content: 'Friendly short message, 10 words or less, generator that responses to what the user said. Your name is Mebot',
      },
    ])
  },[])

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
        setIsLoading(true)
        const response = await fetch("https://api.openai.com/v1/chat/completions",{
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
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
      } finally {
        setIsLoading(false)
      }
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(scrollToBottom, [conversationArr]);

  
    return (
      <div className="bg-[#9D8CA1] flex justify-center items-center h-screen">
        <div className="bg-[#81717A] w-1/3 h-2/3 justify-between rounded-md items-center flex flex-col">
          <div className="flex w-full justify-between items-center p-8">
            <div/>
            <h1 className="text-5xl text-[#F9F8F8] mr-2">MeBot</h1>
            <div className="flex flex-col">
              <h2 className="text-[#F9F8F8]">MeBot</h2>
              <h2 className="text-[#AA9DA4]">Ask me anything!</h2>
            </div>
          </div>
          <div className="h-full w-full bg-white justify-between rounded-b-md flex flex-col ">
            <div className="overflow-y-auto h-96 flex flex-col ">
              <div className="text-[#6C72C6] border border-[#989CD7] p-4 w-2/3 m-4 rounded-md self-start">Hello, my name is MeBot, feel free to ask me anything!</div>
              
              {conversationArr.map((message, index) => {
                if (index === 0) return null
                return (
                    <div 
                      key={index} 
                      className={`${message.role === "user" ? " text-[#69A9DD] self-end ml-auto" : "flex flex-col items-start text-[#6C72C6] self-start"}
                        border border-[#989CD7] p-4 m-2 ml-4 rounded-md break-words inline-flex`}>
                        <div className=" text-right">{message.content}</div>                    
                   </div> 
                )
              })}
              {isLoading ? ( <div className="text-[#6C72C6] border border-[#989CD7] p-4 w-2/3 m-4 rounded-md self-start">Loading...</div>) : null}
              <div ref={messagesEndRef} />
            </div>
            <form className="mt-auto" onSubmit={handleSubmit}>
              <div className="flex justify-between border-slate-700 border-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  className="w-[90%] mt-auto"
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
  
// const insturctionObj = [{
//   role: 'system',
//   content: 'Friendly short message generator that encourages what the user said. '
// }]
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

