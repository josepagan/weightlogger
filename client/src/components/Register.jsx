
import React from 'react';
// import { auth } from '../App';
import { Link, Redirect } from 'react-router-dom';

const Register = ({
  name,
  email,
  password,
  language,
  displayUnit,
  handleSubmit,
  handleChange,
  redirectToReferrer,
  error,
}) => {
    if (redirectToReferrer === true) {
      return <Redirect to='/weightlogger' />
    }
    return (
      <div>
        <h3 style={{"color":"red"}}>{error}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            name
            <input
              name="name"
              value={name}
              onChange={handleChange}/>
          </label>
          <br />
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
          <br />
          <label>
            language
            <input
              name="language"
              value={language}
              onChange={handleChange}/>
          </label>
          <br />
          <label>
            unit
            <input
              name="displayUnit"
              value={displayUnit}
              onChange={handleChange}/>
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form> 
      </div>
    )
  }

export default Register
