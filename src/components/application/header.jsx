import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {showSearchModal} from '../../actions/modalActions'

@connect((store) =>{
    return {
    }
})
class Header extends React.Component{
    constructor(props){
        super(props)
        this.search = this.search.bind(this)
    }

    componentWillMount(){
    }

    openMenu() {
        var obj = document.getElementById("toggleMenu");
        obj.className += "open";
    }
    
    search(){
        this.props.dispatch(showSearchModal(""))
    }
    
    render(){
        var self = this;

        return(
            <header>
                <div className="header-container">
                    <div className="toggle-btn"><a onClick={self.openMenu}><i className="fa fa-bars" aria-hidden="true"></i></a></div>
                    <img className="logo" src="/imgs/logo.png" alt="iTicket logo" />
                    <div className="search-event" onClick={self.search}>
                        <i className="fa fa-search" ></i>&nbsp;SEARCH EVENTS
                    </div>
                    <div className="my-account"><i className="fa fa-user-o"></i>&nbsp;MY ACCOUNT</div>
                    <p className="search"><a href="#"><i className="fa fa-search"></i></a></p>
                </div>
            </header>
        );
    }
}

module.exports = Header;