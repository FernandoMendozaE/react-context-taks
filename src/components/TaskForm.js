import React, { useState, useContext, useEffect } from 'react' // ! Importando useContext para usar el contexto
import { GlobalContext } from '../context/GlobalContext' // ! importando el contexto
import { useHistory, useParams } from 'react-router-dom' // ! Importando useHistory para usar el history

const TaskForm = () => {
  const { addTask, tasks, updateTask } = useContext(GlobalContext) // ? usando el contexto
  const history = useHistory() // ? instanciando el history
  const params = useParams() // ? instanciando el params

  // ? useState para manejar el estado del componente TaskForm
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
  })

  // * Función para manejar el cambio de los inputs
  const handleChange = e => {
    // console.log(e.target.name, e.target.value)
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    }) // ? Primero copiara el objeto task y luego lo modificara (actualizara)
  }

  // * Función para manejar el submit del formulario el cual agrega una tarea
  const handleSubmit = e => {
    e.preventDefault()
    if (task.id) {
      updateTask(task) // ? llamamos a la función updateTask del contexto
    } else {
      addTask(task) // ? llamamos a la función addTask del contexto
    }
    history.push('/') // ? redireccionamos al home
  }

  useEffect(() => {
    const taskFound = tasks.find(task => task.id === params.id)
    // console.log(taskFound)
    if (taskFound) {
      setTask(taskFound)
    }
    // else {
    //   console.log('creating')
    // }
  }, [params.id, tasks]) // ? [params.id y tasks] es el array de dependencias que se va a ejecutar cuando cambie el params.id o tasks. El arrary de dependencias es un array de variables que se van a ejecutar. Si alguna de estas variables cambia, se ejecutara el useEffect

  return (
    <div className="flex justify-center items-center h-3/4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-10">
        <h2 className="text-3xl mb-7">{task.id ? 'Update ' : 'Create '}A Task</h2>
        <div className="mb-5">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Write a title"
            className="py-3 px-4 focus:outline-none focus:text-gray-100 bg-gray-700 w-full"
            autoFocus
          />
        </div>
        <div className="mb-5">
          <textarea
            value={task.description}
            name="description"
            rows="2"
            placeholder="Write a description"
            onChange={handleChange}
            className="py-3 px-4 focus:outline-none focus:text-gray-100 bg-gray-700 w-full"
          ></textarea>
          <button className="bg-green-600 w-full hover:bg-green-500 py-2 px-4 mt-5">
            {task.id ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
