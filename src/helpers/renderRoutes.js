import { renderRoutes } from 'react-router-config';
import createRouterConfig from './createRouterConfig';

export default function(routes) {
  const routerConfig = createRouterConfig(routes);
  return renderRoutes(routerConfig);
}