import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import RouteWithLoader from '../components/RouteWithLoader'
import { Routes } from '../routes'
// pages
import Home from './Home'
import Tutorial from './Tutorial'
// components
import Header from '../components/Header'
import ScrollToTop from '../components/ScrollToTop'
import Footer from '../components/Footer'

const App = () => {
  return (
    <Router>
      <div className="font-montserrat min-h-screen relative bg-gray-50">
        <Header />
        <ScrollToTop />
        <Switch>
          <RouteWithLoader exact path={Routes.Home.path} component={Home} />
          <RouteWithLoader exact path={Routes.Tutorial.path} component={Tutorial} />
          <Redirect exact path="/" to={Routes.Home.path} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
