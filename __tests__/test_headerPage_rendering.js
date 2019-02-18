import React from 'react';
import renderer from 'react-test-renderer';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import {HashRouter, hashHistory} from 'react-router-dom';

test('тест на рендеринг хедера', () => {

    const component = renderer.create(
        <HashRouter history={hashHistory}>
            <HeaderPage/>
        </HashRouter>
    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});