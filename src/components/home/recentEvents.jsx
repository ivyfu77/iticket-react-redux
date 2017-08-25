import React from 'react';
import { connect } from "react-redux";
import { fetchEvents1 } from "../../actions/eventActions";
import { getRecentEvents } from "../../actions/eventActions";

import Event from "./event.jsx";

@connect((store) => {
    return {
        events: store.events.eventsRecent,
        page: store.events.eventRecentPage,
        eventsFetching: store.events.fetching,
        eventsFetched: store.events.fetched
    };
})

class RecentEvents extends React.Component{
    state = {
        timeFilter: 'today',
        page: 0,
        firstLoad: true
    }
    filterEvents() {
        let self = this;
        switch(self.state.timeFilter) {
            case "today": {
                return self.props.events.hits.filter((item) => {
                    const time = self.getTimeFilter('today');
                    let show = item.showings.filter((showing) => showing >= time && showing <= time + (3600*24-1))
                    return show && show.length > 0
                });
            }
            case "tomorrow": {
                return self.props.events.hits.filter((item) => {
                    const time = self.getTimeFilter('tomorrow');
                    let show = item.showings.filter((showing) => showing >= time && showing <= time + (3600*24-1))
                    return show && show.length > 0
                });
            }
            case "weekend": {
                return self.props.events.hits.filter((item) => {
                    const timeArr = self.getTimeFilter('weekend');
                    let show = item.showings.filter((showing) => showing >= timeArr[0] && showing <= timeArr[1])
                    return show && show.length > 0
                });
            }
            case "week": {
                return self.props.events.hits;
            }
        }
        return self.props.events.hits;
    }
    getTimeFilter(filter) {
        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();

        switch(filter) {
            case "today": {
                return (new Date(year,month,date)).getTime()/1000
            }
            case "tomorrow": {
                return (new Date(year,month,date+1)).getTime()/1000
            }
            case "weekend": {
                let day = today.getDay();
                let fromTime = (new Date(year,month,date+(5-day),18)).getTime()/1000;
                let toTime = (new Date(year,month,date+(7-day),23,59,59)).getTime()/1000;
                return [fromTime, toTime];
            }
        }
    }
    componentWillMount() {
    }

    componentDidMount(){
        let self = this;
        self.props.dispatch(getRecentEvents());

        let todayLink = document.getElementsByClassName("time-filter")[0];
        todayLink.className += " select";

    }

    componentDidUpdate() {
        let events;

        //Check if the events is empty under current timeFilter
        // - Yes: Change to next filter
        // - No: change state.firstLoad to false, avoid can't answer manually changing filter
        if (this.props.events.hits && this.state.firstLoad) {
            events = this.filterEvents();
            if (events.length == 0) {
                switch (this.state.timeFilter) {
                    case 'today': {
                        document.getElementsByClassName("time-filter")[1].click();
                        break;
                    }
                    case 'tomorrow': {
                        document.getElementsByClassName("time-filter")[2].click();
                        break;
                    }
                    case 'weekend': {
                        document.getElementsByClassName("time-filter")[3].click();
                        break;
                    }
                }
            } else {
                this.setState({
                    firstLoad: false
                })
            }
        }

    }

    handlePageUp() {
        let self = this;
        self.setState((prevState) => ({
            page: prevState.page - 1
        }))
    }

    handlePageDown() {
        let self = this;
        self.setState((prevState) => ({
            page: prevState.page + 1
        }))

    }
    changeFilter(e, filter) {
        let links = document.getElementsByClassName("time-filter select");
        for (let i = 0; i<links.length; i++) {
            links[i].className = "time-filter";
        }
        
        e.target.className += " select";
        this.setState({
            timeFilter: filter,
            page: 0
        })
    }

    render(){
        var self = this;
        let events;
        if (self.props.events.hits) {
            events = self.filterEvents();
        }
        let mappedEvents;
        if (self.state.page == 0) {
            mappedEvents = (events && events.length > 0) ? 
                events.filter((item, index) => index < 6).map((event, index) => <Event key={index} data={event} />) : "";
        } else if (self.state.page > 0) {
            mappedEvents = (events && events.length > 0) ? 
                events.filter((item, index) => index >= self.state.page*6 && index < (self.state.page+1)*6)
                      .map((event, index) => <Event key={index} data={event} />) : "";
        }
        const pageUp = (self.state.page == 0)? "":(
            <div className="events-paging-btn left" onClick={self.handlePageUp.bind(self)}>
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
        );
        const pageDown = (events && (events.length <= 6 || 
                                    (self.state.page > 0 && events.length - self.state.page*6 <= 6)))? "":(
            <div className="events-paging-btn right" onClick={self.handlePageDown.bind(self)}>
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
        );
        return(
            <div id="recent-events">
                <div className="events-header">
                    <div className="events-timefilter">
                        <a className="time-filter" onClick={(e,filter) => self.changeFilter(e,"today")}>Today</a>
                        <a className="time-filter" onClick={(e,filter) => self.changeFilter(e,"tomorrow")}>Tomorrow</a>
                        <a className="time-filter" onClick={(e,filter) => self.changeFilter(e,"weekend")}>This weekend</a>
                        <a className="time-filter" onClick={(e,filter) => self.changeFilter(e,"week")}>This week</a>
                    </div>
                    <div className="events-paging">
                        {pageUp}
                        {pageDown}
                    </div>
                </div>
                <div className="events-container">
                    {(events && events.length > 0)? mappedEvents : ""}
                </div>
            </div>
        );
    }
}

module.exports = RecentEvents;