# 루빅스 큐브 구현하기

---

<br>

# Step 1. 단어 밀어내기 구현하기

## 동작과정

1. 상단의 input창에 사용자로부터 단어, 정수, L 또는 R을 차례대로 입력받는다. <br>
2. `입력`버튼의 클릭 이벤트로 각 input값을 배열로 저장한다. (ex. `["apple", "-2", "L"]`)<br>
3. 이동횟수의 절대값을 단어의 길이로 나누어 필요한 이동횟수를 최소화한다. 이 때 만일 이동횟수가 0이거나 단어의 길이와 일치할 경우, 곧바로 이동함수를 벗어난다.<br>
4. 일치하는 조건에 따라 글자를 오른쪽으로 밀거나 왼쪽으로 민다.<br>
   1. 왼쪽으로 밀기: `정수 & Left` 혹은 `음수 & Right`<br>
   2. 오른쪽으로 밀기: `정수 & Right` 혹은 `음수 & Left`<br>
5. 변환된 글자를 UI 하단의 실행결과 box에 렌더링한다.<br>

## 실행화면

![실행화면](step-1.png)

<br>

---

<br>

# Step 2. 평면 큐브 구현하기

## 동작과정

1. 평면큐브의 기본모양은 `Model`클래스의 `cube` 이중배열로, 그리고 각각의 알파벳(U, U', R, R', L, L', B, B')이 의미하는 동작방향은 `Model`클래스 `direction`객체의 메소드로 저장한다.<br>
2. `cube>` input창에 사용사로부터 값을 입력받는다. 입력받은 값은 `입력`버튼의 클릭이벤트와 함께 split되어 배열 내에 저장된다.<br>
   이 때 `'`는 바로 앞전의 글자와 합쳐지는 과정을 거친다. (ex. `["U", "U'", "R'", "L"]`)<br>
3. 저장된 배열을 순회하면서 `direction`객체에서 해당글자와 일치하는 key값을 찾아 메소드를 차례대로 실행한다. <br>

   1. `R`, `R'`, `L`, `L'`의 경우, 시계방향으로 90도를 회전한 후 오른쪽 혹은 왼쪽으로 글자를 이동시킨다. 그리고 다시 시계반대방향으로 90도를 회전해 원래 방향으로 돌려놓는다.<br>
   2. `Q`의 경우, 곧바로 실행결과 box에 종료메세지를 반환한다.<br>

4. 엘리먼트의 이동이 완료된 `cube`배열은 template literal을 통해 큐브형태로 만든 다음, UI에 렌더링한다.<br>
5. 각 이동단계마다 위 과정을 반복하면서 평면 큐브의 변화 과정을 하단의 실행결과 box에 반환한다.<br>

## 실행화면

![실행화면](step2-1.png)

## 종료화면

![종료화면](step2-2.png)

<br>

---

<br>

# Step 3. 루빅스 큐브 구현하기

## 동작과정

1. `cube>` input창에 사용자로부터 값(F, F', R, R', U, U', B, B', L, L', D, D')을 입력받는다.<br>
2. 입력받은 string을 배열의 형태로 변환한다. (ex. `["F", "R", "R'", "U", "U", "R"]`)

## 시작화면

![시작화면](step3-1.png)
