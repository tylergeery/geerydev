import React from 'react';
import classNames from 'classnames';

export default class NavBar extends React.Component {
    render() {
        return <div className="col-xs-12 col-md-8 navbar quote">
    		<div className="col-xs-3 p-xs-none pointer hide-small">
    			<a className={classNames('head-nav pointer')} onClick={this.props.onNavClick}>
    				<img className="pointer" src="images/2c29248d.nav-icon.png" />
    			</a>
    		</div>

    		<div className={classNames("col-xs-4 col-sm-3 p-xs-none pointer ani-nav", {'gdhide': !this.props.showNav})}>
    			<a className="full-width support-nav" href="/requests">
    				<img className="deux" src="images/03980826.blog.png" />
    			</a>
    		</div>
    		<div className={classNames("col-xs-4 col-sm-3 p-xs-none pointer ani-nav-deux", {gdhide: !this.props.showNav})}>
    			<a className="full-width support-nav" href="/portfolio">
    				<img className="un" src="images/ef9707c1.portfolio.png" />
    			</a>
    		</div>
    		<div className={classNames("col-xs-4 col-sm-3 p-xs-none pointer ani-nav-tre", {gdhide: !this.props.showNav})}>
    			<a className="full-width support-nav tre" href="/about">
    				<img className="tre" src="images/6526dd7f.about.png" />
    			</a>
    		</div>
    		<div className={classNames("col-xs-12 col-sm-9 col-lg-9 ani-quote", {gdhide: this.props.showNav})}>
    			<p>{this.props.quote.content}
                    <br />
                    <span className="quote-darker">- {this.props.quote.author}</span>
                </p>
    		</div>
    	</div>
    }
};
