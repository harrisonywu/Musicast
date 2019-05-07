import React from 'react';
import styles from '../css/SingleSongInfo.css'

function SingleSongInfo(props) {
  const {songName, artistName, albumName, albumImg} = props.song;
  return (
    <div className='single-song-container'>
      <img src={albumImg}></img>
      <div>
        <div>Song: {songName}</div>
        <div>Artist: {artistName}</div>
        <div>Album: {albumName}</div>
      </div>
    </div>
  )
}

export default SingleSongInfo;
