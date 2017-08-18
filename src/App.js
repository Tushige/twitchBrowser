import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/*
 * Component describing a twitcher's basic profile
 */
class Profile extends React.Component {
    render() {
        return (
            <div className="twitcher-profile-overlay">
                <h2>{this.props.game}</h2>
                <h3>viewers: {this.props.viewers}</h3>
                <h3>followers: {this.props.followers}</h3>
            </div>
        )
    }
}
/*
 * Component describing a twitcher's avatar image
 */
class Avatar extends React.Component {
    render() {
        return (
            <div>
                <div className="avatar-container">
                    <div className="Twitcher-title">
                        <h1><a href={this.props.url}>{this.props.channelName}</a></h1>
                    </div>
                    <Profile game={this.props.game}
                             viewers={this.props.viewers}
                             followers={this.props.followers}>
                             </Profile>
                    <div className="avatar">
                        <img src={this.props.logoSource}></img>
                    </div>
                </div>
            </div>
        )
    }
}
/*
 * Component describing a single Twitcher entry
 */
class Twitcher extends React.Component {
    render() {
        let channel = this.props.channel;
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <Avatar logoSource={channel.logo}
                            channelName={channel.name}
                            url={channel.url}
                            viewers={this.props.viewers}
                            game={channel.game}
                            followers={channel.followers}>
                    </Avatar>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

/*
 * A table containing rows of twitcher entries
 */
class TwitcherTable extends React.Component {
    constructor() {
        super();
        this.state = {
            twitchers: []
        };
    }
    /*
     * On UI load, twitcher information is retrieved from Twitch API
     */
    componentDidMount() {
        var config = {
            'Client-ID': 'fh1q2fz6crohr35x1ucszbq8imixq2'
        };
        var apiUrl = 'https://api.twitch.tv/kraken/streams?client_id=fh1q2fz6crohr35x1ucszbq8imixq2u';
        /*request for data*/
        axios.get(apiUrl, config)
          .then(res => {
            /* save response in a state*/
            this.setState({
                twitchers: res.data.streams
            });
            console.log(this.state.twitchers)
          });
    }
    render() {
        let twitcher_list = null;
        /*embed twitch user data in Twitcher component*/
        if (this.state.twitchers.length > 0) {
            twitcher_list = this.state.twitchers.map((twitcher) =>
                <Twitcher key={twitcher._id}
                          channel={twitcher.channel}
                          viewers={twitcher.viewers}>
                </Twitcher>
            );
        }

        return (
            <div className="row">
                {twitcher_list}
            </div>
        )
    }
}
/*
 * Outermost container
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Top Twitchers</h2>
        </div>
        <TwitcherTable/>
      </div>
    );
  }
}

export default App;
