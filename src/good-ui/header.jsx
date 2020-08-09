import React from 'react';
import axios from 'axios';
import { Dialog,Button,Input,Radio } from 'element-react';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodUpload from '../good-ui/good-uploads.jsx';
import GoodPersonal from '../good-ui/good-personal.jsx';
import GoodLock from '../good-ui/good-lock.jsx';
import GoodInfo from '../good-ui/good-info.jsx';
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data:{},
      fileType:'user',
    	google:'t-10014',
      	dialog: false,
      	dialog2: false,
    };
  }

  componentDidMount() {
    this.loadList();
  }

  loadList(){
    const data={
      google: this.state.google,
      operating: "select",
    }
    
    axios.post('good/google.php',data).then((res) => {
      if(res.data.retType==='success'){
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
    
    axios.post('good/return.php',data).then((res) => {
      console.log(res)
    })
  }

  openDialog=()=>{
  	this.setState({ dialog: true })
  }
  closeDialog=(item)=>{
    this.loadList();
  	this.setState({ dialog: item })
  }

  openDialog2=()=>{
  	this.setState({ dialog2: true })
  }
  closeDialog2=(item)=>{
  	this.setState({ dialog2: item })
  }
 
  render() {
  	console.log(this.state.data.image)
    let img=`good/server/images/${this.state.fileType}/${this.state.data.image}`;
    return (
      <div className="width-max height-60 background-white" style={{'boxShadow':'0 0 1px rgba(0,0,0,0.25)'}}>
		<div className="width-max position-a clearfix line-height-60">

			<span className="color-success float-left font-size-24 bold padding-left-30 padding-right-30" style={{color:'#0084ff'}}><i className="fa fa-yelp"></i>Good1230.com</span>
			<a target="_blank" className="none-line float-left color-333">
				<img src={ img } 
			className="width-30 height-30 margin-top-15 radius-20 float-left" />
				<span className=" margin-left-10">{ this.state.data.name }</span>
        <span className=" margin-left-10 color-ddd font-size-12">({ this.state.data.role==0?'普通用戶':this.state.data.role==1?'管理員':'超級管理员' })</span>
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
              <i className="fa fa-envelope-o font-size-18" style={{color:' rgb(173, 181, 189)'}}></i>
              <div className="position-a left-20" style={{top:'-18px'}}>
                  <GoodInfo data='99+'></GoodInfo>
              </div>
            </li>
		        <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-20 radius-4 float-right position-r radius-20" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
		          <a href="http://good1230.com" target="_blank">
		            <i className="fa fa-bell-o font-size-18" style={{'color': 'rgb(173, 181, 189)'}}></i> 
		            <div class="notify  position-a top-0 right-0">
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