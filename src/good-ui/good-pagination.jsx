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

    onSizeChange=(val)=>{
	    //console.log(`每页 ${val} 条`);
	    this.setState({
      		currentPage:0,
      		pageSize:val,
    	},()=>{
    		const data={currentPage:0,pageSize:this.state.pageSize}
    		this.props.currentPage(data);
    	});
	}
	onCurrentChange=(val)=>{
	    //console.log(`当前页: ${val}`);
	    this.setState({
      		currentPage:val,
      		pageSize: this.props.data[0].state.page.pageSize,
    	},()=>{
    		const data={currentPage:this.state.currentPage-1,pageSize:this.state.pageSize}
    		this.props.currentPage(data);
    	});
	}

	render() {

		let currentPage=this.state.currentPage;
		let pageSize=this.props.pageSize==undefined?this.state.pageSize:this.state.pageSize;
		let total=this.props.data[1]?parseInt(this.props.data[1]):0;

		let pageSizes=this.props.pageSize==undefined?[10, 20, 30, 40]:
					 this.props.pageSize==100?[100,200]:[250,500];


	    return (
	    	<div className="block align-right margin-top-20">
				<Pagination layout="total,sizes, prev, pager, next, jumper" total={ total } pageSizes={ pageSizes } pageSize={pageSize} currentPage={currentPage} onSizeChange={this.onSizeChange}   onCurrentChange={this.onCurrentChange}/>
	    		

	    	
		    </div>
	    );
	}
}	