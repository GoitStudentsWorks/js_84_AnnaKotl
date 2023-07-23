import Swiper from 'swiper';
// import { Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

const mkBox = document.querySelector('.mk-container');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';

// function fetchMk() {
//     return axios.get(BASE_URL)
//       .then(resp => {
//         console.log(resp);
//         return resp;
//       })
//       .catch(error => {
//         console.error("Error:", error);
//         // return [];
//       });
//   }

async function fetchMk() {
  let resp = await fetch (`${BASE_URL}`);
    if (!resp.ok) {throw new Error(resp.statusText);}
  let arrMk = await resp.json();
  return arrMk;
}
    
function renderMk(data) {
    fetchMk() 
    .then(arrMk => {

      const markup = arrMk.map(evt => { 
        // console.log(evt);
          return ` 
         <div class="mk-card swiper-pagination">
           <ul class="mk-list">
           <li class="mk-item chief">
           <div class="mk-photo-wrapper chief swiper-slide">
            <img class="chief-img img" src="${evt.cook.imgUrl}" alt="${evt.cook.name}" width="80" /></div></li>
            <li class="mk-item dish">
            <div class="mk-photo-wrapper preview swiper-pagination">
            <img class="preview-img img" src="${evt.topic.previewUrl}" alt="dish" width="200"/>
              <div class="mk-info">
                <h4 class="mk-name">${evt.topic.name}</h4>
                <p class="mk-region">${evt.topic.area}</p>
              </div></div>
            </li>
            <li class="mk-item">
            <div class="mk-photo-wrapper zoom swiper-pagination">
            <img class="dish-img img" src="${evt.topic.imgUrl}" alt="dish" width="200"/></div></li>
          </ul> 
          </div>
          `}).join("");
        mkBox.innerHTML = markup;
     })
    .catch(error => {
      console.error("Error:", error);
          })
  }
  // const swiper = new Swiper('.swiper', {
 
  //   direction: 'vertical',
  //   loop: true,
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },})

function addMkInfo() {
  renderMk();
  // var swiper = new Swiper('.swiper-container', {
  //     pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true, 
  //   },
  // });
}
// console.log(swiper);

addMkInfo();
