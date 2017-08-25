import React from 'react';
import { connect } from 'react-redux';
import {showSearchModalWithGenre} from '../../actions/modalActions';
import {showSearchModal} from '../../actions/modalActions';

@connect((store) =>{
    return {
    }
})

class Toggle extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        var obj = document.getElementById("toggleMenu");
        obj.style.backgroundImage = 'url(imgs/mob-menu-bkgd.jpg)';
    }

    closeMenu() {
        var obj = document.getElementById("toggleMenu");
        obj.className = "";
    }

    search(e) {
        let value = (e.target.attributes.value) ? e.target.attributes.value.value : null;
        let query = (value && value != "") ? value : e.target.innerText;

        if (value && value != "") {
            this.props.dispatch(showSearchModalWithGenre(query));
        } else {
            this.props.dispatch(showSearchModal(query));
        }
        this.closeMenu();
    }

    
    render(){
        var self = this;
        
        return(
            <div id="toggleMenu">
                <a href="#" className="close" onClick={self.closeMenu}><i className="fa fa-times"></i></a>
                <ul>
                    <li value="Theatre & Arts" onClick={(e) => self.search(e)}>Theatre</li>
                    <li value="Music" onClick={(e) => self.search(e)}>Music</li>
                    <li value="Theatre & Arts" onClick={(e) => self.search(e)}>Arts</li>
                    <li onClick={(e) => self.search(e)}>Dance</li>
                    <li value="Nightlife" onClick={(e) => self.search(e)}>Nightlife</li>
                    <li value="Festivals & Lifestyle" onClick={(e) => self.search(e)}>Festivals</li>
                    <li onClick={(e) => self.search(e)}>Expos</li>
                    <li value="Sport" onClick={(e) => self.search(e)}>Sports</li>
                    <li onClick={(e) => self.search(e)}>Business</li>
                    <li onClick={(e) => self.search(e)}>Schools</li>
                    <li value="Festivals & Lifestyle" onClick={(e) => self.search(e)}>Lifestyle</li>
                    <li onClick={(e) => self.search(e)}>Community</li>
                    <li value="Experiences" onClick={(e) => self.search(e)}>Experiences</li>
                </ul>
            </div>
        );
    }
}

module.exports = Toggle;