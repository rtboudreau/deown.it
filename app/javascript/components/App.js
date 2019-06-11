import React from 'react';
import { Route } from 'react-router-dom';
import { Alert } from '../helpers/notifications';
import Feed from './Feed';
import './App.css';

const App = () => (
  <div>
    <Route path="/posts/:id?" component={Feed} />
    <Alert stack={ { limit: 3 } } />
  </div>
);

export default App;
