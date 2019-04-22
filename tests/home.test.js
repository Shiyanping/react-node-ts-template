// Link.react.test.js
const React = require('react');
const Link = require('../src/web/pages/home/home');
const renderer = require('react-test-renderer');

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.baidu.com">Baidu</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});