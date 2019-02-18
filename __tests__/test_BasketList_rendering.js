import React from 'react';
import renderer from 'react-test-renderer';
import BasketList from '../components/BasketPage/BasketList/BasketList';
import {HashRouter, hashHistory} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';
const store = configureStore({});
import 'react-redux';


test('рендеринг карточек с информацией', () => {

    const item =  {id: 1, type: "Laptop", img: "https://content2.onliner.by/catalog/device/header/41a120c5ab9e2b54b14c889efb56bb87.jpeg", model: "HP 250 G6 4QW22ES", price: "325$", description: "height-50mm, width-39mm", status: false, cnt: 1};

    const component = renderer.create(
        <Provider store={store}>
            <HashRouter history={hashHistory}>
                <BasketList info={item}/>
            </HashRouter>
        </Provider>

    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});