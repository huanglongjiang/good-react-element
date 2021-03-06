import React from 'react';
import axios from 'axios';
import { Dialog,Button,Input,Radio,Tag,Switch,MessageBox,Message } from 'element-react';
import { 
  global,
  store,
  GoodPagination,
  GoodBreadbar,
  GoodTotal,
  GoodTag,
  GoodTds,
  GoodSwitch } from '../good-ui';
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:store.getState(),
      dialogVisible: false,
      disabled:false,
      isEdit:false,
      google:'t-10010',
      list: [],
      searchName:'',
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
    store.subscribe(this.storeChange) //订阅Redux的状态
  }
  storeChange=()=>{
     this.setState(store.getState())
  }
  componentDidMount() {
    this.loadList()
  }

  // 数据初始化
  loadList=()=>{
    const data={
      google: this.state.google,
      operating: "lists",
      name: this.state.searchName,
      role: this.state.role,
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
  openDialog=(data)=>{
    this.setState({
        dialogVisible: true,
        disabled: false,
        isEdit: false,
        form:{
          id:'',
          name:'',
          email:'',
          status:1,
          role:0,
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
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!reg.test(this.state.form.email)){
          Message({
              message:'请输入正确邮箱',
              type: 'info',
          });
          return
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

      const { role }=props.datas.state.userInfo.data?props.datas.state.userInfo.data:{role:1};
       

      let dataTable=data && data.map((item,index)=>{
        let url='http://www.good1230.com/dist2/static/images/tianmao.jpg'
        if(item.image!==''){
            url=`${global.apiUpdata}/images/user/${item.image}`
        }


        return (
          <tr key={index} style={{background: item.status==0 ? "#f5f7fa" : "#fff"}}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td><img src={url} className="width-30" /></td>
            <td>{item.time}</td>
            <td>
              {
                item.role==0?<Tag type="primary">普通用户</Tag>:
                item.role==1?<Tag type="success">管理员</Tag>:
                <Tag type="warning">超级管理员</Tag>
              }
            </td>
            <td>
              {
                item.role==2? null:
                role==2? 
                <GoodSwitch item={item} status={props.datas.getStatus.bind(this)}></GoodSwitch>:
                <GoodSwitch item={item} disabled  status={props.datas.getStatus.bind(this)}></GoodSwitch>
              }
            </td>
            <td>
            {
              item.role==2?null:
              <div>
                <span className="a-link pointer margin-right-10" onClick={props.datas.resetPassword.bind(this,item)}>密码重置</span>
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
    const { data,total }=this.state.list;
    let title=this.state.isEdit?'编辑用户':'新增用户';

    return (
      <div>
        <GoodBreadbar title="用户管理"></GoodBreadbar>
        <div className="background-white padding-10" style={{'boxShadow':' rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <GoodTag data={ typeList }  type={this.getTag.bind(this)}></GoodTag>
          <GoodTag data={ statusList }  type={this.getTag.bind(this)}></GoodTag>
        </div>
        
        <div className="padding-top-10 padding-bottom-10 clearfix">
            <div className="float-left">
            <Input placeholder="请输入内容" icon="search"  onChange={ (item) => this.setState({ searchName: item }) } />
            </div>
            <Button className="float-left margin-left-20" type="primary" onClick={ this.loadList }>搜索</Button>
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.openDialog }>新增用户</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>用户名</th>
                <th>用户邮箱</th>
                <th>头像</th>
                <th>注册时间</th>
                <th>类型</th>
                <th>状态</th>
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
                    <GoodTds title='用户邮箱' required></GoodTds>
                    <td><Input placeholder="请输入内容" disabled={ this.state.disabled } value={ this.state.form.email }  onChange={this.onChange.bind(this,'email')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='用户名' required></GoodTds>
                    <td><Input placeholder="请输入内容" disabled={ this.state.disabled } value={ this.state.form.name }  onChange={this.onChange.bind(this,'name')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='用户类型'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.role == 0} onChange={this.onChange.bind(this,'role')}>普通用户</Radio>
                        <Radio value="1" checked={this.state.form.role == 1} onChange={this.onChange.bind(this,'role')}>管理员</Radio>
                        <Radio value="2" checked={this.state.form.role == 2} disabled onChange={this.onChange.bind(this,'role')}>超级管理员</Radio>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='用户类型'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.status == 0} onChange={this.onChange.bind(this,'status')}>冻结</Radio>
                        <Radio value="1" checked={this.state.form.status == 1} onChange={this.onChange.bind(this,'status')}>正常</Radio>
                      </div>
                    </td>
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