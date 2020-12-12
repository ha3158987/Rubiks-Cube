/* 1단계: 단어 밀어내기 */

class PushWord {

    init() {
        this.addClickEvent();
    }

    addClickEvent(){
        const button = document.querySelector(".button_enter");
        button.addEventListener("click", this.getInputValue.bind(this));
    }

    getInputValue(){
        const form = document.querySelector(".input_form1");
        const input = document.querySelector(".word");
        const inputValue = input.value.split(" ");
        const sortedWord = this.moveElement(inputValue[0], inputValue[1], inputValue[2]);

        this.showAnswerOnUI(sortedWord);
        form.reset();
        input.focus();
    }

    moveElement(word, numOfMoves, direction){
        const absoluteValue = Math.abs(numOfMoves);
        const numOfRequiredLoops = absoluteValue % word.length;
        let arrayWord = word.split("");
        let leftOrRight;
        direction === "r" || direction === "R" ? leftOrRight = "right" : leftOrRight = "left";

        if(word.length === numOfRequiredLoops || numOfRequiredLoops === 0){
            return arrayWord.join("");
        }

        if ((numOfMoves[0] === "-" && leftOrRight === "right") || (JSON.parse(numOfMoves * 1) > 0 && leftOrRight === "left")) {
            return this.takeElementFromLeft(numOfRequiredLoops, arrayWord);
        }

        if ((numOfMoves[0] === "-" && leftOrRight === "left") || (JSON.parse(numOfMoves * 1) > 0 && leftOrRight === "right")) {
            return this.takeElementFromRight(numOfRequiredLoops, arrayWord);
        }
    }

    takeElementFromRight(numOfLoop, array) {
        for (let i = 1; i <= numOfLoop; i++){
            const poppedElement = array.pop();
            array.unshift(poppedElement);
        }
        return array.join("");
    }

    takeElementFromLeft(numOfLoop, array) {
        for (let i = 1; i <= numOfLoop; i++){
            const shiftedElement = array.shift();
            array.push(shiftedElement);
        }
        return array.join("");
    }

    showAnswerOnUI(answer) {
        const answerBox = document.querySelector(".answer");
        answerBox.innerHTML = answer;
    }

}

const pushWordCalculator = new PushWord();
pushWordCalculator.init();
