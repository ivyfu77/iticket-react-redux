import React from 'react';
import {Link} from 'react-router-dom'

class SellWithUs extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        var section = document.getElementById("sell-with-us");
        section.style.backgroundImage = 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.2) 100%), url(imgs/sell-with-us-background1.jpg)';

        var dot = document.getElementsByClassName("dot-mask")[0];
        dot.style.backgroundImage = 'url(imgs/dot-mask.png)';
    }
    
    render(){
        var self = this;
        
        return(
            <section id="sell-with-us">
                <div className="dot-mask"></div>
                <div className="with-us-container">
                    <h1>Sell tickets to your next event with us</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur voluptatem similique cum ea expedita enim a deleniti accusamus praesentium reprehenderit. </p>
                    <div className="with-us-item-container">
                        <div className="with-us-item">
                            <h5><img src="/imgs/headphone-icon.png" />Fully Scalable Services</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur voluptatem.</p>
                        </div>
                        <div className="with-us-item">
                            <h5><img src="/imgs/headphone-icon.png" />Fully Scalable Services</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur voluptatem.</p>
                        </div>
                        <div className="with-us-item">
                            <h5><img src="/imgs/headphone-icon.png" />Fully Scalable Services</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur voluptatem.</p>
                        </div>
                        <div className="with-us-item">
                            <h5><img src="/imgs/headphone-icon.png" />Fully Scalable Services</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur voluptatem.</p>
                        </div>
                    </div>
                    <div className='with-us-btn-container'>
                        <div className="left-btn">LEARN MORE</div>
                        <div className="right-btn">GET IN TOUCH</div>
                    </div>
                </div>
                <div className="with-us-image">
                    <img src="/imgs/with-us-imgs1.png" />
                    <img src="/imgs/with-us-imgs2.png" />
                    <img src="/imgs/with-us-imgs3.png" />
                </div>
            </section>
        );
    }
}

module.exports = SellWithUs;