import React from 'react';
import axios from 'axios';
import global from '../global';
import { Dialog,Button,Input,Radio,DateRangePicker,Tag } from 'element-react';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodUpload from '../good-ui/good-uploads.jsx';
import GoodKey from '../good-ui/good-key.jsx';
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgType:'u7',
      fileType:'article_title',
      dialogVisible: false,
      dialogVisible2: false,
      isEdit: false,
      google:'t-10016',
      title:'',
      list: [],
      keywords:[],
      tag:[],
      form:{
        id:'',
        name:'',
        image:'',
        keywords:'',
        url:'',
        type:0,
        time:'',
      },
      page: {
          currentPage: 0,
          pageSize: 100,
      },
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
      name: ""
    }
    axios.post(global.APIPATH,data)
      .then((res) => {
         this.setState({
           list:res.data,
         });
      })
  }

  getDatas=(data)=>{
    console.log(data)
      this.setState({
          page:{currentPage: data, pageSize: 10  }
      },()=> {
        this.loadList();
      });
      
  }

  handleClick=(data)=>{
    console.log(66)
    this.setState({
        dialogVisible: true,
        disabled:false,
        isEdit:false,
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
          image:'',
          keywords:'',
          url:'',
          type:0,
          time:'',
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

  keys=(item)=>{
     let tag=item.keywords==''?[]:item.keywords.split(',')
     this.setState({
         dialogVisible2: true,
         tag:tag,
         form:item
      })

  }

  closeDialog=(item)=>{
    console.log(this.state.tag)
    this.setState({ dialogVisible2: item })
  }
  handleChange=(item,value)=>{
    const data={};
          data[item]=value;
    let newForm=Object.assign(this.state.form,data);
    console.log(this.state.form)
    this.setState({
        form:this.state.form,
      });
    console.log(this.state.form)
  }
  updateImage=(item)=>{
    const data={};
          data['image']=item;
    Object.assign(this.state.form,data);
    console.log(this.state.form)
  }

   getPage=(data)=>{
    console.log(data)
      this.setState({
          page:{currentPage: data, pageSize: 10  }
      },()=> {
        this.keys();
      });
      
  }



  upData=(type,item)=>{
     console.log(type)
     console.log(item)
    
        const data={
          google: this.state.google,
          operating: type,
          form:this.state.form,
        }
        if(item===false){
          data.form.keywords=this.state.tag.join(',');
          this.setState({ dialogVisible2: item })
        }
       
        axios.post(global.APIPATH,data).then((res) => {
          if(res.data.retType==='success'){
            this.loadList();
            this.setState({dialogVisible: false})
          }
        })
  }

  render() {

    function Tbody(props){
      const { data }=props;

      let dataTable=data && data.map((item,index)=>{
        let url=`http://www.good1230.com/dist2/static/RandomUser/${item.image}`
        return (
          <tr key={index}>
            <td><div className="pointer"  onClick={props.datas.openDialog2.bind(this,item)}>{index+1}、{item.name}</div></td>
            <td>
              {
                item.keywords!=''?item.keywords.split(',').map((item2,index2)=>{
                  return <Tag type="gray" className="margin-right-10">{item2}</Tag>
                }):null
              }
               <Button className="button-new-tag" size="small" onClick={props.datas.keys.bind(this,item)}>+ 新增</Button>
            </td>
          </tr>
        )
      })
      return <tbody list="this.props.state.list">{dataTable}</tbody>
    }
    const { data }=this.state.list;
    const { total }=this.state.list;
    const total2=this.state.keywords.total;

    console.log(this)
    let keywords=[];
      if(this.state.form.keywords==''){
        keywords=[];
      }else{
        keywords=this.state.form.keywords.split(',');
      }
      console.log(keywords)


      let bbbb=this.state.keywords;
      console.log(bbbb)

      const keyList=['数组','json数组','js数组数组','合并string数组'];
      let title=this.state.isEdit?'编辑栏目':'新增栏目';
    return (
      <div>
   
        <GoodBreadbar title="栏目中心"></GoodBreadbar>
        <div className="margin-bottom-10 clearfix">
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.openDialog }>新增栏目</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>栏目名称</th>
                <th>关键词</th>
              </tr>
            </thead>
              <Tbody data={data} datas={ this } remove={this.remove} />
          </table> 
        </div>

        <Dialog
          className="width-600"
          title={ title }
          size="tiny"
          visible={ this.state.dialogVisible }
          onCancel={ () => this.setState({ dialogVisible: false }) }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div class="table-default">
                <table class="width-max">
                  <tr>
                    <GoodTds title='名称'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.name }  onChange={this.handleChange.bind(this,'name')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='缩 略 图'></GoodTds>
                    <td>
                        <td><GoodUpload data={ this }></GoodUpload></td>
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
          <GoodKey data={ this }></GoodKey>

          
      </div>
    );
  }
}