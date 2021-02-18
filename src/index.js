import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

function runApp() {
  const url = 'https://meduza.io/rss/all';
  axios.get(url).then((response) => {
    const parser = new DOMParser()
    //const doc = parser.parseFromString(response, "text/html")
    console.log(response.data)
  });
 
  

  return;
}
runApp();
