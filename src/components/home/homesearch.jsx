import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {showSearchModal} from '../../actions/modalActions'

@connect((store) =>{
    return {
        modalIsShowing: store.modal.show
    }
})

class Homesearch extends React.Component{
    constructor(props){
        super(props)
        this.search = this.search.bind(this)
    }

    componentDidMount(){
        var section = document.getElementById("fullScreenImage");
        section.style.backgroundImage = 'url(imgs/home-page-background.jpg)';
    }
    
    search(e){
        if(e.currentTarget.value.trim().length < 4){
            return
        }
        this.props.dispatch(showSearchModal(e.currentTarget.value))
    }
    
    render(){
        var self = this;
        var searchBox = null;
        if(!self.props.modalIsShowing){
            searchBox = (
                    <div id="start-search-container" className="search-container">
                        <h1>Find your live experience</h1>
                        <div className="search-box">
                            <input className="search-input" placeholder="Search by artist, event or venue" type="text" onChange={self.search} />
                        </div>
                    </div>
                )
        }
        return(
            <section id="fullScreenImage">
                <div className="top-links">
                    <a href="#">SELL YOUR EVENTS</a>
                </div>
                {searchBox}
            </section>
        );
    }
}

module.exports = Homesearch;