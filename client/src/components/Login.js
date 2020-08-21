import React, { Component } from 'react';
import './login.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import "react-datepicker/dist/react-datepicker.css";


export class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:"",
            password:"",
            error:"",
            date:new Date()
        }
    }
    componentDidMount(){
        localStorage.removeItem('auth_token')
    }
    handleChange = (e)=>{
        const {name,value} = e.target
        this.setState({[name]:value});
    }

    formSubmit = (e)=>{
        e.preventDefault()
        const details = {
            email:this.state.email,
            password:this.state.password
        }
        axios.post('/login',details)
        .then(response=>{
            if(response.data=='1'){
                // console.log(response.headers)
                localStorage.setItem('auth_token',response.headers['auth_token'])
                this.setState({error:'0'})
            }
            else{
                this.setState({error:response.data})
            }
                
        })
    }
    render() {
        const flag = this.state.error==='0'?true:false
            return (
            <div className="wrapper">
                <NavBar links={['login','register']}/>
                {flag?<Redirect to='/events'/>:
                <div className="loginContainer">
                <div className="loginCard">
                    <div className="loginHeading">
                        <h1>USER LOGIN</h1></div>
                    <div className="loginContent">
                        <form onSubmit={this.formSubmit}>
                            <p>{this.state.error}</p>
                            <label>Email</label><br/>
                            <input type="email"
                                name="email"
                                autoComplete="off"
                                value={this.state.email}
                                placeholder="Enter Email-Id"
                                onChange={this.handleChange}
                                required
                            /><br/><br/>
                            <label>Password</label><br/>
                            <input type="password"
                                name="password"
                                autoComplete="off"
                                value={this.state.password}
                                placeholder="Enter password"
                                onChange={this.handleChange}
                                required
                            /><br/><br/>
                            <button type="submit" className="loginSubmit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            
                }
            </div>
        )
    }
}

export default Login
