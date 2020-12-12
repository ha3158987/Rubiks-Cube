/* 2단계: 평면 큐브 구현하기 */

//------------------------------------ 평면 큐브 전반에 필요한 데이터를 관리 & 핸들링하는 Model 클래스
class Model {
    constructor() {
        this.cube = [
            ["R", "R", "W"],
            ["G", "C", "W"],
            ["G", "B", "B"]
        ];

        this.direction = {
            "U": () => this.takeElementFromLeft(this.cube[0]),
            "U'": () => this.takeElementFromRight(this.cube[0]),
            "R": () => this.takeElementFromRight((this.turnCubeClockwise(this.cube))[2]),
            "R'": () => this.takeElementFromLeft((this.turnCubeClockwise(this.cube))[2]),
            "L": () => this.takeElementFromLeft((this.turnCubeClockwise(this.cube))[0]),
            "L'": () => this.takeElementFromRight((this.turnCubeClockwise(this.cube))[0]),
            "B": () => this.takeElementFromRight(this.cube[2]),
            "B'": () => this.takeElementFromLeft(this.cube[2]),
            "Q": () => {return `Bye~🖐`}
        }
    }

    takeElementFromRight(array){
        const poppedElement = array.pop();
        array.unshift(poppedElement);
        return array;
    }

    takeElementFromLeft(array){
        const shiftedElement = array.shift();
        array.push(shiftedElement);
        return array;
    }


    //시계방향으로 90도 회전
    turnCubeClockwise(cube){
        for (let i = 0; i < cube.length; i++) {
            for (let j = 0; j < i; j++) {
              [cube[i][j], cube[j][i]] = [cube[j][i], cube[i][j]];
            }
        }
        cube.forEach((row) => row.reverse());
        return cube;
    }

    //시계반대방향으로 90도 회전
    turnCubeCounterClockwise(cube){
        cube.forEach((row) => row.reverse());
        for (let i = 0; i < cube.length; i++) {
            for (let j = 0; j < i; j++) {
                [cube[i][j], cube[j][i]] = [cube[j][i], cube[i][j]];
            }
        }
        return cube;
    }

}

//------------------------------------------------- DOM 핸들링과 UI 렌더링 역할을 하는 View 클래스
class View {
    makeStringsIntoCubeShape(cube, type, template){
        type ? template += `${type}<br>` : template += `<초기상태><br>`;

        cube.forEach(row => {
            const str = row.join(" ");
            template += `${str}<br>`;
        })

        template += `<br>`
        return template;
    }

    getInputValue(){
        const inputValue = (document.querySelector("#step2-input").value).split("");
        const filteredStrings = this.filterInputValue(inputValue);

        return filteredStrings;
    }

    filterInputValue(inputString) {
        let array = [];

        inputString.forEach((el, idx) => {
            if (el === "'") {
                let mergedEl = `${inputString[idx - 1]}`;
                mergedEl += el;
                el = mergedEl;
                array.pop();
            }
            array.push(el);
        })

        return array;
    }

    renderUI(inputBox, template){
        inputBox.innerHTML = template;
        this.resetToDefaultStatus();
    }

    resetToDefaultStatus(){
        const form = document.querySelector(".input_form2");
        const input = document.querySelector("#step2-input");

        form.reset();
        input.focus();
    }

}

//----------------------------------------------- Model과 View의 중계역할을 하는 Controller 클래스
class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.template = ``;
    }

    init() {
        this.template = this.view.makeStringsIntoCubeShape(this.model.cube, null, this.template);
        this.addEvent();
    }

    addEvent(){
        const inputButton = document.querySelector(".step2-answer-button");
        const refreshButton = document.querySelector(".step2-refresh");

        inputButton.addEventListener("click", this.executeClickEvent.bind(this));
        refreshButton.addEventListener("click", this.reloadPage);
    }

    executeClickEvent(){
        const answerBox = document.querySelector("#step-2-result");
        const directionArray = this.view.getInputValue();

        directionArray.forEach((type)=> {
            if (type === "Q"){
                const endMessage = this.model.direction[type]();
                this.template = endMessage;
                return;
            } else {
                this.model.direction[type]();
            }

            if (this.isRightOrLeftColumn(type)){
                this.model.turnCubeCounterClockwise(this.model.cube);
            }
            this.template = this.view.makeStringsIntoCubeShape(this.model.cube, type, this.template);
        })
        this.view.renderUI(answerBox, this.template);
    }

    isRightOrLeftColumn(type){
        return (type === "R" || type === "R'" || type === "L" || type === "L'") ? true : false ;
    }

    reloadPage(){
        location.reload();
    }
}

const model = new Model();
const view = new View();
const flatCube = new Controller(model, view);
flatCube.init();

