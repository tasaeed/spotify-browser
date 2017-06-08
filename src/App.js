import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Result from './components/Result';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      token: null,
      expire: null,
      filter: '',
      results: [],
      counter: 0
    };

    this.spotify_authorize_url = this.spotify_authorize_url.bind(this);
    this.handleAuthorization = this.handleAuthorization.bind(this);
    this.handleResults = this.handleResults.bind(this);
    this.setFilter = this.setFilter.bind(this);

  }

  componentWillMount(){

    const access_token = localStorage.getItem('access_token');

    if(access_token === null){
      window.location = this.spotify_authorize_url();
    }

  }

  spotify_authorize_url(){

    var client_id = 'd885302d7e474d81b0444da6fe91758e';
    var redirect_uri = window.location.protocol + '//' + window.location.host +'/authorize.html';
    var state = 'abchsklhkashhkhskaef';
    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    return url;
  }

  handleAuthorization(){

    this.setState({
      authorized: !this.state.authorized
    });

    window.location = this.spotify_authorize_url();

  }

  handleResults(obj){

    var results;
    var total = 0;

    results = Object.keys(obj).map(function(k) {
      return obj[k]
    });

    for(let i = 0; i < results.length; i++){
      total += results[i].total;
    }

    this.setState({
      counter: total
    });

    this.setState({
      results: results
    });

  }

  setFilter(element){

    this.setState({
      filter: element
    });

  }

  render() {

    var results;

    if(this.state.results.length > 0){
      results = <Result data={this.state.results} filter={this.state.filter} />;
    }

    return (
      <div className="spotify">
        <Navbar counter={this.state.counter} setFilter={this.setFilter}/>
        <Search reathorize={this.handleAuthorization} results={this.handleResults} />
        {results}
      </div>
    );
  }
}

export default App;
