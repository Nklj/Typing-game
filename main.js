/** 
1.случайно сортируем массив
1.1 создать массив заполненный числами 1-100(длины массива) , выдергивать splicом
 из него случайный индекс   и записывать значение  в новыйпод этим индексом

2. брать pop() 3 последних значения- это текущие слова
и добавить в рабочий массив 3 знач, 

3.функцияя: выдается случ из рабочего- проверкка правильно напечатал ?закрашиваем 1 квадратик даем следующее: обнул счетчик даем след
если игрок 49 раз (7*7) подряд правильно напечатал-удаляем из рабочего массива , берём следующее из сортированного ,
 закрашиваем квадратик случайный в большом ,

 когда останется 3 - выводить по слову "это" "похоже" и последнее большое "победа!!!"

 на экране слова добавлять (не затирать), чтобы сдвигалось (будет понятно если одно и то же слово 2-3 раза подряд) или по другому..
 сделать чтобы чем больше раз слово было нажато тем оно становилось ярче(раскалялось) и чтобы как в тетрисе было видно следующее

4 сделать, чтоб можно было переключаться на английс - рускую игру (парралельно играть), закрывать браузер без потери прогресса
в конце мультик
*/
const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const str = "The quick brown fox jumps over the lazy dog";

import { russian } from "./assets/russian.js";
import { english } from "./assets/english.js";

const rusArr = russian.replace(/\n/g, "").split(" ");
const engArr = english.replace(/\n/g, "").split(" ");

const wordField = document.querySelector(".current-word");
const btnNewGame = document.querySelector(".new-game");
const word1Field = document.querySelector(".word1");
const word2Field = document.querySelector(".word2");
const word3Field = document.querySelector(".word3");
const input = document.querySelector("#userInput");

let currentWord;
let workArr = [];
let WordsRest = `Осталось ${100} слов`

const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

function randomArr(dataArr) {
  const copyDataArr = [...dataArr];

  for (let i in dataArr) {
    let randIndex = getRandomIndex(dataArr);
    let temp = copyDataArr[i];
    copyDataArr[i] = copyDataArr[randIndex];
    copyDataArr[randIndex] = temp;
  }

  return copyDataArr;
}

const inputHandler = (e) => {
  if (e.data === " ") {
    let value = e.target.value.slice(0, -1);
    if (value === currentWord) {
      currentWord = workArr[getRandomIndex(workArr)];
      wordField.innerText = `${currentWord} ${wordField.innerText}`.slice(
        0,
        40
      );
      input.value = "";
    } else {
      currentWord = "ху" + value;
      wordField.innerText = currentWord;
      input.value = "";
    }
  }
};

function game(dataArr) {
  const gameArr = randomArr([...dataArr]);
  workArr = [];
  let x = 100500;
  for (let i = 0; i < 3; i++) {
    workArr[i] = gameArr.pop();
  }
  currentWord = workArr[getRandomIndex(workArr)];
  word1Field.innerText = workArr[0];
  word2Field.innerText = workArr[1];
  word3Field.innerText = workArr[2];
  wordField.innerText = currentWord;
  btnNewGame.innerText = "new Game";
  input.value = "";
  input.focus();
  input.addEventListener("input", inputHandler);
}

btnNewGame.addEventListener("click", () => game(rusArr));
