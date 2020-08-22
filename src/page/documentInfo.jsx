import React from 'react';
import axios from 'axios';
import global from '../global';
import { Dialog,Button,Input,Radio,Tag,Switch,MessageBox,Message } from 'element-react';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      google:'t-20010',
      data:{},
    };
  }
  componentDidMount() {
    this.loadList()
  }
  // 数据初始化
  loadList=()=>{
    const data={
      google: this.state.google,
      operating: "select",
      id: this.props.location.search.split('=')[1]
    }

    axios.post(global.APIPATH,data)
      .then((res) => {
         this.setState({
           data:res.data,
         });
      })
  }
  render() {
    const { data }=this.state.data
    console.log(data && data.fileId)
   let url=`${global.filePath}`
    return (
      <div>
        <GoodBreadbar title="文档库"></GoodBreadbar>
        

        {
          data &&
          <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
            <img src={url+data.fileId} alt="" />
          </div>
        }

      </div>
    );
  }
}