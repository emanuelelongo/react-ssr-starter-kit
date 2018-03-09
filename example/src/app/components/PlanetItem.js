import React from 'react';
import { Link } from 'react-router-dom';

export default class PlanetItem extends React.Component {
  render() {
    return (
      <li>
          <Link to={`/planets/${this.props.id}`}>{this.props.name}</Link>
      </li>
    );
  }
}