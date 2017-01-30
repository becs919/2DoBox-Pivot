require('./buttons');
require('./search');
const $title = $('.title-input');
const $task = $('.task-input');
const $saveButton = $('.save-button');

const valueArray = [
  'none',
  'low',
  'normal',
  'high',
  'critical'
]

$(document).ready(() => {
  let completedArray = Object.keys(localStorage).filter(completeFilter).sort();
  let sortedArray = Object.keys(localStorage).sort().filter(incompleteFilter).slice(-10);

  sortedArray.concat(completedArray).forEach(function(key){
    append(JSON.parse(localStorage[key]));
  });
  let completedTask = $('.bottom-container').find('.completed');
  completedTask.hide();
});

// EVENT LISTENERS
$saveButton.on('click', (e)=> {
  e.preventDefault();
  grabToDo();
  clearFields();
  disableSaveButton();
});

$('.bottom-container').on('click', '.up-vote, .down-vote', (e) => {
  let getToDo = $(e.currentTarget).closest('.todo-section');
  let id = getToDo.prop('id');
  let importance = getToDo.find('.importance').text();
  let upVoteOrDownVote = $(e.currentTarget).prop('class');
  let newImportance = sortButtons(upVoteOrDownVote, importance);
  getToDo.find('.importance').text(newImportance);
  let storedObj = JSON.parse(localStorage.getItem(id));
  console.log(newImportance);
  storedObj.importance = newImportance;
  storeItem(storedObj);
});


$('.bottom-container').on('click', '.completed-task', (e) => {
  $(e.currentTarget).closest('.todo-section').toggleClass('completed');
  let id = $(e.currentTarget).closest('.todo-section').prop('id');
  let todo = JSON.parse(localStorage.getItem(id));
  let currentClass = $(e.currentTarget).closest('.todo-section').prop('class');
  todo.complete = !todo.complete;
  storeItem(todo);
});

$('.bottom-container').on('blur', '.todo-title, .todo-task', (e) => {
  let id = $(e.currentTarget).closest('.todo-section').prop('id');
  let todo = JSON.parse(localStorage.getItem(id));
  todo.title = $(e.currentTarget).closest('.todo-section').find('.todo-title').text();
  todo.task = $(e.currentTarget).closest('.todo-section').find('.todo-task').text();
  storeItem(todo);
});


$('.title-input, .task-input').on('keyup',() => {
  let title = $title.val();
  let task = $task.val();
  if(title.length > 0 && task.length > 0) {
    enableSaveButton();
  } else  {
    disableSaveButton();
  }
});


$('.task-input').on('input', (e) => {
let max = 120;
let length = $(e.currentTarget).val().length;
$('.char-count').text(max - length);
});


// QUALITY FILTER BUTTONS - NEED REFACTORED!!!!!

// function addImportanceClick (importance) {
//   $('.' + importance).on('click', function() {
//     $('.todo-section').find('.importance').each(function(index, quality){
//       let text = $(quality).text();
//       if(text === importance){
//       } else {
//         $(this).closest('.todo-section').toggle();
//         let completedTask = $('.bottom-container').find('.completed');
//         completedTask.hide();
//       }
//     });
//   });
// }
// importanceArray.forEach((importance) => {
//   addImportanceClick(importance);
// })

$('.none').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text();
    if(text === 'none'){
    } else {
      $(this).closest('.todo-section').toggle();
      let completedTask = $('.bottom-container').find('.completed');
      completedTask.hide();
    }
  });
});


$('.low').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text();
    if(text === 'low'){
    } else {
      $(this).closest('.todo-section').toggle();
      let completedTask = $('.bottom-container').find('.completed');
      completedTask.hide();
    }
  });
});


$('.normal').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text();
    if(text === 'normal'){
    } else {
      $(this).closest('.todo-section').toggle();
      let completedTask = $('.bottom-container').find('.completed');
      completedTask.hide();
    }
  });
});


$('.high').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text();
    if(text === 'high'){
    } else {
      $(this).closest('.todo-section').toggle();
      let completedTask = $('.bottom-container').find('.completed');
      completedTask.hide();
    }
  });
});


$('.critical').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text();
    if(text === 'critical'){
    } else {
      $(this).closest('.todo-section').toggle();
      let completedTask = $('.bottom-container').find('.completed');
      completedTask.hide();
    }
  });
});



// GLOBAL FUNCTIONS
class ToDo {
  constructor(title, task) {
    this.title = title;
    this.task = task;
    this.id = Date.now();
    this.importance = 'normal';
    this.complete = false;
  }
}


function grabToDo () {
  let title = $title.val();
  let task = $task.val();
  let todo = new ToDo(title, task);
  storeItem(todo);
  append(todo);
}


function append(todo) {
  $('.appended-card').prepend(
    `<section id=${todo.id} class="todo-section">
      <ul class="input-text">
      <li class='todo-title' contenteditable>${todo.title}</li>
      <li class='todo-task' contenteditable>${todo.task}</li>
      </ul>
      <button class='up-vote buttons'>up</button>
      <button class='down-vote buttons'>down</button>
      <p tabindex="0">importance: <span class="importance">${todo.importance}</span></p>
      <button aria-label="mark as completed task" class='completed-task'>completed task</button>
      <button class='delete-button buttons'>delete</button>
    </section>`
  )
  if (todo.complete) {
    $('#' + todo.id).toggleClass('completed');
  }
};


function clearFields() {
  $title.val('');
  $task.val('');
};


function disableSaveButton() {
  $saveButton.prop("disabled", true);
};


function enableSaveButton(){
  $saveButton.prop("disabled", false);
};


function storeItem(todo){
  localStorage.setItem(todo.id, JSON.stringify(todo));
};


function upVote(importance) {
  let index = valueArray.indexOf(importance);
  if (index < valueArray.length - 1) {
    index++
    return valueArray[index]

  }
  return valueArray[index]
};


function downVote(importance) {
  let index = valueArray.indexOf(importance);

  if (index > 0) {
    index--
    return valueArray[index]
  }
  return valueArray[index]
};


function sortButtons(upVoteOrDownVote, importance){
  if (upVoteOrDownVote === 'up-vote buttons'){
    return upVote(importance);
  } else {
    return downVote(importance);
  }
};


function incompleteFilter(key) {
  return !JSON.parse(localStorage[key]).complete;
};


function completeFilter(key) {
  return JSON.parse(localStorage[key]).complete;
};
