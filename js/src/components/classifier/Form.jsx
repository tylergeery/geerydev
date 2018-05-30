import React from 'react';
import FormComponent from '../common/FormComponent';
import classNames from 'classnames';

class FormClassifier extends FormComponent {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.saveState = this.saveState.bind(this);
    }

    render() {
        return (
            <div className="row">
                <h1 className="center pad-box">GeeryDev vs ThrowingItBackWeekly</h1>
                <section className={classNames('pad-box gd-classifier-explanation', { hidden: !this.props.explain })}>
                    Type a query into the search box below and confirm your suspicions about the vocabulary
                    used on geerydev.com and throwingitbackweekly.com. Try being more specific, more vague, more slang,
                    more formal, more sporty. See what you can find.
                </section>
                <form className="pad-box" onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <input type="text" onKeyUp={this.saveState} className="form-control form-control-lg" name="query" defaultValue="" placeholder="Search who said it" />
                    </div>
                    <div className="form-group center">
                        <button type="submit" className="btn btn-primary">Analyze</button>
                    </div>
                </form>
                <div className={classNames('pad-box', 'gd-classifier-results-container', { stealth: !this.props.resultsActive })}>
                    <table>
                    <tbody>
                        {this.props.results.map(result => (
                            <tr key={result.query + result.quip}>
                                <td width="35%">{result.query}</td>
                                <td width="65%">{result.quip}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <section className={classNames('pad-box gd-classifier-explanation', { hidden: (!this.props.explain || !!this.props.results.length) })}>
                    I will make my decisions here...
                </section>
            </div>
        );
    }

    formSubmit(event) {
        event.preventDefault();

        this.props.classify(this.state.query);
    }
}

export default FormClassifier;
