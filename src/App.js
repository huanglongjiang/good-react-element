import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Button,Radio,Loading,Message } from 'element-react';
import 'element-theme-default';
import './App.css';
import GoodScroll from './good-ui/good-scroll.jsx';
import Header from './good-ui/header.jsx';
import Footer from './good-ui/footer.jsx';
import Menu from './good-ui/menu.jsx';
import Main from './main.jsx';
import Login from './page/login.jsx';

let aa=77

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
		{operating:'status'},
		{operating:'resetPassword'},
	]

	if(res.data.retType==='failed'){
		localStorage.login =false;
		Message({
		    message:res.data.message,
		    type: 'success',
		});
		setTimeout(()=>{
			window.location.href='/login';
			return
		},2000)
      	
	}

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
  const token=localStorage.getItem("login");
  return (
  	<Router>
	    <div className="App">
	    {

	    	token==='true'?
	    	<div>
				{
					/*<Header></Header>
		    		<Menu></Menu>*/
				}
				<GoodScroll></GoodScroll>
				<div style={{minHeight:'800px'}}>
					<Header></Header>
		    		<Menu></Menu>
			      	<Main></Main>
		      	</div>
		      	<Footer></Footer>
	    	</div>:
	    	<Login></Login>
	    }
	    	
	    </div>
    </Router>
  );
}

export default App;
