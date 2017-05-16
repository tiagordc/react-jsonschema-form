
import React, { Component } from "react";

export default class PeopleWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {...props.formData};
    }

    render() {
        return <input type="text" id={this.props.id} />;
    }

}