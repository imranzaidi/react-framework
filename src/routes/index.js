import Home from '@components/Main/Home/Home.jsx';
import PageOne from '@components/Main/PageOne/PageOne';
import PageTwo from '@components/Main/PageTwo/PageTwo';
import PageThree from '@components/Main/PageThree/PageThree';

const routes = [{
  path: '/',
  exact: true,
  component: Home
}, {
  path: '/page/one',
  exact: true,
  component: PageOne,
  componentPath: 'Main/PageOne'
}, {
  path: '/page/two',
  exact: true,
  component: PageTwo
}, {
  path: '/page/three',
  exact: true,
  component: PageThree
}];

export default routes;
