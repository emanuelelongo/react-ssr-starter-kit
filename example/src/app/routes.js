import Home from './pages/Home';
import Planets from './pages/Planets';
import People from './pages/People';

export default [{
  path: '/',
  exact: true,
  component: Home,
}, {
  path: '/planets',
  component: Planets
}, {
  path: '/people',
  component: People
}];
