import React from 'react';
import axios from 'axios';
import global from '../global';
import { Dialog,Button,Input,Radio,Tag,Switch,MessageBox,Message } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import GoodTag from '../good-ui/good-tag.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodSwitch     from '../good-ui/good-switch.jsx';
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      disabled:false,
      isEdit:false,
      google:'t-20009',
      list: [],
      searchName:'',
      form:{
        id:'',
        title:'',
        url:'',
        url2:'',
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
  loadList=()=>{
    const data={
      google: this.state.google,
      operating: "lists",
      title: this.state.searchName,
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
  openDialog=(data)=>{
    this.setState({
        dialogVisible: true,
        disabled: false,
        isEdit: false,
        form:{
          id:'',
          title:'',
          url:'',
          url2:'',
          text:'',
        },
      })
  }
  openDialog2=(item)=>{
    this.setState({
      dialogVisible: true,
      disabled: true,
      isEdit: true,
      form: {...item},
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
  onChange=(item,value)=>{
    const data={};
          data[item]=value;
    let newForm=Object.assign(this.state.form,data);

    this.setState({
        form:newForm,
      });
  }

  // 删除数据
  remove=(item,value)=>{
    MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {type: 'warning'}).then(() => {

      const data={
        google: this.state.google,
        operating: 'delete',
        id:item.id,
      }
      axios.post(global.APIPATH,data).then((res) => {
        if(res.data.retType==='success'){
          this.loadList();
        }
      })
    }).catch(() => {});
  }

    // 重置密码
  resetPassword=(item,value)=>{
    MessageBox.confirm('是否确认重新设置初始密码！', '提示', {type: 'warning'}).then(() => {

      const data={
        google: this.state.google,
        operating: 'resetPassword',
        id:item.id,
      }
      axios.post(global.APIPATH,data).then((res) => {
        if(res.data.retType==='success'){
          this.loadList();
        }
      })
    }).catch(() => {});
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
            url=`${global.apiUpdata}/images/user/${item.image}`
        }

        let role=0;
        return (
          <tr key={index} style={{background: item.status==0 ? "#f5f7fa" : "#fff"}}>
            <td>{item.title}</td>
            <td><a className="a-link" target="_blank" href={item.url}>{item.url}</a></td>
            <td>{ item.text }</td>
            <td>
            {
              item.role==2?null:
              <div>
                <span className="a-link pointer margin-right-10" onClick={props.datas.openDialog2.bind(this,item)}>编辑</span>
                <span className="a-link pointer" onClick={props.datas.remove.bind(this,item)}>删除</span>
              </div>
            }

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
    let title=this.state.isEdit?'编辑书签':'添加书签';

    return (
      <div>
        <GoodBreadbar title="喜欢书签"></GoodBreadbar>
        
        <div className="padding-top-10 padding-bottom-10 clearfix">
            <div className="float-left">
            <Input placeholder="请输入内容" icon="search"  onChange={ (item) => this.setState({ searchName: item }) } />
            </div>
            <Button className="float-left margin-left-20" type="primary" onClick={ this.loadList }>搜索</Button>
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.openDialog }>添加书签</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group panel-4">
            <thead className="block-header">
              <tr>
                <th>标题</th>
                <th>网址/Git</th>
                <th>备注</th>
                <th>操作</th>
              </tr>
            </thead>
              <Tbody data={data} datas={this} />
          </table> 
        </div>

        {/*分页*/}
        <GoodPagination data={[this,total]}  currentPage={this.getPage.bind(this)}></GoodPagination>

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
                    <GoodTds title='书签名' required></GoodTds>
                    <td><Input className="width-400 padding-top-5 padding-bottom-5"  placeholder="请输入内容" value={ this.state.form.title }  onChange={this.onChange.bind(this,'title')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='书签地址' required></GoodTds>
                    <td><Input className="width-400 padding-top-5 padding-bottom-5" type="textarea" rows={4} placeholder="请输入内容" value={ this.state.form.url }  onChange={this.onChange.bind(this,'url')} /></td>
                  </tr>
                 {
                   /*<tr>
                    <GoodTds title='附加地址'></GoodTds>
                    <td><Input className="width-400 padding-top-5 padding-bottom-5" type="textarea" rows={2} placeholder="请输入内容" value={ this.state.form.url2 }  onChange={this.onChange.bind(this,'url2')} /></td>
                  </tr>*/
                 }
                  <tr>
                    <GoodTds title='备注'></GoodTds>
                    <td><Input className="width-400 padding-top-5 padding-bottom-5" type="textarea" rows={4} placeholder="请输入内容" value={ this.state.form.text }  onChange={this.onChange.bind(this,'text')} /></td>
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