import React from 'react';
import axios from 'axios';
import { Radio,Select,Input,Button } from 'element-react';
import { global,GoodBreadbar,GoodTds } from '../good-ui';

export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{},
      google:'t-10004',
    }
  }

  componentDidMount() {
    this.loadList()
  }
  // 数据初始化
  loadList(){
    const data={
      google: this.state.google,
      operating: "select",
    }
    axios.post(global.APIPATH,data).then((res) => {
        this.setState({
           form:res.data.data,
        });
    })
  }

  submit=()=>{
    const data={
      google: this.state.google,
      operating: "update",
      form:this.state.form,
    }
    axios.post(global.APIPATH,data).then((res) => {
        console.info(res.data.result)
    })
    
  }
  onChange=(item,value)=>{

    const data={};
          data[item]=value;
    Object.assign(this.state.form,data);

    this.setState({
        form:this.state.form,
      });
  }
  render() {
    const data = this.state.form;
    return (
      <div>
      {
        data ?
        <div>
          <GoodBreadbar title="版权信息"></GoodBreadbar>
          <div className="table-default">
            <table className="width-max"> 
              <tbody>
                <tr>
                  <GoodTds title='版权信息'></GoodTds>
                  <td><Input className="width-400 padding-top-5 padding-bottom-5" type="textarea" rows={4} value={ data.title } onChange={this.onChange.bind(this,'title')}></Input></td>
                </tr>
                <tr>
                  <GoodTds title='版权所有'></GoodTds>
                  <td><Input className="width-400 padding-top-5 padding-bottom-5" type="textarea" rows={2} value={ data.title2 } onChange={this.onChange.bind(this,'title2')}></Input></td>
                </tr>
                <tr>
                  <GoodTds title='版权链接'></GoodTds>
                  <td><Input className="width-400" value={ data.url } onChange={this.onChange.bind(this,'url')}></Input></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <Button type="primary" onClick={ this.submit }>保存修改</Button>
                  </td>
                </tr>
              </tbody>
            </table> 
          </div>
        </div>
        :
        null
      }
      </div>
    );
  }
}