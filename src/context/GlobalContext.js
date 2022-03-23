// * Creamos un contexto global para el manejo de la aplicación
import { createContext, useReducer } from 'react'
import appReducer from './AppReducer' // ! Importando el reducer
import { v4 } from 'uuid' // ! Importando el uuid

// * Estado inicial
const initialSatate = {
  tasks: [
    {
      id: '1',
      title: 'some title',
      description: 'some description',
      done: false,
    },
    {
      id: '2',
      title: 'some title two',
      description: 'some description two',
      done: false,
    },
  ],
}

// ? Inicializamos el contexto con un objeto que contiene el estado y la función para actualizarlo
export const GlobalContext = createContext(initialSatate)

// * Exportamos el contexto para poder usarlo en otros componentes
// ? children es el componente que se va a renderizar los cuales son los componentes hijos
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialSatate)

  // * creamos una función para agregar una tarea
  const addTask = task => {
    // ? dispatch es la función que se encarga de ejecutar el reducer, type es el tipo de acción que se va a ejecutar, payload es el contenido de la acción
    dispatch({ type: 'ADD_TASK', payload: { ...task, id: v4(), done: false } }) // ? .... copiá el objeto task  y le agregamos el id
  }

  // * creamos una función para eliminar una tarea
  const deleteTask = id => dispatch({ type: 'DELETE_TASK', payload: id })

  // * creamos una función para editar una tarea
  const updateTask = task => dispatch({ type: 'UPDATE_TASK', payload: task })

  // * creamos una función para marcar una tarea como completada
  const toggleTaskDone = id => dispatch({ type: 'TOGGLE_TASK_DONE', payload: id })

  // ? Provider es el componente que va a proveer el contexto, en este caso GlobalContext y podra acceder a los datos del contexto
  return (
    <GlobalContext.Provider value={{ ...state, addTask, deleteTask, updateTask, toggleTaskDone }}>
      {children}
    </GlobalContext.Provider>
  )
}
