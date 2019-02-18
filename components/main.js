import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './HomePage/HomePage';
import ServicesPage from './ServicesPage/ServicesPage';
import CatalogPage from './CatalogPage/CatalogPage';
import BasketPage from './BasketPage/BasketPage';
import HeaderPage from './HeaderPage/HeaderPage';
import FooterPage from './FooterPage/FooterPage';
import CatalogShowItem from './CatalogPage/CatalogShowItem/CatalogShowItem'


class MainPage extends React.Component {
          
  render() {

    return (
        <div className="wrapper">
            <HeaderPage/>
            <div className="mainLink">
                <Route path="/" exact component={HomePage} />
                <Route path="/servicespage" component={ServicesPage} />
                <Route path="/catalogpage" exact component={CatalogPage} />
                <Route path="/catalogpage/:id" render={({match}) => <CatalogShowItem itemId = { match.params.id }/>} />
                <Route path="/basketpage" component={BasketPage} />
            </div>
            <FooterPage/>
        </div>
    );
    
  }

}
    
export default MainPage;
    