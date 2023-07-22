import axios from 'axios';

const mkBox = document.querySelector('.mk-container');
// const 
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

      arrMk.map(evt => { 
        console.log(evt);
         const murkup = ` 
           <ul class="mk-list">
           <li class="mk-photo chief">
            <img class="chief-img" src="${evt.cook.imgUrl}" alt="${evt.cook.name}" width="80"/></li>
            <li class="mk-photo dish">
              <img class="dish-img" src="${evt.topic.previewUrl}" alt="dish" width="200"/>
              <div class="mk-info">
                <h4 class="mk-name">${evt.topic.name}</h4>
                <p class="mk-region">${evt.topic.area}</p>
              </div>
            </li>
            <li class="mk-photo zoom">
            <img class="dish-img" src="${evt.topic.imgUrl}" alt="dish" width="200"/></li>
          </ul> `;
        mkBox.innerHTML = murkup;
    }) })
    .catch(error => {
      console.error("Error:", error);
          })
  }


//   function renderMk(data) {
//     // const {cook, topic,} = data;
//     const cook = data.cook[0];
//     const topic = data.topic[0];
//     // console.log(cook.imgUrl);
//     // console.log(topic.imgUrl);
//     const murkup = ` 
//     <ul class="mk-list">
//     <li class="mk-photo chief">
//     <img class="chief-img" src="${cook.imgUrl}" alt="${cook.name}" width="80"/></li>
//     <li class="mk-photo dish">
//       <img class="dish-img" src="${topic.previewUrl}" alt="dish" width="200"/>
//       <div class="mk-info">
//         <h4 class="mk-name">${topic.name}</h4>
//         <p class="mk-region">${topic.area}</p>
//       </div>
//     </li>
//     <li class="mk-photo zoom">
//     <img class="dish-img" src="${topic.imgUrl}" alt="dish" width="200"/></li>
//   </ul>
//     `
//    ;
//     mkBox.innerHTML = murkup;
// }

renderMk();

// function addMkInfo() {
          
//   fetchMk() 
//   .then(response => { 
//     const { cook, topic } = response.data; 
//     console.log(response.data);
//       console.log(cook.imgUrl);
//       console.log(topic.imgUrl);

//       // renderMk(data)
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     })
// }
// addMkInfo();
