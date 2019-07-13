import React from 'react';
import './WeightLogger.css'
import axios from 'axios'
import TimeAgo from 'timeago-react'
import { auth } from '../App.jsx'

class WeightLogger extends React.Component {
  componentDidMount(){
    if (auth)
      axios.get('/api/users/weights', {
        // withCredentials: true,
        // headers: { 'x-auth-token': auth } 
      })
        .then(res=>{
          // this.setState({weightLog:res.data})
          this.props.weightGetHandle(res.data)
        }
        )
        .catch(err => console.log(err))
  }

  render(){
    return (
      <div>
        <div>the weighlogger goes here</div>
        <WeightLogDisplay weightLog={this.props.weightLog} unit="kg" />
        <WeightOutput weightObj={this.props.weightLog[this.props.weightLog.length - 1]}/>
        <WeightInput changeHandle={this.props.changeHandle} weight={this.props.weight} submit={this.props.submitHandle}/>
      </div>
    )
  }
}

const WeightOutput = ({weightObj})=>{
  // console.log('weight',weightObj)
  return (<h1>Your current weight is...{weightObj ? weightObj.weight : null}</h1>
  )}

const WeightLogDisplay = ({weightLog, unit})=>{
  const weightList = weightLog.map(weightObject =>
    {
      const date = new Date(weightObject.date)
      const day = date.getDay(), month = date.getMonth(), year = date.getFullYear()
      const hours = date.getHours(), minutes = date.getMinutes();

      //todo return a component rather than big pile of divs
      return (
        <div className="weightAndTime">
          <div className="weightBlock">
            {weightObject.weight}<span className="units">{unit}s.</span>
          </div>
          <div className="timeBlock">
            <span className="time">{day}/{month}/{year} - {hours}:{minutes}</span>
            <div><TimeAgo datetime={weightObject.date} style={{color:"silver"}}/></div>
          </div>
        </div>)
    }) 
  return <div className="WeightLogDisplay">{weightList}</div>
}


const WeightInput =({changeHandle, weight, submit})=> { 
  return ( 
    <form onSubmit={submit}>
      <input onChange={changeHandle} value={weight}/>
    </form>
  )}




export default WeightLogger
