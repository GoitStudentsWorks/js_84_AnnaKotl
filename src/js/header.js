// JavaScript код для обработки клика по кнопке и переключения темы
const toggleButton = document.getElementById('toggleButton');
const toggleIndicator = document.getElementById('toggleIndicator');
const body = document.body;

// Устанавливаем начальное состояние темы
let isDarkMode = false;

// Обработчик клика по кнопке переключателя
toggleButton.addEventListener('mousedown', () => {
  // Инвертируем тему
  isDarkMode = !isDarkMode;
  
  // Изменяем внешний вид кнопки в зависимости от темы
  if (isDarkMode) {
    toggleButton.style.background = '#9BB537';
    toggleButton.style.boxShadow = '7px 5px 15px rgba(155, 181, 55, 0.69)';
    toggleIndicator.style.left = '26.2px';
    body.classList.add('dark-mode');
    body.style.background = '#161616';
    body.style.color = '#fff'; // Устанавливаем белый цвет текста
  } else {
    toggleButton.style.background = '#cecdcd';
    toggleButton.style.boxShadow = '7px 5px 15px rgba(160, 158, 160, 0.6)';
    toggleIndicator.style.left = '0.6px';
    body.classList.remove('dark-mode');
    body.style.background = '#fff'; // Возвращаем белый фон
    body.style.color = '#000'; // Возвращаем черный цвет текста
  }
});

