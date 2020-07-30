import React from 'react';
import { Pagination } from 'element-react';
export default class Pagination2 extends React.Component {
	/*constructor(props) {
	    super(props);
	    console.log(props)
	}*/

  render() {
    return (
    	<div className="block align-right margin-top-20">
	      <Pagination layout="total, sizes, prev, pager, next, jumper" total={this.props.data.total} pageSizes={[100, 200, 300, 400]} pageSize={100} currentPage={5}/>
	    </div>
    );
  }
}