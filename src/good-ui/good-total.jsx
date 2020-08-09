import React from 'react';
export default class Total extends React.Component {
  render() {
    return (
    	<div className="float-right line-height-34">
			共<span className="padding-left-5 padding-right-5 color-red" style={{color:'#20A0FF'}}>{this.props.total}</span>条数据
    	</div>
    );
  }
}