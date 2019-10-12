import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false
    };
    this.handleClick = this.handleClick.bind(this);

  }

  async getUsers(){
    fetch("http://abuch.ddns.net:3080/api/users", {
      crossDomain: true,
      method: 'GET',
      headers: {'Content-Type':'application/json'},
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            users: result.users
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.getUsers();
  }

  handleClick() {
    console.log("Click");
  }

  render() {
    return (
      <div className="container">
        <h1 className="mt-5">Usuaris Registrats</h1>
        <div className="card w-50 mt-5 ">
          {this.state.users.map((item, keys) => <div className="row m-3 border">
            <p className="col">{item.name}</p>
            <p className="col">{item.email}</p>
            <p className="col">{item.alive}</p>
            <p className="col">{item.monedes}</p>
          </div>)}
        </div>
        <button onClick={this.handleClick} type="button" class="btn btn-primary mt-2">Començar partida</button>

      </div>
    );
  }
}

