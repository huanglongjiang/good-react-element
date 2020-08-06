import React from 'react';
export default class Search extends React.Component {
  render() {

    return (
    	<td width="120" className="align-right height-50 font-size-14 padding-right-10">{ this.props.title }</td>
    );
  }
}