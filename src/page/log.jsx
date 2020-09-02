import React from 'react';
import axios from 'axios';
import global  from '../global';
import { Tag } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';

export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: {
          currentPage: 0,
          pageSize: 10,
      },
    };
  }

  componentDidMount() {
    this.loadList()
  }
  // 数据初始化
  loadList(){
    const data={
      google: "t-10001",
      operating: "lists",
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
  
  // 分页方法
  getPage=(data)=>{
      this.setState({
          page:{currentPage: data.currentPage, pageSize: data.pageSize  }
      },()=> {
        this.loadList();
      });
  }

  render() {

    function Tbody(props){
      const { data }=props;

      let dataTable=data && data.map((item,index)=>{
        let url=item.image==null||item.image==''?`http://www.good1230.com/dist2/static/images/tianmao.jpg`:`${global.apiUpdata}/images/user/${item.image}`;

        return (
          <tr key={index} style={{background: item.status==0 ? "#f5f7fa" : "#fff"}}>
            <td><img src={url} alt="" className="width-30"/></td>
            <td>
            {
              item.account?
              <div>{ item.account }<span className="color-999">({ item.name })</span></div>:
              <span className="color-999">该账号已删除</span>
            }
            </td>
            <td>
            {
              item.email?item.email:
              <span className="color-999">-</span>
            }
            </td>
            <td>{item.loginType}</td>
            <td>
              {
                item.role==0?<Tag type="primary">普通用户</Tag>:
                item.role==1?<Tag type="success">管理员</Tag>:
                <Tag type="warning">超级管理员</Tag>
              }
            </td>
            <td>{item.ip}</td>
            <td>{item.type}</td>
            <td>{item.time}</td>
            <td>{item.result}</td>
          </tr>
        )
      })
      return <tbody list="this.props.state.list">{dataTable}</tbody>
    }

    
    const { data }=this.state.list;
    const { total }=this.state.list;
    const { total2 }=this.state.list;
    const { lastTime }=this.state.list;
    return (
      <div>
   
        <GoodBreadbar title="登录日志"></GoodBreadbar>
        <div className="padding-top-10 padding-bottom-10 clearfix">
          <div className="float-left line-height-34 color-ccc font-size-14">
            当前用户第<span className="color-red bold padding-10" style={{color:'#20A0FF'}}>{total2}次</span>访问系统，上一次访问日期是<span className="color-red bold padding-10" style={{color:'#20A0FF'}}>{lastTime}</span>
          </div>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>头像</th>
                <th>账号(匿名)</th>
                <th>邮箱</th>
                <th>登录账号</th>
                <th>用户角色</th>
                <th>来源IP</th>
                <th>操作类型</th>
                <th>登录时间</th>
                <th>操作结果</th>
              </tr>
            </thead>
              <Tbody data={data}/>
          </table> 
        </div>
        <GoodPagination data={[this,total]}  currentPage={this.getPage.bind(this)}></GoodPagination>
      </div>
    );
  }
}