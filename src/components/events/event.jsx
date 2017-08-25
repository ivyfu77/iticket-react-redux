import React from 'react';
import {Link} from 'react-router-dom'
import {getEvent} from '../../actions/eventActions'
import { connect } from 'react-redux'

@connect((store) =>{
    return{
        event: store.event.event
    }
    
})
class Event extends React.Component{
    
    componentWillMount(){
        var self = this;
        //self.props.dispatch(getEvent()); 
        //Don't need use getEvent to get the event in store, by @connect can direcly use it as a props
    }
        
    render(){
        return(
            <div>
                <div>
                    <span>Event Name:&nbsp;</span>
                    <span>{this.props.event.eventName}</span>
                </div>
                <div>
                    <span>Venue:&nbsp;</span>
                    <span>{this.props.event.venueName}</span>
                </div>
            </div>
            )
    }
    
}

module.exports = Event;