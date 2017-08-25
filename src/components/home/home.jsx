import React from 'react';
import Homesearch from "../home/homesearch.jsx";
import SellWithUs from "../home/sellwithus.jsx";
import LocalEvents from "../home/localEvents.jsx";
import RecentEvents from "../home/recentEvents.jsx";
import WorkWith from "../home/workwith.jsx";

class Home extends React.Component{
    componentDidMount(){
        var logo = document.getElementsByClassName('logo')[0];
        var event = document.getElementsByClassName('search-event')[0];
        logo.className += " home";
        event.className += " home";
    }
    componentWillUnmount(){
        var logo = document.getElementsByClassName('logo')[0];
        var event = document.getElementsByClassName('search-event')[0];
        logo.className = "logo";
        event.className = "search-event";
    }
    render(){
        return(
            <div id="home">
                <Homesearch/>
                <section id="events">
                    <LocalEvents/>
                    <RecentEvents/>
                </section>
                <SellWithUs/>
                <WorkWith/>
            </div>
        )
    }
}
module.exports = Home;