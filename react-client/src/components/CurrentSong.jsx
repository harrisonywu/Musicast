import React from 'react';
import {Animated} from "react-animated-css";
import styles from '../css/CurrentSong.css';
 
function CurrentSong(props) {
  const { currentSongInfo, tempo, visualizer, visualizerCalled } = props;
  if (typeof props.currentSongInfo != 'undefined') {
    return (
      <Animated animationIn="bounceIn" animationOut="bounceOut" isVisible={true}>
        <div >
          <h1>CURRENT SONG</h1>
          <div className ='current-song-container'>
            <img src={currentSongInfo.album.images[1].url}></img>
            <div>
              <div className='current-song-info'>{currentSongInfo.name} by {currentSongInfo.album.artists[0].name}</div>
              <div>Tempo: {tempo}</div>
              <button onClick={() => setInterval(() => visualizer(visualizerCalled), 1/(tempo/60)*1000)} >Flashing Lights!</button>
            </div>
          </div>
        </div>
      </Animated>
    )
  } else {
    return (
      <div>
        <h1>CURRENT SONG</h1>
        No Song currently playing.
      </div>
    )
  }
}

export default CurrentSong;
