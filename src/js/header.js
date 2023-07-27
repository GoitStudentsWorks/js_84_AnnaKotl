// JavaScript код для переключения темы сайта
const themeSwitcher = document.getElementById('switch');
const body = document.body;

themeSwitcher.addEventListener('change', () => {
  if (themeSwitcher.checked) {
    
    body.classList.add('dark-mode'); 
    applyDarkModeStyles(); 
  } else {
    
    body.classList.remove('dark-mode'); 
    resetStyles(); 
  }
});

function applyDarkModeStyles() {
  const changeColorTextElements = document.querySelectorAll('[data-change-color="true"]');
  for (const element of changeColorTextElements) {
    element.style.color = '#fff'; 
  }
  const changeBgElements = document.querySelectorAll('[data-change-bg="true"]');
  for (const element of changeBgElements) {
    element.style.backgroundColor = '#161616'; 
  }
}


function resetStyles() {
  const changeColorTextElements = document.querySelectorAll('[data-change-color="true"]');
  for (const element of changeColorTextElements) {
    element.style.color = '';
  }
  const changeBgElements = document.querySelectorAll('[data-change-bg="true"]');
  for (const element of changeBgElements) {
    element.style.backgroundColor = ''; 
  }
}



