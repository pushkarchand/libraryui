import React,{useState, useContext} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {postApi} from '../services/apiservice';
import { Link } from "react-router-dom";
import {stateContext} from '../context';
import {setIsLoading} from '../context/action'



const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  main:{
    height: "100%",
    alignItems: "center",
    display: "flex"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  fields: {
    backgroundColor: '#FFFFFF',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: "absolute"
  },
  signup: {
    margin: theme.spacing(5,0,0)
  },
  formControl:{
    width:"100%"
  }
}));

export default function SignUp({history}) {
  const classes = useStyles();
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [cnumber, setContactNo] = useState('');
  const [inValidEmail, setInValidEmail] = useState('');
  const [roleType, setRoleType] = useState('');
  const [cardDetail, setCardDetail] = useState('');
  const context = useContext(stateContext);

  const registerUser= async (event)=>{
    event.preventDefault();
    try{
        context.dispatch(setIsLoading(true));
        const user={
            FullName:fullName,
            Email:emailId,
            Password:password,
            ContactNumber:cnumber,
            CardDetail:cardDetail,
            RoleType:roleType
          };
        const response= await postApi('SaveUser',user);
        context.dispatch(setIsLoading(false));
        history.push('/login');
    } catch(error){
      context.dispatch(setIsLoading(false));
    }
  }

 const onEmailChange=(event)=> {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value)){
      setInValidEmail("");
    } else {
      setInValidEmail('Invalid Email format');
    }
  }

  const handleChangeInroleType = (event) => {
    setRoleType(event.target.value);
  };

  return (
      <React.Fragment>
            <Container component="main" maxWidth="xs" className={classes.main}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  SignUp
                </Typography>
                <form className={classes.form} onSubmit={registerUser}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="fname"
                        name="Full Name"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="Full Name"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e)=>setFullName(e.target.value)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        className={classes.fields}
                        required
                        fullWidth
                        id="email"
                        placeholder="Email Address"
                        name="email"
                        error={inValidEmail}
                        helperText={inValidEmail}
                        onBlur={onEmailChange}
                        value={emailId}
                        onChange={(e)=>setEmailId(e.target.value)}
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="password"
                        name="Password"
                        type="password"
                        className={classes.fields}
                        variant="outlined"
                        required
                        fullWidth
                        id="Password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                    </Grid>
                   <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        className={classes.fields}
                        required
                        fullWidth
                        id="contact"
                        placeholder="Contact Number"
                        name="contact"
                        autoComplete="cnumber"
                        value={cnumber}
                        onChange={(e)=>setContactNo(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        className={classes.fields}
                        required
                        fullWidth
                        name="cardDetail"
                        placeholder="Card Details"
                        type="text"
                        id="cardDetail"
                        autoComplete="current-cardDetail"
                        value={cardDetail}
                        onChange={(e)=>setCardDetail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={roleType}
                              onChange={handleChangeInroleType}
                              label="User Type"
                            >
                              <MenuItem value={1}>Student</MenuItem>
                              <MenuItem value={2}>Business Owner</MenuItem>
                            </Select>
                          </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    smallSize
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!emailId || !password || !fullName || !roleType || !cnumber}
                  >
                    Sign Up
                  </Button>
                  <Grid container className={classes.signup} justify="flex-end">
                    <Grid item>
                      <Link to="/login">Already have an account? Login</Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
      </React.Fragment>
  );
}