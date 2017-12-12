import React, { Component } from 'react';
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar';
import Menu from './components/Menu';
import Dish from './components/Dish';
import DishForm from './components/DishForm';
import { Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

const App = () => (
  <Segment basic>
    <NavBar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/menu' component={Menu} />
      <Route exact path='/dish/:id' component={Dish} />
      <Route exact path='/dish/:id.edit' component={DishForm} />
    </Switch>
  </Segment>
)


export default App;
