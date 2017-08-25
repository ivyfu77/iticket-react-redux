import React from 'react'
import { DateRange, Calendar } from 'react-date-range';
import {Icon} from 'react-fa'
import { setDatesValues } from "../../../actions/searchActions.js"
import moment from 'moment';
import { connect } from 'react-redux'

@connect((store) => {
    return{
        fromDate: store.search.fromDate,
        toDate: store.search.toDate,
        presetValue: store.modal.presetValue
    }
})

class DatesModal extends React.Component{
    constructor(props){
        super(props)
        this.handleDateSelection = this.handleDateSelection.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.getDates = this.getDates.bind(this)
        this.confirmDates = this.confirmDates.bind(this)
        this.getDateTheme = this.getDateTheme.bind(this)
        this.state = {
            from: (this.props.fromDate == "") ? "Start Date" : moment(this.props.fromDate * 1000).format("dddd, D MMM YYYY"),
            to:  (this.props.toDate == "") ? "End Date" : moment(this.props.toDate * 1000).format("dddd, D MMM YYYY"),
            fromDate: this.props.fromDate,
            toDate: this.props.toDate
        }
    }
    
    handleDateSelection(range){
        this.setState({
            fromDate: (moment(range.startDate._d).valueOf()/1000), 
            toDate: (moment(range.endDate._d).valueOf()/1000),
            from: moment(range.startDate._d).format("dddd, D MMM YYYY"),
            to: moment(range.endDate._d).format("dddd, D MMM YYYY"),
        })
    }
    
    handleScroll(e){
        console.log("you are scrolling", e)
        
    }
    
    componentDidMount(){
        var self = this;
    }    
    
   getDates(){
        var self = this;
        var startDate = ""
        var endDate = ""
        if(self.props.fromDate != ""){
            startDate = moment(self.props.fromDate * 1000)
            endDate = moment(self.props.toDate * 1000)
        }else{
            startDate = moment();
            endDate = moment();
        }
        
        return {
            startDate: startDate,
            endDate: endDate
        }
    }
    
    confirmDates(){
        var self = this;
        var obj = {
            fromDate: self.state.fromDate,
            toDate: self.state.toDate
        }
        self.props.dispatch(setDatesValues(self.props.presetValue, obj))
    }
    
    getDateTheme(){
        var obj = {
            DaySelected: {
                background: '#11b683'
            },
            DayInRange:{
                background: "#b6e9da",
                color: 'white'
            }
        }
        return obj
    }
    
    render(){
        var self = this;
        var dates = self.getDates();
        var minDate = moment();
        var buttonState = "disabled"
        var func = ""
        var offsetPositive = true;
        
        if(self.state.from != "Start Date"){
            buttonState = "enabled"
            func = self.confirmDates
        }
        
        return(
            <div id= "date-picker-modal">
                <div id="date-picker-values-container"> 
                    <div className="date-picker-value from">{this.state.from}</div>
                    <div className="date-picker-value icon">
                        <Icon 
                            name="arrow-right"
                            className="date-from-to-arrow"
                        />
                    </div>
                    <div className="date-picker-value to">{this.state.to}</div>
                </div>
                <div id="date-picker-dates-component-container">
                    <DateRange
                        onChange={self.handleDateSelection}
                        twoStepChange={true}
                        startDate={dates.startDate}
                        endDate={dates.endDate}
                        minDate={dates.endDate}
                        linkedCalendars={true}
                        calendars={12}
                        theme={self.getDateTheme()}
                        offsetPositive={offsetPositive}
                    />
                </div>
                <div id="date-picker-confirm-button-container"> 
                    <button onClick={func} className={"date-picker-confirm-button " + buttonState}>CONFIRM DATES</button>
                </div>
            </div>
            ) 
    }
    
}

module.exports = DatesModal