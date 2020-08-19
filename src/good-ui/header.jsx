import React from 'react';
import axios from 'axios';
import store from '../store/index.js'
import { changeInputAction } from '../store/actionCreators'
import global from '../global';
import { Dialog,Button,Input,Radio } from 'element-react';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodUpload from '../good-ui/good-uploads.jsx';
import GoodPersonal from '../good-ui/good-personal.jsx';
import GoodLock from '../good-ui/good-lock.jsx';
import GoodInfo from '../good-ui/good-info.jsx';
import { HashRouter as Router, Route, Link } from "react-router-dom"
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:store.getState(),
    	data:{},
      fileType:'user',
    	google:'t-10014',
      	dialog: false,
      	dialog2: false,
    };
    store.subscribe(this.storeChange) //订阅Redux的状态
  }

  componentDidMount() {
    this.loadList();
  }
  storeChange=()=>{
       this.setState(store.getState())
  }
  loadList(){
    const data={
      google: this.state.google,
      operating: "select",
    }
    
    axios.post(global.APIPATH,data).then((res) => {
      if(res.data.retType==='success'){

        const action = changeInputAction(res.data)
        store.dispatch(action)

        this.setState({
          data:res.data.data,
        });
      }
    })
  }

  logout(){
    const data={
      operating: "select",
    }
    
    axios.post(global.apiReturn,data).then((res) => {
      console.log(res)
    })
  }

  openDialog=()=>{
  	this.setState({ dialog: true })
  }
  closeDialog=(item,type)=>{
    if(type){
      this.loadList();
    }
  	this.setState({ dialog: item })
  }

  openDialog2=()=>{
  	this.setState({ dialog2: true })
  }
  closeDialog2=(item)=>{
  	this.setState({ dialog2: item })
  }
 
  render() {
  	
    let img='http://www.good1230.com/dist2/static/images/tianmao.jpg'
        if(this.state.data.image!==''&&this.state.data.image!==undefined){
            img=`${global.apiUpdata}/images/${this.state.fileType}/${this.state.data.image}`;
        }
    return (
      <div className="width-max height-60 background-333" style={{'boxShadow':'0 0 1px rgba(0,0,0,0.25)',background:'#20232a'}}>
		<div className="width-max position-a clearfix line-height-60">

			<span className="color-success float-left font-size-24 bold padding-left-30 padding-right-30" style={{color:'#999'}}><i className="fa fa-yelp"></i>good1230.com</span>
			<a target="_blank" className="none-line float-left color-999">
				<img src={ img } 
			className="width-30 height-30 margin-top-15 radius-20 float-left" />
				<span className=" margin-left-10">{ this.state.data.name }</span>
        <span className=" margin-left-10 color-999 font-size-12">({ this.state.data.role==0?'普通用戶':this.state.data.role==1?'管理员':'超級管理员' })</span>
			</a>
			

			<div className="layout float-right height-60 padding-15">
	          <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-20 radius-4 float-right position-r radius-20 pointer" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
		          <i className="fa fa-sign-in font-size-18" style={{color:' rgb(173, 181, 189)'}} onClick={ this.logout }></i>
		        </li>
		        <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-10 radius-4 float-right position-r radius-20 pointer" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
		          <i className="fa fa-lock font-size-18" style={{color:' rgb(173, 181, 189)'}} onClick={ this.openDialog2 }></i>
		        </li>
		        <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-10 radius-4 float-right position-r radius-20 pointer" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
              <i className="fa fa-user font-size-18" style={{color:' rgb(173, 181, 189)'}} onClick={ this.openDialog }></i>
            </li>
            <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-10 radius-4 float-right position-r radius-20" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
              <Router>
              <Link to="bbs" className="margin-left-10">
              <i className="fa fa-envelope-o font-size-18" style={{color:' rgb(173, 181, 189)'}}></i>
              
              <div className="position-a left-20" style={{top:'-18px'}}>
                  <GoodInfo data={ this.state.userInfo.bbs_total }></GoodInfo>
              </div>
              </Link>
              </Router>
            </li>
		        <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-20 radius-4 float-right position-r radius-20" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
		          <a href="http://good1230.com" target="_blank">
		            <i className="fa fa-bell-o font-size-18" style={{'color': 'rgb(173, 181, 189)'}}></i> 
		            <div className="notify  position-a top-0 right-0">
		              <span className="ring  position-a top-0 right-0"></span> 
		              <span className="ring-point background-danger position-a top-0 right-0 color-white radius-20"></span>
		            </div>
		          </a>
		        </li>
		    </div>
		</div>
		<GoodPersonal data={ this }></GoodPersonal>
		<GoodLock data={ this }></GoodLock>
      </div>
    );
  }
}