import React from 'react';
export default class Total extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	          value:'',
	    };
	}
	onTag=(item)=>{
    	this.props.type(item,this.props.data.type);
    	this.setState({value:item})
	}
  render() {
  	let dataValue=this.state.value;
    return (
    	<div className="layout">
    		<div class="tag-group border-0 tag-group-type">
				<span className="tag-type inline-block width-100 align-right">{this.props.data.title}：</span> 
				<a className={`tag-block ${dataValue===''?'tag-primary':''}`} onClick={this.onTag.bind(this,'')}>全部</a> 
				{
					this.props.data.list.map((item,index)=>{
						return <a className={`tag-block ${dataValue===index?'tag-primary':''}`} onClick={this.onTag.bind(this,index)}>{ item }</a>
					})
				}
			</div>
    	</div>
    );
  }
}