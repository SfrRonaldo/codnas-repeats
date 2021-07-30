import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import RouteWithLoader from '../components/RouteWithLoader'
import { Routes } from '../routes'
// pages
import Home from './Home'
// components
import Header from '../components/Header'
import ScrollToTop from '../components/ScrollToTop'
import Footer from '../components/Footer'

const App = () => {
  return (
    <Router>
      <div className="font-montserrat min-h-screen relative">
        <Header />
        <ScrollToTop />
        <Switch>
          <RouteWithLoader exact path={Routes.Home.path} component={Home} />
          <Redirect exact path="/" to={Routes.Home.path} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
