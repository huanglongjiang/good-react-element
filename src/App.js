import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Button,Radio,Loading,Message } from 'element-react';

import 'element-theme-default';
import axios            from 'axios';
import GoodScroll from './good-ui/good-scroll.jsx';

// import logo from './logo.svg';
import './App.css';
import Header from './good-ui/header.jsx';
import Menu from './good-ui/menu.jsx';
import Main from './main.jsx';
import Login from './page/login.jsx';



axios.interceptors.request.use(config => {
	// 列表接口弹出loading图层
   	const requestApi={operating:'lists'}
	if(config.data.operating===requestApi.operating){
		var dom = document.createElement('div');
	        dom.setAttribute('id', 'loading');
	        document.body.appendChild(dom)
	        ReactDOM.render(<Loading fullscreen={false} />, dom)
	}
	if (localStorage.getItem("token")) {  // 判断是否存在X-Authorization，如果存在的话，则每个http header都加上token
        config.headers["token"] ="token"+localStorage.getItem("token");
    };
    return config;
})

axios.interceptors.response.use(res => {

	
	const requestApi=[
		{operating:'login'},
		{operating:'insert'},
		{operating:'update'},
		{operating:'updatePass'},
		{operating:'delete'},
	]
	console.log(res.data.retType)
	requestApi.forEach((item,index)=>{
		if(JSON.parse(res.config.data).operating===item.operating){
			Message({
			    message:res.data.message,
			    type: res.data.retType,
			});
		}
	})

	
	const requestApi2={operating:'lists'}
	if(JSON.parse(res.config.data).operating===requestApi2.operating){
		setTimeout(function(){
			document.body.removeChild(document.getElementById('loading'))
			
		},500)
		
	}
	return res;

	
    
},
error => {
    return Promise.reject('接口请求异常！')
})

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
				<GoodScroll></GoodScroll>
		
		    		<Menu></Menu>
		      	<Main></Main>
	    	</div>
	    }
	    	
	    </div>
    </Router>
  );
}

export default App;
