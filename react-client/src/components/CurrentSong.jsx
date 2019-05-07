import React from 'react';
import {Animated} from "react-animated-css";
import styles from '../css/CurrentSong.css';
 
function CurrentSong(props) {
  const { currentSongInfo, tempo } = props;
  if (typeof props.currentSongInfo != 'undefined') {
    return (
      <Animated animationIn="bounceIn" animationOut="bounceOut" isVisible={true}>
        <div >
          <h1>CURRENT SONG</h1>
          <div className ='current-song-container'>
            <img src={currentSongInfo.album.images[2].url}></img>
            <div>
              <div className='current-song-info'>{currentSongInfo.name} by {currentSongInfo.album.artists[0].name}</div>
              <div> Tempo: {tempo}</div>
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
