import React from 'react';
import axios from 'axios';
import { Dialog,Button,Input,Radio,Tag,Switch } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import GoodTag from '../good-ui/good-tag.jsx';
import GoodSearch from '../good-ui/good-search.jsx';
import GoodInput       from '../good-ui/good-input.jsx';
import GoodTextarea       from '../good-ui/good-textarea.jsx';
import GoodSwitch     from '../good-ui/good-switch.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      disabled:false,
      isEdit:false,
      google:'t-10008',
      list: [],
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
      role: "",
      status: "",
    };
  }
  componentDidMount() {
    this.loadList()
  }
  // 数据初始化
  loadList(){
    const data={
      google: this.state.google,
      operating: "lists",
      name: "",
      role: this.state.role,
      status: this.state.status,
      page: this.state.page.currentPage,
      pagesize: this.state.page.pageSize,
    }
    axios.post('good/google.php',data)
      .then((res) => {
         this.setState({
           list:res.data,
         });
      })
  }


  remove=(item,value)=>{
    const data={
        google: this.state.google,
        operating: 'delete',
        id:item.id,
      }
    axios.post('good/google.php',data).then((res) => {
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
      axios.post('good/google.php',data).then((res) => {
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
  

  render() {
    function Tbody(props){
      const { data }=props;

      let dataTable=data && data.map((item,index)=>{
        let url='http://www.good1230.com/dist2/static/images/tianmao.jpg'
        if(item.image!==''){
            url=`http://www.good1230.com/dist/server/images/article/${item.image}`
        }

        let status=item.status==0?false:true;
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
              <span className="a-link pointer margin-right-10">编辑</span>
              <span className="a-link pointer" onClick={props.datas.remove.bind(this,item)}>删除</span>
            </td>
          </tr>
        )
      })
      return <tbody>{dataTable}</tbody>
    }
     
    const typeList={title:'服务类型',type:'role',list:['普通用户','管理员','超级管理员']};
    const statusList={title:'服务类型',type:'status',list:['冻结','正常']};
    const { data }=this.state.list;
    const { total }=this.state.list;

    return (
      <div>
        <GoodBreadbar title="用户管理"></GoodBreadbar>
        <div className="background-white padding-10" style={{'boxShadow':' rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <GoodTag data={ typeList }  type={this.getTag.bind(this)}></GoodTag>
          <GoodTag data={ statusList }  type={this.getTag.bind(this)}></GoodTag>
        </div>
        <div className="padding-10 clearfix">
          <Button className="float-right margin-left-20" type="primary" icon="plus">新增文章</Button>
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
        <GoodPagination data={total}  currentPage={this.getPage.bind(this)}></GoodPagination>
      </div>
    );
  }
}