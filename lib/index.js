const $title = $('.title-input');
const $task = $('.task-input');
const $saveButton = $('.save-button');



$(document).ready(() => {
  Object.keys(localStorage).map(function(key){
    return append(JSON.parse(localStorage[key]))
  })
// FOR JHUN :)
})


// EVENT LISTENERS
$saveButton.on('click', function(e) {
  e.preventDefault();
  grabToDo();
  clearFields();
  disableSaveButton();
})



$('.bottom-container').on('click', '.delete-button', function (){
  $(this).closest('.todo-section').remove();
  let idKey = $(this).closest('.todo-section').attr('id');
  localStorage.removeItem(idKey);
});


$('.bottom-container').on('click', '.up-vote, .down-vote', function() {
  let getToDo = $(this).closest('.todo-section');
  let id = getToDo.prop('id');
  let importance = getToDo.find('.importance').text();
  let upVoteOrDownVote = $(this).prop('class');
  let newImportance = sortButtons(upVoteOrDownVote, importance);
  getToDo.find('.importance').text(newImportance);
  let storedObj = JSON.parse(localStorage.getItem(id));
  storedObj.importance = newImportance;
  storeItem(storedObj);
});


$('.bottom-container').on('blur', '.todo-title, .todo-task', function(){
  let id = $(this).closest('.todo-section').prop('id');
  let todo = JSON.parse(localStorage.getItem(id));
  todo.title = $(this).closest('.todo-section').find('.todo-title').text();
  todo.task = $(this).closest('.todo-section').find('.todo-task').text();
  localStorage.setItem(id, JSON.stringify(todo));
});


$('.search-field').on('keyup', function(){
  let searchTerm = $(this).val().toLowerCase();
  $('.input-text').each(function (index, theObject) {
    let text = $(theObject).text().toLowerCase();
    let match = !!text.match(searchTerm);
    $(this).parent().toggle(match);
  });
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

// GLOBAL FUNCTIONS
function ToDo (title, task) {
  this.title = title;
  this.task = task;
  this.id = Date.now();
  this.importance = 'normal';
  // this.completed = false;
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
    )};



function clearFields() {
  $title.val('');
  $task.val('');
}

function disableSaveButton() {
  $saveButton.prop("disabled", true);
}

function enableSaveButton(){
  $saveButton.prop("disabled", false);
}



function upVote(importance) {
  switch(importance) {
    case 'none':
      return 'low';
    case 'low':
      return 'normal';npm
    case 'normal':
      return 'high';
    case 'high':
      return 'critical';
    default:
      return 'critical';
  }
}

function downVote(importance) {
  switch(importance) {
    case 'critical':
      return 'high';
    case 'high':
      return 'normal';
    case 'normal':
      return 'low';
    case 'low':
      return 'none';
    default:
      return 'none';
  }
}

function sortButtons(upVoteOrDownVote, importance){
  if (upVoteOrDownVote === 'up-vote buttons'){
    return upVote(importance);
  } else {
    return downVote(importance);
  }
}

function storeItem(todo){
  localStorage.setItem(todo.id, JSON.stringify(todo));
}




// COMPLETED TASK BUTTON
$('.bottom-container').on('click', '.completed-task', (e) => {
  let completed = $(e.currentTarget).closest('.todo-section').find('.input-text')
  let newCompleted = completed.toggleClass('strike-through')

  let id = $(e.currentTarget).closest('.todo-section').prop('id');
  console.log(id);
  let todo = JSON.parse(localStorage.getItem(id));
  console.log(todo);

  // localStorage.setItem(id, JSON.stringify(todo));

// using before e.currentTarget
// $(this).closest('.todo-section').find('.input-text').addClass('strike-through')


//on reload the completed itesms should be exempted from the list
// click event for show completed todo's that loads them back onto the top of the list.
});


$('.none').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text()
    if(text === 'none'){
      console.log(text);
    } else {
      $(this).closest('.todo-section').toggle();
    }
  })
});

$('.low').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text()
    if(text === 'low'){
      console.log(text);
    } else {
      $(this).closest('.todo-section').toggle();
    }
  })
});

$('.normal').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text()
    if(text === 'normal'){
      console.log(text);
    } else {
      $(this).closest('.todo-section').toggle();
    }
  })
});

$('.high').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text()
    if(text === 'high'){
      console.log(text);
    } else {
      $(this).closest('.todo-section').toggle();
    }
  })
});

$('.critical').on('click', function() {
  $('.todo-section').find('.importance').each(function(index, quality){
    let text = $(quality).text()
    if(text === 'critical'){
      console.log(text);
    } else {
      $(this).closest('.todo-section').toggle();
    }
  })
});


  $('.task-input').on('input', function() {
  let max = 120;
  let length = $(this).val().length;
  $('.char-count').text(max - length);
});











//RECENT todo's
//function that limits todo's to ten most recent
//Create a button called show more todo's
//click event on the button that loads additional messages from the past
//FILTER by importance
//CHARACTER Counter
//Char count should increment and decrement
//SUBMIT button disabled
//Submit button should be disabled if the char count exceeds 120
