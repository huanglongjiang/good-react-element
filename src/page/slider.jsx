import React from 'react';
import { Dialog,Button,Input,Radio,DateRangePicker,Tag } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import Pagination2 from './pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import GoodTag from '../good-ui/good-tag.jsx';
import GoodSearch from '../good-ui/good-search.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodUpload from '../good-ui/good-upload-slider.jsx';
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
        title:'',
        image:'',
        type:0,
        status:1,
        url:'',
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
      google: "t-10007",
      operating: "lists",
      title: "",
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
  getPage(data){
    console.log(data)
      this.setState({
          page:{currentPage: data, pageSize: 10  }
      },()=> {
        this.loadList();
      });
      
  }
  editData=(item)=>{
    const data={
      google: "t-10007",
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
          google: "t-10007",
          operating: item,
          form:this.state.form,
        }
        
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
    console.log(this.state.form)
    this.setState({
        form:this.state.form,
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
          title:'',
          image:'',
          type:0,
          status:1,
          url:'',
        },
      })
  }

  remove=(item,value)=>{
    const data={
        google: "t-10007",
        operating: 'delete',
        id:item.id,
      }
    axios.post('vue/google.php',data).then((res) => {
       this.loadList();
    })
  }

  updateImage=(item)=>{
    const data={};
          data['image']=item;
    Object.assign(this.state.form,data);
    console.log(this.state.form)
  }
  render() {
    function Tbody(props){
      const { data }=props;
      let dataTable=data && data.map((item,index)=>{
        let url='http://www.good1230.com/dist2/static/images/tianmao.jpg'
        if(item.image!==''){
            url=`http://www.good1230.com/dist/server/images/slider/${item.image}`
        }
        return (
          <tr key={index}>
            <td><img src={url} className="width-400" /></td>
            <td>{ item.title }</td>
            <td>{ item.url }</td>
            <td>{ item.type }</td>
            <td>{ item.status }</td>
            <td>
              <span className="a-link pointer margin-right-10" onClick={props.editData.bind(this,item)}>编辑</span>
              <span className="a-link pointer" onClick={props.remove.bind(this,item)}>删除</span>
            </td>
          </tr>
        )
      })
      return <tbody>{dataTable}</tbody>
    }

    const typeList={title:'服务类型',type:'type',list:['首页','通用轮播图','通用轮播图','栏目页轮播图','内容页轮播图']};
    const statusList={title:'服务类型',type:'status',list:['关闭','开启']};
    const { data }=this.state.list;
    const { total }=this.state.list;
    return (
      <div>
        {/*<Breadbar title="图片轮播"></Breadbar>  
        <Tag list={ typeList } title='服务类型'></Tag>
        <Tag list={ statusList } title='服务状态'></Tag>*/}
        <GoodBreadbar title="图片轮播"></GoodBreadbar> 
        <GoodTag data={ typeList }  type={this.getDatas.bind(this)}></GoodTag>
        <GoodTag data={ statusList }  type={this.getDatas.bind(this)}></GoodTag>
        <div className="padding-10 clearfix">
          {/*<GoodSearch></GoodSearch>*/}
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.handleClick }>新增轮播图</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group panel-6">
            <thead className="block-header">
              <tr>
                <th>图片</th>
                <th>标题</th>
                <th>链接</th>
                <th>类型</th>
                <th>状态</th>
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
          title="新增轮播图"
          size="tiny"
          visible={ this.state.dialogVisible }
          onCancel={ () => this.setState({ dialogVisible: false }) }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div className="table-default">
                <table className="width-max">
                  <tr>
                    <GoodTds title='图片标题'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.title }  onChange={this.handleChange.bind(this,'title')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='链接地址'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.url }  onChange={this.handleChange.bind(this,'url')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='图片类型'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.type == 0} onChange={this.onChange.bind(this,'type')}>通用轮播图</Radio>
                        <Radio value="1" checked={this.state.form.type == 1} onChange={this.onChange.bind(this,'type')}>首页轮播图</Radio>
                        <Radio value="2" checked={this.state.form.type == 2} onChange={this.onChange.bind(this,'type')}>栏目页轮播图</Radio>
                        <Radio value="3" checked={this.state.form.type == 3} onChange={this.onChange.bind(this,'type')}>内容页轮播图</Radio>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='服务状态'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.status == 0} onChange={this.onChange.bind(this,'status')}>关闭</Radio>
                        <Radio value="1" checked={this.state.form.status == 1} onChange={this.onChange.bind(this,'status')}>开启</Radio>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='上传图片'></GoodTds>
                    <td><GoodUpload image={ this.updateImage } url={ this.state.form.image }></GoodUpload></td>
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