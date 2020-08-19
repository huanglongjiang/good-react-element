import React from 'react';
import store from './index.js'
import { Input } from 'element-react';
import { changeInputAction } from './actionCreators'
export default class Search extends React.Component {
	constructor(props){
	    super(props)
	    this.state=store.getState();
    	store.subscribe(this.storeChange) //订阅Redux的状态
	}



	onChange=(item,value)=>{
	    const action = changeInputAction(value)
	    store.dispatch(action)
	}
	storeChange=()=>{
	     this.setState(store.getState())
	}
	render() {
		return (
			<div className="margin-50">{this.state.list}
			<Input type="text" className="width-400" value={this.state.inputValue}  onChange={this.onChange.bind(this,'name')} />
			</div>
		);
	}
}