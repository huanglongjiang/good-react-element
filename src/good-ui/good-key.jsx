import React from 'react';
import axios from 'axios';
import global from '../global';
import { Dialog,Button,Input,Radio,DateRangePicker,Tag,Message } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  dialogVisible: false,
		  keywords:[],
		  page: {
		      currentPage: 0,
		      pageSize: 100,
		  },
		    inputVisible: false,
		    inputValue: ''
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
           keywords:res.data,
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


  	// 关键词处理
	onKeyUp(e) {
	  if (e.keyCode === 13) {
	    this.handleInputConfirm();
	  }
	}

	onChange(value) {
	  this.setState({ inputValue: value });
	}

	handleClose(index) {
	  this.props.data.state.tag.splice(index, 1);
	  this.forceUpdate();
	}

	showInput() {
	  this.setState({ inputVisible: true }, () => {
	    this.refs.saveTagInput.focus();
	  });
	}

	addTag=(item,value)=>{

		if(this.props.data.state.tag.includes(item.name)){
			this.props.data.state.tag.map((item2,index)=>{
				if(item.name==item2){
					this.props.data.state.tag.splice(index, 1);
				}
			})
		}else{
			if(this.props.data.state.tag.length>4){
				Message({
				    message:'最多选择5个关键字',
				    type: 'warning',
				});
				return
			}else{

				this.props.data.state.tag.push(item.name);
			}
		}
		
		this.forceUpdate();
	}
	handleInputConfirm() {
	  let inputValue = this.state.inputValue;

	  if (inputValue) {
	  	if(this.props.data.state.tag.length>4){
			Message({
			    message:'最多选择5个关键字',
			    type: 'warning',
			});
			return
		}
	    this.props.data.state.tag.push(inputValue);
	  }

	  this.state.inputVisible = false;
	  this.state.inputValue = '';

	  this.forceUpdate();
	}
	// 关键词处理

	submit=()=>{
		this.props.data.upData('update',false)
	}

	cancel=(item)=>{
		this.props.data.closeDialog(false)
	}
  render() {

	const { total }=this.state.keywords;
	const { data }=this.state.keywords;
	const { name }=this.props.data.state.form;
	const { tag }=this.props.data.state;

	let dialog=this.props.data.state.dialogVisible2;
    return (
    	<div>
			<Dialog
	          className="width-600" style={{width:'1000px'}}
	          title={ name }
	          size="tiny"
	          visible={ dialog }
	          onCancel={ this.cancel }
	          lockScroll={ false }
	          >
	            <Dialog.Body>

	            {/*已选关键词*/}
				<div>
			      {
			        tag && tag.map((tag, index) => {
			          return (
			            <Tag className="margin-right-10 margin-bottom-10"
			              key={Math.random()}
			              closable={true}
			              closeTransition={false}
			              onClose={this.handleClose.bind(this, index)}>{tag}</Tag>
			          )
			        })
			      }
			      {
			        this.state.inputVisible ? (
			          <Input
			            className="input-new-tag"
			            value={this.state.inputValue}
			            ref="saveTagInput"
			            size="mini"
			            onChange={this.onChange.bind(this)}
			            onKeyUp={this.onKeyUp.bind(this)}
			            onBlur={this.handleInputConfirm.bind(this)}
			          />
			        ) : <Button className="button-new-tag" size="small" onClick={this.showInput.bind(this)}>+ New Tag</Button>
			      }
			    </div>




			  		{/*关键词列表*/}
	              <div class="table-default">
	                <div className="border-bottom-1 border-eee padding-bottom-20 margin-bottom-20" style={{overflow:'auto'}}></div>
	                <div style={{height:'360px',overflow:'auto'}}>
	                     
	                    {
	                      
	                      data && data.map((item,index) => {
	                        return (

	                        	tag && tag.includes(item.name)?
	                        	<span class="el-tag el-tag--primary margin-right-10 margin-bottom-10 pointer" onClick={ this.addTag.bind(this,item) }>{item.name}</span>:
	                        	<span class="el-tag el-tag--gray margin-right-10 margin-bottom-10 pointer" onClick={ this.addTag.bind(this,item) }>{item.name}</span>
	                       
	                        )
	                      })
	                    }
	                </div>
	                <GoodPagination data={[this,total]}  pageSize={100}  currentPage={this.getPage.bind(this)}></GoodPagination>
	              </div>
	            </Dialog.Body>
	            <Dialog.Footer className="dialog-footer">
	              	<Button onClick={ this.cancel }>取消</Button>
              		<Button type="primary" onClick={ this.submit }>确定</Button>
	            </Dialog.Footer>
	        </Dialog>
    	</div>
    );
  }
}