import { useState, useEffect } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from 'axios'
import Login from './Login'
//import Cal from './calendar/Cal'
//import CalendarView from './calendar/CalendarView'
//import Weather from './Weather'
import styled from 'styled-components'
//import { RightArrow } from '@styled-icons/boxicons-regular/RightArrow'
import { Calendar } from '@styled-icons/boxicons-regular/Calendar'
//import Itinerary from './calendar/Itinerary'

const Events = styled.div`
width: 190px;
margin: 0 auto;
margin-top: 10px;
.h2 {
  margin: 5px 0px;
  padding: 10px 0px;
}
.h5 {
  padding: 5px 0px;
}
&:hover {
    text-decoration: underline;
  }
`
const Arrows = styled.span`
font-size: 10px;
height: 15px;
width: 15px;
`

const SeeCalendar = styled.div`
font-size: 10px;
height: 100px;
width: 100px;
color: #3f51b5
display: flex;
margin: 0 auto;
`

export default function Profile(props) {
    //state is information from the server
    const [message, setMessage] = useState('')
    //hit the auth locked route on the backend
    useEffect(() => {
        const getPrivateMessage = async () => {
            try{
                //get the jwt from local storage 
                const token = localStorage.getItem('jwtToken')
                //make up the auth headers
                const authHeaders = {
                    Authorization: token
                }
                //hit the auth locked endpoint
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, {headers: authHeaders})
                console.log(response.data)
                
                //set state wwith data from the server
                setMessage(response.data.msg)
            }catch(error) {
                console.log(error)
                //log the user out if an error occurs
                props.handleLogout()
            }
        }
        getPrivateMessage()
    },[props])
    
    //redirect if there is no user in state
    if(!props.currentUser) return <Redirect to='/login' component={Login} currentUser= {props.currentUser}/>
    return(
        <div>
            <div className='wwContainer'>
                {/* <Weather /> */}
                <div className="welcomeContainer">

                    <div className="welcome">
                        <h1>Welcome, {props.currentUser.name}👋</h1>
                    </div>



                        <Link to="/calendar">Calendar</Link> 
                        <h5>your email is {props.currentUser.email}</h5>
                            <div>
                                <Events>
                                        <h2>Today's Schedule:</h2>
                                        <br></br>
                                        <Arrows>
                                            {/* <Itinerary /> */}
                                        <SeeCalendar>
                                        <Link to="/calendar"><Calendar color="#3f51b5"/></Link>
                                        </SeeCalendar>
                                        </Arrows>
                                </Events>
                            </div>
                        </div>
                </div>
            </div>
        
    )
}
        
                  
 
