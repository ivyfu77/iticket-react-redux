import React from 'react';
import { connect } from "react-redux";
import { fetchEvents1 } from "../../actions/eventActions";
import { fetchEvents } from "../../actions/eventActions";
import { getCurrentCity } from "../../actions/eventActions";
import { changeLocation } from "../../actions/eventActions";
import { getCurrentPosition } from "../../actions/eventActions";
import Event from "./event.jsx";

@connect((store) => {
    return {
        events: store.events.eventsNearby,
        page: store.events.eventsNearbyPage,
        city: store.events.currentCity,
        position: store.events.currentPosition,
        eventsFetching: store.events.fetching,
        eventsFetched: store.events.fetched
    };
})

class LocalEvents extends React.Component{
    componentWillMount() {

    }

    componentDidMount(){
        let self = this;
        try {
            //Get the current location(lat,lng) then get the cityName in the 
            // getCurrentCity callback function, fetch the events at current city
            self.props.dispatch(getCurrentPosition(() => {
                let latlng = self.props.position.lat + "," + self.props.position.lng;
                self.props.dispatch(getCurrentCity(latlng, () => {
                    self.props.dispatch(fetchEvents1(self.props.page, self.props.city));
                }));
            }))
        }
        catch(err) {
            console.error(err);
            self.props.dispatch(fetchEvents1(0, ""));
        }
    }

    componentDidUpdate() {
        //Control showing/hiding the paging buttons
        let pageup = document.getElementsByClassName("events-paging-btn left")[0];
        let pagedown = document.getElementsByClassName("events-paging-btn right")[0];
        if (this.props.page == 0) {
            //Normaly at first page hiding the pageup btn
            pageup.style.visibility ="hidden";
            pagedown.style.visibility = "visible";
            if (this.props.events.hits && 
               (this.props.events.hits.length < 6 || this.props.events.nbHits == 6)) {
                //When there are no more than 6 records totally hide both pageup and pagedown 
                pagedown.style.visibility = "hidden";
            }
        } else if (this.props.page == this.props.events.nbPages-1) {
            //Normaly at last page hiding the pagedown btn and show the pageup btn
            pageup.style.visibility = "visible";
            pagedown.style.visibility = "hidden";
        } else {
            //In the middle pages showing both paging btns
            pageup.style.visibility = "visible";
            pagedown.style.visibility = "visible";
        }
    }

    handlePageUp() {
        let self = this;
        self.props.dispatch(fetchEvents1(self.props.page-1, self.props.city));
    }

    handlePageDown() {
        let self = this;
        self.props.dispatch(fetchEvents1(self.props.page+1, self.props.city));
    }

    handleChangeLocation() {
        let self = this;
        let location = document.getElementById("events-change-location").value;
        console.log(location);
        //After change the location, need to fetch the events for the new city
        self.props.dispatch(changeLocation(location, () => {
            self.props.dispatch(fetchEvents1(0, location));
        }));
    }

    render(){
        var self = this;
        const events = self.props.events.hits;
        const mappedEvents = (events && events.length > 0) ? 
            events.map((event, index) => <Event key={index} data={event} />) 
            : "";
        const dropdownList = (
            <select id="events-change-location" defaultValue="0" onChange={self.handleChangeLocation.bind(self)}>
              <option value="0"  disabled hidden>Change Location</option>
              <option value="Auckland">Auckland</option>
              <option value="Wellington">Wellington</option>
              <option value="Napier">Napier</option>
              <option value="Gore">Gore</option>
              <option value="Tauranga">Tauranga</option>
              <option value="Hamilton">Hamilton</option>
              <option value="Invercargill">Invercargill</option>
              <option value="Dunedin">Dunedin</option>
              <option value="Hastings">Hastings</option>
            </select>
        );
        return(
            <div id="local-events">
                <div className="events-header">
                    <h3>Events Nearby</h3>
                    <div className="events-location">
                        <div className='events-current-locate'>
                            <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                            <span>{self.props.city}</span>
                        </div>
                        {dropdownList}
                        <div className="events-paging">
                            <div className="events-paging-btn left" onClick={self.handlePageUp.bind(self)}>
                                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                            </div>
                            <div className="events-paging-btn right" onClick={self.handlePageDown.bind(self)}>
                                <i className="fa fa-chevron-right" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="events-container">
                    {(events && events.length > 0)? mappedEvents : "Loading..."}
                </div>
            </div>
        );
    }
}

module.exports = LocalEvents;