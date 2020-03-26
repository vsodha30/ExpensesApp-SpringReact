import React from 'react';
import logo from './logo.svg';
import './App.css';
import Category from './components/Category'
import Home from './components/Home'
import Expenses from './components/Expenses'
import {Route, Switch, BrowserRouter} from 'react-router-dom'

class App extends React.Component {
  state = {

  }
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/categories" exact={true} component={Category}/>
          <Route path="/expenses" exact={true} component={Expenses}/>
        </Switch>
      </BrowserRouter>



      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default App;
