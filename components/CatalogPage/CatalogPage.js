import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {loadData, setPriceListFromLocalStorage, filterLaptor, filterPhone, filterTablet, filterAll, search} from '../../redux/ActionCreaters/CatalogActions'
import CatalogList from './CatalogList/CatalogList';
import './CatalogPage.css';

class CatalogPage extends React.PureComponent {

    static propTypes = {
        isLoaded: PropTypes.bool.isRequired,
        checkedRadio: PropTypes.number.isRequired,
        foundNull: PropTypes.bool.isRequired,
        priceList: PropTypes.arrayOf(
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
        searchValue: null,
    };

    componentDidMount = () => {
        if (localStorage.startPriceList === undefined){
            this.props.dispatch(loadData());
        } else {
            this.props.dispatch( setPriceListFromLocalStorage(JSON.parse(localStorage.startPriceList)) );
        }
        this.scrollTop();

    };

    componentDidUpdate = () => {
        localStorage['startPriceList'] = JSON.stringify(this.props.startPriceList);
    };

    scrollTop = () => {
        window.scrollTo(0, 0);
    };

    setSearchValue = (evt) => {
        this.setState({searchValue: evt.target.value});
    };
    searchFilterPriceList = () => {
        this.props.dispatch( search(this.state.searchValue) )
    };
    searchKeyPressEnter = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            this.props.dispatch( search(this.state.searchValue) )
        }
    };


    showLaptor = () => {this.props.dispatch( filterLaptor('Laptop') )};
    showPhone = () => {this.props.dispatch( filterPhone('Phone') )};
    showTablet = () => {this.props.dispatch( filterTablet('Tablet') )};
    showAll = () => {this.props.dispatch( filterAll() )};

    render() {

        let catalogList;
        this.props.foundNull
            ? catalogList = <h1 className="noFountError">...no products found try again</h1>
            : catalogList = this.props.priceList.map(item =>
                <CatalogList key={item.id}
                              info={item}/>
             );

        return (

            <div className="CatalogPage">
                <div className="container CatalogPage-container-shad">
                    <div className="row">
                        <div className="col-12 CatalogPage-Text">
                            <div className="row">
                                <div className="col-12 col-sm-3">
                                    <h2 className="CatalogPage-header">Catalog</h2>
                                </div>
                                <div className="col-12 col-sm-9 align-self-center CatalogPage-wrapper-shad">
                                    <form className="form-inline">
                                            <input type="button" className="btn btn-primary CatalogPage-header-btn" value="GO"
                                            onClick={this.searchFilterPriceList}/>
                                            <input type="text" className="form-control CatalogPage-header-search" placeholder="search"
                                            onChange={this.setSearchValue}
                                            onKeyPress={this.searchKeyPressEnter}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-3 CatalogPage-Filter CatalogPage-wrapper-shad-Filter">
                            <label className="radio" htmlFor="SHOW_ALL_RADIO">
                                <input id="SHOW_ALL_RADIO" name="filter" type="radio" value="SHOW ALL"  onChange={this.showAll}
                                       checked={this.props.checkedRadio === 0}/>
                                <div className="radio__text">SHOW ALL</div>
                            </label>
                            <label className="radio" htmlFor="LAPTOR_RADIO">
                                <input id="LAPTOR_RADIO" name="filter" type="radio" value="LAPTOR"  onChange={this.showLaptor}
                                       checked={this.props.checkedRadio === 1}/>
                                <div className="radio__text">LAPTOP</div>
                            </label><br/>
                            <label className="radio" htmlFor="PHONE_RADIO">
                                <input id="PHONE_RADIO" name="filter" type="radio" value="PHONE"  onChange={this.showPhone}
                                       checked={this.props.checkedRadio === 2}/>
                                <div className="radio__text">PHONE</div>
                            </label><br/>
                            <label className="radio" htmlFor="TABLET_RADIO">
                                <input id="TABLET_RADIO" name="TABLET_RADIO" type="radio" value="TABLET" onChange={this.showTablet}
                                       checked={this.props.checkedRadio === 3}/>
                                <div className="radio__text">TABLET</div>
                            </label><br/>
                            <NavLink to="/basketpage" className="btn btn-primary btn-primary-buy">Buy</NavLink>
                        </div>
                        <div className="col-12 col-sm-9 CatalogPage-List">
                            {
                                (this.props.isLoaded)?
                                <div className="row">
                                    {catalogList}
                                </div>
                                :
                                <div className="CatalogPage-Loader">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <h1 className="CatalogPage-Text-Loading">...Loading
                                                    <div className="loader-container">
                                                        <div className="loader-1"></div>
                                                    </div>
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        );

    }

}

const mapStateToProps = function (state) {
    return {
        isLoaded: state.catalogList.isLoaded,
        priceList: state.catalogList.priceList,
        checkedRadio: state.catalogList.checkedRadio,
        foundNull: state.catalogList.foundNull,
        startPriceList: state.catalogList.startPriceList,
    };
};


export default connect(mapStateToProps)(CatalogPage);
