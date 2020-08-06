import React from 'react';
import { Dialog,Button,Input,Radio,DateRangePicker,Tag } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import axios from 'axios';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodUpload from '../good-ui/good-upload-root.jsx';
export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      dialogVisible2: false,
      title:'',
      list: [],
      keywords:[],
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
      google: "t-10016",
      operating: "lists",
      name: ""
    }
    axios.post('good/google.php',data)
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
  editData=(item)=>{
    const data={
      google: "t-10016",
      operating: "select",
      id: item.id,
      status:item.status,
    }
    this.setState({dialogVisible: true,disabled: true,isEdit: true},()=> {

      axios.post('good/google.php',data)
      .then((res) => {
         this.setState({
           form:res.data.data,
         });
      })
    })
  }

  keys=(item)=>{
    console.log(item)
    
    const data={
      google: "t-20006",
      operating: "lists",
      name: "",
      page: this.state.page.currentPage,
      pagesize: this.state.page.pageSize,
    }
    axios.post('good/google.php',data)
      .then((res) => {
         this.setState({
           keywords:res.data.data,
         });
         console.log(res.data.data)
         console.log(this.state.keywords)
         this.setState({dialogVisible2: true,title:item.name})
      })
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

  handleClose(item) {
    const keys=this.state.form.keywords.split(',');
    const keys2=[]
    console.log(this.state.form.keywords)
          keys.map((item2,index)=>{
         
            console.log(index)
            if(item==item2)
              keys.splice(index,1)

          })
          console.log(keys)
          Object.assign(this.state.form,{keywords:keys.join(',')});
          this.setState({form:this.state.form})
          console.log(this.state.form.keywords)
          
    /*const { item } = this.state;

    tags.splice(tags.map(el => el.key).indexOf(item.key), 1);

    this.setState({ item });*/
  }
   getPage=(data)=>{
    console.log(data)
      this.setState({
          page:{currentPage: data, pageSize: 10  }
      },()=> {
        this.keys();
      });
      
  }

  render() {

    function Tbody(props){
      const { data }=props;

      let dataTable=data && data.map((item,index)=>{
        let url=`http://www.good1230.com/dist2/static/RandomUser/${item.image}`
        return (
          <tr key={index}>
            <td><div  onClick={props.datas.editData.bind(this,item)}>{index+1}、{item.name}</div></td>
            <td>
              {
                item.keywords!=''?item.keywords.split(',').map((item2,index2)=>{
                  return <Tag type="gray" className="margin-2">{item2}</Tag>
                }):null
              }
              <div onClick={props.datas.keys.bind(this,item)}>新增</div>
            </td>
          </tr>
        )
      })
      return <tbody list="this.props.state.list">{dataTable}</tbody>
    }
    const { data }=this.state.list;
    const { total }=this.state.list;
    const { total2 }=this.state.keywords;
    let keywords=[];
      if(this.state.form.keywords==''){
        keywords=[];
      }else{
        keywords=this.state.form.keywords.split(',');
      }
      console.log(keywords)


      let bbbb=this.state.keywords;
      console.log(bbbb)
    return (
      <div>
   
        <GoodBreadbar title="栏目中心"></GoodBreadbar>
        <div className="margin-bottom-10 clearfix">
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
          title="新增栏目"
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
                    <GoodTds title='关键词'></GoodTds>
                    <td>
                      <div>
                      {
                        
                        keywords && keywords.map(item => {
                          return (
                          <Tag type="primary" className="margin-right-10">{item}</Tag>
                          /*<Tag
                            key={0}
                            closable={true}
                            type="primary"
                            onClose={this.handleClose.bind(this,item)} className="margin-right-10">{item}</Tag>*/
                          )
                        })
                      }
                      <span className="el-tag el-tag--primary margin-right-10 pointer">+</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='缩 略 图'></GoodTds>
                    <td><GoodUpload image={ this.updateImage } url={ this.state.form.image }></GoodUpload></td>
                  </tr>
                </table> 
              </div>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
              <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确定</Button>
            </Dialog.Footer>
          </Dialog>


          <Dialog
          className="width-600" style={{width:'1000px'}}
          title={ this.state.title }
          size="tiny"
          visible={ this.state.dialogVisible2 }
          onCancel={ () => this.setState({ dialogVisible2: false }) }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div class="table-default">
                <table class="width-max">
                  <tr>
                    <td>
                      <div style={{height:'400px',overflow:'auto'}}>
                     
                      {
                        
                        bbbb && bbbb.map((item,index) => {
                          return (
                          <Tag key={item.id} type="primary" className="margin-right-10 margin-bottom-10">{item.name}</Tag>
                         
                          )
                        })
                      }
                      </div>
                    </td>
                  </tr>
                </table> 
                <GoodPagination data={total2}  currentPage={this.getPage.bind(this)}></GoodPagination>
              </div>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
              <Button type="primary" onClick={ () => this.setState({ dialogVisible2: false }) }>确定</Button>
            </Dialog.Footer>
          </Dialog>
      </div>
    );
  }
}