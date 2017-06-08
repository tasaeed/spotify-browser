import React, { Component } from 'react';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {

        switch (e.target.className){
            case 'dropdown-toggle':
            case 'caret':
            this.setState({
                isOpen: !this.state.isOpen
            });
                break;
            case 'filter':
                this.props.setFilter(e.target.getAttribute('data-value'));
                break;
            default:
                break;
        }



    }

    render() {

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div className="navbar-brand" href="#"><i className="fa fa-rebel" aria-hidden="true"></i></div>
                        </div>
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className={ `dropdown activ ${this.state.isOpen ? 'open' : ''} `} onClick={this.handleClick}>
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded={this.state.isOpen}>Filter <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#" className="filter" data-value="album">Album</a></li>
                                        <li><a href="#" className="filter" data-value="artist">Artist</a></li>
                                        <li><a href="#" className="filter" data-value="playlist">Playlist</a></li>
                                        <li><a href="#" className="filter" data-value="track">Track</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="counter">{this.props.counter ? this.props.counter : 'Counter'}</li>
                            </ul>
                        </div>{/*.navbar-collapse */}
                    </div>{/*.container*/}
                </div>{/* .container-fluid */}
            </nav>
        );
    }
}

export default Navbar