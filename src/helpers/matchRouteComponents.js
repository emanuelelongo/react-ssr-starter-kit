import { matchRoutes } from 'react-router-config'

export default function(path, routes) {
  return matchRoutes(routes, path)
    .map(({ route }) => route.component);
}
