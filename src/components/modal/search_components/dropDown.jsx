import React from 'react';
import {Icon} from 'react-fa'

class DropDown extends React.Component{
    
    constructor(props){
        super(props)
        if(this.props.currentSelection != ""){
            this.state = {
                initialValue: {
                    text: this.props.currentSelection
                }
            }
        }else{
            this.state = {
                initialValue: {
                    text: "All"
                }
            }
        }
        this.selectOptions = this.selectOptions.bind(this)
        this.getIcon = this.getIcon.bind(this)
        this.showDropDownModal = this.showDropDownModal.bind(this)
    }
    
    selectOptions(e){
        var self = this;
        var value = e.target.getAttribute('value')
        
        if(e.target.getAttribute('value') == "All"){
            value = ""
        }
        
        self.props.changeFunction(value);
        
        this.setState({
            initialValue: {
                text: e.target.getAttribute("value")
            }
        })    
    }
    
    showDropDownModal(list){
        this.props.showModal(this.props.text , list)
    }
    
    getIcon(text){
        var icons = [
            {
                text: 'Categories',
                icon: "bars"
            },
            {
                text: 'Location',
                icon: "map-marker"
            }
        ]
        var iconName = ""
        
        for(var i = 0; i < icons.length; i++){
            if(icons[i].text == text){
                iconName = icons[i].icon;
                break;
            }
        }
        
        return iconName;
    }
    
    render(){
        var self = this;
        var optionsObjects = self.props.options;
        var allArray = [{All:""}]
        var newOptionsObject = optionsObjects.concat(allArray)
        var className = " selected"
        var arrayedObject = [];
        
        var initialValue = self.state.initialValue.text
        if(self.props.resetFilters || self.props.currentSelection == ""){
            initialValue = "All"
        }
        newOptionsObject.map(function(item){
            var keys = Object.keys(item);
            var key = keys[0];
            var value = item[key]
           let obj = {
                text: key,
                value: value
            }
            arrayedObject.push(obj)
        })
        
        var mappedoptions = arrayedObject.map(function(item){
            if(item.text == initialValue){
                return;
            }
            return(
                <div key={Math.floor(Math.random() * 1000*1000*1000*1000)} value={item.text} onClick={self.selectOptions}>
                    {item.text}
                </div>
                )
        })
        
        if(initialValue == "All"){
            className= " non-selected"
        }
        
        var options = (
                <div className={"dropdown" + className} >
                    <div className="dropdown-label">
                        {self.props.text}
                    </div>
                  <button className="dropbtn">
                    <span>{initialValue}</span>
                    <Icon 
                        name="chevron-down" className="dropdown-list"
                    />
                  </button>
                  <div className="dropdown-content">
                    {mappedoptions}
                  </div>
                </div>
            )
            
        
        var icon = self.props.icon || self.getIcon(self.props.text)
        var mobileInitial = (initialValue == "All") ? self.props.text:initialValue
        
        var mobileOptions = (
                <div className={"mobile-drop-down mobile-dropdown-list " + className}>
                    <button className="mobile-dropbtn" onClick={() => self.showDropDownModal(arrayedObject)}>
                     <div className="mobile-dropdown-item icon">
                        <Icon 
                            name={icon} className="mobile-dropdown-list-icon"
                        />
                    </div>
                    <div className={"mobile-dropdown-item " + className}>{mobileInitial}</div>
                    </button>
                </div>
            )
        return (
                <div>
                    {options}
                    {mobileOptions}
                </div>
            )
        
    }
}
module.exports = DropDown;