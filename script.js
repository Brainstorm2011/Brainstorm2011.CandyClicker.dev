let clickPower = 1;
let candy = 0;
let candyPerSecond = 0;

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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const maxTrackHeight = window.innerHeight - 50;
const numSuffixes = ['', 'K', 'M', 'B', 'T', 'Q', 'Qu', 'S', 'Sp', 'O', 'N', 'D', 'Un', 'Du', 'Tr', 'Qa'];

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
        let regularSpawnRate = (Math.random() * 30) + 30;
        for (let i = 0; i < regularSpawnRate; i++) {
            candy += candyPerSecond;
            refreshDisplay();
            await delay(1000);
        }
        spawnRegularCandy();
    }
}

function splitNumber(number) {
    const len = String(number).length;
    if (len > 3 && number != 0) {
        const power = Math.floor(Math.log10(number) / 3);
        console.log(power);
        const dec = (number / (10 ** (power * 3)));
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
        return x + numSuffixes[Math.floor(power)];
    } else {
        return number;
    }
}

function spawnRegularCandy() {
    const regCandy = document.createElement("img");
    regCandy.src = "Regular Candy.svg";
    regCandy.className = "regCandy";
    regCandy.addEventListener("animationend", () => {regCandy.remove();});
    regCandy.onclick = addRegularCandy;
    regCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(regCandy);
}

function spawnGoldCandy() {
    const goldCandy = document.createElement("img");
    goldCandy.src = "Gold Candy.svg";
    goldCandy.className = "goldCandy";
    goldCandy.addEventListener("animationend", () => {goldCandy.remove();});
    goldCandy.onclick = addGoldCandy;
    goldCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(goldCandy);
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

runCPS();