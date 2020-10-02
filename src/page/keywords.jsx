import React from 'react';
import axios from 'axios';
import { Dialog,Button,Input,Radio,DateRangePicker,Tag } from 'element-react';
import { 
  global,
  GoodPagination,
  GoodBreadbar,
  GoodTotal,
  GoodTds } from '../good-ui';
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      google:'t-20006',
      list: [],
      page: {
          currentPage: 0,
          pageSize: 250,
      },
      form:{
        id:'',
        name:'',
        time:'',
      },
    };
  }

  componentDidMount() {
    this.loadList()
  }
  loadList(){
    const data={
      google: "t-20006",
      operating: "lists",
      name: "",
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

  openDialog=(data)=>{
    this.setState({
        dialogVisible: true,
        disabled: false,
        isEdit: false,
        form:{
          id:'',
          name:'',
          time:'',
        },
      })
  }

  openDialog2=(item)=>{
    this.setState({
      dialogVisible: true,
      isEdit: true,
      form: {...item},
    });
  }
  onChange=(item,value)=>{
    const data={};
          data[item]=value;
    let newForm=Object.assign(this.state.form,data);
    this.setState({
        form:this.state.form,
      });
  }

  upData=(item)=>{
        const data={
          google: this.state.google,
          operating: item,
          form:this.state.form,
        }
        axios.post(global.APIPATH,data).then((res) => {
          if(res.data.retType==='success'){
            this.loadList();
            this.setState({dialogVisible: false})
          }
        })
  }
  render() {

    const { data,total }=this.state.list;
    let title=this.state.isEdit?'编辑关键词':'新增关键词';

    return (
      <div>
   
        <GoodBreadbar title="关键词库"></GoodBreadbar>
        <div className="margin-bottom-10 clearfix">
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.openDialog }>新增关键词</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>关键词库</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                    {
                        data && data.map((item,index)=>{
                        let url=`http://www.good1230.com/dist2/static/RandomUser/${item.image}`
                          return (
                            <span className="el-tag el-tag--gray margin-right-10 margin-bottom-10 pointer" key={ index } onClick={this.openDialog2.bind(this,item)}>{item.name}</span>

                            )
                        })
                    }
                </td>
              </tr>
            </tbody>
          </table> 
        </div>
        <GoodPagination data={[this,total]}  pageSize={250}  currentPage={this.getPage.bind(this)}></GoodPagination>

        <Dialog
          className="width-600"
          title={ title }
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
                      <GoodTds title='名称' required></GoodTds>
                      <td><Input placeholder="请输入内容" value={ this.state.form.name }  onChange={this.onChange.bind(this,'name')} /></td>
                    </tr>
                  </tbody>
                </table> 
              </div>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
              {
                this.state.isEdit?
                <Button type="primary" onClick={ this.upData.bind(this,'update') }>确定</Button>:
                <Button type="primary" onClick={ this.upData.bind(this,'insert') }>确定</Button>
              }
            </Dialog.Footer>
          </Dialog>
      </div>
    );
  }
}