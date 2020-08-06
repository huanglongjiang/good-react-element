import React from 'react';
export default class Breadbar extends React.Component {
  render() {
    return (
    	<div className="margin-top-10 margin-bottom-10">
			<ol className="breadbar">
			  <li><a>个人博客日常笔记</a></li>
			  <li><a>{this.props.title}</a></li>
			</ol>
    	</div>
    );
  }
}