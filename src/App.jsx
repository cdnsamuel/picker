import { useEffect, useState } from "react"

import Header from "./components/Header"
import List from "./components/List"
import RandomPicker from "./components/RandomPicker"
import RandomTeam from "./components/RandomTeam"
import list from "./data/list.json"

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("list")) || list)
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="bg-zinc-700 flex  sm:flex-row flex-col flex-grow p-3 gap-3">
        <List onChange={setUsers} list={users} reset={list} />
        <div className=" bg-zinc-800 flex-grow flex flex-col gap-4 p-3 rounded-lg">
          <RandomPicker list={users} />
          <RandomTeam list={users} />
        </div>
      </div>
      <div className=" bg-zinc-800 text-emerald-500 py-4 flex justify-around">
        <a
          href="https://github.com/Nawaksam/team-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <div>#CodeBakery</div>
        <a
          href="https://www.linkedin.com/in/cdnsamuel/"
          target="_blank"
          rel="noopener noreferrer"
        >
          🄯Nawaksam
        </a>
      </div>
    </div>
  )
}

export default App
