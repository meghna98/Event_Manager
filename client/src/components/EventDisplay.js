import React, { useState,useRef } from 'react';
import dropDown from '../images/dropDown.svg';
import './eventDisplay.css';

function EventDisplay(props) {
    const [height, setheight] = useState("0px")
    const content = useRef(null)
    function toggleHeight(open){
        setheight(open?`${content.current.scrollHeight}px`:'0px')
    }
    return (
        <div className={'eventcontainer '+(props.event.open?'open':'')}>
            <div className="eventHead">
                <div className="eventTitle">
                    {props.event.title}
                </div>
                <div className="eventDrop" onClick={(e)=>{props.func(props.index);toggleHeight(props.event.open)}}>
                    <img src={dropDown} alt="dropDown"/>
                </div>
            </div>
            <div className="eventDate">{props.event.date}</div> 
            <div className="eventDetail" ref={content} 
            style={{maxHeight:`${height}`}}
            >{props.event.desc}</div>            
        </div>
    )
}

export default EventDisplay
