import React, { Component } from 'react'
import NavBar from './NavBar'
// import Login from './Login'

export class Main extends Component {
    componentDidMount(){
        localStorage.removeItem('auth_token');
    }
    render() {
        return (
            <div className="d-flex flex-column align-items-center">
                <NavBar links={['login','register']}/>
                {/* <Login /> */}
            </div>
        )
    }
}

export default Main
