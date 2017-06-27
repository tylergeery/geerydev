import React from 'react';
import classNames from 'classnames';

export default class Panel extends React.Component {
    render() {
        return <div className={classNames("double mb-20 pt-15", {
                'puke': this.props.activePanel === 'question',
                'green': this.props.activePanel === 'information',
                'nasty': this.props.activePanel === 'filter' })}>
            {this.props.panelSuccess
                ? <p className="black-back white">this.props.panelSuccess</p>
                : ''
            }
            <div className="silver-back round pull-right double center hover-black point min-h100 max33" onClick={this.props.onTypeClick.bind(this, 'information')}>i</div>
            <div className="silver-back round pull-right double center hover-black point min-h100 max33" onClick={this.props.onTypeClick.bind(this, 'question')}>?</div>
            <div className="silver-back round pull-right double center hover-black point min-h100 max33" onClick={this.props.onTypeClick.bind(this, 'filter')}>+</div>

            <form onSubmit={this.props.subscribe} className={classNames("form-group px16 pad-box", {'hide': this.props.activePanel !== 'filter'})}>
                Get Emails for New posts...
                <input className="form-control subscribe" type="email" placeholder="Email" />
                <button type="submit" className="subscribe-button">Subscribe</button>
            </form>
            <form onSubmit={this.props.ask} className={classNames("form-group px16 pad-box", {'hide': this.props.activePanel !== 'question'})}>
                Provoke me...
                <textarea className="min300 form-control dubs" placeholder="Ask me a question..." ng-model="blog.question"></textarea>
                <input className="form-control m10" type="text" ng-model="blog.name" placeholder="Anonymous" />
                <input className="form-control m10" type="text" ng-model="blog.email" placeholder="Email (Optional)" />
                <button type="submit" className="subscribe-button">Ask</button>
            </form>
            <div className={classNames("form-group px16", {'hide': this.props.activePanel !== 'information'})}>
                <div className="col-xs-2 flag-pic">
                    <img src="images/1ef279e9.flag.png" />
                </div>
                <div className="col-xs-10">
                    <p>I take a slightly different approach to blogging.  Instead of me rambling on about the uselessness of box springs, I would like readers to pick the subject. Lastly, I do not support/save users because I would like anybody & everybody to share their thoughts in comments.</p>
                    <br />
                    <p>Rules of the blog</p>

                    <ul className="indent bold">
                        <li>Comments are mandatory</li>
                        <li>Do not say anything i have to delete</li>
                        <li>Ask me questions , about anything... </li>
                        <li>Never stop learning</li>
                        <li>Troll as long as its entertaining.. to me</li>
                    </ul>
                </div>
            </div>
            <div className={classNames("lh-100 bold special", {'clear white-back': this.props.activePanel})}>
                Sort:
                <select name="sort" onChange={this.props.onSortSelect} defaultValue="created">
                    {this.props.panelFilters.map(function(filter, i) {
                        return <option key={i} value={filter.value}>{filter.name}</option>
                    })}
                </select>
            </div>
        </div>
    }
};
