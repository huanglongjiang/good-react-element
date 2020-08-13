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
    	<span className="padding-1 padding-left-5 padding-right-5 radius-30 background-danger font-size-12" style={{color:'white'}}>{this.props.data}</span>
    );
  }
}