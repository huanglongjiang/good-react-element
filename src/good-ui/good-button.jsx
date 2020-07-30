import React from 'react';
export default class Buton extends React.Component {

	add=()=>{
		this.props.add(true);
	}
	  render() {

	    return (
		    <button className={`button button-md button-success ${this.props.goodclass}`} onClick={ this.add }>
		    	{	
			    	this.props.icon==null?'':
			    	<i className={`button-ico fa ${this.props.icon}`}></i>
			    }
			    {this.props.title}
		    </button>
	    );
	  }
}