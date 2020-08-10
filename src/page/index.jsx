import React from 'react';
import axios from 'axios';
import { Radio,Select,Input,Button } from 'element-react';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTds from '../good-ui/good-tds.jsx';

export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{},
      google:'t-10006',
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
    axios.post('good/google.php',data).then((res) => {
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
    axios.post('good/google.php',data).then((res) => {
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
          <GoodBreadbar title="首页信息"></GoodBreadbar>
          <div className="table-default">
            <table className="width-max"> 
              <tr>
                <GoodTds title='标题'></GoodTds>
                <td><Input className="width-400 padding-top-5 padding-bottom-5" value={ data.title } onChange={this.onChange.bind(this,'title')}></Input></td>
              </tr>
              <tr>
                <GoodTds title='关键词'></GoodTds>
                <td><Input className="width-400 padding-top-5 padding-bottom-5" type="textarea" rows={2} value={ data.keywords } onChange={this.onChange.bind(this,'keywords')}></Input></td>
              </tr>
              <tr>
                <GoodTds title='网页描述'></GoodTds>
                <td><Input className="width-400 padding-top-5 padding-bottom-5" type="textarea" rows={4} value={ data.description } onChange={this.onChange.bind(this,'description')}></Input></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <Button type="primary" onClick={ this.submit }>保存修改</Button>
                </td>
              </tr>
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