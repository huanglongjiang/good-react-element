import React from 'react';
import axios from 'axios';
import global from '../global';
import { Dialog,Button,Input,Radio,Tag,Switch } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      disabled:false,
      list: [],
      form:{
        id:'',
        text:'',
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
      google: "t-10015",
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

  // 留言弹出模态框
  openDialog=(data)=>{
    this.setState({
        dialogVisible: true,
        disabled: false,
        form:{
          id:'',
          text:'',
        },
      })
  }

  // 新增编辑数据
  upData=(item)=>{
        const data={
          google: "t-10015",
          operating: item,
          form:this.state.form,
        }
        console.log(data)
        axios.post(global.APIPATH,data).then((res) => {
          if(res.data.retType==='success'){
            this.loadList();
            this.setState({dialogVisible: false})
          }
        })
  }
  onChange=(item,value)=>{
    const data={};
          data[item]=value;
          Object.assign(this.state.form,data);
          console.log(this.state.form)

    this.setState({
        form:this.state.form,
      });
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
        let url='http://www.good1230.com/dist2/static/images/tianmao.jpg'
        if(item.image!==''){
            url=`good/RandomUser/${item.image}`
        }

        let status=item.status==0?false:true;
        return (
          <tr key={index} style={{background: item.status==0 ? "#f5f7fa" : "#fff"}}>
            <td><img src={url} className="width-30" /></td>
            <td>{item.email}</td>
            <td>{item.ip}</td>
            <td>{item.text}</td>
            <td>{item.time}</td>
          </tr>
        )
      })
      return <tbody>{dataTable}</tbody>
    }
     
    const { data }=this.state.list;
    const { total }=this.state.list;

    return (
      <div>
        <GoodBreadbar title="留言板"></GoodBreadbar>
        
        <div className="padding-10 clearfix">
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.openDialog }>留言</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>头像</th>
                <th>名称</th>
                <th>访问IP</th>
                <th>留言内容</th>
                <th>留言时间</th>
              </tr>
            </thead>
              <Tbody data={data} datas={this} />
          </table> 
        </div>

        {/*分页*/}
        <GoodPagination data={[this,total]}  currentPage={this.getPage.bind(this)}></GoodPagination>

        <Dialog
          className="width-600"
          title="发布留言"
          size="tiny"
          visible={ this.state.dialogVisible }
          onCancel={ () => this.setState({ dialogVisible: false }) }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div className="table-default">
                <table className="width-max">
                <tbody>
                  <tr>
                    <GoodTds title='留言内容' required></GoodTds>
                    <td><Input className="width-400 padding-top-5 padding-bottom-5" type="textarea" rows={8} value={ this.state.form.text } onChange={this.onChange.bind(this,'text')}></Input></td>
                  </tr>
                </tbody>
                </table> 
              </div>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
              <Button type="primary" onClick={ this.upData.bind(this,'insert') }>确定</Button>
            </Dialog.Footer>
          </Dialog>
      </div>
    );
  }
}