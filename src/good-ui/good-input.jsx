import React from 'react';
export default class Buton extends React.Component {
  render() {

    return (
	    <input type="text" disabled={ this.props.disabled } className="input-default width-400" placeholder="请输入..." style={{'background':'#fff'}} />
    );
  }
}