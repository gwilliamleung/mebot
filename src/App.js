import { FaNewspaper, FaArrowRight } from "react-icons/fa"

function App() {
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
          <div className="h-full w-full bg-white justify-between rounded-b-md flex flex-col">
            <div>Chats</div>
            <form>
              <div className="flex justify-between border-slate-700 border-2">
                <input className="w-3/4"></input>
                <FaArrowRight/>
              </div>
            </form>
          </div>
      </div>

    </div>
  );
}

export default App;
