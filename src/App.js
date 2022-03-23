import './App.css'

// * Importando componentes
import Heading from './components/Heading'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

// * Importando Router dom
import { Route, Switch } from 'react-router-dom'

// * Importando el ContextProvider
import { ContextProvider } from './context/GlobalContext'

function App() {
  return (
    <div>
      <div className="h-screen text-white text-center p-10">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className="container mx-auto h-full">
          <ContextProvider>
            <Heading />
            <Switch>
              {/* // ? Exact para que seja exatamente igual ao path */}
              <Route path="/" component={TaskList} exact />
              <Route path="/add" component={TaskForm} />
              <Route path="/edit/:id" component={TaskForm} />
            </Switch>
          </ContextProvider>
        </div>
      </div>
    </div>
  )
}

export default App
