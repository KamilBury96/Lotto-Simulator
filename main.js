const playButton = document.querySelector("a.button");
const pSelectedBalls = document.querySelector("p.selectedBalls");
const pCorrectMatches = document.querySelector("p.correctMatches");
const pGamesPlayed = document.querySelector("p.gamesPlayed");
const pHighestMatch = document.querySelector("p.highestMatch");
const pTotalProfit = document.querySelector("p.totalProfit");
const numberContainer = document.querySelector('.numberContainer');
const winningBalls = document.querySelector('.winningBalls');
let number;
let winningNumbers = [];
let selectedBallss = [];
let gamesPlayed = 0;
let totalProfit = 0;
let highestMatch = 0;
// stworzenie numerow
const ballMaker = () => {
    for (let i = 1; i <= 49; i++) {
        let ball = document.createElement('div');
        ball.setAttribute("id", `${i}`);
        ball.classList.add('circle');
        ball.textContent = `${i}`;
        numberContainer.appendChild(ball);
    }
}
ballMaker();
let allBalls = document.querySelectorAll("div.circle");

//zaznaczenie wybranych numerow
allBalls.forEach((ball, i) => {
    allBalls[i].addEventListener("click", function () {
        if (checkSelectedBalls() || allBalls[i].classList.value == "selected") {
            allBalls[i].classList.toggle("circle");
            allBalls[i].classList.toggle("selected");
        } else alert(`You can choose maximum 6 balls`);
    });
});

let checkSelectedBalls = () => {
    let numberSelectedBalls = numberContainer.querySelectorAll("div.selected").length;
    console.log(numberSelectedBalls);
    if (numberSelectedBalls < 6) {
        return 1;
    } else {
        return 0;
    }
}
//losowanie

let generateNumber = () => {
    winningNumbers.length = 0;
    for (i = 0; i < 6; i++) {
        do { // brak powtarzania sie wylosowanej liczby.
            number = Math.floor((Math.random() * 49) + 1);
        }
        while (winningNumbers.includes(number));
        winningNumbers.push(number);
        let ball = document.querySelector(`#ball${i+1}`);
        ball.textContent = `${winningNumbers[i]}`;

    }
}
//pobranie wybranych liczb
let getSelectedBalls = () => {
    selectedBallss.length = 0;
    let selectedBalls = document.querySelectorAll("div.selected");
    for (i = 0; i < selectedBalls.length; i++) {

        selectedBallss.push(selectedBalls[i].textContent);
    }
}
//sprawdzenie ilosci trafionych
let CorrectMatch = 0;
let compareBalls = () => {
    for (i = 0; i < selectedBallss.length; i++) {
        let ballNumber = selectedBallss.map(Number)[i]; // zamiana na tablice zawierajaca elementy typu number zamiast string
        if (winningNumbers.includes(ballNumber)) {
            CorrectMatch++;
        }
    }
}



let startSimulation = () => { // funkcja kontrolujaca, wywywolujaca inne funkcje
    getSelectedBalls(); // pobranie  liczb wybranych przez uzytkownika
    const inputNumberSimulation = document.querySelector("input.inputNumberSimulation");
    let howManyTimes = parseInt(inputNumberSimulation.value);
    if (selectedBallss.length == 6) {
        for (let i = 0; i < howManyTimes; i++) { // ile symulacji przeprowadzic
            generateNumber(); // wygenerowanie wylosowanych liczb 
            compareBalls(); // porownanie wylosowanych z wybranymi
            console.log(`1`);
            switch (CorrectMatch) { // aktualizacja budzetu
                case 0:
                    totalProfit -= 3;
                    break;
                case 1:
                    totalProfit -= 3;
                    break;
                case 2:
                    totalProfit -= 3;
                    break;
                case 3:
                    totalProfit += 24;
                    break;
                case 4:
                    totalProfit += 204;
                    break;
                case 5:
                    totalProfit += 6000;
                    break;
                case 6:
                    totalProfit += 2000000;
                    break;
            }
            if (CorrectMatch > highestMatch) { //aktualizacja najwyzszego wyniku
                highestMatch = CorrectMatch;
            }
            gamesPlayed++;
            pSelectedBalls.textContent = selectedBallss.join();
            pCorrectMatches.textContent = CorrectMatch;
            pGamesPlayed.textContent = gamesPlayed;
            pHighestMatch.textContent = highestMatch;
            pTotalProfit.textContent = totalProfit;
            CorrectMatch = 0;
        }
    } else alert('You have to choose six balls');
}
playButton.addEventListener("click", startSimulation)