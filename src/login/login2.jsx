import React   from 'react';
import axios  from 'axios';
import logo    from '../logo.svg';
import yzm   from './images/yzm.png';
import github    from '../github.svg';
import { withRouter,Router } from "react-router-dom"
import { global } from '../good-ui';
import { Dialog,Button,Input,Radio,Tabs,Message } from 'element-react';
import './css/login2.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      google:'t-10000',
      form:{
        name: '',
        email: '',
        pass: '',
      },
    };
  }



  onChange=(attr,event)=>{
    if(event){
       const data={};
          data[attr]=event.target.value;
          Object.assign(this.state.form,data);
      this.setState({
        form:this.state.form,
      });

    }
   
  }


  login=(item)=>{
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const data={
          google: this.state.google,
          operating: 'login',
          type:item,
          form:this.state.form,
        }
        if(!reg.test(this.state.form.email)){
          Message({
              message:'请输入正确邮箱',
              type: 'info',
          });
          return
        }

       // axios.post('good/google.php',data).then((res) => {
         axios.post(global.APIPATH,data).then((res) => {
          if(res.data.retType==='success'){
            
            localStorage.token = res.data.token;
            localStorage.login =true;
            this.props.history.push("#/index")
            window.location.reload();
           // window.location.href="log";
          }
        })
  }

  render() {
    
    return (
      <div id="login2" className="position-f width-max height-max left-0 top-0">
     
      <div className="width-max top position-r position-a top-0 left-0 " style={{height:'50%',borderBottom:'0px solid #61dafb'}}>
        {
          /*<div className="position-a bottom-0 width-max">

          <svg className="position-a bottom-0 width-max" x="0" y="0" viewBox="0 0 2560 150" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon points="2560 0 2560 150 0 150" class="fill-default"></polygon></svg>
        </div>*/
        }
        {/*<div className="position-a bottom-0 width-max">

          <svg className="position-a bottom-0 width-max" x="0" y="0" viewBox="0 0 2560 150" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon points="2560 0 2560 150 0 150" class="fill-default"></polygon></svg>
        </div>*/}
        
      </div>
    
      <div className="layout position-f " style={{width: 400, height: '560px', left: '50%',top: '50%', marginLeft: -200, marginTop: -280, opacity: 1.95,boxShadow:' 0 0 0 0 rgba(32, 33, 36, .28)',borderBottomRightRadius:'0px'}}>
     
       <div className="float-left width-400 height-auto position-r" style={{borderBottom:'0px solid #61dafb',borderBottomRightRadius:'0px',width:'400px'}}>
<div className="height-200 position-a bottom-0 left-0" style={{borderRight:'0px solid #61dafb'}}></div>
       <div>

        {/*<div className="align-center line-height-30 font-size-24 padding-bottom-60 bold" style={{color:'#8391a5'}}>网站后台管理系统</div>*/}
       </div>
       <div className="line-height-30 font-size-45 padding-bottom-60 bold" style={{color:'#f89c14'}}>hlj designs</div>
      <Tabs type="card" value="1">
      <Tabs.Pane label="登录" name="1">


             <div>
              <div className="table-default  margin-top-0">
               <table style={{width:'400px'}}>
                <tbody>
                 <tr style={{height: 50}}>
                  <td>
                   <div className="position-r radius-3 input-box">
                    <i className="fa fa-envelope font-size-16 position-a top-13 left-15 color-ccc"></i>                    
                    <input type="text" placeholder="账号 / 邮箱登录" defaultValue={ this.state.form.email }  onChange={this.onChange.bind(this,'email')} className="input-default height-40 line-height-40 font-size-16 width-max" />


                   </div></td>
                 </tr> 
                 <tr style={{height: 70}}>
                  <td>
                   <div className="position-r radius-3 input-box">
                    <i className="fa fa-lock font-size-20 position-a top-12 left-15 color-ccc"></i> 
                    
                     <input type="password" placeholder="请输入密码" defaultValue={ this.state.form.pass }  onChange={this.onChange.bind(this,'pass')} className="input-default height-40 line-height-40 font-size-16 width-max" />
                   </div></td>
                 </tr> 
                 <tr style={{height: 'auto'}}>
                  <td>
                    <img src={yzm} className="width-400" />
                  </td>
                 </tr>
                 <tr style={{height: 60}}>
                  <td className="align-center">
                  <button className="width-max button button-lg button-primary height-50" onClick={this.login.bind(this,'update')}>登录</button>
                  </td>
                 </tr>
                </tbody>
               </table>
               {/*<span className="color-ccc font-size-16 inline-block width-max margin-top-30">已登录过的邮箱的初始密码为：123456</span>*/}
              </div>

             </div>
              
      </Tabs.Pane>
      <Tabs.Pane label="新用户登录" name="2">


            <div>
              <div className="table-default  margin-top-0">
               <table>
                <tbody>
                 <tr style={{height: 50}}>
                  <td>
                   <div className="position-r  radius-3 input-box">
                    <i className="fa fa-envelope font-size-16 position-a top-13 left-15 color-ccc"></i> 
                   
                   <input type="text" placeholder="请输入邮箱" defaultValue={ this.state.form.email }  onChange={this.onChange.bind(this,'email')} className="input-default height-40 line-height-40 font-size-16 width-max" />
                   </div></td>
                 </tr> 
                 <tr style={{height: 70}}>
                  <td>
                   <div className="position-r  radius-3 input-box">
                    <i className="fa fa-user font-size-20 position-a top-12 left-15 color-ccc"></i> 
                    <input type="text" placeholder="请输入用户名" defaultValue={ this.state.form.name }  onChange={this.onChange.bind(this,'name')} className="input-default height-40 line-height-40 font-size-16 width-max" />
                    
                   </div></td>
                 </tr> 
                 <tr style={{height: 'auto'}}>
                  <td>
                    <img src={yzm} className="width-400" />
                  </td>
                 </tr>

                 <tr style={{height: 60}}>
                  <td>
                  <button className="width-max button button-lg button-primary height-50" onClick={this.login.bind(this,'insert')}>登录</button>
                  </td>
                 </tr>
                </tbody>
               </table>
              </div>
             </div>



      </Tabs.Pane>
      </Tabs>
      
 </div>
 <div className="clear"></div>
     <div className="padding-top-36 line-height-20 align-center font-size-16 margin-top-0">
        
        <a className="inline-block none-line" href="http://good1230.com" target="_blank">
          <i className="fa fa-home font-size-20  float-left color-999" style={{color:'#555'}}></i>
          <span className="padding-left-5 color-999" style={{color:'#555'}}>Home</span>
        </a>
        <a className="inline-block margin-left-30 none-line" href="https://github.com/huanglongjiang/good-react-element" target="_blank">
          {/*<img className="width-20  float-left"  src={github} />*/}
          <i className="fa fa-github font-size-20  float-left color-999" style={{color:'#555'}}></i>
          <span className="padding-left-5 color-999" style={{color:'#555'}}>Github</span>
        </a>
      </div>
      </div>

      </div>
    );
  }
}

export default withRouter(Login)