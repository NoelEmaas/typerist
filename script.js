
getRandomWords();

function restart() {
    window.location.reload();
}

function getRandomWords() {
    fetch('wordbank.txt')
    .then(response => response.text())
    .then(content => {
        const words = content.split('\n');
        const randomWords = [];
        
        for(let i = 0; i < 10; ++i) {
            const randomIndex = Math.floor(Math.random() * words.length);
            randomWords.push(words[randomIndex]);
        }

        const wordContainer = document.getElementById('word-container');
        wordContainer.innerHTML = "";
        let spanWords = '';
        for(let i = 0; i < randomWords.length; ++i)
            spanWords += `<span>${randomWords[i]}</span> `;
        wordContainer.innerHTML += spanWords;
        textInput();
    });
}

function textInput() {

    const wordContainer = document.getElementById("word-container");
    const words = wordContainer.getElementsByTagName("span");
    let inputField = document.getElementById('input-field');

    let startTime;
    let endTime;
    let totalTime;

    let activeWordIndex = 0;
    let activeWord = words[activeWordIndex];
    let correctCharactersTyped = 0;
    let charactersTyped = 0;
    let enteredWords = 0;
    
    activeWord.style.color =  "#ACA98A";
    
    if(inputField){
        inputField.addEventListener('input', function(event) {

            if (!startTime) {
                startTime = Date.now();
            }

            const input = inputField.value;
            const expectedWord = activeWord.textContent;

            charactersTyped++;

            if(enteredWords < 10){
                if(input.slice(-1) === " ") {
                    inputField.style.backgroundColor = "";
                    if(input.length > 1) {
                        if (input.slice(0,-1) === expectedWord) {
                            activeWord.style.color =  "#8AAC8B";
                            timeStarted = false;
                            correctCharactersTyped += input.length;
                        }
                        else {
                            activeWord.style.color =  "#AC8A8C";
                        }
    
                        inputField.value = "";
                        activeWordIndex++;
                        activeWord = words[activeWordIndex];
                        if(activeWordIndex < 10)
                            activeWord.style.color =  "#ACA98A";
                        enteredWords++;
                    }
                    else{
                        inputField.value = "";
                    }
                }
                else {
                    if(input !== expectedWord.substring(0, input.length))
                        inputField.style.backgroundColor = "#875256";
                    else
                        inputField.style.backgroundColor = "";
                }
            }

            console.log(enteredWords);

            if(enteredWords >= 10) {
                endTime = Date.now();
                totalTime = (endTime - startTime) / 1000;
                console.log("WPM: " + (correctCharactersTyped/5)/(totalTime/60));
                console.log("Accuracy: " + (correctCharactersTyped/charactersTyped) * 100);
                inputField.disabled = true;
                showResults();
            }
        });
    }
}
    
function showResults() {
    const innerContainer = document.getElementById("inner-container");
    const resultContainer = document.getElementById("result-container");
    innerContainer.classList.add("mb-5");
    resultContainer.classList.remove("pb-2");
    resultContainer.classList.add("mt-5");
}
