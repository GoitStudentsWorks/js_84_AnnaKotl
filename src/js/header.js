// JavaScript код для переключения темы сайта
const themeSwitcher = document.getElementById('switch');
const mobileThemeSwitcher = document.getElementById('mobile-switch');
const body = document.body;

themeSwitcher.addEventListener('change', () => {
  if (themeSwitcher.checked) {
    // Если переключатель включен (темная тема)
    body.classList.add('dark-mode'); // Добавляем класс для темной темы
    applyDarkModeStyles(); // Применяем стили для текста и фона с атрибутами data-change-color="true", data-change-bg="true", и data-change-background="true" в темной теме
  } else {
    // Если переключатель выключен (светлая тема)
    body.classList.remove('dark-mode'); // Удаляем класс для темной темы
    resetStyles(); // Возвращаем исходные стили для текста и фона элементов с атрибутами data-change-color="true", data-change-bg="true", и data-change-background="true"
  }
});
mobileThemeSwitcher.addEventListener('change', () => {
      if (mobileThemeSwitcher.checked) {
        // Если переключатель включен (темная тема)
        body.classList.add('dark-mode'); // Добавляем класс для темной темы
        applyDarkModeStyles(); // Применяем стили для текста и фона с атрибутами data-change-color="true", data-change-bg="true", и data-change-background="true" в темной теме
      } else {
        // Если переключатель выключен (светлая тема)
        body.classList.remove('dark-mode'); // Удаляем класс для темной темы
        resetStyles(); // Возвращаем исходные стили для текста и фона элементов с атрибутами data-change-color="true", data-change-bg="true", и data-change-background="true"
      }
    });

// Функция для применения стилей для текста и фона с атрибутами data-change-color="true", data-change-bg="true", и data-change-background="true" в темной теме
function applyDarkModeStyles() {
  const changeColorTextElements = document.querySelectorAll('[data-change-color="true"]');
  for (const element of changeColorTextElements) {
    element.style.color = '#fff'; // Изменяем цвет текста на #fff
  }

  const changeBgElements = document.querySelectorAll('[data-change-bg="true"]');
  for (const element of changeBgElements) {
    element.style.backgroundColor = '#161616'; // Задаем фоновый цвет #161616
  }

  const changeBackgroundElements = document.querySelectorAll('[data-change-background="true"]');
  for (const element of changeBackgroundElements) {
    element.style.backgroundColor = '#fff'; // Задаем фоновый цвет #fff
  }
}

// Функция для сброса стилей для текста и фона элементов с атрибутами data-change-color="true", data-change-bg="true", и data-change-background="true" в светлой теме
function resetStyles() {
  const changeColorTextElements = document.querySelectorAll('[data-change-color="true"]');
  for (const element of changeColorTextElements) {
    element.style.color = ''; // Возвращаем исходный цвет текста (будет зависеть от стилей в вашем CSS)
  }

  const changeBgElements = document.querySelectorAll('[data-change-bg="true"]');
  for (const element of changeBgElements) {
    element.style.backgroundColor = ''; // Возвращаем исходный фоновый цвет (если был установлен)
  }

  const changeBackgroundElements = document.querySelectorAll('[data-change-background="true"]');
  for (const element of changeBackgroundElements) {
    element.style.backgroundColor = ''; // Возвращаем исходный фоновый цвет (если был установлен)
  }
}




