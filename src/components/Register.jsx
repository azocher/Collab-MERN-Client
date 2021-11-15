import React from 'react';
import { useState } from "react"
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from "react-router-dom"
import Profile from './Profile'
import Title from './Title'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Register(props) {
    const classes = useStyles();
    //state for the controlled form
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //state for the flash message from the server
    const [message, setMessage] = useState('')

    //function to handle form submission
    const handleSubmit = async e => {
        try{
            e.preventDefault()
            //make a request body
            const requestBody = {
                name: name,
                email: email,
                password: password
            }
            //post registration data to the server
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, requestBody)
            //take the token out of the response
            const { token } = response.data
            //set token in local storage
            localStorage.setItem('jwtToken', token)
            //decode the token
            const decoded = jwt.decode(token)
            //set the user in the app.js state
            props.setCurrentUser(decoded)
        }catch(error) {
            //set message if the error is a 400
            if(error.response.status === 400){
                setMessage(error.response.data.msg)
            } else {
                console.log(error)
            }
        }
        console.log('submit the form! 🌽')
    }

    //redirect if the user is logged in
    if(props.currentUser) return <Redirect to="/profile" component= {Profile} currentUser={props.currentUser}/>
    return(
        <div className ='container'>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Title />
          <Typography component="h1" variant="h5">
            Enter Your Information Below to Sign Up!
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  // required
                  // fullWidth
                  id="firstName"
                  label="First Name"
                  //autoFocus
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={e => setName(e.target.value)}
                  value={name}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField 
                    id='email-input' 
                    type='email' 
                    placeholder="user@domain.com"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    //variant="outlined"
                    required
                    //fullWidth
                    //label="Email Address"
                    //name="email"
                    //autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  id="password-input"
                  type="password"
                  placeholder='password'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  //variant="outlined"
                  required
                  //fullWidth
                  //name="password"
                  //label="Password"
                  //type="password"
                  //autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              //fullWidth
              //variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up!
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      
            <p>{message}</p>

         <form onSubmit= {handleSubmit}>

              {/* <label htmlFor='name-input'>Name:</label>
               <input   
                    id='name-input'
                    type='text'
                    placeholder="enter your name user ..."
                    onChange={e => setName(e.target.value)}
                    value= {name}
               />

               <label htmlFor='email-input'>Name:</label>
               <input
                    id='email-input'
                    type='email'
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)}
                    value= {email}
               />

               <label htmlFor='password-input'>Name:</label>
               <input
                    id='password-input'
                    type='password'
                    placeholder="desired password"
                    onChange={e => setPassword(e.target.value)}
                    value= {password}
               />

                <input 
                    type='submit'
                    value='make new account' */}

                {/* /> */}
           </form>
    </div>
    )
}