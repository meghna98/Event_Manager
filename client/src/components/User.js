import React, { Component } from 'react'
import NavBar from './NavBar';
import axios from 'axios';
import SingleEvent from './SingleEvent'; 
import './User.css';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import PageLoader from './PageLoader';

export class User extends Component {
    constructor(){
        super()
        this.state = {
            eventDetails:[],
            title:"",
            desc:"",
            date: new Date(),
            loading:false
        }
    }

    componentDidMount(){
        this.setState({loading:true})
        const jwt = localStorage.getItem('auth_token')
        axios.get('/check/events',{headers:{auth_token:jwt}})
        .then(response=>{
            if(response.data){
                // console.log(response.data)
                this.setState({eventDetails:response.data,loading:false})
            }
            this.setState({loading:false})
        })
    }

    deleteEvent = (index)=>{
        this.setState({loading:true})
        const jwt = localStorage.getItem('auth_token')
        const item= {
            id:this.state.eventDetails[index]._id
        }
        axios.post('/check/events/delete',item,{headers:{auth_token:jwt}})
        .then(response=>{
            if(response.data){
                let [...updatedList] = this.state.eventDetails
                updatedList.splice(index,1)
                this.setState({eventDetails:updatedList,loading:false})
            }
            else
                this.setState({loading:false})
        })
    }

    handleChange = (e)=>{
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    dateChange = (e)=>{
        // console.log('Came to date picker')
        this.setState({date:e})
        // console.log(typeof this.state.date,this.state.date.getDate())
    }

    formSubmit = (e)=>{
        e.preventDefault()
        const {title,desc,date} = this.state
        if(!title || !desc){
            if(!title)
                document.myForm.title.focus()
            else
                document.myForm.desc.focus()
            return
        }
        const dd = date.getDate()
        const mm = date.getMonth()+1
        const yyyy = date.getFullYear()
        const finalDate= `${dd}/${mm}/${yyyy}`
        // console.log(finalDate)    
        // console.log('came here with state = ',this.state)
        const jwt = localStorage.getItem('auth_token')
        const details = {
            title:title,
            desc:desc,
            date:finalDate
        }
        axios.post('/check/events/add',details,{headers:{auth_token:jwt}})
        .then(response=>{
            if(response.data){
                let [...updatedList] = this.state.eventDetails
                updatedList.push(details)
                this.setState({eventDetails:updatedList,title:"",desc:""})
            }      
        })
    }
    render() {
        return (
            <div>
                <NavBar links={['Events','Sign Out']} shadow={true}/>
                {
                    this.state.loading
                    ?<PageLoader/>
                    :
                    <div className="eventContainer">
                <div className="eventHeading">Manage Events...</div>
                <div className="eventBox">
                    {
                        this.state.eventDetails.length>0?this.state.eventDetails.map((event,index)=>{
                            return (<SingleEvent event={event} index = {index} func={this.deleteEvent}/>)
                            
                        }):null
                    
                    }
                </div>
                <div className="inputEventContainer">
                    <form className="eventForm" name="myForm" onSubmit={this.formSubmit}>
                        <label>Event Title</label><br/>
                        <input type="text" autoComplete="off"
                        name="title"
                        value={this.state.title}
                        placeholder="Enter event title"
                        onChange={this.handleChange}
                        /><br/>
                        <label>Event Date</label><br/>
                        <div className="datePickerDiv">
                        <DatePicker className="datePicker"
                        selected={this.state.date}
                        onChange={this.dateChange}
                        dateFormat='dd/MM/yyyy'
                        minDate={new Date()}
                        showYearDropdown
                        scrollableMonthYearDropdown
                        />
                        </div>
                        <br/>
                        
                        <label>Event Description</label><br/>
                        <input type="text" autoComplete="off"
                        name="desc"
                        value={this.state.desc}
                        placeholder="Enter event description"
                        onChange={this.handleChange}
                        /><br/>
                        <button className="addBtn" type="submit">+</button>
                    </form>
                </div>               
            </div>
                }
            </div>
        )
    }
}

export default User
