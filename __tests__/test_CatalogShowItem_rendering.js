import React from 'react';
import renderer from 'react-test-renderer';
import CatalogShowItem from '../components/CatalogPage/CatalogShowItem/CatalogShowItem';
import {HashRouter, hashHistory} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';
const store = configureStore({});


test('рендеринг одностраничного просмотра каталога', () => {

    const component = renderer.create(
        <Provider store={store}>
            <HashRouter history={hashHistory}>
                <CatalogShowItem/>
            </HashRouter>
        </Provider>

    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});