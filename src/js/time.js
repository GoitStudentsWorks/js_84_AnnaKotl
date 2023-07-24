const timer = document.querySelector("#timesearch");

createTimerBtns();

function createTimerBtns(){
    for (let i = 10; i <= 160; i += 10) {

        const li = document.createElement('li');
        li.classList.add('option');

        const button = document.createElement('button');
        button.classList.add('option-item');

        button.textContent = i + ' min';

        li.appendChild(button);
        timer.appendChild(li);
    }
};