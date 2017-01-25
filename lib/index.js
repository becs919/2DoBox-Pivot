$(document).ready(function() {
  for(var i = 0; i < localStorage.length; i++){
    append(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
})

// EVENT LISTENERS
$('.save-button').on('click', function() {
  grabIdea()
  clearFields()
  disableSaveButton()
})

$('.bottom-container').on('click', '.delete-button', function (){
  $(this).closest('.idea-section').remove();
  var idKey = $(this).closest('.idea-section').attr('id');
  localStorage.removeItem(idKey);
});


$('.bottom-container').on('click', '.up-vote, .down-vote', function() {
  var $getIdea = $(this).closest('.idea-section')
  var id = $getIdea.prop('id')
  var quality = $getIdea.find('.quality').text()
  var upVoteOrDownVote = $(this).prop('class')
  var newQuality = sortButtons(upVoteOrDownVote, quality)
  $getIdea.find('.quality').text(newQuality)
  var storedObj = JSON.parse(localStorage.getItem(id))
  storedObj.quality = newQuality
  storeItem(storedObj);
})


$('.bottom-container').on('blur', '.idea-title, .idea-task', function(){
  var id = $(this).closest('.idea-section').prop('id');
  var idea = JSON.parse(localStorage.getItem(id));
  idea.title = $(this).closest('.idea-section').find('.idea-title').text();
  idea.task = $(this).closest('.idea-section').find('.idea-task').text();
  localStorage.setItem(id, JSON.stringify(idea));
});


$('.search-field').on('keyup', function(){
  var searchTerm = $(this).val().toLowerCase();
  $('.input-text').each(function (index, theObject) {
    var text = $(theObject).text().toLowerCase();
    var match = !!text.match(searchTerm);
    $(this).parent().toggle(match);
  })
});

$('.title-input, .task-input').on('keyup', function() {
  var title = $('.title-input').val()
  var task = $('.task-input').val()
  if(title.length > 0 && task.length > 0) {
    enableSaveButton()
  } else  {
    disableSaveButton()
  }
})

// GLOBAL FUNCTIONS
function Idea (title, task) {
  this.title = title
  this.task = task
  this.id = Date.now()
  this.quality = 'swill'
}

function grabIdea () {
  var title = $('.title-input').val()
  var task = $('.task-input').val()
  var idea = new Idea(title, task)
  storeItem(idea);
  append(idea)
}

function append(idea) {
  $('ul').prepend(
    `<section id=${idea.id} class="idea-section">
      <button class='delete-button buttons'>delete</button>
      <div class="input-text">
      <li class='idea-title' contenteditable>${idea.title}</li>
      <li class='idea-task' contenteditable>${idea.task}</li>
      </div>
      <button class='up-vote buttons'>up</button>
      <button class='down-vote buttons'>down</button>
      <p>quality: <span class="quality">${idea.quality}</span></p>
    </section>`
  )}

function clearFields() {
  $('.title-input').val('')
  $('.task-input').val('')
}

function disableSaveButton() {
  $('.save-button').prop("disabled", true)
}

function enableSaveButton(){
  $('.save-button').prop("disabled", false)
}

function upVote(quality) {
  switch(quality) {
    case 'swill':
      return 'plausible';
    case 'plausible':
      return 'genius';
    default:
      return 'genius';
  };
};

function downVote(quality) {
  switch(quality) {
    case 'genius':
      return 'plausible';
    case 'plausible':
      return 'swill';
    default:
      return 'swill';
  };
};

function sortButtons(upVoteOrDownVote, quality){
  if (upVoteOrDownVote === 'up-vote buttons'){
    return upVote(quality);
  } else {
    return downVote(quality);
  };
};

function storeItem(idea){
  localStorage.setItem(idea.id, JSON.stringify(idea));
}
