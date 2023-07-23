import 'swiper/swiper-bundle.css';

import Swiper from 'swiper';

const mkBox = document.querySelector('.swiper-wrapper');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';

async function fetchMk() {
  let resp = await fetch(`${BASE_URL}`);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return await resp.json();
}

async function renderMk() {
  try {
    const arrMk = await fetchMk();
    const markup = arrMk
      .map(evt => {
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
        `;
      })
      .join("");
    mkBox.innerHTML = markup;
  } catch (error) {
    console.error("Error:", error);
  }
}

function addMkInfo() {
  renderMk();
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    grabCursor: true,
    slidesPerView: 'auto',
    direction: 'horizontal',
    rewind: true,
    loop: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  console.log(swiper);
}

addMkInfo();
