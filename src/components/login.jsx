import React,{useState,useContext} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {login} from '../services/apiservice';
import {stateContext} from '../context';
import {setIsAuthenticated, setIsLoading} from '../context/action';

// Styles for the login component
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  main:{
      height: "100%",
      alignItems: "center",
      display: "flex",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  fields: {
    backgroundColor: '#FFFFFF'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: "absolute"
  },
  signupmessage: {
    margin: theme.spacing(5,0,0)
  },
  signup: {
    margin: theme.spacing(0,0,0,1),
    padding: 7,
    borderLeft: "1px solid #FFFFFF"
  }
}));

export default function SignIn({ history }) {
  // variable declartion like email, password and invalid password
  const classes = useStyles();
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [inValidEmail, setInValidEmail] = useState('');
  const context = useContext(stateContext);


  /**
   * Method to login user with the given password and emailId
   * @param {*} e 
   */
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
        context.dispatch(setIsLoading(true));
        const url= `ValidateUserLogin?email=${emailId}&password=${password}`;
        const response= await login(url);
        localStorage.setItem('accessToken',response.token);
        localStorage.setItem('userId',response.userId);
        localStorage.setItem('role',response.roleType);
        localStorage.setItem('userCode',response.userCode);
        context.dispatch(setIsAuthenticated(true));
        history.push('/')
        context.dispatch(setIsLoading(false));
    } catch(error){
      context.dispatch(setIsLoading(false));
    }
  }

  /**
   * Method to set change in password
   * @param {*} event 
   */
  const changeInPassword=(event)=>{
      setPassword(event.target.value)
  }

  /**
   * Methof to set change in email
   * @param {*} event 
   */
  const changeInEmailId=(event)=>{
    setEmailId(event.target.value)
  }

  /**
   * Method to validate email
   * @param {*} event 
   */
  const onEmailChange=(event)=> {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value)){
      setInValidEmail("");
    } else {
      setInValidEmail('Invalid Email format');
    }
  }

  return (
      <React.Fragment>
          <Container component="main" maxWidth="xs" className={classes.main}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {/* Login form */}
              <form className={classes.form} onSubmit={handleSubmit}>
                {/* Email input field */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      className={classes.fields}
                      required
                      fullWidth
                      id="email"
                      placeholder="Email Address"
                      name="email"
                      autoComplete="email"
                      value={emailId}
                      error={inValidEmail}
                      helperText={inValidEmail}
                      onChange={changeInEmailId}
                      onBlur={onEmailChange}
                    />
                  </Grid>
                  {/* Password input field */}
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      className={classes.fields}
                      required
                      fullWidth
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={changeInPassword}
                    />
                  </Grid>
                </Grid>
                {/* Button to submit and login */}
                <Button
                  type="submit"
                  // fullWidth
                  smallSize
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                {/* Link to route to signup screen */}
                <Grid container className={classes.signupmessage} justify="flex-end">
                  <Grid item>
                    <Link className={classes.signup} to="/signup">Create New Account</Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
      </React.Fragment>
  );
}