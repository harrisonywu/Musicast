import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PreviouslyPlayed from './components/PreviouslyPlayed.jsx';
import SongSubmit from './components/SongSubmit.jsx';
import CurrentSong from './components/CurrentSong.jsx';
import access_token from './config/spotify_access_token.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentURI: '',
    }

    this.changeURI = this.changeURI.bind(this);
    this.grabCurrentlyPlayingSong = this.grabCurrentlyPlayingSong.bind(this);
  }

  componentDidMount() {
    axios.get('/previousSongs')
      .then((allSongs) => {
        this.setState({
          allSongs: allSongs.data,
        })
      })
  }

  changeURI(e) {
    this.setState({
      currentURI: e.target.value
    })
  }

  grabCurrentlyPlayingSong() {
    let grabPlayingSong = axios.create({
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    })

    grabPlayingSong.get('	https://api.spotify.com/v1/me/player/currently-playing')
      .then((currentSong) => currentSong.data)
      .then((songData) => {
        this.setState({
          currentURI: songData.item.id,
        })
      })
      .then(() => {
        grabPlayingSong.get(`https://api.spotify.com/v1/tracks/${this.state.currentURI}`)
        .then((songInfo) => {
          this.setState({
            currentSong: songInfo.data,
          })
          axios.post('/saveSong', songInfo.data)
            .then(() => alert('song saved!'))
        })
        .catch(() => alert('Trouble getting song information'))
      })
      .then(() => {
        grabPlayingSong.get(`https://api.spotify.com/v1/audio-analysis/${this.state.currentURI}`)
          .then((audioAnalysis) => {
            this.setState({
              audioAnalysis: audioAnalysis.data,
            })
          })
          .catch(() => alert('Trouble grabbing song Audio Analysis'))
      })
  }

  render () {
    return (
    <div>
      <PreviouslyPlayed previousSongs={this.state.allSongs}/>
      <CurrentSong currentSongInfo={this.state.currentSong}/>
      <button onClick={this.grabCurrentlyPlayingSong}></button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));