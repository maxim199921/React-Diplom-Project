import React from 'react';
import renderer from 'react-test-renderer';
import CatalogPage from '../components/CatalogPage/CatalogPage';
import {HashRouter, hashHistory} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';
const store = configureStore({});


test('работа кнопок каталога', () => {


    const component = renderer.create(
        <Provider store={store}>
            <HashRouter history={hashHistory}>
                <CatalogPage/>
            </HashRouter>
        </Provider>

    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const searchButton = component.root.find( el => el.props.type ==="text" );

    searchButton.props.onKeyPress('Enter');

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const goShowAllButton = component.root.find( el => el.props.value ==="SHOW ALL" );

    goShowAllButton.props.onChange();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const goShowLAPTORButton = component.root.find( el => el.props.value ==="LAPTOR" );

    goShowLAPTORButton.props.onChange();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const goShowPHONEButton = component.root.find( el => el.props.value ==="PHONE" );

    goShowPHONEButton.props.onChange();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const goShowTABLETButton = component.root.find( el => el.props.value ==="TABLET" );

    goShowTABLETButton.props.onChange();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
});