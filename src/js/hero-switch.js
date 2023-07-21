import axios from 'axios';

const mkBox = document.querySelector('.mk-container');
// const 
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';

function fetchMk() {
    return axios.get(BASE_URL)
      .then(resp => {
        // console.log(resp);})
        return resp;
      })
      .catch(error => {
        console.error("Error:", error);
        // return [];
      });
  }

//   fetchMk();

// function renderMk(event){
//     const markup =.map(event => {
//         return `



  function renderMk(data) {
    // const chief = data.cook[0];
    // const info = data.topic[0];

    const murkup = data.map(event => {  return ` <ul class="mk-list">
    <li class="mk-photo chief">
    <img class="chief-img" src="${event.cook.imgUrl}" alt="${event.cook.name}" width="80"/></li>
    <li class="mk-photo dish">
      <img class="dish-img" src="${event.topic.previewUrl}" alt="dish" width="200"/>
      <div class="mk-info">
        <h4 class="mk-name">${event.topic.name}</h4>
        <p class="mk-region">${event.topic.area}</p>
      </div>
    </li>
    <li class="mk-photo zoom">
    <img class="dish-img" src="${event.topic.imgUrl}" alt="dish" width="200"/></li>
  </ul>
    `})
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