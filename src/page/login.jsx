import React            from 'react';
import { Dialog,Button,Input,Radio } from 'element-react';
import GoodButton       from '../good-ui/good-button.jsx';
import axios            from 'axios';
import logo            from '../logo.svg';

export default class Log extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'HLJ@163.com',
      pass: 'long10000',
    };
  }

  onChange=(value)=>{
    console.log(value)
    this.setState({email:value });
  }

  loginClink=()=>{
    const data={
      email: 'HLJ@163.com',
      google: 't-10000',
      operating: 'select',
      pass: 'long10000',
    }
    axios.post('vue/google.php',data)
      .then((res) => {
        console.log(res.data)
      })
  }


  render() {
    
    return (
      <div className="layout position-f" style={{'background':'rgb(255, 255, 255)',width: 600, height: 300, left: '50%',top: '50%', marginLeft: -300, marginTop: -150, opacity: 0.95,boxShadow:' 0 1px 6px 0 rgba(32, 33, 36, .28)'}}>
       <div className="layout  background-eee border-bottom-1 border-ddd">
        <h3 className="font-size-20 color-success font-size-45 padding-10 padding-left-20 bold clearfix"><i className="fa fa-yelp"></i></h3>
       </div> 
       <div id="form">
        <div className="table-default  margin-top-0">
         <table className="width-max padding-20">
          <tbody>
           <tr style={{height: 50}}>
            <td>
             <div className="position-r">
              <i className="fa fa-user font-size-18 position-a top-12 left-15 color-default"></i> 
              <input type="text" placeholder="请输入用户名" value={this.state.email} onChange={this.onChange} className="input-default height-40 line-height-40 font-size-16 width-max text-indent-25" style={{background:'rgb(255, 255, 255)', fontFamily:'georgia',boxShadow:'none',borderRadius:'0',border:0,borderBottom:'1px solid #ddd'}} />
             </div></td>
           </tr> 
           <tr style={{height: 50}}>
            <td>
             <div className="position-r">
              <i className="fa fa-lock font-size-18 position-a top-12 left-15 color-default"></i> 
              <input type="password" placeholder="请输入密码" value={this.state.pass} className="input-default height-40 line-height-40 font-size-16 width-max text-indent-25" style={{background:'rgb(255, 255, 255)', fontFamily:'georgia',boxShadow:'none',borderRadius:'0',border:0,borderBottom:'1px solid #ddd'}} />
             </div></td>
           </tr> 
           <tr style={{height: 80}}>
            <td>
             <div className="button button-success  button-lg width-max" onClick={this.loginClink}>
              登录
             </div>
            </td>
           </tr>
          </tbody>
         </table>
        </div>
       </div>
      </div>
    );
  }
}