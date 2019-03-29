import React, { Component, Fragment } from 'react';
import SwapiService from '../../services/swapi.service'
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './random-planet.css';

export default class RandomPlanet extends Component {
  swapi = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  }

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  }

  onError = (err) => {
    console.log('err', err.message);
    this.setState({
      error: true,
      loading: false
    })
  }

  updatePlanet() {
    //const id = 12000
    const id = Math.floor(Math.random()*25 + 2);
    this.swapi
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)      
  }

  render() {    
    const {planet, loading, error} = this.state;
    const hasData = !(loading || error);
    const errorMessage = error? <ErrorIndicator />: null;
    const spinner = loading? <Spinner />: null;
    const content = hasData? <PlanetView planet = {planet}/>: null

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>

    );
  }
}

const PlanetView = ({planet}) => {
  const { id, name, population, rotationPeriod, diameter} = planet;

  return (
    <Fragment>
      <img className="planet-image"
        alt='some img'
        src="https://starwars-visualguide.com/assets/img/planets/5.jpg" />
      <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </Fragment>    
  )
}