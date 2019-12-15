const score = document.querySelector('.score'),
        start = document.querySelector('.start'),
        gameArea = document.querySelector('.gameArea'),
        car = document.createElement('div');


    car.classList.add('car');



// start.onclick = function() {
//     start.classList.add('hide');
// };

start.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

// сколько элементов может поместиться на странице
//getQuantityElements(100) - получаем количество элементов высотой в 100px
function getQuantityElements(heightElement) {
    // document.documentElement.clientHeight - высота страницы
    return document.documentElement.clientHeight / heightElement + 1;

}

function startGame() {
    start.classList.add('hide');

    for(let i = 0; i < getQuantityElements(100); i++ ) {
        //создаем документ
        const line = document.createElement('div');
        //добавляем ему стилей
        line.classList.add('line');
        //расстояние между полосками
        line.style.top = (i * 100) +'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for(let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.top = enemy.y + 'px';

        gameArea.appendChild(enemy);

    }

    setting.start = true; 
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

function playGame() {
    moveRoad();
    moveEnemy();
    if (setting.start) {
        
        if(keys.ArrowLeft && setting.x > 0) {
            // setting.x--;
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
            // setting.x++;
            setting.x += setting.speed;
        }
        if(keys.ArrowDown && setting.y < gameArea.offsetHeight - car.offsetHeight) {
            // setting.x++;
            setting.y += setting.speed;
        }
        if(keys.ArrowUp  && setting.y > 0) {
            // setting.x++;
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
    
}

function startRun(event) {  
    event.preventDefault();
    keys[event.key] = true;
};

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
};

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        // document.documentElement.clientHeight - это высота страницы
        if(line.y >= document.documentElement.clientHeight) {
            line.y = 0;
        }
    })
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if(item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
        }
    });

    
}