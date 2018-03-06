import React from 'react';

export default class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {}
        };
    }

    saveState(event) {
        let obj = {};
        obj[event.target.name] = event.target.value;

        if (this.state.error[event.target.name] && event.target.value) {
            this.state.error[event.target.name] = null;
            this.setState({ error: this.state.error });
        }

        this.setState(obj);
    }
}
