import React            from 'react';
import axios from 'axios';
import { Dialog,Button,Input,Radio,Switch } from 'element-react';
import GoodBreadbar     from '../good-ui/good-breadbar.jsx';
import GoodTotal        from '../good-ui/good-total.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodSwitch     from '../good-ui/good-switch.jsx';

export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      disabled:false,
      google:'t-10009',
      list: [],
      form:{
        id:'',
        status:1,
        type:0,
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
    }
    axios.post('good/google.php',data)
      .then((res) => {
         this.setState({
           list:res.data,
         });
      })
  }

  // 编辑查询数据
  openDialog=(item)=>{
    this.setState({
      dialogVisible: true,
      disabled: true,
      isEdit: true,
      form: {...item},
    });
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
  render() {
    function Tbody(props){
      const { data }=props;

        let dataTable=data && data.map((item,index)=>{
        return (
          <tr key={index} style={{background: item.status==0 ? "#f5f7fa" : "#fff"}}>
            <td>{item.type}</td>
            <td>{item.code}</td>
            <td>
              <GoodSwitch item={item}  status={props.datas.getStatus.bind(this)}></GoodSwitch>
            </td>
            <td>
              <span className="a-link pointer margin-right-10" onClick={props.datas.openDialog.bind(this,item)}>编辑</span>
            </td>
          </tr>
        )
      })
      return <tbody>{dataTable}</tbody>
    }
    const { data }=this.state.list;
    const { total }=this.state.list;
    return (
      <div>
        <GoodBreadbar title="站长统计"></GoodBreadbar>
        <div className="padding-10 clearfix">
          <GoodTotal total={ total }></GoodTotal>
        </div>
        
        <div className="table-data padding-20 background-white" style={{'boxShadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>统计类型</th>
                <th style={{width:'70%'}}>code</th>
                <th>服务状态</th>
                <th>操作</th>
              </tr>
            </thead>
              <Tbody data={data} datas={this} />
          </table> 
        </div>

          <Dialog
          className="width-600"
          title="cnzz"
          size="tiny"
          visible={ this.state.dialogVisible }
          onCancel={ () => this.setState({ dialogVisible: false }) }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div class="table-default">
                <table class="width-max">
                  <tr>
                    <GoodTds title='统计类型'></GoodTds>
                    <td><Input placeholder="请输入内容" disabled={ this.state.disabled } value={ this.state.form.type }  onChange={this.onChange.bind(this,'type')} /></td>
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
                    <GoodTds title='统计代码'></GoodTds>
                    <td><Input className="width-400 padding-top-5 padding-bottom-5" type="textarea" rows={8} value={ this.state.form.code } onChange={this.onChange.bind(this,'code')}></Input></td>
                  </tr>
                </table> 
              </div>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
              <Button type="primary" onClick={ this.upData.bind(this,'update') }>确定</Button>
            </Dialog.Footer>
          </Dialog>
      </div>
      
    );
  }
}