import React from 'react';
import { useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import Title from './Title'
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
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

export default function Login(props) {
    
    const classes = useStyles();
    //state for the controlled form
        const[email, setEmail] = useState('')
        const[password, setPassword] = useState('')
        //state for flash messages from the server
        const[message, setMessage] = useState('')

        const handleSubmit = async (e) => {
            try{
                e.preventDefault()
                console.log('do axios call!')

                //post to backend with axios
                const requestBody = {
                    email: email,
                    password: password
                }
                console.log('server url:', process.env.REACT_APP_SERVER_URL )
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, requestBody)
                
                console.log(response)

                //destructure the response
                const { token } = response.data

                //save the response to local storage
                localStorage.setItem('jwtToken', token)

                //decode the jwt token before we put it in state
                const decoded = jwt.decode(token)

                //set the user in app.js's state
                props.setCurrentUser(decoded)

            }catch(error) {
              if(error.response.status === 400){
                setMessage(error.response.data.msg)
              } else {
                  console.log(error)
              }
            }
        }

        if(props.currentUser) return <Redirect to="/profile" component= {Profile} currentUser={ props.currentUser } />

    return(
        <div className ='container'>
        <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
            <Title />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                    id='email-input' 
                    type='email' 
                    placeholder="user@domain.com"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  id="password-input"
                  type="password"
                  placeholder='password'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Register" variant="body2">
                  Don't have an account? Sign up!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      </div>
    );  
}