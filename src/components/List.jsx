import { useEffect, useState } from "react"

const getHighestId = (array) => {
  const ids = array.map((object) => object.id)
  return Math.max(...ids)
}

function List({ onChange, list, reset }) {
  const [adding, setAdding] = useState(false)
  const [input, setInput] = useState("")
  const [newId, setNewId] = useState(0)

  const handleUsers = (e) => {
    const { name, checked } = e.target
    if (name === "crew") {
      const newList = list.map((user) => {
        return { ...user, isChecked: checked }
      })
      onChange(newList)
      localStorage.setItem("list", JSON.stringify(newList))
    } else {
      const newList = list.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      )
      onChange(newList)
      localStorage.setItem("list", JSON.stringify(newList))
    }
  }
  const handleReset = () => {
    onChange((list = reset))
    localStorage.setItem("list", JSON.stringify(reset))
  }
  const handlePurge = () => {
    const newList = []
    onChange(newList)
    localStorage.setItem("list", JSON.stringify(newList))
  }
  const handleDelete = (id) => {
    const newList = list.filter((user) => user.id !== id)
    onChange(newList)
    localStorage.setItem("list", JSON.stringify(newList))
  }
  const handleAdding = () => {
    setAdding(!adding)
  }
  const handleAddUser = (e) => {
    e.preventDefault()

    if (input.trim() === "") {
      return
    }
    setNewId(getHighestId(list) + 1)
    const user = {
      id: newId,
      name: input,
      isChecked: true,
    }
    const newList = [...list, user]
    onChange(newList)
    localStorage.setItem("list", JSON.stringify(newList))
    setInput("")
    setNewId(newId + 1)
  }

  return (
    <div className="bg-zinc-800 text-emerald-500 p-4 h-max select-none rounded-lg">
      <div>
        <div className="flex justify-between gap-2 border-b-2 border-b-emerald-700 px-2 mb-2 pb-1">
          <div className="flex gap-3 my-1">
            <input
              type="checkbox"
              id="crew"
              name="crew"
              checked={
                list.filter((user) => user?.isChecked !== true).length < 1
              }
              onChange={handleUsers}
            />
            <label className="text-xl" htmlFor="crew">
              Crew
            </label>
          </div>
          <button
            className="bg-zinc-400 hover:bg-red-400 text-zinc-950 text-xs rounded-lg mx-1 my-1.5 px-2"
            type="button"
            onClick={() => handlePurge()}
          >
            X
          </button>
        </div>
        <div className="">
          {list.map((user) => (
            <div
              className="flex justify-between hover:bg-emerald-500 hover:text-zinc-950 px-2 py-0.5 rounded-lg"
              key={user.id}
            >
              <div className="flex gap-3 my-1 ">
                <input
                  type="checkbox"
                  id={user.id}
                  name={user.name}
                  checked={user?.isChecked}
                  onChange={handleUsers}
                />
                <label htmlFor={user.id}>{user.name}</label>
              </div>
              <button
                type="button"
                className="bg-zinc-400 hover:bg-red-400 text-zinc-950 text-xs rounded-lg m-1 px-2"
                onClick={() => handleDelete(user.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-5 items-center justify-between border-t-2 border-t-emerald-700 mt-2">
        <button
          className="bg-zinc-400 hover:bg-emerald-500 text-zinc-950 mt-2 px-2 py-1 rounded lg"
          type="button"
          onClick={handleReset}
        >
          Réinitialiser
        </button>
        <button
          className="bg-zinc-400 hover:bg-emerald-500 text-zinc-950 mt-2 p-1 rounded lg"
          type="button"
          onClick={handleAdding}
        >
          Ajouter
        </button>
      </div>
      {adding && (
        <form className="flex justify-between items-center gap-2 mt-2 ">
          <input
            className=" bg-zinc-800 border-zinc-700 border-2 rounded-lg p-1 w-36"
            type="text"
            placeholder="Utilisateur"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-emerald-500 hover:bg-green-500 text-zinc-950  py-1.5 px-2.5 rounded lg"
            type="submit"
            onClick={handleAddUser}
          >
            +
          </button>
        </form>
      )}
    </div>
  )
}

export default List
