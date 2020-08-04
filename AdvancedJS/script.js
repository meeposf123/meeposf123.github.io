/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

(function(){
  function Question(question, answers, correctAnswer){
  this.question = question;
  this.answers = answers;
  this.correctAnswer = correctAnswer;
  // this.selectRandomQuestion = function(questions){
  //   console.log(questions[Math.floor(Math.random() * 3)]);
  // }
};

Question.prototype.selectRandomQuestion = function(){
  console.log(this.question);
}

Question.prototype.checkAnswer = function(answer){
  if(this.correctAnswer === answer){
    console.log('Correct');
  }
  else{
    console.log('Incorrect');
  }
}

var questions = new Array();
//var questions = [];
questions.push(new Question('Question 0', ['1','2','3'], 0));
questions.push(new Question('Question 1', ['1','2','3'], 1));
questions.push(new Question('Question 2', ['1','2','3'], 2));
//console.log(questions[0].selectRandomQuestion(questions));

var n = Math.floor(Math.random() * questions.length);

questions[n].selectRandomQuestion();

var answer = parseInt(prompt('Please select the correct answer.'));

questions[n].checkAnswer(answer);

})();
/*
var question0 = new Question('Question 0', ['1','2','3'], 0);
var question1 = new Question('Question 1', ['1','2','3'], 1);
var question2 = new Question('Question 2', ['1','2','3'], 2);
console.log(question0);
console.log(question1);
console.log(question2);

8?



/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/
