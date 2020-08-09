import React from 'react';
export default class Search extends React.Component {
  render() {

    return (
    	<div className="width-max padding-bottom-60 color-999  font-size-12" style={{paddingLeft:220,paddingRight:20}}>
    		<div className="border-bottom-1 border-ddd padding-bottom-10">
    			<span>相关平台：</span>
    			<span>good系统-vue(1)</span>
    			<span className="padding-left-10 padding-right-10 color-ccc">|</span>
    			<span>good系统-vue(2)</span>
    			<span className="padding-left-10 padding-right-10 color-ccc">|</span>
    			<span>good系统-vue(3)</span>
    			<span className="padding-left-10 padding-right-10 color-ccc">|</span>
    			<span>good系统-react(1)</span>
    			<span className="padding-left-10 padding-right-10 color-ccc">|</span>
    			<span>关于good1230.com个人博客网站</span>
    		</div>
    		<div className=" margin-top-10">
	    		Copyright © 2018-2020 Good1230.com. All Rights Reserved.
	    	</div>
    	</div>

    );
  }
}