import React from 'react';
import axios from 'axios';
import global from '../global';
import { Dialog,Button,Input,Radio,DateRangePicker,Tag,Switch,MessageBox,Message } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import GoodTag from '../good-ui/good-tag.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodUpload from '../good-ui/good-uploads.jsx';
import GoodSwitch     from '../good-ui/good-switch.jsx';
export default class Log extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      disabled:false,
      isEdit:false,
      list: [],
      imgType:'u3',
      fileType:'slider',
      google:'t-10007',
      value1: null, 
      form:{
        id:'',
        title:'',
        image:'',
        type:0,
        status:1,
        url:'',
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
      title: "",
      type: this.state.type,
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
          title:'',
          image:'',
          type:0,
          status:1,
          url:'',
        },
      })
  }

  // 编辑查询数据
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

  updateImage=(item)=>{
    const data={};
          data['image']=item;
    Object.assign(this.state.form,data);
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
            url=`${global.apiUpdata}/images/slider/${item.image}`
        }
        let status=item.status==0?false:true;
        return (
          <tr key={index} style={{background: item.status==0 ? "#f5f7fa" : "#fff"}}>
            <td><img src={url} className="width-80" /></td>
            <td>{ item.title }</td>
            <td>{ item.url }</td>
            <td>{
              item.type==0?<Tag type="primary">首页</Tag>:
              item.type==1?<Tag type="success">通用轮播图</Tag>:
              item.type==2?<Tag type="warning">栏目页轮播图</Tag>:
              <Tag type="danger">内容页轮播图</Tag>
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

    const typeList={title:'服务类型',type:'type',list:['首页','通用轮播图','栏目页轮播图','内容页轮播图']};
    const statusList={title:'服务类型',type:'status',list:['关闭','开启']};
    const { data }=this.state.list;
    const { total }=this.state.list;
    let title=this.state.isEdit?'编辑轮播图':'新增轮播图';
    
    return (
      <div>
        <GoodBreadbar title="图片轮播"></GoodBreadbar> 
        <div className="background-white padding-10" style={{'boxShadow':' rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <GoodTag data={ typeList }  type={this.getTag.bind(this)}></GoodTag>
          <GoodTag data={ statusList }  type={this.getTag.bind(this)}></GoodTag>
        </div>
        <div className="padding-10 clearfix">
          {/*<GoodSearch></GoodSearch>*/}
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.openDialog }>新增轮播图</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group panel-6">
            <thead className="block-header">
              <tr>
                <th>图片</th>
                <th>标题</th>
                <th>链接</th>
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
          className="width-600" style={{width:800}}
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
                    <GoodTds title='图片标题' required></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.title }  onChange={this.onChange.bind(this,'title')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='链接地址'></GoodTds>
                    <td><Input type="textarea" rows={4} placeholder="请输入内容" value={ this.state.form.url }  onChange={this.onChange.bind(this,'url')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='图片类型'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.type == 0} onChange={this.onChange.bind(this,'type')}>通用轮播图</Radio>
                        <Radio value="1" checked={this.state.form.type == 1} onChange={this.onChange.bind(this,'type')}>首页轮播图</Radio>
                        <Radio value="2" checked={this.state.form.type == 2} onChange={this.onChange.bind(this,'type')}>栏目页轮播图</Radio>
                        <Radio value="3" checked={this.state.form.type == 3} onChange={this.onChange.bind(this,'type')}>内容页轮播图</Radio>
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
                  <tr>
                    <GoodTds title='上传图片' required></GoodTds>
                    <td><GoodUpload data={ this }></GoodUpload></td>
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