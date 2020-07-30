import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Button,Radio } from 'element-react';

import 'element-theme-default';



// import logo from './logo.svg';
import './App.css';
import Header from './header.jsx';
import Menu from './menu.jsx';
import Main from './main.jsx';
import Login from './page/login.jsx';

function App() {
  // const data=[1,2,3,4,5,6,7,8,9]
  const [token]=[false];
  return (
  	<Router>
	    <div className="App">
	    {
	    	token?<Login></Login>:
	    	<div>
				{

					/*<Header></Header>
		    		<Menu></Menu>*/
				}
				<Header></Header>
		    		<Menu></Menu>
		      	<Main></Main>
	    	</div>
	    }
	    	
	    </div>
    </Router>
  );
}

export default App;
