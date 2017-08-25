import React from 'react';
import {Link} from 'react-router-dom';
import {setEvent} from '../../actions/eventActions';
import { connect } from 'react-redux';

@connect((store) =>{
    return{
        event: store.event.event
    } 
})

class Event extends React.Component{

    hitLink(event){
        this.props.dispatch(setEvent(event));
    }

    render(){
        var self = this;
        let event = self.props.data;

        let url = event.image.replace("270_315", "800_400");
        const length = event.showings.length;
        let startDate, endDate, dateString;
        if (length > 1) {
            startDate = (new Date(event.showings[0]*1000)).toDateString();
            endDate = (new Date(event.showings[length-1]*1000)).toDateString();
            dateString = startDate.substring(0, startDate.length-5) + " - " + endDate;
        } else if (length == 1) {
            dateString = (new Date(event.showings[0]*1000)).toDateString();
        } else {
            dateString = "";
        }

        return(
            <div className="event-item-small">
                <Link to={self.props.data.url} onClick={() => self.hitLink(self.props.data)}>
                    <div>
                        <img className="event-img" src={url + "?w=200"} />
                        <h5>
                            <p>{event.eventName}</p>
                            <i className="fa fa-heart-o"></i>
                        </h5>
                        <p className="event-date">{dateString}</p>
                        <p className="event-location">{event.cityName}</p>
                    </div>
                </Link>
            </div>
        );
    }
}

module.exports = Event;