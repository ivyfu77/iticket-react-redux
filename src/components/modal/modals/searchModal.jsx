import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {setEvent} from '../../../actions/eventActions'
import {emptyPresetGenre} from '../../../actions/modalActions'
import {Icon} from 'react-fa'
import {
        hideModal, 
        showDropDownModal,
        showDatesModal
        } 
from '../../../actions/modalActions'
import {
        getFacets,
        getResults,
        getMoreResults,
    } 
from '../../../actions/searchActions'

//Search components
import SearchInput from '../search_components/searchInput.jsx'
import Hits from '../search_components/hits.jsx'
import DropDown from '../search_components/dropDown.jsx'
import DateDropDown from '../search_components/dateDropDown.jsx'

@connect((store) =>{
    return {
        searchItem: store.search.searchItem,
        genreFacets: store.search.genreFacets,
        locationFacets: store.search.locationFacets,
        results: store.search.results,
        numberOfPages: store.search.numberOfPages,
        currentPage: store.search.currentPage,
        selectedLocation: store.search.selectedLocation,
        selectedGenre: (store.modal.presetGenre != "") ? store.modal.presetGenre:store.search.selectedGenre,
        resetFilters: store.search.resetFilters,
        fromDate: store.search.fromDate,
        toDate: store.search.toDate,
        dropDownModalInput: store.search.dropDownModalInput,
        presetValue: store.modal.presetValue
    }
})

class Search extends React.Component{
    
    constructor(props){
        super(props)
        var self = this;
        self.goingToLink = self.goingToLink.bind(self);
        self.querySearch = self.querySearch.bind(self);
        self.hitLink = self.hitLink.bind(self);
        self.loadMore = self.loadMore.bind(self);
        self.facetLocationQuery = self.facetLocationQuery.bind(self);
        self.facetGenreQuery = self.facetGenreQuery.bind(self)
        self.clearFilters = self.clearFilters.bind(self)
        self.dateQuery = self.dateQuery.bind(self)
        self.dropDownModal = self.dropDownModal.bind(self)
        self.datesModal = self.datesModal.bind(self)
    }

    goingToLink(e){
        this.props.dispatch(setEvent(e))
        this.props.dispatch(hideModal())
    }
    
    hitLink(hit){
        this.props.dispatch(setEvent(hit))
        this.props.dispatch(hideModal(hit))
    }
    
    querySearch(value){
        var self = this;
       if(value.trim().length < 3 && value.trim().length > 0){
            return;
        }
        
        var obj = {
            cityName: self.props.selectedLocation,
            genreName: self.props.selectedGenre,
            fromDate: self.props.fromDate,
            toDate: self.props.toDate
        }
        this.props.dispatch(getResults(value, obj))
    }
    
    facetLocationQuery(value){
        var self = this;
        var obj = {
            cityName: value,
            genreName: self.props.selectedGenre,
            fromDate: self.props.fromDate,
            toDate: self.props.toDate
        }
        this.props.dispatch(getResults(self.props.searchItem, obj))
    }
    
    facetGenreQuery(value){
        var self = this;
        
        var obj = {
            cityName: self.props.selectedLocation,
            genreName: value,
            fromDate: self.props.fromDate,
            toDate: self.props.toDate
        }
        // this.props.dispatch(emptyPresetGenre());
        this.props.dispatch(getResults(self.props.searchItem, obj));
    }
    
    dateQuery(fromDate, toDate){
        var self = this;
        var obj = {
            cityName: self.props.selectedLocation,
            genreName: self.props.selectedGenre,
            fromDate: fromDate,
            toDate: toDate
        }
        this.props.dispatch(getResults(self.props.searchItem, obj))
    }
    
    loadMore(){
        var self =this;
        var obj = {
            page: self.props.currentPage + 1,
            cityName: self.props.selectedLocation,
            genreName: self.props.selectedGenre,
            fromDate: self.props.fromDate,
            toDate: self.props.toDate
        }
        this.props.dispatch(getMoreResults(self.props.searchItem, obj))
    }
    
    clearFilters(){
        var self = this;
        var obj = {
            cityName: "",
            genreName: "",
            resetFilters: true,
            fromDate: "",
            toDate: ""
        }
        self.props.dispatch(getResults("", obj))
    }
    
    dropDownModal(title, list=[]){
        var self = this;
        var obj = {
            title: title,
            list: list,
            presetValue: document.getElementById("search-box-input-main").value
        }
        self.props.dispatch(showDropDownModal(obj))
    }
    
    datesModal(options = {}){
        var self = this;
        var obj = {
            presetValue: document.getElementById("search-box-input-main").value
        }
        self.props.dispatch(showDatesModal(obj))
    }
    
    componentWillMount(){
        var self = this;
        var obj = {
            cityName: "",
            genreName: "",
            resetFilters: false,
            fromDate: "",
            toDate: ""
        }
        var value = (self.props.presetValue.length < 3) ? "":self.props.presetValue
        if(self.props.dropDownModalInput){
            obj = {
                ...obj, 
                cityName: self.props.selectedLocation, 
                genreName: self.props.selectedGenre,
                fromDate: self.props.fromDate,
                toDate: self.props.toDate
            }
        }
        self.props.dispatch(getResults(value, obj))
    }
    
    render(){
        var self = this;
        var genreOptions = []
        
        var locationOptions = [];
        
        var hits = null
        var loadMore = null;
        
        var displayClearButton = null
        var displayClearButtonClass = ""
        
        
        if(Object.keys(self.props.genreFacets).length > 0){ 
            Object.keys(self.props.genreFacets).forEach(function(key){ 
                var obj = {} 
                obj[key] = self.props.genreFacets[key]
                genreOptions.push(obj) 
            }) 
        }
        
        if(Object.keys(self.props.locationFacets).length > 0){ 
            Object.keys(self.props.locationFacets).forEach(function(key){ 
                var obj = {} 
                obj[key] = self.props.locationFacets[key]
                locationOptions.push(obj) 
            }) 
        }
        
        if(self.props.results.length > 0){
            hits = self.props.results.map(function(hit){
                return(
                    <Hits
                        key={Math.floor(Math.random() * 1000*1000*1000*1000)}
                        hitLink={self.hitLink}
                        hit={hit}
                    />
                    )
            })
        }
        
        if((self.props.selectedLocation != "") || (self.props.selectedGenre != "") || (self.props.fromDate != "")){
            displayClearButtonClass = "clear-filters-active"
            displayClearButton = (
                        <div className="clear-filters-container">
                            <button className="clear-filters-btn" onClick={self.clearFilters} >
                                <Icon 
                                 name="close"
                                 className="clear-filters-icon"
                                />Clear Filters
                            </button>
                        </div>
                )
        }
        
        if(self.props.currentPage < self.props.numberOfPages - 1){
            loadMore = (
                    <div className="loadmore-results-container">
                        <button className="loadmore-results-btn" onClick={self.loadMore}>Load More</button>
                    </div>
                )
        }
        
        
        
        return(
            <div>
                <div className="search-component-container">
                    <SearchInput 
                        presetValue={self.props.presetValue}
                        searchQuery={self.props.searchItem}
                        querySearch = {self.querySearch}
                        resetFilters={self.props.resetFilters}
                    />
                </div>
                <div className={"search-component-container input-components " + displayClearButtonClass}>
                    <div className="input-drop-downs">
                        <DropDown 
                            options={genreOptions}
                            changeFunction={self.facetGenreQuery}
                            currentSelection={self.props.selectedGenre}
                            text = "Categories"
                            resetFilters= {self.props.resetFilters}
                            showModal = {self.dropDownModal}
                        />
                    </div>
                    <div className="input-drop-downs date-selection">
                        <div>
                            <DateDropDown 
                                resetFilters={self.props.resetFilters}
                                dateSearchFunction={self.dateQuery}
                                fromDate={self.props.fromDate}
                                toDate={self.props.toDate}
                                showModal={self.datesModal}
                            />
                        </div>
                    </div>
                    <div className="input-drop-downs">
                        <DropDown 
                            options={locationOptions}
                            changeFunction={self.facetLocationQuery}
                            currentSelection={self.props.selectedLocation}
                            text = "Location"
                            resetFilters= {self.props.resetFilters}
                            showModal = {self.dropDownModal}
                        />
                        {displayClearButton}
                    </div>
                </div>
                <div className="search-component-container">
                    <div className="search-component-items-container">
                        {hits}
                    </div>
                </div>
                 {loadMore}
            </div>
        )
    }
}

module.exports = Search;