import React from 'react'

class SearchInput extends React.Component{
    constructor(props){
        super(props)
        this.querySearch = this.querySearch.bind(this)
    }

    componentDidMount(){
        var self = this;
        if(self.props.presetValue != ""){
            self.props.querySearch(self.props.presetValue)
        }
    }

    componentDidUpdate(){
        var self = this;        
        if(self.props.resetFilters){
            document.getElementById("search-box-input-main").value = ""
        }
    }

    querySearch(e){
        this.props.querySearch(e.target.value)
    }
 
    render(){
        var self = this
        return(
                <div className="search-box-input-container">
                    <input id="search-box-input-main" type="text" 
                        defaultValue={this.props.presetValue} 
                        autoFocus={true}
                        onChange={self.querySearch}
                        placeholder="Search by artist,event or venue"
                    />
                </div>
            )
        
    }
    
}

module.exports = SearchInput;