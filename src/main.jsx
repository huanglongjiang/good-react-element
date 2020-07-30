import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
/*import Log from './page/log.jsx';
import Slider from './page/slider.jsx';
import Adsense from './page/adsense.jsx';
import Link from './page/link.jsx';
import User from './page/user.jsx';
import Cnzz from './page/cnzz.jsx';
import Index from './page/index.jsx';

import System from './page/system.jsx';*/
import Login from './page/login.jsx';
import Log from './page/log.jsx';
import Root from './page/root.jsx';
import Slider from './page/slider.jsx';
import Adsense from './page/adsense.jsx';
import Link2 from './page/link.jsx';
import User from './page/user.jsx';
import Cnzz from './page/cnzz.jsx';
import Index from './page/index.jsx';
import System from './page/system.jsx';
import Copyright from './page/copyright.jsx';
export default class Main extends React.Component {
/*	constructor(props) {
	    super(props);
	    console.log(props)
	}*/

  render() {
    const data=[1,2,3,4,5,6,7,8,9]
    return (
      <Router>
      <div className="width-max padding-bottom-60" style={{paddingLeft:220,paddingRight:20}}>
        {/*<Slider data={data}></Slider>*/}
        {/*<Adsense data={data}></Adsense>*/}
        {/*<Link data={data}></Link>*/}
        {/*<User data={data}></User>*/}
        {/*<Cnzz data={data}></Cnzz>*/}
        {/*<Index data={data}></Index>*/}
        {/*<Copyright data={data}></Copyright>*/}
        {/*<System></System>*/}
        {/*<Log data={data}></Log>*/}

        <Route exact path="/login" component={Login} data={data} />
        <Route exact path="/log" component={Log} data={data} />
        <Route exact path="/root" component={Root} data={data} />
        <Route exact path="/slider" component={Slider} data={data} />
        <Route exact path="/adsense" component={Adsense} data={data} />
        <Route exact path="/link" component={Link2} data={data} />
        <Route exact path="/user" component={User} data={data} />
        <Route exact path="/cnzz" component={Cnzz} />
        <Route exact path="/index" component={Index} />
        <Route exact path="/system" component={System} />
        <Route exact path="/copyright" component={Copyright} />

      </div>
      </Router>
    );
  }
}