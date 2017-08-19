import React, { Component } from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/*
 * Component describing a twitcher's basic profile
 */
class Profile extends React.Component {
    render() {
        return (
            <div className="twitcher-profile-overlay">
                <h2 className="twitcher-title"><a href={this.props.url}>{this.props.channelName}</a></h2>
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
            <div className="avatar">
                <Profile channelName={this.props.channelName}
                         game={this.props.game}
                         viewers={this.props.viewers}
                         followers={this.props.followers}>
                </Profile>
                <img src={this.props.logoSource} alt="n/a"></img>
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
            <Avatar logoSource={channel.logo}
                    channelName={channel.name}
                    url={channel.url}
                    viewers={this.props.viewers}
                    game={channel.game}
                    followers={channel.followers}>
            </Avatar>
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
         let httpRequest = new XMLHttpRequest();
         //responseHandler = responseHandler.bind(this);
         let apiUrl = 'https://api.twitch.tv/kraken/streams?client_id=fh1q2fz6crohr35x1ucszbq8imixq2u';
         function responseHandler() {
             if (httpRequest.readyState === httpRequest.DONE) {
                 if (httpRequest.status === 200) {
                     var twitchData = JSON.parse(httpRequest.response);
                     this.setState({
                         twitchers: twitchData.streams,
                     });
                }
            }
        }
        httpRequest.onreadystatechange = responseHandler.bind(this);
        httpRequest.open("GET", apiUrl, true);
        httpRequest.send();
     }
    render() {
        let twitcher_list = null;
        /*embed twitch user data in Twitcher component*/
        if (this.state.twitchers.length > 0) {
            twitcher_list = this.state.twitchers.map((twitcher) =>
                <Twitcher
                          key={twitcher._id}
                          channel={twitcher.channel}
                          viewers={twitcher.viewers}>
                </Twitcher>
            );
        }

        return (
            <div className="table">
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
          <h1>Top Twitchers</h1>
        </div>
        <TwitcherTable/>
      </div>
    );
  }
}

export default App;
