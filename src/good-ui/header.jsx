import React from 'react';
import axios from 'axios';
import { Dialog,Button,Input,Radio } from 'element-react';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodUpload from '../good-ui/good-uploads.jsx';
import GoodPersonal from '../good-ui/good-personal.jsx';
import GoodLock from '../good-ui/good-lock.jsx';
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
      console.log(res)
       this.setState({
         data:res.data.data,
       });
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

			<span className="color-success float-left font-size-24 bold padding-left-30 padding-right-30"><i className="fa fa-yelp"></i>goodCms</span>
			<a target="_blank" className="none-line float-left color-333">
				<img src={ img } 
			className="width-30 height-30 margin-top-15 radius-20 float-left" />
				<span className=" margin-left-20">{ this.state.data.name }</span>
			</a>
			

			<div className="layout float-right height-60 padding-15">
				<li className="float-right"><img src="http://www.good1230.com/dist2/static/images/cn.svg" alt="" className="width-40 margin-right-20 position-r" style={{top:"-4px"}} /></li>
		        <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-20 radius-4 float-right position-r radius-20 pointer" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
		          <i className="fa fa-sign-in font-size-18" style={{color:' rgb(173, 181, 189)'}}></i>
		        </li>
		        <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-10 radius-4 float-right position-r radius-20 pointer" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
		          <i className="fa fa-lock font-size-18" style={{color:' rgb(173, 181, 189)'}} onClick={ this.openDialog2 }></i>
		        </li>
		        <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-10 radius-4 float-right position-r radius-20 pointer" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
		          <i className="fa fa-user font-size-18" style={{color:' rgb(173, 181, 189)'}} onClick={ this.openDialog }></i>
		        </li>
		        <li className="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-10 margin-right-20 radius-4 float-right position-r radius-20" style={{'color':'rgb(173, 181, 189); top: -3px'}}>
		          <a href="http://www.100sucai.com/html/info.html" target="_blank">
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