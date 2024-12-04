console.log('hey there');
const music = new Audio('music.mp3');
music.volume = 0.1;
const gameover = new Audio('gameover.mp3');
const turnmusic = new Audio('reset.wav');
const chinmusic= new Audio(`chin.mp3`)
let turn = 'X';
let isgameover = false;

const changeTurn = () => (turn === 'X' ? '0' : 'X');

const checkWin = async () => {
    const boxtexts = document.getElementsByClassName('boxtext');
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const e of wins) {
        if (
            boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[2]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[0]].innerText !== ''
        ) {
            document.querySelector(`.left`).style.animation=` spin 0.5s infinite`;
            await turnmusic.pause();
            await gameover.play();
            document.querySelector('.turnforX').innerText = 'Won by ' + boxtexts[e[0]].innerText;
            isgameover = true;
        }
    }
};

const handleBoxClick = async (element) => {
    const boxtext = element.querySelector('.boxtext');
    if (boxtext.innerText === '' && !isgameover) {
        await turnmusic.play();
        boxtext.innerText = turn;
        turn = changeTurn();
        await checkWin();
        if (!isgameover) {
            document.querySelector('.turnforX').innerText = 'Turn for ' + turn;
        }
    }
};

const startMusic = async () => {
    await music.play();
};

document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.getElementsByClassName('box');
    Array.from(boxes).forEach((element) => {
        element.addEventListener('click', () => handleBoxClick(element));
    });

    const resetButton = document.getElementsByClassName('reset')[0];
    resetButton.addEventListener('click', async () => {
        const boxtexts = document.querySelectorAll('.boxtext');
        Array.from(boxtexts).forEach((element) => {
            element.innerText = '';
            document.querySelector(`.left`).style.animation=`none`;
        });
        turn = 'X';
        isgameover = false;
        document.querySelector('.turnforX').innerText = 'Turn for ' + turn;
        await turnmusic.pause();
        await gameover.pause();
        chinmusic.play();
    });

    // Play music after first user interaction
    document.body.addEventListener('click', startMusic, { once: true });
});
