import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from '../components/HomePage/HomePage';
import {HashRouter, hashHistory} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';
const store = configureStore({});

test('работа кнопок перехода на страницу каталога и открытия меню с коментариями при нажатии на кнопку', () => {

    const component = renderer.create(
        <Provider store={store}>
            <HashRouter history={hashHistory}>
                <HomePage/>
            </HashRouter>
        </Provider>

    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const goLaprorsButton = component.root.find( el => el.props.value ==="goLaprors" );

    goLaprorsButton.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const goPhonesButton = component.root.find( el => el.props.value ==="goPhones" );

    goPhonesButton.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const goTabletsButton = component.root.find( el => el.props.value ==="goTablets" );

    goTabletsButton.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});