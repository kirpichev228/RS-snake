const canvas = document.getElementById('game-field');
const ctx = canvas.getContext('2d');

let modal = document.querySelector('.modal')

const ground = new Image();
ground.src = "img/field.png";

const food = new Image();
food.src = "img/food.png";

let box = 32;

let score = 0;


let apple = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener('keydown', direction)

let dir;

function direction (event) {
    if (event.keyCode == 37 && dir != 'right') {
        dir = 'left';
    } else if (event.keyCode == 38 && dir != 'down') {
        dir = 'up';
    } else if (event.keyCode == 39 && dir != 'left') {
        dir = 'right';
    } else if (event.keyCode == 40 && dir != 'up') {
        dir = 'down';
    };
}

function eatTail (head, arr) {
    for( let i = 0; i<arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            audio.src = 'audio/lose.wav'
            play()
            modal.classList.add('active')
        }
    }
}

function drawing () {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(food, apple.x, apple.y);

    for (let i=0; i<snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "yellow";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Tahoma';
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == apple.x && snakeY == apple.y) {
        winCheck()
        score++;
        apple = {
                x: Math.floor((Math.random() * 17 + 1)) * box,
                y: Math.floor((Math.random() * 15 + 3)) * box,
            } 
        } else {
            snake.pop();
    };

    if(snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17) {
            clearInterval(game);
            audio.src = 'audio/lose.wav'
            play()
            modal.classList.add('active')
        }

    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake)

    snake.unshift(newHead);

}

let interval = 100;

let easy = document.querySelector('.difficulty-easy');
let normal = document.querySelector('.difficulty-normal');
let hard = document.querySelector('.difficulty-hard');

easy.addEventListener('click',()=>{
    interval = 200
    diffCheck()
});
normal.addEventListener('click',()=>{
    interval = 100
    diffCheck()
});
hard.addEventListener('click',()=>{
    interval = 70
    diffCheck()
});

function diffCheck () {
    if (interval == 200) {
        easy.classList.add('active');
        normal.classList.remove('active');
        hard.classList.remove('active');

    } else if (interval == 100) {
        easy.classList.remove('active');
        normal.classList.add('active');
        hard.classList.remove('active');
    } else if (interval == 70) {
        easy.classList.remove('active');
        normal.classList.remove('active');
        hard.classList.add('active');
    }
}

function start () {
    setInterval(drawing, interval);
}

let game = setInterval(drawing, interval);

let audio = document.querySelector('.audio');
let mOn = document.querySelector('.music-on');
let mOff = document.querySelector('.music-off');

function play () {
    audio.play()
    audio.autoplay = true
}

function unmute () {
    let v = 100;
    audio.volume = v/100
}

function mute () {
    let v = 0;
    audio.volume = v
    audio.pause()
}

mOn.addEventListener('click', unmute)
mOn.addEventListener('click', play)
mOff.addEventListener('click', mute)

play()

let tryer = document.querySelector('.lose-try');
let cls = document.querySelector('.lose-cls');

let count = 0
let scoreboard = document.querySelectorAll('.list-element')
//local storage
//i try so hard and go so far
//but in the end
//it doesn't even matter рот его ебал


// function storageUnload () {
    // for(let i=0; i<scoreboard.length; i++) {}
//     localStorage.setItem('score', JSON.stringify(scoreboard)) 
// }
// window.addEventListener('unload', storageUnload())

// function storageLoad () {
//     scoreboard = JSON.parse(localStorage.getItem('score')) 
// }

// window.addEventListener('load', storageLoad())
// console.log(scoreboard)

function modalRemove () {
    modal.classList.remove('active');
    snake = []
    snake[0] = {
        x: 9 * box,
        y: 10 * box,
    };
    clearInterval(game);
    game = setInterval(drawing, interval);
    dir = null;
    scoreboardUpdate();
    
    count++
    audio.src = 'audio/main.m4a'
    play()
    score = 0
}

function scoreboardUpdate () {
    if (count === 10) {
        count = 0
    }
    scoreboard[count].textContent = score;
}
tryer.addEventListener('click', modalRemove);
cls.addEventListener('click', modalRemove);

let header = document.querySelector('.root')
function animation () {
    header.classList.toggle('active')
}
setInterval(animation, 1000)

let modalName = document.querySelector('.lose-name')

function winCheck () {
    if (score == 29) {
        modalName.textContent = 'You Win!'
        audio.src = 'audio/win.mp3'
        play()
        modal.classList.add('active')
        clearInterval(game);
    } else {
        modalName.textContent = 'You Lose!'
    }
}
window.addEventListener('keydown', play())



