import React from 'react';
import { Radio,Select } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import axios from 'axios';

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
    axios.post('good/google.php',data)
      .then((res) => {
         this.setState({
           list:res.data,
         });
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
        let url=`http://www.good1230.com/good/RandomUser/${item.image}`
        return (
          <tr key={index}>
            <td>{item.id}、<img src={url} alt="" className="width-30"/></td>
            <td>{item.time}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>{item.ip}</td>
            <td>{item.type}</td>
            <td>{item.type}</td>
            <td>{item.result}</td>
          </tr>
        )
      })
      return <tbody list="this.props.state.list">{dataTable}</tbody>
    }
    const { data }=this.state.list;
    const { total }=this.state.list;
    return (
      <div>
   
        <GoodBreadbar title="登录日志"></GoodBreadbar>
        <div className="clearfix">
          <GoodTotal total={ total }></GoodTotal>
        </div>
        
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group panel-9">
            <thead className="block-header">
              <tr>
                <th>访客头像</th>
                <th>登录日期</th>
                <th>登录用户</th>
                <th>登录邮箱</th>
                <th>用户角色</th>
                <th>来源IP</th>
                <th>对象类型</th>
                <th>操作类型</th>
                <th>操作结果</th>
              </tr>
            </thead>
              <Tbody data={data}/>
          </table> 
        </div>
        <GoodPagination data={total}  currentPage={this.getPage.bind(this)}></GoodPagination>
      </div>
    );
  }
}