import React from 'react';
/*import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom"*/
import { HashRouter as Router, Route, Link,Switch } from "react-router-dom"
/*import Log from './page/log.jsx';
import Slider from './page/slider.jsx';
import Adsense from './page/adsense.jsx';
import Link from './page/link.jsx';
import User from './page/user.jsx';
import Cnzz from './page/cnzz.jsx';
import Index from './page/index.jsx';

import System from './page/system.jsx';*/
import Index from './page/index.jsx';
import Log from './page/log.jsx';
import Tag from './page/tag.jsx';
import Help from './page/help.jsx';
import Bbs from './page/bbs.jsx';
import Keywords from './page/keywords.jsx';
import Article from './page/article.jsx';
import ArticleAction from './page/article_action.jsx';
import Root from './page/root.jsx';
import Slider from './page/slider.jsx';
import Adsense from './page/adsense.jsx';
import Link2 from './page/link.jsx';
import User from './page/user.jsx';
import Cnzz from './page/cnzz.jsx';
import seoIndex from './page/seo_index.jsx';
import System from './page/system.jsx';
import Copyright from './page/copyright.jsx';

export default class Main extends React.Component {
/*	constructor(props) {
	    super(props);
	    console.log(props)
	}*/

  render() {
    return (
      <div className="width-max padding-bottom-60" style={{paddingLeft:220,paddingRight:20}}>
      <Router>
        {/*<Slider></Slider>*/}
        {/*<Adsense></Adsense>*/}
        {/*<Link></Link>*/}
        {/*<User></User>*/}
        {/*<Cnzz></Cnzz>*/}
        {/*<Index></Index>*/}
        {/*<Copyright></Copyright>*/}
        {/*<System></System>*/}
        {/*<Log></Log>*/}
        {/*<Route exact path="/article_action" component={ArticleAction} />*/}
        {/*<Route strict exact path="/article_action" component={ArticleAction} />*/}
        <Switch>
        <Route strict exact path="/article_action" component={ArticleAction} />
        <Route strict exact path="/index" component={Index} />
        <Route strict exact path="/log" component={Log} />
        <Route exact path="/root" component={Root} />
        <Route exact path="/tag" component={Tag} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/bbs" component={Bbs} />
        <Route exact path="/keywords" component={Keywords} />
        <Route exact path="/article" component={Article} />
        <Route exact path="/slider" component={Slider} />
        <Route exact path="/adsense" component={Adsense} />
        <Route exact path="/link" component={Link2} />
        <Route exact path="/user" component={User} />
        <Route exact path="/cnzz" component={Cnzz} />
        <Route exact path="/soe_index" component={seoIndex} />
        <Route exact path="/system" component={System} />
        <Route exact path="/copyright" component={Copyright} />
        <Route component={Index} />
        </Switch>

      </Router>
      </div>
    );
  }
}