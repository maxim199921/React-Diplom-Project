import React from 'react';
import renderer from 'react-test-renderer';
import FooterPage from '../components/FooterPage/FooterPage';


test('тест на рендеринг футера', () => {

    const component = renderer.create(
        <FooterPage/>
    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});