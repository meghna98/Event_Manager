import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export class SignOut extends Component {
    componentDidMount(){
        localStorage.removeItem('auth_token');
    }
    render() {
        return (
            <div>
                <Redirect to='/'/>
            </div>
        )
    }
}

export default SignOut
