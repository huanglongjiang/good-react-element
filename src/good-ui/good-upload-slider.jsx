import React from 'react';
import VueAxios from "vue-axios";
import { Upload,Message } from 'element-react';
export default class Upload2 extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
	    imageUrl: '',
	  };
	}

	handleAvatarScucess(res, file) {
	  this.setState({ imageUrl: URL.createObjectURL(file.raw) });
	  this.props.image(file.response);
	}

	beforeAvatarUpload(file) {
	  const isJPG = file.type === 'image/jpeg';
	  const isLt2M = file.size / 1024 / 1024 < 2;

	  if (!isJPG) {
	    Message('上传头像图片只能是 JPG 格式!');
	  }
	  if (!isLt2M) {
	    Message('上传头像图片大小不能超过 2MB!');
	  }
	  return isJPG && isLt2M;
	}


	render() {
		let imageUrl='';
		if(this.state.imageUrl==''){
			imageUrl =`http://www.good1230.com/dist/server/images/adsense/${this.props.url}`
		}else{
			imageUrl= this.state.imageUrl;
		}
		
	  
	  return (
	    <Upload
	      className="avatar-uploader"
	      action="dist/server/fileupload.php?type=u3"
	      showFileList={false}
	      onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
	      beforeUpload={file => this.beforeAvatarUpload(file)}
	    >
	      { imageUrl ? <img src={imageUrl} className="avatar" /> : <i className="el-icon-plus avatar-uploader-icon"></i> }
	    </Upload>
	  )
	}
}