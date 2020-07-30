import React            from 'react';
import {Select } from 'element-react';
import GoodPagination   from '../good-ui/good-pagination.jsx';
import GoodBreadbar     from '../good-ui/good-breadbar.jsx';
import GoodTotal        from '../good-ui/good-total.jsx';
import GoodTag          from '../good-ui/good-tag.jsx';
import GoodSearch       from '../good-ui/good-search.jsx';
import GoodButton       from '../good-ui/good-button.jsx';
import GoodInput       from '../good-ui/good-input.jsx';
import GoodTextarea       from '../good-ui/good-textarea.jsx';
import axios from 'axios';

import GoodTds       from '../good-ui/good-tds.jsx';
import { Dialog,Button,Input,Radio } from 'element-react';

export default class Log extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible: false,
      value: 0,
      list: []
    };
  }


  /*handleClick() {
    this.setState({dialogVisible: true})
  }*/

   handleClick=()=>{
    this.setState({dialogVisible: true})
  }

  onChange=(value)=>{
    this.setState({ value });
  }

  componentDidMount() {
    axios.get('http://mock-api.com/Ln4LX4nx.mock/winniebloglistdata')
      .then((res) => {
        console.log(res)
      }).catch((res) => {
        console.log(99999999)
      })

    const data={
      email: 'Lucie@163.com',
      google: 't-10000',
      operating: 'select',
      pass: '123456',
    }
    axios.post('vue/google.php',data)
      .then((res) => {
        console.log(res)
      }).catch((res) => {
        console.log(99999999)
      })
  }


  render() {
    function Tbody(props){
      /*fetch('http://www.good1230.com/vue/google.php',{
          method:'POST',
          contentType:"application/json; charset=utf-8",
          body: JSON.stringify({
              email: "Lucie@163.com",
              google: "t-10000",
              operating: "select",
              pass: "123456",
          })

      })
      .then(res=>res.json()
      .then(data=>{console.log(data)}))
      .catch(error=>console.log(error))*/

      const dataTable=[1,2].map((item,index)=>{
        return (
          <tr key={index}>
            <td>内容页轮播图</td>
            <td>code</td>
            <td><i className="fa fa-toggle-on font-size-24 color-on color-success"></i></td>
            <td>
              <span className="a-link pointer margin-right-10" onClick={props.handleClick}>编辑</span>
            </td>
          </tr>
        )
      })
      return <tbody>{dataTable}</tbody>
    }
     
    return (
      <div>
        <GoodBreadbar title="站长统计"></GoodBreadbar>
        
        
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>统计类型</th>
                <th>code</th>
                <th>服务状态</th>
                <th>操作</th>
              </tr>
            </thead>
              <Tbody data={this.props.data} handleClick={this.handleClick} />
          </table> 
        </div>

        {/*分页*/}
        <GoodPagination data={{'total':10000}}></GoodPagination>

          <Dialog
          className="width-600"
          title="cnzz"
          size="tiny"
          visible={ this.state.dialogVisible }
          onCancel={ () => this.setState({ dialogVisible: false }) }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div class="table-default">
                <table class="width-max">
                  <tr>
                    <GoodTds title='统计类型'></GoodTds>
                    <td><GoodInput placeholder="请输入内容" /></td>
                  </tr>
                  <tr>
                    <GoodTds title='服务状态'></GoodTds>
                    <td>
                      <div>
                        <Radio value="1" checked={this.state.value === 0} onChange={this.onChange}>备选项</Radio>
                        <Radio value="2" checked={this.state.value === 1} onChange={this.onChange}>备选项</Radio>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='统计代码'></GoodTds>
                    <td><GoodTextarea placeholder="请输入内容" /></td>
                  </tr>
                </table> 
              </div>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
              <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确定</Button>
            </Dialog.Footer>
          </Dialog>
      </div>
      
    );
  }
}