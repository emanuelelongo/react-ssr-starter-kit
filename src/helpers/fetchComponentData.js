import React from 'react';
import matchPath from 'react-router/matchPath';

function dispatchIfMatch(dispatch, requirement, path) {
  const match = matchPath(path, requirement[0]);
  return match
    ? dispatch(requirement[1](match.params))
    : Promise.resolve();
}

export default function fetchComponentData(dispatch, components, path) {
  const requirements = components.reduce( (prev, current) => {
    return current ? (current.requirements || []).concat(prev) : prev;
  }, []);
  const promises = requirements.map(requirement => {
    return typeof(requirement) === 'function'
      ? dispatch(requirement())
      : dispatchIfMatch(dispatch, requirement, path);
  });
  return Promise.all(promises);
}
