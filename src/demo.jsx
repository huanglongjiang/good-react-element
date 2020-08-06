import React from 'react';
import Demo2 from './demo2.jsx';

export default class Demo extends React.Component {
	constructor(props) {
	    super(props);
	    console.log(props)
	    /*this.state = {isToggleOn: true};*/
	}

  render() {
  	const element=<li>99999999</li>
    return (
      <ul>
		<Demo2 />
      </ul>
    );
  }
}
