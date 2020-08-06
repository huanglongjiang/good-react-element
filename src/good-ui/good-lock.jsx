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
          passOld:'',
          passNew:'',
        },
    };
  }

  submit=()=>{
    const data={id:this.props.data.state.data.id};
    Object.assign(this.state.form,data);
    this.setState({form:this.state.form},()=>{
      const data={
        google: this.state.google,
        operating: "updatePass",
        form:this.state.form,
      }
     
      axios.post('vue/google.php',data).then((res) => {
        if(res.data.retType==='success'){
          this.props.data.closeDialog2(false)
        }
      })
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
    this.props.data.closeDialog2(false)
  }


  render() {
    let dialog=this.props.data.state.dialog2

    return (
    <Dialog
          className="width-600"
          title="修改密码"
          size="tiny"
          visible={ dialog }
          onCancel={ this.cancel }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div class="table-default">
                <table class="width-max">
                  <tr>
                    <GoodTds title='旧密码'></GoodTds>
                    <td><Input value={ this.state.form.passOld } onChange={this.onChange.bind(this,'passOld')} placeholder="请输入内容" /></td>
                  </tr>
                  <tr>
                    <GoodTds title='新密码'></GoodTds>
                    <td><Input value={ this.state.form.passNew } onChange={this.onChange.bind(this,'passNew')} placeholder="请输入内容" /></td>
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