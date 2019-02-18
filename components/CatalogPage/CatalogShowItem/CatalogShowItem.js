import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './CatalogShowItem.css';
import {loadData} from "../../../redux/ActionCreaters/CatalogActions";

class CatalogShowItem extends React.PureComponent {

    static propTypes = {
        itemId: PropTypes.any,
        isLoaded: PropTypes.bool.isRequired,
        startPriceList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                type: PropTypes.string.isRequired,
                img: PropTypes.string.isRequired,
                model: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                status: PropTypes.bool.isRequired,
            })
        ),
    };

    state = {
        info: {}
    };

    componentDidMount = () => {
        this.props.dispatch(loadData());
    };
    componentDidUpdate = () => {
        let getItem = this.props.startPriceList.filter((item) => item.id === +this.props.itemId);
        this.setState({info: getItem[0]});
    };

    render() {

        let item = this.props.startPriceList[this.props.itemId - 1];

        return (
            (this.props.isLoaded)?
            <div className="container CatalogShowItem ">
                <div className="row CatalogShowItem-wrapper">
                    <div className="col-sm-4 col-lg-6 CatalogShowItem-img-wrapper">
                        <img className="CatalogShowItem-img" src={item.img||this.state.info.img} />
                    </div>
                    <div className="col-sm-8 col-lg-6">
                        <div className="row CatalogShowItem-wrapper">
                            <div className="col-4 CatalogShowItem-text">Type:</div>
                            <div className="col-sm-8 CatalogShowItem-type">{item.type||this.state.info.type}</div>
                            <div className="col-4 CatalogShowItem-text">Model:</div>
                            <div className="col-sm-8 CatalogShowItem-model">{item.model||this.state.info.model}</div>
                            <div className="col-4 CatalogShowItem-text">Description:</div>
                            <div className="col-sm-8 CatalogShowItem-description">{item.description||this.state.info.description}</div>
                            <div className="col-4 CatalogShowItem-text">Price:</div>
                            <div className="col-sm-8 CatalogShowItem-price">{item.price||this.state.info.price}</div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="CatalogPage-Loader-2 CatalogShowItem">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="CatalogPage-Text-Loading">...Loading
                                <div className="loader-container">
                                    <div className="loader-1"/>
                                </div>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

const mapStateToProps = function (state) {
    return {
        startPriceList: state.catalogList.startPriceList,
        isLoaded: state.catalogList.isLoaded,
    };
};


export default connect(mapStateToProps)(CatalogShowItem);

