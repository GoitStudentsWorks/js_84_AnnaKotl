import Swiper from 'swiper/swiper-bundle.min.mjs';
import '../../node_modules/swiper/swiper-bundle.min.css';

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

            <span class="icon-hero">
              <svg xmlns="http://www.w3.org/2000/svg" width="351" height="442" viewBox="0 0 351 442" fill="none">
              <g opacity="0.6" filter="url(#filter0_f_65_649)">
              <ellipse cx="98.334" cy="98.3412" rx="98.334" ry="98.3412" transform="matrix(0.699884 -0.714257 0.716425 0.697664 35 225.471)" fill="#9BB537"/>
              </g>
              <defs>
              <filter id="filter0_f_65_649" x="-86.2136" y="-36.3401" width="520.98" height="520.37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="81" result="effect1_foregroundBlur_65_649"/>
              </filter>
              </defs>
              </svg>
            </span>

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
        // slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    grabCursor: true,
    slidesPerView: 'auto',
    direction: 'horizontal',
    rewind: true,
    loop: true,
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    //   draggable: true,
    // },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 0.65,
 
    speed: 1000,

    breakpoints: {
      375: {
      slidesPerView: 0.65,
        spaceBetween: 8
      },
      768: {
        slidesPerView: 0.85,
        spaceBetween: 16
      },
      1280: {
        slidesPerView: 0.81,
        spaceBetween: 16
      }
    },
    //  АВТОПЕРЕЛИСТУВАННЯ!!!
    autoplay: {
      delay: 4000,
    }
    //---------------------------
  });

  swiper.on('slideChange', () => {
    setTimeout(() => {
      swiper.autoplay.start();
    }, 0);
  });
}
addMkInfo(); 