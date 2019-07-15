import './App.css';
import './components/WeightLogger.css'
import TimeAgo from 'timeago-react'

import { BrowserRouter as Router,
  Route,
  Link,
  Redirect } from 'react-router-dom'
import React from 'react';
import axios from 'axios';
import WeightLogger from './components/WeightLogger.jsx';
import Login from './components/Login.jsx'
import Register from './components/Register'

// global variable auth to indicate PrivateRoute whether 
// it should render private components (weightlogger)
let auth=false


class App extends React.Component {
  state = {
    redirectToReferrer: false,
    name: "",
    email: "",
    password: "",
    weight: "",
    weightLog: [],
    language: "",
    displayUnit: "",
    error:""
  }

  login = {
    handleChange : (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({[name]: value })
    },
    handleSubmit : (event) => {
      const { email, password } = this.state;
      axios.post('/api/auth',{ email, password })
        .then(res => {console.log(res);
          if (res.status === 200) {
            console.log('200res', res)
            axios.get('/api/users/me', {
              withCredentials: true,
              // no need to include token in header since we are sending cookie
              // (internet says its is safer)
              // headers: { 
              //   'x-auth-token': res.data 
              // }
            })
              .then(res => {
                const { name, language, displayUnit } = res.data
                this.setState({name, language, displayUnit})
              })
            auth = res.data
            this.setState({ redirectToReferrer: true })
          }})
        .catch(err => this.setState({error: err.response.data}))
      event.preventDefault();
    }
  }

  weightLogger = {
    changeHandle : (event) => {
      this.setState({weight: event.target.value})
    },
    submitHandle : (event) => {
      axios.post('/api/users/weights', {"weight":this.state.weight.toString()}, { headers: { 'x-auth-token': auth } })
        .then(res=>{
          this.setState({weightLog:res.data})})
        .catch(err => this.setState({error: err.response.data}))
      event.preventDefault()
    },
    weightGetHandle : (res)=>{
      this.setState({weightLog:res})

    }
  }

  register = {

    handleChange : (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({[name]: value })
    },
    handleSubmit : (event) => {
      const { name, password, email, language, displayUnit } = this.state
      axios.post('/api/users/create',{name, password, email, language, displayUnit})
      // .then(res => console.log(res))
        .then(res => {console.log(res);
          if (res.status === 200) {
            // auth = res.data
            auth = true 
            this.setState({ redirectToReferrer: true })
          }})
        // .catch(err => console.log('OMG', err))
        .catch(err => this.setState({error: err.response.data}))
      event.preventDefault()
    }
  }

  //as soon as the component is loaded, try to autologin with browser cookie
  componentDidMount(){
    axios.get('/api/users/me', {
      withCredentials: true,
    }
    )
      .then(res => {
        const { name, language, displayUnit } = res.data
        this.setState({name, language, displayUnit})
        auth = true 
        this.setState({ redirectToReferrer: true })
      })
      .catch(err => console.log (err.response.data))
  }

  render(){
    const { name ,email,password, redirectToReferrer, language, displayUnit, error} = this.state;
    const  handleSubmit = this.login.handleSubmit;
    const handleChange = this.login.handleChange;
    return (
      <Router>
        <div>
          <h3>{this.state.error}</h3>
          <Route render={(props) => <Navbar {...props} name={name}/>} />
          <PrivateRoute path="/weightlogger" 
            component={WeightLogger} 
            weightLog={this.state.weightLog}
            changeHandle={this.weightLogger.changeHandle}
            submitHandle={this.weightLogger.submitHandle}
            weightGetHandle={this.weightLogger.weightGetHandle}
          /> 
              <Route
                path="/login"
                render={(props) => 
                    <Login {...props}
                      email={email}
                      password={password}
                      handleSubmit={handleSubmit}
                      handleChange={handleChange}
                      redirectToReferrer={redirectToReferrer}
                      error={error}
                    />}
                      />
                        <Route
                          path="/register"
                          render={(props) => 
                              <Register {...props}
                                email={email}
                                password={password}
                                handleSubmit={this.register.handleSubmit}
                                handleChange={handleChange}
                                redirectToReferrer={redirectToReferrer}
                                language={language}
                                displayUnit={displayUnit}
                                error={error}
                              />}
                                />
                                </div>
                              </Router>
    )
  }
}

const PrivateRoute = ({ component: Component,autho, ...rest }) => (
  <Route {...rest} render={(props)=> (
    (auth) ? <Component {...props} {...rest} />
    : <Redirect to='/login' />
  )} />
)

const Navbar = ({name}) => <div>
  <h2>Hello {(!auth) ? "stranger" : name}</h2>
</div>


export { App, auth }
