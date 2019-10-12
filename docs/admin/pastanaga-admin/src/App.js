import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      jugantPartida: false
    };
    this.comencarPartida = this.comencarPartida.bind(this);

  }

  componentDidMount() {
    fetch("http://abuch.ddns.net:3080/api/users", {
      crossDomain: true,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            users: result
          });
        },
        (error) => {
          console.log(error)
        }
      )
      this.isThereMatch();
  }

  isThereMatch() {
    fetch("http://abuch.ddns.net:3080/api/is-there-match", {
      crossDomain: true,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            jugantPartida: result
          });
        },
        (error) => {
          console.log(error)
        }
      )

  }

  comencarPartida() {
    fetch("http://abuch.ddns.net:3080/api/create-game", {
      crossDomain: true,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            jugantPartida: true
          });
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render() {
    return (
      <div className="container">
        <h1 className="mt-5">Usuaris Registrats</h1>
        <div className="mt-5 ">
          {this.state.users.map((item, keys) => <div className="row border" key={item.id}>
            <p className="col">Id: {keys}</p>
            <p className="col">Nom: {item.name}</p>
            <p className="col">E-mail: {item.email}</p>
            <p className="col">Viu?: {item.alive ? "Si" : "No"}</p>
            <p className="col">Monedes: {item.monedes}</p>
            <p className="col">Objectiu: {item.objectiu.name}</p>
          </div>)}
        </div>
        {(this.state.jugantPartida) ?
          <p>Jugant Partida</p>
          :
          <button
            onClick={this.comencarPartida}
            type="button"
            className="btn btn-primary mt-2">
            Començar partida
              </button>

        }
      </div>
    );
  }
}

