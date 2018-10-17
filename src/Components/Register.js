import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        console.log('hande submit')
    }
    render() {
        return (
            <div className="col-md-12">
                <h1>Register</h1>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    </div>
                </form>
            </div>

        );
    }
}

export default Register;
