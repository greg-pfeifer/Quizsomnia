

const baseURL = 'https://the-trivia-api.com/api/questions'
const input = document.getElementsByName('difficulty')
const quizBody = document.querySelector('.quiz-body')
const startBtn = document.querySelector('#start-btn')

let count = 0
let i = 0

let score = 0
let x = 0

function init() {
startBtn.addEventListener('click', () => {
  input.forEach(input => {
    if (input.checked === true) {
      getQuestions(input.id, count)
    }
  })
})
}
init()

function getQuestions(id, score) {
  $.ajax({
    method: 'GET',
    url: baseURL + `?difficulty=${id}&limit=1`,
    success: function (results) {
      console.log(results)
      let count = i++
      if (count >= 10) {
        scoreBoard(score)
      }
      else {
        displayQuestions(id, results, score)
      }
    }
  })
}

function displayQuestions(id, results, score) {
  let qstDiff = id
  let corAns = results[0].correctAnswer
  let incAns = results[0].incorrectAnswers
  let randomArr = [corAns, ...incAns]
  randomArr.sort(() => (Math.random() > .5) ? 1 : -1)
  let body =
    `
  <div id="quiz-div">
    <p class="quiz-score">Score: ${score}</p>
    <span class="score-popup"></span>
    <h1 id="quiz-qst">${results[0].question}</h1>
    <div id="btn-div">
      <button>${randomArr[0]}</button>
      <button>${randomArr[1]}</button>
      <button>${randomArr[2]}</button>
      <button>${randomArr[3]}</button>
    </div>
    <h2 class="alert-msg" style="opacity:0"></h2>
  </div>
  `;
  quizBody.innerHTML = body
  const checkButtons = document.querySelectorAll('button')
  checkButtons.forEach(checkButtons => {
    checkButtons.addEventListener('click', (event) => {
      const alertMessage = document.querySelector('.alert-msg')
      const scorePopup = document.querySelector('.score-popup')
      if (event.target.innerHTML === corAns) {
        alertMessage.innerHTML = 'Correct! 100 points gained!'
        let score = x += 100
        let scoreUpdate = document.querySelector('.quiz-score')
        scoreUpdate.innerHTML = `Score: ${score}`
        scorePopup.style.color = 'green'
        scorePopup.innerHTML = '+100'
        setTimeout(() => {
          getQuestions(qstDiff, score)
        }, 2500)
      }
      else {
        alertMessage.innerHTML = 'Incorrect! 50 points lost!'
        let score = x -= 50
        let scoreUpdate = document.querySelector('.quiz-score')
        scoreUpdate.innerHTML = `Score: ${score}`
        scorePopup.style.color = 'red'
        scorePopup.innerHTML = '-50'
      }
    })
  })
}

function scoreBoard(score) {
  let endGame =
    `
  <div class="score-board">
    <h1>Good game!</h1>
    <h2>Your score: ${score}</h2>
    <button id='play-again'>Play Again?</button>
  </div>
  `;
  quizBody.innerHTML = endGame
  const playAgain = document.querySelector('#play-again')
  playAgain.addEventListener('click', () => {
    init()
    window.location.assign('./index.html')
  })
}

