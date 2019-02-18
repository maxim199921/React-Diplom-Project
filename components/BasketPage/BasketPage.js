import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import BasketList from './BasketList/BasketList';
import './BasketPage.css';
import { pushNewItemData, pushNewItemDataFromLocalStorage } from "../../redux/ActionCreaters/CatalogActions";

import $ from 'jquery/dist/jquery.slim.min/'


class BasketPage extends React.PureComponent {

    static propTypes = {
        startPriceList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                type: PropTypes.string.isRequired,
                img: PropTypes.string.isRequired,
                model: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                status: PropTypes.bool.isRequired,
                cnt: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        summProducts: 0,
        nameValue: null,
        phoneValue: null,
        successOrder: false,
        errorMessage: false,
    };

    componentDidMount = () => {
        if (localStorage.startPriceList !== undefined){
            this.props.dispatch( pushNewItemDataFromLocalStorage(JSON.parse(localStorage.startPriceList)));
        }
    };

    setNewItemData = () => {
        pushNewItemData(this.state.nameValue, this.state.phoneValue, this.props.startPriceList, this.successOrder, this.errorOrder);
    };
    successOrder = () => {
        $(window).on("click", () =>{
            location.reload()
        });
        localStorage.clear();
        this.setState({successOrder: true});
    };
    errorOrder = () => {
        this.setState({errorMessage: true});
    };

    formNameGetValue = (evt) => {
        this.setState({nameValue: evt.target.value});
    };
    formPhoneGetValue = (evt) => {
        this.setState({phoneValue: evt.target.value});
    };

    summProducts = () => {
       let summProducts =  this.props.startPriceList.reduce((curr, prev) => {
           return curr + (prev.cnt * parseInt(prev.price));
       }, 0);
       this.setState({summProducts: summProducts});
    };

    render() {

        let basketList = this.props.startPriceList.map(item =>
                <BasketList key={item.id}
                            info={item}/>
        );

        return (
            (this.props.startPriceList.length) ?
            <div className="BasketPage">
                <div className="BasketPage-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 BasketPage-Text">
                                <h2 className="BasketPage-header">Basket</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {basketList}
                    </div>
                </div>
                <div className="container BasketPage-buttons">
                    <div className="row">
                        <div className="col-0 col-sm-3 col-md-4 col-lg-5"/>
                        <div className="col-6 col-sm-3 col-md-2 col-lg-1 BasketPage-buttons-wrapper">
                            <NavLink to="/catalogpage" className="btn btn-primary">add</NavLink>
                        </div>
                        <div className="col-6 col-sm-3 col-md-2 col-lg-1 BasketPage-buttons-wrapper">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm"
                                    onClick={this.summProducts}>buy</button>
                        </div>
                        <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false">
                            <div className="vertical-alignment-helper">
                                <div className="modal-dialog modal-sm vertical-align-center">
                                    <div className="modal-content">
                                        <div className="container">
                                            <div className="row">
                                                {
                                                    this.state.successOrder ?
                                                    <div className="col-12 success-order">
                                                        <h2 className="success-order-text">Your order is succes, Thank you</h2>
                                                        <div className="col-12">
                                                            <input type="button" className="btn btn-primary BasketPage-form-btn" defaultValue="ok"/>
                                                        </div>
                                                    </div>
                                                        :
                                                    <div className="col-12">
                                                        <div className="col-12">
                                                            {   (this.state.errorMessage) &&
                                                                <h2 className="connect-error">connect error!!</h2>
                                                            }
                                                            <input type="text" className="BasketPage-form-name" placeholder="Please enter name"
                                                                   onChange={this.formNameGetValue}/>
                                                        </div>
                                                        <div className="col-12">
                                                            <input type="text" className="BasketPage-form-phone" placeholder="Please enter phone"
                                                                   onChange={this.formPhoneGetValue}/>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="BasketPage-form-price">Total: {this.state.summProducts}$</div>
                                                        </div>
                                                        <div className="col-12">
                                                            <input type="button" className="btn btn-primary BasketPage-form-btn" value="buy"
                                                                   onClick={this.setNewItemData}
                                                                   disabled={!this.state.nameValue||!this.state.phoneValue ? true : null}/>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-0 col-sm-3 col-md-4 col-lg-5"/>
                    </div>
                </div>
            </div>
            :
            <div className="BasketPage">
                <div className="BasketPage-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 BasketPage-Text">
                                <h2 className="BasketPage-header">Basket</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <h1 className="BasketPage-empty">Basket is empty please  add items</h1>
                        <NavLink to="/catalogpage" className="btn btn-primary BasketPage-empty-btn">add</NavLink>
                    </div>
                </div>
            </div>
        );

    }

}


const mapStateToProps = function (state) {
    return {
        startPriceList: state.catalogList.startPriceList.filter((item) => {
            return item.status === true;
        }),
    };
};


export default connect(mapStateToProps)(BasketPage);

