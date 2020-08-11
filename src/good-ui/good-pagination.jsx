import React from 'react';
import { Pagination } from 'element-react';
export default class Pagination2 extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	          currentPage: 0,
	          pageSize: 10,
	    };
	}
    /*onSizeChange=(val)=>{
	    // console.log(`每页 ${val} 条`);
	}*/
	onCurrentChange=(val)=>{
	    // console.log(`当前页: ${val}`);
		this.props.currentPage(val-1);
	    this.setState({
      		currentPage:val
    	});
	}

	render() {
		let currentPage=this.state.currentPage;
		let pageSize=this.props.pageSize==undefined?10:this.props.pageSize;
	    return (
	    	<div className="block align-right margin-top-20">
		      <Pagination layout="total, prev, pager, next, jumper" total={Number.parseInt(this.props.data)} pageSizes={[100, 200, 300, 400]} pageSize={pageSize} currentPage={currentPage} onSizeChange={this.onSizeChange}   onCurrentChange={this.onCurrentChange}/>
		    </div>
	    );
	}
}	