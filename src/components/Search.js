import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            disabled: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        var self = this;
        event.preventDefault();

        if(this.state.value){
            this.setState({disabled: !this.state.disabled})
        } else{
            this.setState({error: 'Please fill out form'});
            return false;
        }


        var access_token = localStorage.getItem('access_token');
        var api = 'https://api.spotify.com/v1/search?';
        var query = 'q=' + encodeURIComponent(this.state.value);
        var type = '&type=album,artist,playlist,track';

        var spotifyResponse = fetch(api+query+type, {
            headers: new Headers({
                'Authorization': 'Bearer ' + access_token
            })
        });

        spotifyResponse.then(function(res){

            if(res.status === 401){
                self.props.reathorize();
            }

            if(res.status !== 200){
                throw Error('Request Failed');
            }

            return res.json();

        }).then(function(data){
            self.props.results(data);
            self.setState({disabled: !self.state.disabled});

        }).catch(function(error) {
            console.log(error);
        });


    }

    render() {

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group form-group-lg">
                    <div className="col-xs-12 col-sm-8 col-sm-offset-2">
                        <input id="search"
                               className="form-control"
                               type="text"
                               value={this.state.value}
                               placeholder="Search..."
                               onChange={this.handleChange}
                               disabled={this.state.disabled}
                               autoFocus/>
                        <button className="search-icon"
                                type="submit"
                                disabled={this.state.disabled}><i className="fa fa-search" aria-hidden="true"></i></button>
                        <p className="error">{!this.state.value ? this.state.error : ''}</p>
                    </div>
                </div>
            </form>
        );
    }
}

export default Search