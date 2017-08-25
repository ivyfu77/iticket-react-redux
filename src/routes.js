import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from  "./components/home/home.jsx"
import About from  "./components/about/about.jsx"

//Events
import Event from './components/events/event.jsx'

// Base Components
import Modal from "./components/modal/modal.jsx"
import Header from  "./components/application/header.jsx"
import Footer from  "./components/application/footer.jsx"
import Toggle from "./components/application/toggleMenu.jsx"

const Status = function ({ code, children }){
  return (
        <Route render={function({ staticContext }) {
          if (staticContext)
            staticContext.status = code
          return children
        }}/>
    )
}

const NotFound = function(){
    return (
      <Status code={404}>
        <div>
          <h2> Sorry, can’t find this page</h2>
        </div>
      </Status>
    )
}
const routes = (
    <div>
        <Modal/>
        <Header/>
        <Toggle/>
        <Switch>
            <Route path='/events/:year/:month/:name' component={Event} />
            <Route path="/" component={Home}/>  
            <Route component={NotFound}/>
        </Switch>
        <Footer/>
    </div>
    )
    
export default routes;