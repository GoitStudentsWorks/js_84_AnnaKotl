import Swiper from 'swiper';
// import '@splidejs/splide/css/core';
// import { Pagination } from '../../node_modules/swiper/modules';
import '../../node_modules/swiper/swiper.css';
// import '../../node_modules/swiper/swiper.css/pagination';

const mkBox = document.querySelector('.swiper-pagination');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';

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
         <div class="mk-card swiper-slide">
           <ul class="mk-list">
           <li class="mk-item chief">
           <div class="mk-photo-wrapper chief">
            <img class="chief-img img" src="${evt.cook.imgUrl}" alt="${evt.cook.name}" width="80" /></div></li>
            <li class="mk-item dish">
            <div class="mk-photo-wrapper preview">
            <img class="preview-img img" src="${evt.topic.previewUrl}" alt="dish" width="200"/>
              <div class="mk-info">
                <h4 class="mk-name">${evt.topic.name}</h4>
                <p class="mk-region">${evt.topic.area}</p>
              </div></div>
            </li>
            <li class="mk-item">
            <div class="mk-photo-wrapper zoom">
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
  const swiperSettings = {
    // modules: [Navigation],

    breakpoints: {
      375: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
      },

      768: {
        spaceBetween: 16,
      },

      1440: {
        spaceBetween: 16,
      },
    },
    loop: true,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  };

  // const swiper = new Swiper('.swiper', {
 
  //   direction: 'vertical',
  //   loop: true,
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },})

function addMkInfo() {
  renderMk();
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    grabCursor: true,
    // centeredSlides: true,
    slidesPerView: 'auto',
    direction: 'vertical',
    rewind: true,
    loop: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });
  console.log(swiper);
}

addMkInfo();
