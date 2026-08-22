let candy = 0;
let candyPerSecond = 0;
let clickPower = 1;

const CANDY = document.getElementById("candy");
const CANDY_DISPLAY = document.getElementById("candyDisplay");
const CLICK_POWER_DISPLAY = document.getElementById("clickPowerDisplay");
const CPS_DISPLAY = document.getElementById("cpsDisplay");
const BRONZE_CURSOR = document.getElementById("bronzeCursor");
const AUTO_CANDY = document.getElementById("autoCandy");
const CANDY_FARM = document.getElementById("candyFarm");
const CANDY_MINE = document.getElementById("candyMine");
const SILVER_CURSOR = document.getElementById("silverCursor");
const CANDY_FACTORY = document.getElementById("candyFactory");
const CANDY_LAB = document.getElementById("candyLab");
const CANDY_TEMPLE = document.getElementById("candyTemple");
const GOLD_CURSOR = document.getElementById("goldCursor");
const CANDY_ROCKET = document.getElementById("candyRocket");
const CANDY_MAN = document.getElementById("candyMan");
const CANDY_KING = document.getElementById("candyKing");
const JADE_CURSOR = document.getElementById("jadeCursor");
const CANDY_PLANET = document.getElementById("candyPlanet");
const CANDY_STAR = document.getElementById("candyStar");
const CANDY_SYSTEM = document.getElementById("candySystem");

const resetButton = document.getElementById("reset");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const maxTrackHeight = window.innerHeight - 50;
const numSuffixes = ['', 'K', 'M', 'B', 'T', 'Q', 'Qu', 'S', 'Sp', 'O', 'N', 'D', 'Un', 'Du', 'Tr', 'Qa'];
const candyTime = [0, 0, 0, 0, 0, 0];
const candySpawn = [createSpawns(0, 60), createSpawns(60, 120), createSpawns(120, 240), createSpawns(600, 900), createSpawns(40, 120), createSpawns(30, 100)];

function createSpawns(initial, final) {
    return ((Math.random() * (final - initial)) + initial);
}

CANDY.addEventListener("click", clickedCandy);
CANDY.addEventListener("mouseover", onHoverCandy);
CANDY.addEventListener("mouseout", offHoverCandy);
BRONZE_CURSOR.addEventListener("click", () => {addClickPower(25, 1)});
AUTO_CANDY.addEventListener("click", () => {addCPS(100, 1)});
CANDY_FARM.addEventListener("click", () => {addCPS(500, 10)});
CANDY_MINE.addEventListener("click", () => {addCPS(4750, 100)});
SILVER_CURSOR.addEventListener("click", () => {addClickPower(150_000, 2000)});
CANDY_FACTORY.addEventListener("click", () => {addCPS(2_000_000, 15_000)});
CANDY_LAB.addEventListener("click", () => {addCPS(15_000_000, 125_000)});
CANDY_TEMPLE.addEventListener("click", () => {addCPS(125_000_000, 5_000_000)});
GOLD_CURSOR.addEventListener("click", () => {addClickPower(400_000_000, 2_000_000)});
CANDY_ROCKET.addEventListener("click", () => {addCPS(5_000_000_000, 100_000_000)});
CANDY_MAN.addEventListener("click", () => {addCPS(100_000_000_000, 5_000_000_000)});
CANDY_KING.addEventListener("click", () => {addCPS(1_000_000_000_000, 150_000_000_000)});
JADE_CURSOR.addEventListener("click", () => {addClickPower(100_000_000_000_000, 3_000_000_000_000)});
CANDY_PLANET.addEventListener("click", () => {addCPS(10_000_000_000_000_000, 100_000_000_000_000)});
CANDY_STAR.addEventListener("click", () => {addCPS(200_000_000_000_000_000, 5_000_000_000_000_000)});
CANDY_SYSTEM.addEventListener("click", () => {addCPS(750_000_000_000_000_000, 30_000_000_000_000_000)});

resetButton.addEventListener("mouseover", resetHover);
resetButton.addEventListener("mouseout", resetOff);
resetButton.addEventListener("click", resetGame);

if (localStorage.getItem("candy") !== null) {
    loadGame();
} 

function loadGame() {
    candy = parseInt(localStorage.getItem("candy"), 10);
    candyPerSecond = parseInt(localStorage.getItem("candyPerSecond"), 10);
    clickPower = parseInt(localStorage.getItem("clickPower"), 10);
    const candyTime = JSON.parse(localStorage.getItem("candyTime"));
    const candySpawn = JSON.parse(localStorage.getItem("candySpawn"));
}

function saveGame() {
    localStorage.setItem("candy", candy);
    localStorage.setItem("candyPerSecond", candyPerSecond);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("candyTime", JSON.stringify(candyTime));
    localStorage.setItem("candySpawn", JSON.stringify(candySpawn));
}

async function clickedCandy() {
    candy += clickPower;
    CANDY.style.filter = 'brightness(10)';
    CLICK_POWER_DISPLAY.innerHTML = "+" + splitNumber(clickPower);
    await delay(100);
    CANDY.style.filter = 'brightness(1)';
    CLICK_POWER_DISPLAY.innerHTML = "";
    refreshDisplay();
}

function onHoverCandy() {
    CANDY.style.width = "20%";
}

function offHoverCandy() {
    CANDY.style.width = "15%";
}

function refreshDisplay() {
    CANDY_DISPLAY.innerHTML = "Candy: " + splitNumber(candy);
    CPS_DISPLAY.innerHTML = "CPS: " + splitNumber(candyPerSecond);
}

function addClickPower(price, power) {
    if (candy >= price) {
        candy -= price;
        clickPower += power;
        refreshDisplay();
    }
}

function addCPS(price, power) {
    if (candy >= price) {
        candy -= price;
        candyPerSecond += power;
        refreshDisplay();
    }
}

async function runCPS() {
    while (true) {
        candy += candyPerSecond;
        for (let i = 0; i < candyTime.length; i++) {
            candyTime[i]++;
        }
        checkCandySpawns();
        refreshDisplay();
        saveGame();
        await delay(1000);
    }
}

function splitNumber(number) {
    const len = String(Math.abs(number)).length;
    if (len > 3 && Math.abs(number) != 0) {
        const power = Math.floor(Math.log10(Math.abs(number)) / 3);
        const dec = (Math.abs(number) / (10 ** (power * 3)));
        let x = '';
        if (String(dec).length >= 3) {
            let i = 0;
            while (String(dec)[i] != '.') {
                x += String(dec)[i];
                i++;
            }
            x += String(dec)[i];
            i++;
            x += String(dec)[i];
        } else {
            x = String(dec) + '.0';
        }
        if (number < 0) {
            return '-' + x + numSuffixes[power];
        } else {
            return x + numSuffixes[power];
        }
    } else {
        return number;
    }
}

function spawnRegularCandy() {
    const regCandy = document.createElement("img");
    regCandy.src = "Regular Candy.svg";
    regCandy.className = "regCandy";
    regCandy.addEventListener("animationend", () => {regCandy.remove();});
    regCandy.addEventListener("pointerdown", () => {addRegularCandy(event);});
    regCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(regCandy);
}

function spawnGoldCandy() {
    const goldCandy = document.createElement("img");
    goldCandy.src = "Gold Candy.svg";
    goldCandy.className = "goldCandy";
    goldCandy.addEventListener("animationend", () => {goldCandy.remove();});
    goldCandy.addEventListener("pointerdown", () => {addGoldCandy(event);});
    goldCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(goldCandy);
}

function spawnRainbowCandy() {
    const rainbowCandy = document.createElement("img");
    rainbowCandy.src = "Rainbow Candy.svg";
    rainbowCandy.className = "rainbowCandy";
    rainbowCandy.addEventListener("animationend", () => {rainbowCandy.remove();});
    rainbowCandy.addEventListener("pointerdown", () => {addRainbowCandy(event);});
    rainbowCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(rainbowCandy);
}

function spawnDiamondCandy() {
    const diamondCandy = document.createElement("img");
    diamondCandy.src = "Diamond Candy.svg";
    diamondCandy.className = "diamondCandy";
    diamondCandy.addEventListener("animationend", () => {diamondCandy.remove();});
    diamondCandy.addEventListener("pointerdown", () => {addDiamondCandy(event);});
    diamondCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(diamondCandy);
}

function spawnDemonCandy() {
    const demonCandy = document.createElement("img");
    demonCandy.src = "Demon Candy.svg";
    demonCandy.className = "demonCandy";
    demonCandy.addEventListener("animationend", () => {demonCandy.remove();});
    demonCandy.addEventListener("pointerdown", () => {addDemonCandy(event);});
    demonCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(demonCandy);
}

function spawnRobberCandy() {
    const robberCandy = document.createElement("img");
    robberCandy.src = "Robber Candy.svg";
    robberCandy.className = "robberCandy";
    robberCandy.addEventListener("animationend", () => {addRobberCandy(event);});
    robberCandy.addEventListener("pointerdown", () => {robberCandy.remove();});
    robberCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(robberCandy);
}

function addRegularCandy(event) {
    candy += clickPower * 10;
    event.currentTarget.remove();
    refreshDisplay();
}

function addGoldCandy(event) {
    candy += clickPower * 100;
    event.currentTarget.remove();
    refreshDisplay();
}

function addRainbowCandy(event) {
    candy += clickPower * 10_000;
    event.currentTarget.remove();
    refreshDisplay();
}

function addDiamondCandy(event) {
    candy += clickPower * 1_000_000_000;
    event.currentTarget.remove();
    refreshDisplay();
}

function addDemonCandy(event) {
    candy += clickPower * -500;
    event.currentTarget.remove();
    refreshDisplay();
}

function addRobberCandy(event) {
    candyPerSecond = Math.floor(candyPerSecond * 0.5);
    event.currentTarget.remove();
    refreshDisplay();
}

function checkCandySpawns() {
    if (candyTime[0] >= candySpawn[0]) {
        spawnRegularCandy();
        candySpawn[0] = (Math.random() * 60);
        candyTime[0] = 0;
    }
    if (candyTime[1] >= candySpawn[1]) {
        spawnGoldCandy();
        candySpawn[1] = (Math.random() * 60) + 60;
        candyTime[1] = 0;
    }
    if (candyTime[2] >= candySpawn[2]) {
        spawnRainbowCandy();
        candySpawn[2] = (Math.random() * 120) + 120;
        candyTime[2] = 0;
    }
    if (candyTime[3] >= candySpawn[3]) {
        spawnDiamondCandy();
        candySpawn[3] = (Math.random() * 300) + 600;
        candyTime[3] = 0;
    }
    if (candyTime[4] >= candySpawn[4]) {
        spawnDemonCandy();
        candySpawn[4] = (Math.random() * 80) + 40;
        candyTime[4] = 0;
    }
    if (candyTime[5] >= candySpawn[5]) {
        spawnRobberCandy();
        candySpawn[5] = (Math.random() * 70) + 30;
        candyTime[5] = 0;
    }
}

function resetHover() {
    resetButton.style.backgroundColor = "red";
    resetButton.style.border = "2px solid red";
}

function resetOff() {
    resetButton.style.backgroundColor = "black";
    resetButton.style.border = "2px solid black";
}

function resetGame() {
    if (confirm("Do you want to reset you game?")) {
        if (confirm("Are you sure?")) {
            if (confirm("Are you very sure - this is irreversible")) {
                candy = 0;
                clickPower = 1;
                candyPerSecond = 0;
                for (let i = 0; i <= candyTime.length; i++) {
                    candyTime[i] = 0;
                    candySpawn[i] = 0;
                }
            }
        }
    }
}

runCPS();