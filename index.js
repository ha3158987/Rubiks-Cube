/*
1단계: 단어 밀어내기
1. 입력: 사용자로부터 단어 하나, 정수 숫자 하나(-100 <= N < 100), L 또는 R을 입력받는다. L 또는 R은 대소문자 모두 입력 가능하다.
2. 주어진 단어를 L이면 주어진 숫자 갯수만큼 왼쪽으로, R이면 오른쪽으로 밀어낸다.
3. 밀려나간 단어는 반대쪽으로 채워진다.

***주의사항***
- 컴파일 및 실행되지 않을 경우 불합격.
- 자기만의 기준으로 최대한 간결하게 코드를 작성한다.
*/

class PushWord {

    init() {
        this.addClickEvent();
    }

    addClickEvent(){
        const button = document.querySelector(".button_enter");
        button.addEventListener("click", this.getInputValue.bind(this, event));
    }

    getInputValue(event){
        const form = document.querySelector(".input_form");
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
            for (let i = 1; i <= numOfRequiredLoops; i++){
                const shiftedLetter = arrayWord.shift();
                arrayWord.push(shiftedLetter);
            }
            return arrayWord.join("");
        }

        if ((numOfMoves[0] === "-" && leftOrRight === "left") || (JSON.parse(numOfMoves * 1) > 0 && leftOrRight === "right")) {
            for (let i = 1; i <= numOfRequiredLoops; i++){
                const poppedLetter = arrayWord.pop();
                arrayWord.unshift(poppedLetter);
            }
            return arrayWord.join("");
        }
    }

    showAnswerOnUI(answer) {
        const answerBox = document.querySelector(".answer");
        answerBox.innerHTML = answer;
    }

}

const pushWordCalculator = new PushWord();
pushWordCalculator.init();
