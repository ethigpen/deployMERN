import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React, { useState } from 'react';
import ShowAll from './components/ShowAll';
import ShowOne from './components/ShowOne';
import PetForm from './components/PetForm';
import EditPet from './components/EditPet';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>Pet Shelter</h1>
        <Switch>
          <Route exact path="/">
    <ShowAll></ShowAll>
          </Route>
          <Route exact path="/pets/new">
            <PetForm></PetForm>
          </Route>
          <Route exact path = "/pets/:id">
            <ShowOne></ShowOne>
          </Route>
          <Route exact path = "/pets/:id/edit">
            <EditPet></EditPet>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
