import React from 'react';
import axios from 'axios';
import { Dialog,Button,Input } from 'element-react';
import GoodTds from '../good-ui/good-tds.jsx';
import GoodUpload from '../good-ui/good-uploads.jsx';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgType:'u1',
      fileType:'user',
      google:'t-10014',
      list:[],
        dialogVisible: false,
        form:{
          id:'',
          account:'',
          name:'',
          email:'',
          image:'',
          role:'',
        },
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
           form:res.data.data,
         });
        }
    })
  }

  submit=()=>{
    const data={
      google: this.state.google,
      operating: "update",
      form:this.state.form,
    }
    axios.post('good/google.php',data).then((res) => {
      if(res.data.retType==='success'){
        this.props.data.closeDialog(false,'submit')
      }
    })
    
  }

  onChange=(item,value)=>{
    const data={};
          data[item]=value;
    let newForm=Object.assign(this.state.form,data);

    this.setState({
        form:newForm,
      });
  }
  
  cancel=(item)=>{
    this.props.data.closeDialog(false)
  }

  updateImage=(item)=>{
    const data={};
          data['image']=item;
    Object.assign(this.state.form,data);
  }
  render() {
    let dialog=this.props.data.state.dialog
    let role=this.state.form.role==0?'普通用户':this.state.form.role==1?'管理员':'超级管理员';
    return (
    <Dialog
          className="width-600"
          title="个人资料"
          size="tiny"
          visible={ dialog }
          onCancel={ this.cancel }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div class="table-default">
                <table class="width-max">
                  <tr>
                    <GoodTds title='用户账号'></GoodTds>
                    <td><Input value={ this.state.form.account } disabled /></td>
                  </tr>
                  <tr>
                    <GoodTds title='用户邮箱'></GoodTds>
                    <td><Input value={ this.state.form.email } disabled /></td>
                  </tr>
                  <tr>
                    <GoodTds title='用户角色'></GoodTds>
                    <td><Input value={ role } disabled /></td>
                  </tr>
                  <tr>
                    <GoodTds title='用户名称' required></GoodTds>
                    <td><Input value={ this.state.form.name } onChange={this.onChange.bind(this,'name')} placeholder="请输入内容" /></td>
                  </tr>
                  <tr>
                  <GoodTds title='头像'></GoodTds>
                  <td><GoodUpload data={ this }></GoodUpload></td>
                </tr>
                </table> 
              </div>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button onClick={ this.cancel }>取消</Button>
              <Button type="primary" onClick={ this.submit }>确定</Button>
            </Dialog.Footer>
          </Dialog>
    );
  }
}