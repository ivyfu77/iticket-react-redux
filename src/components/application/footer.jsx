import React from 'react';
import {Icon} from 'react-fa'

class Footer extends React.Component{
    constructor(props){
        super(props)
        var self = this;
        
        self.goToTop = self.goToTop.bind(self)
        
    }

    goToTop(){
        console.log("tesing pre render")
        var self =this;
        var y = window.scrollY;
        var time = 0;
        y = y - 50;
        window.scrollTo(0,y);
        if(y > 0)
        {
            time = setTimeout(self.goToTop,50);  
        }
        else
        {
            clearTimeout(time);   
        }
    }

    render(){
        var self = this;
        var style = {
            backgroundImage: "url('/imgs/footer-bg.jpg')"
        }
        return(
            <div id="footer-container">
                <div className="footer-section">
                    <div className="footer" style={style}>
                        <div className="footer-table-container">
                            <table className="footer-table non-social">
                                <thead className="footer-link-headers">
                                    <tr>
                                        <td className="header-item item">HELP & CONTACT INFO</td>
                                        <td className="header-item item">ABOUT</td>
                                        <td className="header-item item">SELL YOUR EVENTS</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="link-item item non-mobile"><span>FAQ</span></td>
                                        <td className="link-item item non-mobile"><span>About iTICKET</span></td>
                                        <td className="link-item item non-mobile"><span>Key benefits</span></td>
                                    </tr>
                                    <tr>
                                        <td className="link-item item"><span>09 361 1000</span></td>
                                        <td className="link-item item non-mobile"><span>Meet the team</span></td>
                                        <td className="link-item item non-mobile"><span>Tailored solutions</span></td>
                                    </tr>
                                    <tr>
                                        <td className="link-item item"><span>0508 iTICKET (484-253)</span></td>
                                        <td className="link-item item non-mobile"><span>Join the crew</span></td>
                                        <td className="link-item item non-mobile"><span>Pricing</span></td>
                                    </tr>
                                    <tr>
                                        <td className="link-item item"><span>support@iticket.co.nz</span></td>
                                        <td className="link-item item non-mobile"><span>Support community</span></td>
                                        <td className="link-item item non-mobile"><span>National Outlets</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="footer-table social">
                                <thead className="footer-link-headers">
                                    <tr>
                                        <td className="header-item item">FOLLOW US</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="link-item item">
                                            <div className="footer-social-container">
                                                <Icon name="facebook" className="footer-social"/>
                                            </div >
                                            <div className="footer-social-container">
                                                <Icon name="twitter" className="footer-social" />
                                            </div>
                                            <div className="footer-social-container">
                                                <Icon name="linkedin" className="footer-social" />
                                            </div>
                                            <div className="footer-social-container">
                                                <Icon name="instagram" className="footer-social" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="link-item item">
                                            <div className="news-letter-header mobile-newsletter">
                                                NEWSLETTER SIGN UP
                                            </div>
                                            <div className="mobile-newsletter">
                                                <span>
                                                    <input className="footer-input-email footer-input" type="text" placeholder="Enter your email address" />
                                                    <input className="footer-input-submit footer-input" type="submit" value="SUBMIT" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="back-to-top-btn landscape">
                                            <div className="back-to-top-btn-container" onClick={self.goToTop}>
                                                <span className="back-to-top">Back to top</span>
                                                <Icon className="back-to-top" name="arrow-up" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="social btn-to-top-landscape">
                                <tbody>
                                    <tr>
                                        <td className="back-to-top-btn">
                                            <div className="back-to-top-btn-container" onClick={self.goToTop}>
                                                <span className="back-to-top">Back to top</span>
                                                <Icon className="back-to-top" name="arrow-up" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="footer-declarations">
                        <div className="footer-copyright-declaration footer-dc">
                    	    &#169; 2017 iTICKET Ltd
                        </div>
                        <div className="footer-policy-and-tc-container footer-dc">
                            <span className="footer-ptc">Privacy Policy</span>
                            <span className="footer-ptc divider">|</span>
                            <span className="footer-ptc">Terms &#38; Conditions</span>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

module.exports = Footer;