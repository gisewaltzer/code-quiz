
var startButton = document.querySelector("#start-btn");
var answerButton1 = document.querySelector("#answer-button1");
var answerButton2 = document.querySelector("#answer-button2");
var answerButton3 = document.querySelector("#answer-button3");
var answerButton4 = document.querySelector("#answer-button4");
var scoreButton = document.querySelector("#score-submit-button");
var questionText = document.querySelector("#question-text");
var goBackButton = document.querySelector("#go-back-button");
var timerText = document.querySelector("#timer-text");
var scoreText = document.querySelector("#score-text");
var initialsInput = document.querySelector("#initials-input");
var highScoresList = document.querySelector("#high-scores-list");

var questionPage = document.querySelector("#question-page");
var startPage = document.querySelector("#start-page");
var scorePage = document.querySelector("#score-page");
var highScoresPage = document.querySelector("#high-scores-page");
var questionNumber = 0;
var counter = 75;
var intervalID;

questionPage.style.display = "none"; // hides the question page on start
scorePage.style.display = "none"; // hides the score page on start
highScoresPage.style.display = "none"; // hides the score page on start

startButton.addEventListener('click', () => {
   startPage.style.display = "none"; // hides the start page
   questionPage.style.display = "initial"; // shows the question page

   // Start timer
   // runs the function every 3 seconds
   intervalID = setInterval(() => {
      timerText.innerText = counter; // display the counter onto the page
      counter = counter - 1; // subtract 1
      if (counter < 0) {
         clearInterval(intervalID); // stops the looper
      }
   }, 1000);
});

// All 4 buttons run this function when they are clicked
function onAnswerClick(event) {
   if (questionNumber == 0) { // question number 1
      // Check if chosen answer for question number 1 is correct
      let correctAnswer = "Mocha";
      let chosenAnswer = event.target.innerText;
      if (chosenAnswer === correctAnswer) { // if chosen answer is correct...
         console.log("Correct");
      } else { // if chosen answer is INcorrect
         // subtract 10 from timer
         counter = counter - 10;
         console.log("Wrong");
      }

      // Display question number 2
      // changes the question text
      questionText.innerText = "2. How old is JavaScript?";
      // change text inside buttons
      answerButton1.innerText = "1. 0ne years old";
      answerButton2.innerText = "2. ten years old";
      answerButton3.innerText = "3. two years old";
      answerButton4.innerText = "4. twenty-seven years old";

   } else if (questionNumber == 1) { // question number 2
      // Check if chosen answer for question number 2 is correct
      let correctAnswer = "twenty-seven years old";
      let chosenAnswer = event.target.innerText;
      if (chosenAnswer === correctAnswer) { // if chosen answer is correct...
         console.log("Correct");
      } else { // if chosen answer is INcorrect
         // subtract 10 from timer
         counter = counter - 10;
         console.log("Wrong");
      }

      // Display question number 3
      questionText.innerText = "3. Who invented JavaScript?";
      answerButton1.innerText = "1. Peter Walter";
      answerButton2.innerText = "2. Mark Green";
      answerButton3.innerText = "3. Brendon Eich";
      answerButton4.innerText = "4. Lewis Ritz";
   } else if (questionNumber == 2) { // question number 3
      // Check if chosen answer for question number 3 is correct
      let correctAnswer = "Brendon Eich";
      let chosenAnswer = event.target.innerText;
      if (chosenAnswer === correctAnswer) { // if chosen answer is correct...
         console.log("Correct");
      } else { // if chosen answer is INcorrect
         // subtract 10 from timer
         counter = counter - 10;
         console.log("Wrong");
      }

      // Display the score page
      console.log("quiz is done!");
      clearInterval(intervalID);
      scoreText.innerText = counter;
      questionPage.style.display = "none" // hide question page
      scorePage.style.display = "initial" // show the score page
   }
   questionNumber = questionNumber + 1; // 0 => 1 + 1 => 2 + 1 => 3 + 1 => 4
}


// 1 create a var for the score-submit-button
// 2 add an event listener for when click on score-submit-button
// 3 run the code inside the even listener
scoreButton.addEventListener('click', () => {
   scorePage.style.display = "none"  // hide score page
   highScoresPage.style.display = "initial"  // show the high scores

   // Save the score and initials into local storage
   let score = counter;
   let initials = initialsInput.value;
   let newRecord = { score, initials };


   // Pull records array out of local storage
   var records = JSON.parse(localStorage.getItem("records"));

   if (records == null) {
      // if there is no records array yet...
      records = [];
   }

   records.push(newRecord); // Add new record to records array

   // sort the records array
   records.sort((recordA, recordB) => {
      // record looks like: { initials: "AG", score: 42 }
      // record.score => 42
      if (recordA.score < recordB.score) {
         return 1; // A on right
      } else if (recordA.score > recordB.score) {
         return -1; // A on left
      } else {
         return 0;
      }
   });

   localStorage.setItem("records", JSON.stringify(records));

   // Displays each record onto the page
   highScoresList.innerText = ""; // clears the high scores list
   records.forEach(record => {
      var scoreString = `${record.initials}: ${record.score}`; // AE: 41
      highScoresList.innerText = highScoresList.innerText + "\n" + scoreString
   });


});
// create an event to go to the first page
goBackButton.addEventListener('click', () => {
   startPage.style.display = "initial"; //go to first page
   highScoresPage.style.display = "none"; //hide high score page
   counter = 75; // reset timer to 75
   questionNumber = 0; // reset question number to 0
   initialsInput.value = ""; // clear initials input


   // Display question number 1
   // changes the question text
   questionText.innerText = "1. What was JavaScript originally called?";
   // change text inside buttons
   answerButton1.innerText = "1. Mocha";
   answerButton2.innerText = "2. Java";
   answerButton3.innerText = "3. LiveScript";
   answerButton4.innerText = "4. TypeScript";
})

// Display the high scores
answerButton1.addEventListener("click", onAnswerClick);
answerButton2.addEventListener("click", onAnswerClick);
answerButton3.addEventListener("click", onAnswerClick);
answerButton4.addEventListener("click", onAnswerClick);

// When the answer button is clicked show the next question
var taskIdCounter = 0
var answersArrOfObj = [
   {
      answerQuestionOneArr: ["Ryhia", "Mary", "Rose", "Milly"],
      matchQuestionOneId: 0
   },
   {
      answerQuestionTwoArr: ["15", "14", "20", "13"],
      matchQuestionTwoId: 3
   },
   {
      answerQuestionThreeArr: ["French", "Canadian", "American", "Hindu"],
      matchQuestionThreeId: 2
   },
]
















