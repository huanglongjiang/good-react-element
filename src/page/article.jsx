import React from 'react';
import axios from 'axios';
import global from '../global';
import { Dialog,Button,Input,Radio,Tag,Switch } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import GoodTag from '../good-ui/good-tag.jsx';
import {Link} from 'react-router-dom'
import GoodSwitch     from '../good-ui/good-switch.jsx';
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      dialogVisible: false,
      disabled:false,
      isEdit:false,
      google:'t-10008',
      list: [],
      list2: [],
      form:{
        id:'',
        name:'',
        email:'',
        status:1,
        role:0,
      },
      page: {
          currentPage: 0,
          pageSize: 10,
      },
      fid: "",
      type: "",
      status: "",
    };
  }
  componentDidMount() {
    this.loadList()
    this.loadList2()
  }
  // 数据初始化
  loadList(){
    const data={
      google: this.state.google,
      operating: "lists",
      name: "",
      fid: this.state.fid,
      type: this.state.type,
      status: this.state.status,
      page: this.state.page.currentPage,
      pagesize: this.state.page.pageSize,
    }
    axios.post(global.APIPATH,data)
      .then((res) => {
         this.setState({
           list:res.data,
         });
      })
  }

  loadList2(){
    const data={
      google: "t-10016",
      operating: "lists",
      type: 2,
    }
    axios.post(global.APIPATH,data)
      .then((res) => {
         this.setState({
           list2:res.data,
         });
      })
  }


  remove=(item,value)=>{
    const data={
        google: this.state.google,
        operating: 'delete',
        id:item.id,
      }
    axios.post(global.APIPATH,data).then((res) => {
       this.loadList();
    })
  }
  // 状态改变方法
  getStatus=(item)=>{

      const data={
          google: this.state.google,
          operating: 'status',
          id:item.id,
          status:item.status,
        }
      axios.post(global.APIPATH,data).then((res) => {
         this.loadList();
      })
      
  }

  //标签方法
  getTag(value,index){
    const data={};
          data[index]=value;
    this.setState(data,()=> {
      this.loadList();
    })
  }

  // 分页方法
  getPage=(data)=>{
    console.log(data)
      this.setState({
          page:{currentPage: data, pageSize: 10  }
      },()=> {
        this.loadList();
      });
      
  }
  onTag=(item)=>{
     // this.props.type(item,this.props.data.type);
      this.setState({fid:item},()=> {
        this.loadList();
      });
  }

  render() {
    function Tbody(props){
      const { data }=props;

      let dataTable=data && data.map((item,index)=>{
        let url='http://www.good1230.com/dist2/static/images/tianmao.jpg'
        if(item.image!==''){
            url=`${global.apiUpdata}/images/article/${item.image}`
        }

        let status=item.status==0?false:true;
        let url2=`article_action?id=${item.id}`;
        return (
          <tr key={index} style={{background: item.status==0 ? "#f5f7fa" : "#fff"}}>
            <td><img src={url} className="width-30" /></td>
            <td>{item.account}</td>
            <td>{item.parentName}</td>
            <td>{item.title}</td>
            <td>{item.updateTime}
            </td>
            <td>
              <GoodSwitch item={item}  status={props.datas.getStatus.bind(this)}></GoodSwitch>
            </td>
            <td>
              <Link to={ url2 } className="none-line"><span className="a-link pointer margin-right-10">编辑</span></Link>
              <span className="a-link pointer" onClick={props.datas.remove.bind(this,item)}>删除</span>
            </td>
          </tr>
        )
      })
      return <tbody>{dataTable}</tbody>
    }
     
    const statusList={title:'自定义属性',type:'type',list:['默认','优质','热门','推荐']};
    const { data }=this.state.list;
    const { total }=this.state.list;
    let dataValue=this.state.fid;

    const data2=this.state.list2.data;

    return (
      <div>
        <GoodBreadbar title="用户管理"></GoodBreadbar>
        <div className="background-white padding-10" style={{'boxShadow':' rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>


        <div className="layout">
          <div className="tag-group border-0 tag-group-type">
          <span className="tag-type inline-block width-100 align-right">栏目：</span> 
          <a className={`tag-block ${dataValue===''?'tag-primary':''}`} onClick={this.onTag.bind(this,'')}>全部</a> 
          {
            data2 && data2.map((item,index)=>{
              return <a key={ index } className={`tag-block ${dataValue===item.id?'tag-primary':''}`} onClick={this.onTag.bind(this,item.id)}>{ item.name }</a>
            })
          }
        </div>
        </div>




          <GoodTag data={ statusList }  type={this.getTag.bind(this)}></GoodTag>
        </div>
        <div className="padding-10 clearfix">
          <Link to="article_action"><Button className="float-right margin-left-20" type="primary" icon="plus">新增文章</Button></Link>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        <div className="table-data padding-20 background-white" style={{'box-shadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>缩略图</th>
                <th>发布作者</th>
                <th>所属栏目</th>
                <th>标题</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
              <Tbody data={data} datas={this} />
          </table> 
        </div>

        {/*分页*/}
        <GoodPagination data={[this,total]}  currentPage={this.getPage.bind(this)}></GoodPagination>
      </div>
    );
  }
}