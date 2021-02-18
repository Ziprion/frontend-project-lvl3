import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

function runApp() {
  const url = 'https://api.spotify.com/v1/artists/ID';
  return axios.get(url).then((response) => console.log(response));
}
runApp();
