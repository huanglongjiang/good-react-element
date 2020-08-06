import React from 'react';
import ReactDOM from 'react-dom';
export default class Search extends React.Component {
  	componentWillMount(){
  		window.addEventListener('scroll',this.scroll,true)
  	}

  	scroll=()=>{
  		let scrollNow = window.pageYOffset;
        let pageClientHeight = document.documentElement.clientHeight;

        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        ) - pageClientHeight; // Full Window Height minus the viewport height
        
        let fullWindowHeightInPercentage = Math.round(
            (scrollNow / scrollHeight) * 100 
        );
        console.log(fullWindowHeightInPercentage)
       	let percentage = document.getElementById('percentage');
       	percentage.style.width = fullWindowHeightInPercentage + '%';
  	}
  	
	render() {
	    return (
	    	<div className="z-index-100 position-f left-0 top-0 width-max z-index-100">
				<span className="background-primary" id="percentage" style={{background:"#f59e00"}}></span>
			</div>
	    );
	}
}