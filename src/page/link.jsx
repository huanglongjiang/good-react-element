import React from 'react';
import { Dialog,Button,Input,Radio,DateRangePicker } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import Pagination2 from './pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import GoodTag from '../good-ui/good-tag.jsx';
import GoodSearch from '../good-ui/good-search.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
import axios from 'axios';

import GoodButton from '../good-ui/good-button.jsx';
export default class Log extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      disabled:false,
      isEdit:false,
      list: [],
      value1: null, 
      form:{
        id:'',
        name:'',
        email:'',
        link:'',
        price:'',
        text:'',
        starttime:'2021-01-09',
        endtime:'2025-01-23',
        status:1,
        type:0,
      },
      page: {
          currentPage: 0,
          pageSize: 10,
      },
      type: "",
      status: "",
    };
  }
  componentDidMount() {
    this.loadList()
  }
  // 数据初始化
  loadList(){
    const data={
      google: "t-10002",
      operating: "lists",
      //name: "",
      type: this.state.type,
      status: this.state.status,
      page: this.state.page.currentPage,
      pagesize: this.state.page.pageSize,
    }
    axios.post('vue/google.php',data)
      .then((res) => {
         this.setState({
           list:res.data,
         });
      })
  }

  getDatas(value,index){
    const data={};
          data[index]=value;
    this.setState(data,()=> {
      this.loadList();
    })
  }
  getPage=(data)=>{
    console.log(data)
      this.setState({
          page:{currentPage: data, pageSize: 10  }
      },()=> {
        this.loadList();
      });
      
  }
  editData=(item)=>{
    const data={
      google: "t-10002",
      operating: "select",
      id: item.id,
      status:item.status,
    }
    this.setState({dialogVisible: true,disabled: true,isEdit: true},()=> {

      axios.post('vue/google.php',data)
      .then((res) => {
         this.setState({
           form:res.data.data,
         });
      })
    })
  }
  upData=(item)=>{
      this.setState({dialogVisible: false},()=> {

        const data={
          google: "t-10002",
          operating: item,
          form:this.state.form,
        }
        
        console.log(data)

        axios.post('vue/google.php',data).then((res) => {
          this.loadList();
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

  handleChange=(item,value)=>{
    const data={};
          data[item]=value;
    let newForm=Object.assign(this.state.form,data);
    this.setState({
        form:newForm,
      });
    console.log(this.state.form)
  }
  handleClick=(data)=>{
    this.setState({
        dialogVisible: true,
        disabled: false,
        isEdit: false,
        form:{
          id:'',
          name:'',
          email:'',
          link:'',
          price:'',
          text:'',
          starttime:'2021-01-09',
          endtime:'2025-01-23',
          status:1,
          type:0,
        },
      })
  }

  render() {
    function Tbody(props){
      const { data }=props;
      let dataTable=data && data.map((item,index)=>{
        return (
          <tr key={index}>
            <td>{ item.name }</td>
            <td>{ item.link }</td>
            <td>{ item.email }</td>
            <td>{ item.price }元/月×6</td>
            <td>{ item.starttime }</td>
            <td>{ item.endtime }</td>
            <td>{ item.type }</td>
            <td>{ item.status }</td>
            <td>
              <span className="a-link pointer margin-right-10" onClick={props.editData.bind(this,item)}>编辑</span>
              <span className="a-link pointer">删除</span>
            </td>
          </tr>
        )
      })
      return <tbody>{dataTable}</tbody>
    }
    
    

    const typeList={title:'服务类型',type:'type',list:['友情链接','友情链接2','全站链接','合作伙伴','服务结束']};
    const statusList={title:'服务类型',type:'status',list:['关闭','开启']};


    const { data }=this.state.list;
    const { total }=this.state.list;
    const {value1, value2} = this.state;

    return (
      <div>
        <GoodBreadbar title="友情链接"></GoodBreadbar>
       
        <GoodTag data={ typeList }  type={this.getDatas.bind(this)}></GoodTag>
        <GoodTag data={ statusList }  type={this.getDatas.bind(this)}></GoodTag>
        
        <div className="padding-10 clearfix">
          {/*<GoodSearch></GoodSearch>*/}
          {/*<GoodButton title='搜索' goodclass='float-left margin-left-20'></GoodButton>*/}
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.handleClick }>新增友情链接</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        <div className="table-data padding-20 background-white" style={{'box-shadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>网站名称</th>
                <th>网址</th>
                <th>用户邮箱</th>
                <th>链接价格</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>类型</th>
                <th>服务状态</th>
                <th>操作</th>
              </tr>
            </thead>
              <Tbody data={data} editData={this.editData} remove={this.remove} />
          </table> 
        </div>

        {/*分页*/}
        <GoodPagination data={total}  currentPage={this.getPage.bind(this)}></GoodPagination>
        <Dialog
          className="width-600" style={{width:800}}
          title="新增友情链接"
          size="tiny"
          visible={ this.state.dialogVisible }
          onCancel={ () => this.setState({ dialogVisible: false }) }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div className="table-default">
                <table className="width-max">
                  <tr>
                    <GoodTds title='网站名称'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.name }  onChange={this.handleChange.bind(this,'name')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='网站地址'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.link }  onChange={this.handleChange.bind(this,'link')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='用户邮箱'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.email }  onChange={this.handleChange.bind(this,'email')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='服务类型'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.type == 0} onChange={this.onChange.bind(this,'type')}>友情链接</Radio>
                        <Radio value="1" checked={this.state.form.type == 1} onChange={this.onChange.bind(this,'type')}>友情链接2</Radio>
                        <Radio value="2" checked={this.state.form.type == 2} onChange={this.onChange.bind(this,'type')}>全站链接</Radio>
                        <Radio value="3" checked={this.state.form.type == 3} onChange={this.onChange.bind(this,'type')}>合作伙伴</Radio>
                        <Radio value="4" checked={this.state.form.type == 4} onChange={this.onChange.bind(this,'type')}>服务结束</Radio>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='用户类型'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.status == 0} onChange={this.onChange.bind(this,'status')}>关闭</Radio>
                        <Radio value="1" checked={this.state.form.status == 1} onChange={this.onChange.bind(this,'status')}>开启</Radio>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='服务时间'></GoodTds>
                    <td>
                      <div>
                        <DateRangePicker
                          value={value1}
                          placeholder="选择日期范围"
                          onChange={date=>{
                            this.setState({value1: date})
                            console.log(date)
                          }}
                          />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='价格'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.price }  onChange={this.handleChange.bind(this,'price')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='备注'></GoodTds>
                    <td><Input className="width-max" type="textarea" rows={6} placeholder="请输入内容" value={ this.state.form.text }  onChange={this.handleChange.bind(this,'text')} /></td>
                  </tr>
                </table> 
              </div>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
              {
                this.state.isEdit?
                <Button type="primary" onClick={ this.upData.bind(this,'update') }>确定-编辑</Button>:
                <Button type="primary" onClick={ this.upData.bind(this,'insert') }>确定-新增</Button>
              }
            </Dialog.Footer>
          </Dialog>
      </div>
      
    );
  }
}