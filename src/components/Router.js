import React, { useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Profile from '../routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import ChatRoom from '../routes/ChatRoom';
import Navigtaion from './Navigation';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  const [chat, setChat] = useState(false);

  return (
    <Router>
      <div>
        {isLoggedIn && (
          <Navigtaion userObj={userObj} chat={chat} setChat={setChat} />
        )}
      </div>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile refreshUser={refreshUser} userObj={userObj} />
            </Route>
            <Route exact path="/chatroom">
              <ChatRoom refreshUser={refreshUser} userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
