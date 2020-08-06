import React from 'react';
export default class Search extends React.Component {
  render() {

    return (
    	<div className="search-group float-left clearfix">
		      <input type="text" className="input-default float-left border-right" style={{'background':'white'}} placeholder="请输入..." />
		      <div className="search-button-ico float-left fa fa-search"></div>
		</div>
    );
  }
}