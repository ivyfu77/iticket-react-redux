import React from 'react';
import { connect } from 'react-redux'
import {
        setDropDowns
    } 
from '../../../actions/searchActions'

@connect((store) =>{
    return{
        list: store.modal.list,
        title: store.modal.title,
        presetValue: store.modal.presetValue,
        selectedGenre: store.search.selectedGenre,
        selectedLocation: store.search.selectedLocation
    }
})

class DropDown extends React.Component{
    
    constructor(props){
        super(props)
        this.selectedOptions = this.selectedOptions.bind(this)
    }
    
    selectedOptions(value){
        var self = this;
        value = (value == "All") ? "":value
        var obj = {}
        obj["selectedGenre"] = (self.props.title === 'Categories') ? value:self.props.selectedGenre
        obj["selectedLocation"] = (self.props.title === "Location") ? value: self.props.selectedLocation
        obj.presetValue = self.props.presetValue
        this.props.dispatch(setDropDowns(obj))
    }
    
    render(){
        var self = this;
        var mappedOptions = self.props.list.map((item) =>{
            return(
                    <div className="drop-down-modal-item" 
                        key={Math.floor(Math.random() * 1000*1000*1000*1000)} 
                        value={item.text} 
                        onClick={()=> self.selectedOptions(item.text)}>
                        {item.text}
                    </div>
                )
        })
        return(
                <div id="drop-down-modal">
                    <div className="drop-down-modal-header">{self.props.title}</div>
                    <div className="drop-down-modal-items">
                        {mappedOptions}
                    </div>
                </div>
            )
        
    }
    
}

module.exports = DropDown