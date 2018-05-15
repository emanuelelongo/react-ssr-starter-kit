import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PlanetItem from '../components/PlanetItem';
import PlanetDetails from '../components/PlanetDetails';
import { fetchPlanets, fetchPlanetDetails } from '../actions';

class Planets extends React.Component {
  componentDidMount() {
    if(this.props.planets.length === 0) {
      this.props.fetchPlanets()
    }
  }

  render() {
    const { planets, details, fetchPlanetDetails } = this.props;

    return (
      <div>
        <Link to={'/'}>Star Wars</Link>
        <h2>~ Planets ~</h2>
          <div>
            <ul> 
              { planets.map(i => <PlanetItem key={i.id} {...i}/>) } 
            </ul>
                <Route path={`${this.props.match.url}/:id`} render={ (props) =>
                    <PlanetDetails {...props} fetchDetails={fetchPlanetDetails} details={details}/>
                } />
          </div>
      </div>
    )
  }
}

Planets.requirements = [
  fetchPlanets,
  ['/planets/:id', (params) => fetchPlanetDetails(params.id) ]
]

function mapStateToProps(state) {
  return {
    planets: state.planets,
    details: state.details
  }
}

export default connect(mapStateToProps, {fetchPlanets, fetchPlanetDetails})(Planets)
