import React from 'react';

export default class PlanetDetails extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if(Object.keys(this.props.details).length === 0) {
      this.props.fetchDetails(id);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const current = this.props.match.params.id;
    const next = nextProps.match.params.id;

    if(current !== next) {
      this.props.fetchDetails(next)
    }
  }

  render() {
    const { 
      name, 
      diameter, 
      rotation_period,
      terrain
    } = this.props.details;

    return (
      <div>
        <div><b> { name } </b></div>
        <table>
          <tbody>
            <tr>
              <td>Diameter</td>
              <td>{ diameter }</td>
            </tr>
            <tr>
              <td>Rotation period</td>
              <td>{ rotation_period }</td>
            </tr>
            <tr>
              <td>Terrain</td>
              <td>{ terrain }</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}