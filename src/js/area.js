import { searchAPI } from '../js/api-kay-js-files/api-filter-area-ingredients';
import TemplateArea from '../templates/area.hbs';
import { Notify } from 'notiflix';


const SearchAPI = new searchAPI();
const areasList = document.querySelector('#arealist');

areas();

async function areas() {
  try {
    const area = await SearchAPI.getArea();

    areasList.insertAdjacentHTML('beforeend', TemplateArea(area));
  } catch (err) {
    console.log(err);
    Notify.failure('Something went wrong. Please try again');
  }
};