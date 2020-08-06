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
	    return (
	    	<div className="block align-right margin-top-20">
		      <Pagination layout="total, prev, pager, next, jumper" total={Number.parseInt(this.props.data)} pageSize={10} currentPage={currentPage} onSizeChange={this.onSizeChange}   onCurrentChange={this.onCurrentChange}/>
		    </div>
	    );
	}
}	