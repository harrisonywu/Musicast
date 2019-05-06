import React from 'react';
import SingleSongInfo from './SingleSongInfo.jsx';

// This will grab the previously played songs from my mongo library
// Then it will display it in list form

//FOR EACH PASSED DOWN STATE, RENDER THE SONG

function PreviouslyPlayed(props) {
  const { previousSongs } = props;
  if (typeof previousSongs != "undefined") {
    return (
      <div>
        <h1>PREVIOUSLY PLAYED</h1>
        {previousSongs.map((song, index) => {
          return <SingleSongInfo song={song} key={index}/>
        })}
      </div>
  )} else {
    return (
      <div>
        <h1>PREVIOUSLY PLAYED</h1>
        No songs previously played.
      </div>

    )
  }

}

export default PreviouslyPlayed;
