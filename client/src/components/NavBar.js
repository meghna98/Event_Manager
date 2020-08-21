import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

export class NavBar extends Component {
    render() {
        return (
    <div className="navBarContainer" style={{boxShadow:this.props.shadow?'0px 0px 7px 3px rgb(31, 31, 31)':'none'}}>
                <div className="navBar">
                    {
                        this.props.links.map(link=>{
                            let mylink = link.replace(' ','')
                            // console.log(mylink)
                            return (
                                <div className="navLinkDiv">
                                    <Link className="navLink" to={`/${mylink}`}>{link.toUpperCase()}</Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default NavBar
