import React            from 'react';
import { Dialog,Button,Input,Radio } from 'element-react';
import GoodButton       from '../good-ui/good-button.jsx';
import axios            from 'axios';
import logo            from '../logo.svg';

export default class Log extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      google:'t-10000',
      form:{
        email: 'admin',
        pass: '123456',
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


  login=()=>{
        const data={
          google: this.state.google,
          operating: 'login',
          form:this.state.form,
        }
        
        axios.post('good/google.php',data).then((res) => {
          if(res.data.retType==='success'){
            localStorage.token = res.data.token;
            localStorage.login =true;
            window.location.href="log";
          }
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
           <tr style={{height: 80}}>
            <td>
             <div className="button button-success  button-lg width-max" onClick={this.login}>
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