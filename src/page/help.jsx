import React from 'react';
import axios from 'axios';
import { Dialog,Button,Input,Radio,Tag,Switch,MessageBox,Message } from 'element-react';
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
      isEdit:false,
      google:'t-10011',
      list: [],
      form:{
        id:'',
        name:'',
        qq:'',
        status:1,
        type:0,
      },
      page: {
          currentPage: 0,
          pageSize: 10,
      },
      type: "",
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
      type: this.state.type,
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

  // 新增弹出模态框
  openDialog=(data)=>{
    this.setState({
        dialogVisible: true,
        isEdit: false,
        form:{
          id:'',
          name:'',
          email:'',
          status:1,
          type:0,
        },
      })
  }


  // 编辑查询数据
  openDialog2=(item)=>{
      const data={
        google: this.state.google,
        operating: "select",
        id: item.id,
        status:item.status,
      }
      this.setState({dialogVisible: true,isEdit: true},()=> {

        axios.post('good/google.php',data)
        .then((res) => {
           this.setState({
             form:res.data.data,
           });
        })
      })
  }
  
  // 新增编辑数据
  upData=(item)=>{
        const data={
          google: this.state.google,
          operating: item,
          form:this.state.form,
        }
        
        axios.post('good/google.php',data).then((res) => {
          if(res.data.retType==='success'){
            this.loadList();
            this.setState({dialogVisible: false})
          }
        })
  }

  // 表单数据同步
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
      axios.post('good/google.php',data).then((res) => {
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
            url=`http://www.good1230.com/dist/server/images/user/${item.image}`
        }

        let status=item.status==0?false:true;
        return (
          <tr key={index} style={{background: item.status==0 ? "#f5f7fa" : "#fff"}}>
            
            <td>{item.name}</td>
            <td>{item.qq}</td>
            <td>{
              item.type==0?<Tag type="primary">咨询客服</Tag>:
              item.type==1?<Tag type="success">技术客服</Tag>:
              <Tag type="danger">售后客服</Tag>
            }
              
            </td>
            <td>
              <GoodSwitch item={item}  status={props.datas.getStatus.bind(this)}></GoodSwitch>
            </td>
            <td>
              <span className="a-link pointer margin-right-10" onClick={props.datas.openDialog2.bind(this,item)}>编辑</span>
              <span className="a-link pointer" onClick={props.datas.remove.bind(this,item)}>删除</span>
            </td>
          </tr>
        )
      })
      return <tbody>{dataTable}</tbody>
    }
     
    const typeList={title:'服务类型',type:'type',list:['咨询客服','技术客服','售后客服']};
    const statusList={title:'服务类型',type:'status',list:['关闭','开启']};
    const { data }=this.state.list;
    const { total }=this.state.list;
    let title=this.state.isEdit?'编辑客服':'新增客服';

    return (
      <div>
        <GoodBreadbar title="客服信息"></GoodBreadbar>
        <div className="background-white padding-10" style={{'boxShadow':' rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <GoodTag data={ typeList }  type={this.getTag.bind(this)}></GoodTag>
          <GoodTag data={ statusList }  type={this.getTag.bind(this)}></GoodTag>
        </div>
        <div className="padding-10 clearfix">
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.openDialog }>新增客服</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        <div className="table-data padding-20 background-white" style={{'box-shadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>用户名</th>
                <th>QQ</th>
                <th>类型</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
              <Tbody data={data} datas={this} />
          </table> 
        </div>

        {/*分页*/}
        <GoodPagination data={total}  currentPage={this.getPage.bind(this)}></GoodPagination>

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
                  <tr>
                    <GoodTds title='用户名' required></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.name }  onChange={this.onChange.bind(this,'name')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='QQ' required></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.qq }  onChange={this.onChange.bind(this,'qq')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='代码标签'></GoodTds>
                    <td><Input placeholder="请输入内容" value={`{$qq.${this.state.form.id}}`} disabled /></td>
                  </tr>
                  <tr>
                    <GoodTds title='用户类型'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.type == 0} onChange={this.onChange.bind(this,'type')}>咨询客服</Radio>
                        <Radio value="1" checked={this.state.form.type == 1} onChange={this.onChange.bind(this,'type')}>技术客服</Radio>
                        <Radio value="2" checked={this.state.form.type == 2} onChange={this.onChange.bind(this,'type')}>售后客服</Radio>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='服务状态'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.status == 0} onChange={this.onChange.bind(this,'status')}>关闭</Radio>
                        <Radio value="1" checked={this.state.form.status == 1} onChange={this.onChange.bind(this,'status')}>开启</Radio>
                      </div>
                    </td>
                  </tr>
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