import React from 'react';
export default class Header extends React.Component {
	/*constructor(props) {
	    super(props);
	    console.log(props)
	}*/

  render() {
  	const data=[
	  	{
	  		title:'统计',
	  		icon:'fa fa-tachometer',
	  		children:[
		  		{title:'登录日志'},
	  		]
	  	},
	  	{
	  		title:'管理',
	  		icon:'fa fa-folder-open',
	  		children:[
		  		{title:'栏目中心'},
		  		{title:'标签中心'},
		  		{title:'关键词库'},
		  		{title:'文章中心'},
		  		{title:'用户管理'},
		  		{title:'友情链接'},
		  		{title:'广告管理'},
		  		{title:'图片轮播'},
	  		]
	  	},
	  	{
	  		title:'功能',
	  		icon:'fa fa-windows',
	  		children:[
		  		{title:'留言板'},
		  		{title:'客服信息'},
		  		{title:'站长统计'},
		  		{title:'页面静态化'},
	  		]
	  	},
	  	{
	  		title:'设置',
	  		icon:'fa fa-cogs',
	  		children:[
		  		{title:'首页SEO'},
		  		{title:'版权信息'},
		  		{title:'常规选项'},
		  		{title:'用户管理权限'},
	  		]
	  	},
	]

	function Children(props){
		const element2=props.children.map((item,index)=>{
			return <li className="line-height-36 padding-left-30 color-333" key={index}>{item.title}</li>
		})
		
		return (
			<ul>{element2}</ul>
		)
	}

	const element=data.map((item,index)=>{
		return (
			<ul>
				<li className="line-height-36" key={index}>
					<i className={`padding-right-10 color-999 ${ item.icon}`}></i>
					{item.title}
				</li>
				<Children children={item.children}></Children>
			</ul>
		)
	})

    return (
      <div className="width-max height-60 background-white" style={{'boxShadow':'0 0 1px rgba(0,0,0,0.25)'}}>
		<div className="position-a clearfix line-height-60">

			<span className="color-success float-left font-size-24 bold padding-left-30 padding-right-30"><i className="fa fa-yelp"></i>goodCms</span>
			<a target="_blank" className="none-line float-left color-333">
				<img src="http://www.good1230.com/dist/server/images/user/1538401389.jpg" 
			className="width-30 height-30 margin-top-15 radius-20 float-left" />
				<span className=" margin-left-20">Lucie1</span>
			</a>
		</div>
      </div>
    );
  }
}