import React from 'react';
export default class Demo2 extends React.Component {
	constructor(props) {
	    super(props);
	    console.log(props)
	    /*this.state = {isToggleOn: true};*/
	}

  render() {
  	const data=[
	  	{title:'统计'},
	  	{title:'管理'},
	  	{title:'功能'},
	  	{title:'设置'},
	]
	console.log(data)
	const element=data.map((item,index)=>{
		return <li key={index}>{item.title}</li>
	})
    return (
      <div>{element}</div>
    );
  }
}