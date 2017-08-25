import React from 'react';
import {Icon} from 'react-fa'

import { DateRange } from 'react-date-range';
import moment from 'moment';

class DateDropDown extends React.Component{
    
    constructor(props){
        super(props)
        this.handleDateSelection = this.handleDateSelection.bind(this)
        this.showDatePickerModule = this.showDatePickerModule.bind(this)
        this.getDateTheme = this.getDateTheme.bind(this)
        this.showDatesModal = this.showDatesModal.bind(this)
        this.getDates = this.getDates.bind(this)
        this.state ={
            showDatePicker: false,
            from: (this.props.fromDate == "") ? "" : moment(this.props.fromDate * 1000).format("dddd, D MMMM YYYY"),
            to:  (this.props.toDate == "") ? "" : moment(this.props.toDate * 1000).format("dddd, D MMMM YYYY"),
            mobFrom: (this.props.fromDate == "") ? "" : moment(this.props.fromDate * 1000).format("D MMM"),
            mobTo: (this.props.toDate == "") ? "" : moment(this.props.toDate * 1000).format("D MMM YYYY")
        }
    }
    
    getDateTheme(){
        var obj = {
            DaySelected: {
                background: '#11b683'
            },
            DayInRange:{
                background: "#b6e9da",
                color: '#11b683'
            }
        }
        return obj
    }
    
    componentDidUpdate(){
        var self = this;
    }
    
    handleDateSelection(range){
        var self = this
        var fromDate = (moment(range.startDate._d).valueOf()/1000) 
        var toDate = (moment(range.endDate._d).valueOf()/1000) 
        moment.locale('en-NZ')
        self.props.dateSearchFunction(fromDate, toDate)
        self.setState({
            showDatePicker: false,
            from: moment(range.startDate._d).format("dddd, D MMMM YYYY"),
            to: moment(range.endDate._d).format("dddd, D MMMM YYYY"),
            mobFrom: moment(range.startDate._d).format("D MMM"),
            mobTo: moment(range.endDate._d).format("D MMM YYYY")
        })
    }
    
    showDatePickerModule(){
        this.setState({
            showDatePicker: !this.state.showDatePicker
        })
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
    
    showDatesModal(){
        var self = this;
        self.props.showModal(self.getDates());
    }
    
    render(){
        var self = this;
        var datePicker = null;
        var displayFrom = "From";
        var displayTo = "To";
        var selectedClass = "";
        var dateTriangle = null;
        var moduleactive = "non-active";
        
        var dates = self.getDates();
        var startDate = dates.startDate;
        var endDate = dates.endDate;
        
        var mobDateDisplay ="Dates"

        
        if(self.state.showDatePicker){
            datePicker = (
                    <DateRange
                        onChange={self.handleDateSelection}
                        twoStepChange={true}
                        theme={self.getDateTheme()}
                        startDate={startDate}
                        endDate={endDate}
                    />
                )
            dateTriangle = (
                    <div className="-date-top-triangle"></div>
                )
        }
        
        if(self.state.from != "" && (self.props.resetFilters == false) && self.props.fromDate != ""){
            displayFrom = self.state.from
            displayTo = self.state.to;
            mobDateDisplay = self.state.mobFrom  + " - " + self.state.mobTo
            selectedClass = "date-selected"
            moduleactive = "active"
        }
        
        return(
            <div className={"date-drop-down-container " + moduleactive}>
                <div className="date-drop-down-display-container" onClick={self.showDatePickerModule}>
                    <div className={"date-item select-date-item from " + selectedClass}>
                        {displayFrom}
                    </div>
                    <div className="date-item icon">
                        <Icon 
                            name="arrow-right"
                            className="date-from-to-arrow"
                        />
                    </div>
                    <div className={"date-item select-date-item to " + selectedClass}>
                        {displayTo}
                    </div>
                </div>
                <div className= "date-picker-module">
                    {dateTriangle}
                    {datePicker}
                </div>
                <div className="date-picker-mobile" onClick={self.showDatesModal}>
                    <div className="mobile-drop-down">
                        <button className="mobile-dropbtn">
                            <div className="mobile-date-item icon">
                                <Icon 
                                    name="calendar-o" className="mobile-dropdown-list-icon"
                                />
                            </div>
                            <div className={"mobile-date-item " + selectedClass}>{mobDateDisplay}</div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
}


module.exports = DateDropDown