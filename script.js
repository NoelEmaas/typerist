
let words;
let correctCharactersTyped = 0;
let charactersTyped = 0;
let enteredWords = 0;
let activeWordIndex = 0;
let activeWord;
let startTime;
let endTime;
let WPM;
let CPM;
let Accuracy;
let WordCount;

const wordContainer = document.getElementById("word-container");
const inputField = document.getElementById('input-field');
const innerContainer = document.getElementById("inner-container");
const resultContainer = document.getElementById("result-container");
const restartButton = document.getElementById("restart-button");

restart();

function restart(wordCount) {
    resetVariables();
    resetStyles();
    if(wordCount) WordCount = wordCount;
    if(WordCount){
        updateWordCountStyle(WordCount);
        getRandomWords(WordCount);
    }
    else{
        WordCount = 25;
        updateWordCountStyle(WordCount);
        getRandomWords(WordCount);
    }
}

function updateWordCountStyle(wordCount) {
    var wordCountsLable = document.getElementsByClassName('wordCount');
    for(var i = 0; i < wordCountsLable.length; i++){
        wordCountsLable[i].style.color = "#4f4f4f";
    }
    const selectedWordCount = document.getElementById(`wordCount-${wordCount}`);
    selectedWordCount.style.color = "#FFF";
    selectedWordCount.style.fontWeight = "bold";
}

function getRandomWords(numberOfWords) {
    fetch('wordbank.txt')
    .then(response => response.text())
    .then(content => {
        const wordList= content.split('\n');
        const randomWords = [];
        
        for(let i = 0; i < numberOfWords; ++i) {
            const randomIndex = Math.floor(Math.random() * wordList.length);
            randomWords.push(wordList[randomIndex]);
        }

        wordContainer.innerHTML = "";

        let spanWords = '';
        for(let i = 0; i < randomWords.length; ++i)
            spanWords += `<span>${randomWords[i]}</span> `;

        wordContainer.innerHTML += spanWords;
        words = wordContainer.getElementsByTagName("span");
        activeWord = words[activeWordIndex];

        getTextInput();
    });
}

function getTextInput() {
    activeWord.style.color =  "#ACA98A";
    if(inputField) {
        inputField.addEventListener('input', handleInput);
    }
}

function handleInput(event) {
    if(!startTime) startTime = Date.now();
    charactersTyped++;
    if(isNextWordTriggered()) {
        inputField.style.backgroundColor = "";
        inputValidation();
    }
    else{
        updateTextfieldColor();
    }
    checkIfTestEnded();
}

function updateTextfieldColor() {
    if(inputField.value !== (activeWord.textContent).substring(0, inputField.value.length))
        inputField.style.backgroundColor = "#875256";
    else
        inputField.style.backgroundColor = "";
}

function inputValidation() {
    if(inputField.value.length > 1) handleEnteredWord();
    else inputField.value = "";
}

function handleEnteredWord() {
    if (isInputCorrect()) {
        activeWord.style.color =  "#8AAC8B";
        correctCharactersTyped += inputField.value.length;
    }
    else {
        activeWord.style.color =  "#AC8A8C";
    }
    nextWord();
}

function nextWord() {
    inputField.value = "";
    activeWordIndex++;
    activeWord = words[activeWordIndex];
    if(activeWordIndex < 10) activeWord.style.color =  "#ACA98A";
    enteredWords++;
}

function checkIfTestEnded() {
    if(enteredWords >= WordCount) {
        endTime = Date.now();
        totalTime = (endTime - startTime) / 1000;
        CPM = correctCharactersTyped/totalTime;
        WPM = (correctCharactersTyped/5)/(totalTime/60);
        Accuracy = + (correctCharactersTyped/charactersTyped) * 100;
        inputField.disabled = true;
        showResults();
    }
}

function isInputCorrect() {
    return inputField.value.slice(0,-1) === activeWord.textContent;
}

function isNextWordTriggered() {
    return inputField.value.slice(-1) === " ";
}
    
function showResults() {
    document.getElementById("cpm").innerHTML = `${Math.floor(CPM)}`;
    document.getElementById("wpm").innerHTML = `${Math.floor(WPM)}`;
    document.getElementById("accuracy").innerHTML = `${Math.floor(Accuracy)}%`;

    innerContainer.classList.add("mb-5");
    resultContainer.classList.remove("pb-2");
    resultContainer.style.margin = "65px 0px";
    resultContainer.style.opacity = "1";
}

function resetVariables() {
    words = undefined;
    correctCharactersTyped = 0;
    charactersTyped = 0;
    enteredWords = 0;
    activeWordIndex = 0;
    activeWord = undefined;
    startTime = undefined;
    endTime = undefined;
    WPM = undefined;
    CPM = undefined;
    Accuracy = undefined;
}

function resetStyles() {
    inputField.value = "";
    inputField.style.backgroundColor = "";
    restartButton.blur();
    inputField.disabled = false;
    inputField.focus();
    resultContainer.classList.add("pb-2");
    resultContainer.style.margin = "0px 0px";
    resultContainer.style.opacity = "0";
    innerContainer.classList.remove("mb-5");
}
