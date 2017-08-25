import React from 'react';

class WorkWith extends React.Component{

    componentDidMount(){

    }
    
    render(){
        var self = this;
        
        return(
            <section id="work-with">
                <div className="work-with-container">
                    <h3>We are lucky to have worked with</h3>
                    <div className="work-with-logo-box">
                        <div>
                            <img src="imgs/work-with-logos/armageddon_logo.png" />
                            <img src="imgs/work-with-logos/art_deco_logo.png" />
                            <img src="imgs/work-with-logos/bbt_logo.png" />
                            <img src="imgs/work-with-logos/comedy_logo.png" />
                            <img src="imgs/work-with-logos/fashion_logo.png" />
                            <img src="imgs/work-with-logos/highlife_logo.png" />
                            <img src="imgs/work-with-logos/racing_logo.png" />
                            <img src="imgs/work-with-logos/sculpture_onshore_logo.png" />
                            <img src="imgs/work-with-logos/splore_logo.png" />
                            <img src="imgs/work-with-logos/taste_logo.png" />
                            <img src="imgs/work-with-logos/te_matatini_logo.png" />
                            <img src="imgs/work-with-logos/tedx_logo.png" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

module.exports = WorkWith;