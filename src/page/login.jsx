import React            from 'react';
import { Dialog,Button,Input,Radio,Tabs,Message } from 'element-react';
import { withRouter,Router } from "react-router-dom"
import logo             from '../logo.svg';
import global           from '../global';
import GoodButton       from '../good-ui/good-button.jsx';
import axios            from 'axios';

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



  onChange=(item,value)=>{
    const data={};
          data[item]=value;
          Object.assign(this.state.form,data);
          console.log(data)
    this.setState({
        form:this.state.form,
      });
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
      <div id="login" className="position-f width-max height-max left-0 top-0">
      <div className="layout position-f background-white" style={{width: 660, height: 300, left: '50%',top: '50%', marginLeft: -330, marginTop: -180, opacity: 0.95,boxShadow:' 0 1px 6px 0 rgba(32, 33, 36, .28)'}}>
        
       {/*<div className="layout  background-eee border-bottom-1 border-ddd">
        <h3 className="font-size-20 color-success font-size-45 padding-10 padding-left-20 bold clearfix"><i className="fa fa-yelp"></i></h3>
       </div> */}
       <div className="float-left width-300 padding-top-30 height-max background-eee" style={{background:'#20232a'}}>
          <img src={logo} alt=""/>
       </div>
       <div className="float-left width-360 padding-20">



      <Tabs type="card" value="1">
      <Tabs.Pane label="登录" name="1">


             <div id="form">
              <div className="table-default  margin-top-0">
               <table className="width-max">
                <tbody>
                 <tr style={{height: 50}}>
                  <td>
                   <div className="position-r">
                    <i className="fa fa-user font-size-18 position-a top-12 left-15 color-default"></i> 
                   <Input placeholder="账号 / 邮箱登录" value={ this.state.form.email }  onChange={this.onChange.bind(this,'email')} />


                   </div></td>
                 </tr> 
                 <tr style={{height: 50}}>
                  <td>
                   <div className="position-r">
                    <i className="fa fa-lock font-size-18 position-a top-12 left-15 color-default"></i> 
                    <Input type="password" placeholder="请输入密码" value={ this.state.form.pass }  onChange={this.onChange.bind(this,'pass')} />
                   </div></td>
                 </tr> 
                 <tr style={{height: 60}}>
                  <td>
                  <Button className="width-max" type="primary" onClick={this.login.bind(this,'update')}>登录</Button>
                  </td>
                 </tr>
                </tbody>
               </table>
              </div>
             </div>

      </Tabs.Pane>
      <Tabs.Pane label="新用户注册并登录" name="2">


            <div id="form">
              <div className="table-default  margin-top-0">
               <table className="width-max">
                <tbody>
                 <tr style={{height: 50}}>
                  <td>
                   <div className="position-r">
                    <i className="fa fa-user font-size-18 position-a top-12 left-15 color-default"></i> 
                   <Input placeholder="请输入邮箱" value={ this.state.form.email }  onChange={this.onChange.bind(this,'email')} />
                   </div></td>
                 </tr> 
                 <tr style={{height: 50}}>
                  <td>
                   <div className="position-r">
                    <i className="fa fa-lock font-size-18 position-a top-12 left-15 color-default"></i> 
                    <Input type="text" placeholder="请输入用户名" value={ this.state.form.name }  onChange={this.onChange.bind(this,'name')} />
                   </div></td>
                 </tr> 
                 <tr style={{height: 60}}>
                  <td>
                  <Button className="width-max" type="primary" onClick={this.login.bind(this,'insert')}>登录</Button>
                  </td>
                 </tr>
                </tbody>
               </table>
              </div>
             </div>



      </Tabs.Pane>
      </Tabs>
      <span className="a-link font-size-14">登录初始密码为：123456</span>
 </div>
      </div>
      </div>
    );
  }
}

export default withRouter(Login)