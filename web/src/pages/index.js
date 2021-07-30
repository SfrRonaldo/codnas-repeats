import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import RouteWithLoader from '../components/RouteWithLoader'
import { Routes } from '../routes'
// pages
import Home from './Home'

const App = () => {
  return (
    <Router>
      <div className="font-montserrat">
        <Switch>
          <RouteWithLoader exact path={Routes.Home.path} component={Home} />
          <Redirect exact path="/" to={Routes.Home.path} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
