import React from 'react'
import Vector from '../images/Vector.svg';
import './SingleEvent.css';

function SingleEvent(props) {
    return (
        <div className="singleEventContainer">
            <div className="singleEventContent">
                <div class="singleEventTitle">
                    {/* <label>Title:</label> */}
                {props.event.title}</div> 
                <div className="singleEventDate">
            {props.event.date}
            </div>
                <div className="singleEventDesc">
                {/* <label>Description:</label> */}
                {props.event.desc}
            </div>
            </div>

            <div  className="deleteDiv" onClick={(e)=>props.func(props.index)}><img src={Vector} alt="Image"/></div>

        </div>
    )
}

export default SingleEvent
