LMS QUIZ BOT
=======
THIS IS FOR HELP TO DO QUIZ in LMS

## How to use
**STEP1** Create bookmark by URL : 
```javascript
javascript:function(){
  var x = document.createElement('SCRIPT');
  x.src='https://rawgit.com/kodchanat2/play/master/lmsQuiz/1writeQuiz.js';
  document.head.appendChild(x);
})();
```
  And use it at **'attempt quiz'** page
  
**STEP2** Create bookmark by URL : 
```javascript
javascript:function(){
  var x = document.createElement('SCRIPT');
  x.src='https://rawgit.com/kodchanat2/play/master/lmsQuiz/2checkCorrect.js';
  document.head.appendChild(x);
})();
```
  And use it at **'Review of Attempt'** page
