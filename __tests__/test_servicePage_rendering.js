import React from 'react';
import renderer from 'react-test-renderer';
import ServicesPage from '../components/ServicesPage/ServicesPage';
import {HashRouter, hashHistory} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';
const store = configureStore({});

test('тест на рендеринг сктраницы сервисов', () => {

    const component = renderer.create(
        <Provider store={store}>
            <HashRouter history={hashHistory}>
                <ServicesPage/>
            </HashRouter>
        </Provider>
    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});