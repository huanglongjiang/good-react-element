import React, { Component } from 'react';
import axios from 'axios';
import global from '../global';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
import GoodInput       from '../good-ui/good-input.jsx';
import GoodSwitch     from '../good-ui/good-switch.jsx';
import GoodUpload from '../good-ui/good-uploads.jsx';
import { Dialog,Button,Input,Radio,Switch,Checkbox } from 'element-react';
import GoodKey from '../good-ui/good-key.jsx';
import {Link} from 'react-router-dom'
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '**Hello world!!!**',
      imgType:'u6',
      fileType:'article',
      google:'t-10016',
      google2:'t-20001',
      google3:'t-10008',
      rootList:[],
      tagList:[],
      checkList:[],
      checkList2:[],
      tag:[],
        dialogVisible: false,
        form:{
            description: "",
            fid: "0",
            image: "",
            keywords: "",
            parentId: [],
            parentNames: [],
            source: "原创",
            tagId: [],
            tagNames: [],
            text: "",
            title: "",
            type: "0",
        },
    };
  }
   




    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ]
    }

    // formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet', 'indent',
    //     'link', 'image'
    // ]

    onValueChange = (value) => {
        this.setState({
            value
        })
    }
      componentDidMount() {
        this.loadList()
        this.loadList2()

        if(this.props.location.search!==''){
          this.loadList3()
        }
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
               rootList:res.data,
             });
          })
      }

      loadList2(){
        const data={
          google: this.state.google2,
          operating: "lists",
          name: ""
        }
        axios.post(global.APIPATH,data)
          .then((res) => {
             this.setState({
               tagList:res.data,
             });
          })
      }

        keys=(item)=>{
     //let tag=item.keywords==''?[]:item.keywords.split(',')
     this.setState({
         dialogVisible2: true,
         
      })

  }

  loadList3(){
    const data={
      google: this.state.google3,
      operating: "select",
      id: this.props.location.search.split('=')[1]
    }
    axios.post(global.APIPATH,data)
      .then((res) => {
        if(res.data.data!==null){
           this.setState({
             form:res.data.data,
             checkList:res.data.data.parentId,
             checkList2:res.data.data.tagId,
           });
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


   // 新增编辑数据
  upData=(item)=>{
        const data={
          google: this.state.google3,
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

  updateImage=(item)=>{
    const data={};
          data['image']=item.name;
          data['file']=item.file;
    Object.assign(this.state.form,data);
  }
    render() {
        const { value } = this.state
        const { data }=this.state.rootList
        const data2=this.state.tagList.data

        return (
            <div>
                <GoodBreadbar title="文章中心"></GoodBreadbar>
                <div className="background-white padding-30 padding-bottom-120" style={{'boxShadow':' rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
                    <div className="margin-auto" style={{width:"900px"}}>


                            <div className="table-default">
                                <table className="width-max">
                                <tbody>
                                  <tr>
                                    <td></td>
                                    <td>
                                    {
                                      this.props.location.search!==''?
                                      <Button type="primary" onClick={ this.upData.bind(this,'update') }>编辑</Button>:
                                      <Button type="primary" onClick={ this.upData.bind(this,'insert') }>新增</Button>

                                    }
                                      <Link to="article" className="margin-left-10"><Button type="primary">文章列表</Button></Link>
                                    </td>
                                  </tr>
                                  <tr>
                                    <GoodTds title='文章标题' required></GoodTds>
                                    <td><Input placeholder="请输入文章标题" value={ this.state.form.title } onChange={this.onChange.bind(this,'title')} /></td>
                                  </tr>
                                  <tr>
                                    <GoodTds title='文章来源'></GoodTds>
                                    <td><Input placeholder="请输入文章来源" value={ this.state.form.source } onChange={this.onChange.bind(this,'source')} /></td>
                                  </tr>
                                  <tr>
                                    <GoodTds title='自定义属性'></GoodTds>
                                    <td>
                                      <div>
                                        <Radio value="0" checked={this.state.form.type == 0} onChange={this.onChange.bind(this,'type')}>默认</Radio>
                                        <Radio value="1" checked={this.state.form.type == 1} onChange={this.onChange.bind(this,'type')}>优质</Radio>
                                        <Radio value="2" checked={this.state.form.type == 2} onChange={this.onChange.bind(this,'type')}>热门</Radio>
                                        <Radio value="3" checked={this.state.form.type == 3} onChange={this.onChange.bind(this,'type')}>推荐</Radio>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <GoodTds title='文章栏目' required></GoodTds>
                                    <td>
                                        <div className="border-1 border-eee padding-10 margin-bottom-10">
                                            <Checkbox.Group value={this.state.checkList} onChange={this.onChange.bind(this,'parentId')}>
                                                {
                                                    data && data.map((item,index)=>{
                                                        return <Checkbox key={ index } label={ item.id } className=" margin-left-15 width-120">{ item.name }</Checkbox>
                                                    })

                                                }
                                            </Checkbox.Group>
                                        </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <GoodTds title='tag标签' required></GoodTds>
                                    <td>
                                        <div className="border-1 border-eee padding-10 margin-bottom-10">
                                            <Checkbox.Group value={this.state.checkList2} onChange={this.onChange.bind(this,'tagId')}>
                                                {
                                                    data2 && data2.map((item,index)=>{
                                                        return <Checkbox key={ index } label={ item.id } className=" margin-left-15 width-120">{ item.name }</Checkbox>
                                                    })
                                                }
                                            </Checkbox.Group>
                                        </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <GoodTds title='缩 略 图'></GoodTds>
                                    <td>
                                      <div className=" margin-bottom-10"><GoodUpload data={ this }></GoodUpload></div>
                                    </td>
                                  </tr>
                                  {
                                    /*<tr>
                                      <GoodTds title='关键词'></GoodTds>
                                      <td><Button className="button-new-tag" size="small" onClick={this.keys.bind(this)}>+ 新增</Button></td>
                                    </tr>*/
                                  }
                                  <tr>
                                    <GoodTds title='内容简介'></GoodTds>
                                    <td><Input className=" margin-bottom-10" type="textarea" autosize={{ minRows: 6, maxRows: 4}} placeholder="请填写内容简介" value={ this.state.form.description } onChange={this.onChange.bind(this,'description')}/></td>
                                  </tr>
                                  <tr>
                                    <GoodTds title='内容摘要'></GoodTds>
                                    <td>
                                        {/*<div className="background-white height-auto"  style={{height:600,border:'1px solid red'}}>
                                            <ReactQuill
                                                value={value}
                                                theme="snow"
                                                modules={this.modules}
                                                 className="background-white height-258" style={{height:600}}
                                                // formats={this.formats}
                                                onChange={this.onValueChange} />
                                        </div>*/}

                                        <div className="background-white height-auto" style={{height:450}}>
                                            <ReactQuill
                                                value={this.state.form.text}  placeholder="请填写内容摘要"
                                                theme="snow"
                                                modules={this.modules}
                                                 className="background-white height-258" style={{height:360}}
                                                // formats={this.formats}
                                                 onChange={this.onChange.bind(this,'text')} />
                                        </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td>
                                    {
                                      this.props.location.search!==''?
                                      <Button type="primary" onClick={ this.upData.bind(this,'update') }>编辑</Button>:
                                      <Button type="primary" onClick={ this.upData.bind(this,'insert') }>新增</Button>

                                    }
                                      <Link to="article" className="margin-left-10"><Button type="primary">文章列表</Button></Link>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table> 
                              </div>






                        
                    </div>
                </div>
                {/*<GoodKey data={ this }></GoodKey>*/}
            </div>
        )
    }
}