import React from 'react';
import { Switch } from 'element-react';
export default class Breadbar extends React.Component {
  changeStatus=(value)=>{
    let status=value?0:1;
    const data={ 
        id:this.props.item.id,
        status:status
      }
    this.props.status(data);
  }


  render() {
    let status=this.props.item.status==0?false:true;
    console.log(this.props.disabled)
    return (
    	<Switch
        value={status}
        onColor="#13ce66" disabled={this.props.disabled}
        offColor="#e6effb" onChange={this.changeStatus}
        >
      </Switch>
    );
  }
}