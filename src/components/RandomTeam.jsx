import { useState } from "react"
import { shuffle } from "../services/shuffle"

function RandomTeam({ list }) {
  const [numberTeams, setNumberTeams] = useState()
  const [teams, setTeams] = useState([])

  const handleTeams = (e) => {
    e.preventDefault()
    const shuffled = shuffle(list.filter((user) => user.isChecked))

    if (numberTeams === undefined) {
      setTeams([])
      console.log(randomUsers)
    } else {
      const numberUsers = shuffled.length / numberTeams
      const result = []
      for (let i = 0; i < numberTeams; i++) {
        result.push(shuffled.slice(i * numberUsers, (i + 1) * numberUsers))
      }
      setTeams(result)
      console.log(result)
    }
  }
  return (
    <div className="bg-zinc-700 flex-grow flex rounded-lg">
      <div className="bg-zinc-800 text-emerald-500 flex flex-col flex-grow m-1 p-2 rounded-lg">
        <div className="flex sm:flex-row flex-col items-center gap-2 pb-2 border-b-2 border-b-zinc-700">
          <div>Choisis le nombre d'équipes:</div>
          <form className="flex gap-2">
            <input
              className=" w-10 text-center bg-zinc-400 text-zinc-950 rounded-lg p-1 active:border-red-700 active:border-none"
              type="number"
              min="2"
              max={Math.ceil(list.filter((user) => user.isChecked).length / 2)}
              name="picker"
              onChange={(e) => setNumberTeams(e.target.value)}
            />
            <button
              className="bg-zinc-400 text-zinc-950 hover:bg-emerald-500 rounded-lg py-1 px-2"
              type="submit"
              onClick={handleTeams}
            >
              C'est la guerre !
            </button>
          </form>
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <div className="flex justify-center flex-wrap mt-10 gap-10 ">
            {teams.map((team, index) => (
              <ul className="bg-zinc-700 flex rounded-lg" key={index}>
                <div className="bg-zinc-800 m-1 px-8 flex flex-col justify-center rounded-lg">
                  {team.map((user, index) => (
                    <li className="p-2 hover:text-zinc-400" key={index}>
                      {user.name}
                    </li>
                  ))}
                </div>
              </ul>
            ))}
          </div>
          <div className="flex justify-center">
            <img
              src="/baked.png"
              alt="Baked with love"
              className=" h-40 sm:py-0 py-2 "
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RandomTeam
