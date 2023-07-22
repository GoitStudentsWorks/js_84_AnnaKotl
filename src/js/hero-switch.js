import axios from 'axios';

const mkBox = document.querySelector('.mk-container');
// const 
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';

function fetchMk() {
    return axios.get(BASE_URL)
      .then(resp => {
        console.log(resp);
        return resp;
      })
      .catch(error => {
        console.error("Error:", error);
        // return [];
      });
  }

  // fetchMk();

  // function renderMk(data) {

  function renderMk(data) {
    const {cook, topic,} = data;
    // const chief = data.cook[0];
    // const info = data.topic[0];

    const murkup = ` 
    <ul class="mk-list">
    <li class="mk-photo chief">
    <img class="chief-img" src="${cook.imgUrl}" alt="${cook.name}" width="80"/></li>
    <li class="mk-photo dish">
      <img class="dish-img" src="${topic.previewUrl}" alt="dish" width="200"/>
      <div class="mk-info">
        <h4 class="mk-name">${topic.name}</h4>
        <p class="mk-region">${topic.area}</p>
      </div>
    </li>
    <li class="mk-photo zoom">
    <img class="dish-img" src="${topic.imgUrl}" alt="dish" width="200"/></li>
  </ul>
    `
   ;
    mkBox.innerHTML = murkup;
}

function addMkInfo() {
          
    fetchMk()
    .then(data => renderMk(data))
    .catch(error => {
        console.error("Error:", error);
    })
}
addMkInfo();
