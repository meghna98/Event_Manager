import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventDisplay from './EventDisplay';
import NavBar from './NavBar';
import './eventList.css';
import PageLoader from './PageLoader';
import empty from '../images/empty.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'


const noFile = <FontAwesomeIcon icon={faFileAlt} size="7x" color="grey"/>

function EventList() {
    const [loading, setLoading] = useState(false)
    const [update, setupdate] = useState(true)
    const [eventDetails,setEvents] = useState([])
    useEffect(() => {
        setLoading(true)
        const jwt = localStorage.getItem('auth_token');
        axios.get('/check/events',{headers:{auth_token:jwt}})
        .then(response=>{
            if(response.data){
            let [...updatedList] = response.data
            updatedList = updatedList.map(event=>{
                event.open = false
                return event
            })
            setEvents(updatedList)
            
        }
        setLoading(false)
        })
    }, [update])

    function toggleOpen(index){
        let [...updatedList] = eventDetails
        updatedList[index].open = !updatedList[index].open
        setEvents(updatedList)
    }
    return (
        <div>
            <NavBar links={['Manage Events','Sign Out']} shadow={true}/>
            {
                loading
                ?<PageLoader/>
                :
                <div className="eventListContainer">
                <div className="eventListHeading">
                    <h2>Event List</h2>
                </div>
                <div className="eventList">
                    {
                        eventDetails.length>0?eventDetails.map((event,index)=>{
                            return (<EventDisplay event={event} index={index} func={toggleOpen}/>)
                        })
                        :
                        <div className="noEventsContainer">
                            <div className="noEventsIcon">{noFile}</div>
                            <div className="noEvents">No Events Added</div>
                        </div>
                    }
                </div>
                </div>
            }
       
        </div>
    )
}

export default EventList

