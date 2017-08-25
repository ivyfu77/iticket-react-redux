import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';

class SearchInput extends React.Component{
    constructor(props){
        super(props)
        this.getDates = this.getDates.bind(this)
    }
    
    getDates(showings=[]){
        var dates = ""
        if(showings.length > 1){
            let fromDate = new Date(showings[0] * 1000)
            let toDate = new Date(showings[showings.length - 1] * 1000)
            var formateFromDate = moment(fromDate).format("ddd, D MMM");
            var formateToDate = moment(toDate).format('ddd, D MMM YYYY')
            dates = formateFromDate + " - " + formateToDate;
            return dates;
        }
        
        if(showings.length == 1){
            let fromDate = new Date(showings[0] * 1000);
            dates = moment(fromDate).format('ddd, D MMM YYYY');
            return dates;
        }
        
    }

 
    render(){
        var self = this
        var hit = self.props.hit
        var dates = (hit.showings.length > 0) ? self.getDates(hit.showings):hit.displayDate
    
        
        return(
                <div className="result-item">
                    <Link to={hit.url} onClick={() => self.props.hitLink(self.props.hit)}>
                        <div>
                            <img className="result-image" src={hit.image} />
                        </div>
                        <div className="event-result-eventname">
                            {hit.eventName}
                        </div>
                        <div className="event-result-cityName">
                            {hit.cityName}
                        </div>
                        <div className="event-result-dates">
                            {dates}
                        </div>
                    </Link>
                </div>
            )
        
    }
    
}

module.exports = SearchInput;