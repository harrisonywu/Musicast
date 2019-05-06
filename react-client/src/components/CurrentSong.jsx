import React from 'react';


function CurrentSong(props) {
  const { currentSongInfo } = props;
  if (typeof props.currentSongInfo != 'undefined') {
    return (
      <div>
        <h1>CURRENT SONG</h1>
        <div>{currentSongInfo.name} by {currentSongInfo.album.artists[0].name}</div>
        {console.log(currentSongInfo.album.images.url)}
        <img src={currentSongInfo.album.images[2].url}></img>
      </div>
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
