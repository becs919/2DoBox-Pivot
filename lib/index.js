$(document).ready(() => {
  for(let i = 0; i < localStorage.length; i++){
    append(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
})

// EVENT LISTENERS
$('.save-button').on('click', () => {
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
  let $getToDo = $(this).closest('.todo-section');
  let id = $getToDo.prop('id');
  let importance = $getToDo.find('.importance').text();
  let upVoteOrDownVote = $(this).prop('class');
  let newImportance = sortButtons(upVoteOrDownVote, importance);
  $getToDo.find('.importance').text(newImportance);
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
  let title = $('.title-input').val();
  let task = $('.task-input').val();
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
}

function grabToDo () {
  let title = $('.title-input').val();
  let task = $('.task-input').val();
  let todo = new ToDo(title, task);
  storeItem(todo);
  append(todo);
}

function append(todo) {
  $('ul').prepend(
    `<section id=${todo.id} class="todo-section">
      <div class="input-text">
      <li class='todo-title' contenteditable>${todo.title}</li>
      <li class='todo-task' contenteditable>${todo.task}</li>
      </div>
      <button class='up-vote buttons'>up</button>
      <button class='down-vote buttons'>down</button>
      <button class='completed-task'>Completed Task</button>
      <p>importance: <span class="importance">${todo.importance}</span></p>
      <button class='delete-button buttons'>delete</button>
    </section>`
  )};

function clearFields() {
  $('.title-input').val('');
  $('.task-input').val('');
}

function disableSaveButton() {
  $('.save-button').prop("disabled", true);
}

function enableSaveButton(){
  $('.save-button').prop("disabled", false);
}



function upVote(importance) {
  switch(importance) {
    case 'none':
      return 'low';
    case 'low':
      return 'normal';
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
$('.bottom-container').on('click', '.completed-task', function(){
  $(this).closest('.todo-section').find('.input-text').toggleClass('strike-through')
  console.log('hey');

})


// On reloading the page the page the completed TODOs should be exempted from the list.
// When the user clicks the show completed TODOs The completed TODOs should be loaded back onto the top of the todo list.
