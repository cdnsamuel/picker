import { useState } from "react"
import { shuffle } from "../services/shuffle"

function RandomPicker({ list }) {
  const [number, setNumber] = useState()
  const [randomUsers, setRandomUsers] = useState([])

  const handlePicker = (e) => {
    e.preventDefault()
    const result = shuffle(list.filter((user) => user.isChecked)).slice(
      0,
      number
    )
    if (number === undefined) {
      setRandomUsers([])
    } else {
      setRandomUsers(result)
    }
  }

  return (
    <div className="bg-zinc-700 text-emerald-500 flex flex-col  p-1 rounded-lg">
      <div className="bg-zinc-800 rounded-lg">
        <div>
          <div className="flex sm:flex-row flex-col items-center gap-2 m-2 pb-2 border-b-2 border-b-zinc-700">
            <p className="sm:pb-0 pb-1">Choisis le nombre de victimes:</p>
            <form className="flex gap-2">
              <input
                className=" w-10 text-center bg-zinc-400 text-zinc-950 rounded-lg p-1"
                type="number"
                min="1"
                max={list.filter((user) => user.isChecked).length}
                name="picker"
                onChange={(e) => setNumber(e.target.value)}
              />
              <button
                className="bg-zinc-400 text-zinc-950 hover:bg-emerald-500 rounded-lg py-1 px-2"
                type="submit"
                onClick={handlePicker}
              >
                Verdict
              </button>
            </form>
          </div>
        </div>

        <ul className="flex sm:justify-start justify-center flex-wrap ">
          <div className="h-11"></div>
          {randomUsers
            ? randomUsers.map((user) => (
                <li
                  key={user.id}
                  className="bg-emerald-500 hover:bg-zinc-400 text-zinc-950 text-center rounded-lg ml-2 mb-2 p-1.5"
                >
                  {user.name}
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  )
}

export default RandomPicker
