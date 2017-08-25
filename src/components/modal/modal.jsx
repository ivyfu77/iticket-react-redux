import React from 'react';
import  {Link} from  'react-router-dom';
import { connect } from 'react-redux';
import {Icon} from 'react-fa';
import {hideModal} from '../../actions/modalActions'
import {setDropDownInputBoolean} from '../../actions/searchActions'

// all modal components
require('./modals/searchModal.jsx');
require('./modals/dropDownModal.jsx');
require('./modals/datesModal.jsx')

@connect((store) =>{
    return {
        showModal: store.modal.showModal,
        modal: store.modal.modal,
        presetValue: store.modal.presetValue,
    }
})
class Modal extends React.Component{
    
    constructor(props){
        super(props)
        this.closeModal = this.closeModal.bind(this)
    }
    
    componentDidMount(){
    }
    
    componentDidUpdate(){
        if(this.props.showModal && this.props.modal != 'dates'){
            window.scrollTo(0,0)
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
        }else{
            document.getElementsByTagName("body")[0].style.overflow = "auto"
        }
    }
    
    closeModal(){
        if(this.props.modal == "search"){
            this.props.dispatch(hideModal())
            return
        }
        
        this.props.dispatch(setDropDownInputBoolean({presetValue:this.props.presetValue}))
    }
    
    render(){
        
        var self = this;
        var style = {};
        var modal = null;
        var modalClassName = ""
        var itemsClassName = ""
        var closeButtonClassName = ""
        if(self.props.showModal){
            style = {
                display: 'initial'
            }
            var whichModal = self.props.modal + "Modal.jsx";
            var modalView = require('./modals/' + whichModal)
            modal = (React.createElement(modalView, null));
        }else{
            style = {
                display: 'none'
            }
        }
        
        if(self.props.modal != 'search'){
            modalClassName = "drop-down-modal"
            itemsClassName = "drop-down-modal-items-container"
            closeButtonClassName = "drop-down-modal-close-container"
        }
    
        return(
                <div id="iticket-modal" className={modalClassName} style={style}>
                    <div id="iticket-modal-container">
                        <div id="iticket-modal-close" className={"close-modal-btn-icon " + closeButtonClassName}>
                            <div id="close-btn-container" onClick={self.closeModal}>
                                <span className="modal-close-text">Close</span>
                                <Icon name="close" className="modal-close-icon"/>
                            </div>
                        </div>
                        <div id="iticket-modal-items" className={itemsClassName}>
                            {modal}
                        </div>
                    </div>
                </div>
            )
    }    
}
module.exports = Modal
