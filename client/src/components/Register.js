import React, { Component } from 'react'
import NavBar from './NavBar'
import './Register.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PageLoader from './PageLoader';

export class Register extends Component {
    constructor(){
        super()
        this.state={
            name:"",
            email:"",
            password:"",
            cPassword:"",
            error:"",
            redirect:"",
            loading:false
        }
    }
    handleChange = (e)=>{
        const {name,value} = e.target
        this.setState({[name]:value})
        // console.log(this.state)
    }
    formSubmit = (e)=>{
        e.preventDefault()
        this.setState({loading:true})
        if(this.state.cPassword!==this.state.password){
            this.setState({error:"Passwords do not match"})
            return
        }
        const details = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        
        axios.post('/register',details)
        .then(response=>{
            // console.log(response.data)
            if(response.data!='1')
                this.setState({error:response.data,loading:false})
            else
                this.setState({redirect:'login',loading:false})
        })


    }
    render() {
        if(this.state.redirect==='login')
            return(<Redirect to={`${this.state.redirect}`}/>)
        else
            return (
            <div className="wrapper">
                <NavBar links={['login','register']}/>
                {
                    this.state.loading?<PageLoader/>:
                    <div className="registerContainer">
                    <div className="registerCard">
                        <div className="registerHeading">
                            <h1>Register User</h1>
                        </div>
                        <div className="registerContent">
                            <form onSubmit={this.formSubmit}>
                            <p>{this.state.error}</p>
                            <label>User Name</label><br/>
                            <input type="text"
                                name="name"
                                autoComplete="off"
                                value={this.state.name}
                                placeholder="Enter your name"
                                onChange={this.handleChange}
                                required
                            /><br/>
                            <label>Email</label><br/>
                            <input type="email"
                                name="email"
                                autoComplete="off"
                                value={this.state.email}
                                placeholder="Enter Email-Id"
                                onChange={this.handleChange}
                                required
                            /><br/>
                            <label>Password (min 6 characters)</label><br/>
                            <input type="password"
                                name="password"
                                autoComplete="off"
                                value={this.state.password}
                                placeholder="Enter Password"
                                onChange={this.handleChange}
                                required
                            /><br/>
                            <label>Confirm Password</label><br/>
                            <input type="password"
                                name="cPassword"
                                autoComplete="off"
                                value={this.state.cPassword}
                                placeholder="Re-enter password"
                                onChange={this.handleChange}
                                required
                            /><br/><br/>
                            <button type="submit" className="loginSubmit">Register Me</button>
                            </form>
                        </div>
                    </div>

                </div>
                }
                
            </div>
        )
    }
}

export default Register
