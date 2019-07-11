import React from 'react';
import { Link, Redirect } from 'react-router-dom'

const Login = ({
  email,
  password,
  handleSubmit,
  handleChange,
  redirectToReferrer,
  error}) => {
    if (redirectToReferrer === true) {
      return <Redirect to='/weightlogger' />
    }
    return (
      <div>
        <h3 style={{"color":"red"}}>{error}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            email
            <input
              name="email"
              value={email}
              onChange={handleChange}/>
            </label>
            <br />
            <label>
              password
              <input
                name="password"
                value={password}
                onChange={handleChange}/>
              </label>
              <input type="submit" value="Submit" />
            </form> 
            <Link to='/register'>Register Here</Link>
          </div>
    )
  }


export default Login 
