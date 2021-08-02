import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import RouteWithLoader from '../components/RouteWithLoader'
import { Routes } from '../routes'
// pages
import Home from './Home'
import Tutorial from './Tutorial'
import Detail from './Detail'
import Estimate from './Estimate'
import NotFound from './NotFound'
// components
import Header from '../components/Header'
import ScrollToTop from '../components/ScrollToTop'
import Footer from '../components/Footer'
// Redux
import { Provider } from 'react-redux'
import store from '../store'

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <div className="font-montserrat min-h-screen relative bg-gray-50">
          <Header />
          <ScrollToTop />
          <Switch>
            <RouteWithLoader exact path={Routes.Home.path} component={Home} />
            <RouteWithLoader exact path={Routes.Tutorial.path} component={Tutorial} />
            <RouteWithLoader exact path={Routes.Detail.path} component={Detail} />
            <RouteWithLoader exact path={Routes.Estimate.path} component={Estimate} />
            <RouteWithLoader exact path={Routes.NotFound.path} component={NotFound} />
            <Redirect exact path="/" to={Routes.Home.path} />
            <Redirect path="*" to={Routes.NotFound.path} />
          </Switch>
          <Footer />
        </div>
      </Provider>
    </Router>
  )
}

export default App
