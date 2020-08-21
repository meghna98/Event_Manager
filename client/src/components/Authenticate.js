import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PageLoader from './PageLoader';

export class Authenticate extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:undefined
        }
    }
    componentDidMount(){
        this.setState({user:undefined})
        const jwt = localStorage.getItem('auth_token')
        // console.log('authenticate mai jwt = ',jwt)
        if(!jwt){
            // console.log('came here')
            this.props.history.push('/')
            return
        }

        axios.get('/check',{headers:{auth_token:jwt}})
        .then(response=>{
            // console.log('authenticate',response.data)
            if(response.data==0){
                localStorage.removeItem('auth_token')
                this.props.history.push('/')
            }   
            else{
                this.setState({user:response.data})
            }
        })
        .catch(err=>{
            localStorage.removeItem('auth_token')
            this.props.history.push('/')
        })
    }
    render() {
            if(this.state.user===undefined)
                return(<div><PageLoader/></div>)    
            else
                return(
                <div>
                    {this.props.children}
                </div>
            )
    }
}

export default withRouter(Authenticate);
