
window.currentSong = null;

window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQDKMzdghnBsfb2eXNgcZ3w6mF_TfFWAZW8BpsYCcoE8A-K3aNbatBSOEnsu-FhbwI_ZUNCXf1a_1zNdzmA-_d_t7SfyoJiwt2CQAMo-DN7mN4mcBHwF3rBd3mGR0we0mYVSOQyG-hkEH_4CmEnV3o-EBNfeuOXHyX2_eBE';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { 
    console.log(state) 
    window.currentSong = state;
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
};