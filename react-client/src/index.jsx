import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import PreviouslyPlayed from './components/PreviouslyPlayed.jsx';
import CurrentSong from './components/CurrentSong.jsx';
import access_token from './config/spotify_access_token.js';
import { tween, styler, easing } from 'popmotion';
import styles from './css/index.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentURI: '',
    }

    this.changeURI = this.changeURI.bind(this);
    this.grabCurrentlyPlayingSong = this.grabCurrentlyPlayingSong.bind(this);
    this.tweenTest = this.tweenTest.bind(this);
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

  tweenTest(tempo) {
    // const counter = document.querySelector('.counter');
    // const updateCounter = (v) => counter.innerHTML = v;
    // tween({to: tempo, duration:500}).start(updateCounter);
    console.log('tween test run')
    const ball = document.querySelector('.counter');
    const ballStyler = styler(ball);

    tween({
      from: { x: 0, scale: 1 },
      to: { x: 300, scale: 2 },
      ease: easing.easeInOut,
      flip: Infinity,
      duration: 1000
    }).start(v => ballStyler.set(v));
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
            .then(() => Swal.fire({
              type: 'success',
              text: 'New song saved to database!',
            }))
        })
        .catch(() => Swal.fire('Trouble getting song information.'))
      })
      .then(() => {
        grabPlayingSong.get(`https://api.spotify.com/v1/audio-analysis/${this.state.currentURI}`)
          .then((audioAnalysis) => {
            this.setState({
              audioAnalysis: audioAnalysis.data,
              tempo: audioAnalysis.data.track.tempo
            })
          })
          .catch(() => Swal.fire('Trouble grabbing song Audio Analysis'))
      })
  }

  render () {
    return (
    <div>
      <h1>MUSICAST</h1>
      <button onClick={this.grabCurrentlyPlayingSong}>What are you listening to right now?</button>
      <CurrentSong className='CurrentSong' currentSongInfo={this.state.currentSong} tempo = {this.state.tempo} tweenTest = {this.tweenTest}/>
      <PreviouslyPlayed className='PreviouslyPlayed' previousSongs={this.state.allSongs}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));