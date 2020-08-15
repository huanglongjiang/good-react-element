import React from 'react';
import axios from 'axios';
import global  from '../global';
import { Tag } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import {Link} from 'react-router-dom'
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
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
      google: "t-20008",
      operating: "lists",
    }
    axios.post(global.APIPATH,data)
      .then((res) => {
         this.setState({
           data:res.data,
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
    const { data }=this.state;
    console.log(data)
    return (
      <div>
   
        <GoodBreadbar title="首页"></GoodBreadbar>

        <div className="table-data padding-20 background-white color-white clearfix" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>


          <div className="width-300 height-200 background-red margin-20 float-left radius-5 padding-20" style={{background:'#20a0ff'}}>
            <div>

              当前用户访问次数<span className=" block font-size-24 padding-top-10">{ data.login_total }</span>
            </div>
            <div className="margin-top-20">

              上一次访问时间是<span className=" block font-size-24 padding-top-10">{ data.last_time }</span>
            </div>
          
          </div>
    
          <div className="width-300 height-200 background-red margin-20 float-left radius-5 padding-20" style={{background:'#f7ba2a'}}>
            <span>用户</span>
            <span className="block font-size-36 margin-top-30 align-center">
              <Link to="user" className="none-line color-white">{ data.user_total }</Link>
            </span>
           
          </div>

          <div className="width-300 height-200 background-red margin-20 float-left radius-5 padding-20" style={{background:'#f7ba2a'}}>
            <span>文章</span>
            <span className="block font-size-36 margin-top-30 align-center">
              <Link to="article" className="none-line color-white">{ data.article_total }</Link>
            </span>
          </div>



          <div className="width-300 height-200 background-red margin-20 float-left radius-5 padding-20" style={{background:'#20a0ff'}}>
            <span>访问</span>
            <span className="block font-size-36 margin-top-30 align-center">{ data.rizhi_total }</span>
          </div>



          <div className="width-300 height-200 background-red margin-20 float-left radius-5 padding-20" style={{background:'#f7ba2a'}}>
            <span>今日访问</span>
            <span className="block font-size-36 margin-top-30 align-center">{ data.today_total }</span>
          </div>

          <div className="width-300 height-200 background-red margin-20 float-left radius-5 padding-20" style={{background:'#f7ba2a'}}>
            <span>昨日访问</span>
            <span className="block font-size-36 margin-top-30 align-center">{ data.yesterday_total }</span>
          </div>

          


        </div>
      </div>
    );
  }
}