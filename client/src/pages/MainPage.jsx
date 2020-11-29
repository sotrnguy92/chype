import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CustomNavbar from '../components/Navbar';
import LoggedInUserCard from '../components/LoggedInUserCard'
import { Container } from '@material-ui/core';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";


const socket = io();



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign:"center"
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MainPage() {
  const classes = useStyles();

  const [userData, setUserData] = useState({user: '', message: ''});
  const [chat, setChat] = useState([])



  useEffect(() => {
    console.log("I am firing in useeffect!!" );
    socket.on("serverToClientMessage", ({user, message}) => {
      setChat([...chat, {user, message}]);
      console.log('inside of useEffect ', chat);
    });

  },[]);

  const onTextChange = e => {
    setUserData({...userData, [e.target.name]: e.target.value})
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const {user, message} = userData;
    console.log('inside of on submit', chat)
    socket.emit("clientToServerMessage", {user, message});
    setUserData({user, message: ''});
  }

  const renderChat = () =>{
    return chat.map(({user, message}, index) => (
      <div key={index}>
        <h3>
          {user}: <span>{message}</span>
        </h3>
      </div>
    ))
  }




  return (
    <>
    <div className={classes.root}>
      <CustomNavbar/>
      <Grid container spacing={3}>
         <Grid item xs={3}>
          <Paper className={classes.paper}>
          <LoggedInUserCard />

          </Paper>
        </Grid>
        <Grid item xs={9}>
          {/* <Paper className={classes.paper}>xs=3</Paper> */}
          <Container>
            <div className="card">
              <form onSubmit={onMessageSubmit}>
                <h1> Messenger </h1>
                <div className="name-field">
                  <TextField
                      name = 'user'
                      onChange = {e => onTextChange(e)}
                      value = {userData.user}
                      label = "Name"
                  />
                </div>
                <div >
                  <TextField
                      name = 'message'
                      onChange = {e => onTextChange(e)}
                      value = {userData.message}
                      label = "Message"
                  />
                </div>
                <button type={"submit"}>Send Message</button>
              </form>
            </div>

            <div className='render-chat'>
              <h1>Chat Log</h1>
              <div key={2000}>
                <h3>
                  Son: <span>first test message</span>
                </h3>
              </div>
              {renderChat()}
            </div>

          </Container>
        </Grid>

      </Grid>
    </div>
    </>
  );
}