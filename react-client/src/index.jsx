import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import $ from 'jquery';

import PreviouslyPlayed from './components/PreviouslyPlayed.jsx';
import CurrentSong from './components/CurrentSong.jsx';
import access_token from './config/spotify_access_token.js';
import { tween, styler, easing, everyFrame } from 'popmotion';
import styles from './css/index.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentURI: '',
      visualizerCalled: false,
    }

    this.authentication = this.authentication.bind(this);
    this.changeURI = this.changeURI.bind(this);
    this.grabCurrentlyPlayingSong = this.grabCurrentlyPlayingSong.bind(this);
    this.visualizer = this.visualizer.bind(this);
  }

  componentDidMount() {
    axios.get('/previousSongs')
      .then((allSongs) => {
        this.setState({
          allSongs: allSongs.data,
        })
      })
  }

  authentication() {
    axios.get('/login')
      .then((returnedLoginInfo) => {
        console.log('return', returnedLoginInfo)
      })
  }

  changeURI(e) {
    this.setState({
      currentURI: e.target.value
    })
  }

  visualizer(visualizerCalled) {
    if (!visualizerCalled) {
      var divsize = ((Math.random()*100) + 50).toFixed();
      var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
      let $newdiv = $('<div/>').css({
          'width':divsize+'px',
          'height':divsize+'px',
          'background-color': color
      });
  
      var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
      var posy = (Math.random() * ($(document).height() - divsize)).toFixed();
  
      $newdiv.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none'
      }).appendTo( 'body' ).fadeIn(100).delay(1000).fadeOut(500, function(){
      $(this).remove();
      })
      this.setState({visualizerCalled: true})
    }
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
            .then(() => 
              Swal.fire({
                type: 'success',
                text: 'New song saved to database!',
              })
            )
        })
        .catch(() => 
          Swal.fire({
            type: 'error',
            text: 'Trouble getting song information.',
          })
        );
      })
      .then(() => {
        grabPlayingSong.get(`https://api.spotify.com/v1/audio-analysis/${this.state.currentURI}`)
          .then((audioAnalysis) => {
            this.setState({
              audioAnalysis: audioAnalysis.data,
              tempo: audioAnalysis.data.track.tempo
            })
          })
          .catch(() => 
            Swal.fire({
              type: 'error',
              text: 'Trouble grabbing track analysis.',
            })
          )
      });
  };

  render () {
    return (
    <div>
      <h1>MUSICAST</h1>
      <button onClick={this.grabCurrentlyPlayingSong}>What are you listening to right now?</button>
      <CurrentSong 
        className='CurrentSong'
        currentSongInfo={this.state.currentSong}
        tempo={this.state.tempo}
        visualizer={this.visualizer}
        visualizerCalled={this.state.visualizerCalled}
        />
      <PreviouslyPlayed className='PreviouslyPlayed' previousSongs={this.state.allSongs}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));