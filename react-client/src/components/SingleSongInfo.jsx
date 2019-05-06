import React from 'react';

function SingleSongInfo(props) {
  const {songName, artistName, albumName, albumImg} = props.song;
  return (
    <div>
      <div>
        <div>Song: {songName}</div>
        <div>Artist: {artistName}</div>
        <div>Album: {albumName}</div>
      </div>
      <img src={albumImg}></img>
    </div>
  )
}

export default SingleSongInfo;
