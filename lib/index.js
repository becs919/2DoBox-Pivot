// var styles = require('./styles');
// var newAlert = require('./alert');
// newAlert();

$(document).ready(function() {
  for(var i = 0; i < localStorage.length; i++){
    append(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
})

$('.save-button').on('click', function() {
  grabIdea()
  clearFields()
  disableSaveButton()
})

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
  localStorage.setItem(idea.id, JSON.stringify(idea))
  append(idea)
  console.log(idea);
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


$('.bottom-container').on('click', '.delete-button', function (){
  $(this).closest('.idea-section').remove();
  var idKey = $(this).closest('.idea-section').attr('id');
  console.log(idKey)
  localStorage.removeItem(idKey);
});

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

$('.bottom-container').on('click', '.up-vote, .down-vote', function() {
  var $getIdea = $(this).closest('.idea-section')
  var id = $getIdea.prop('id')
  var quality = $getIdea.find('.quality').text()
  var upVoteOrDownVote = $(this).prop('class')
  var newQuality = sortButtons(upVoteOrDownVote, quality)
  $getIdea.find('.quality').text(newQuality)
  var storedObj = JSON.parse(localStorage.getItem(id))
  storedObj.quality = newQuality
  localStorage.setItem(id, JSON.stringify(storedObj))
})

// $('.bottom-container').on('click', '.up-vote', function() {
//  var $getUpQuality = $(this).closest('.idea-section').find('.quality')
//  var getUpQualityText = $getUpQuality.text()
//  var newUpQuality = upVote(getUpQualityText)
//  var id = $(this).closest('.idea-section').prop("id");
//  var storedObj = JSON.parse(localStorage.getItem(id));
//  $getUpQuality.text(newUpQuality);
//  storedObj.quality = newUpQuality;
//  localStorage.setItem(id, JSON.stringify(storedObj));
// })
//
// $('.bottom-container').on('click', '.down-vote', function() {
//  var $getDownQuality = $(this).closest('.idea-section').find('.quality')
//  var getDownQualityText = $getDownQuality.text()
//  var newDownQuality = downVote(getDownQualityText)
//  var id = $(this).closest('.idea-section').prop("id");
//  var storedObj = JSON.parse(localStorage.getItem(id));
//  $getDownQuality.text(newDownQuality);
//  storedObj.quality = newDownQuality;
//  localStorage.setItem(id, JSON.stringify(storedObj));
// })

$('.bottom-container').on('blur', '.idea-title, .idea-task', function(){
  var id = $(this).closest('.idea-section').prop('id');
  var idea = JSON.parse(localStorage.getItem(id));
  idea.title = $(this).closest('.idea-section').find('.idea-title').text();
  idea.task = $(this).closest('.idea-section').find('.idea-task').text();
  localStorage.setItem(id, JSON.stringify(idea));
});

// $('.bottom-container').on('blur', '.idea-title', function() {
//   var getIdeaTitle = $(this).closest('.idea-section').find('.idea-title')
//   var getIdeaTitleText = getIdeaTitle.text()
//   var id = $(this).closest('.idea-section').prop('id')
//   var storedObj = JSON.parse(localStorage.getItem(id))
//   storedObj.title = getIdeaTitleText
//   localStorage.setItem(id, JSON.stringify(storedObj))
// })
//
// $('.bottom-container').on('blur', '.idea-task', function() {
//   var getIdeaTask = $(this).closest('.idea-section').find('.idea-task')
//   var getIdeaTaskText = getIdeaTask.text()
//   var id = $(this).closest('.idea-section').prop('id')
//   var storedObj = JSON.parse(localStorage.getItem(id))
//   storedObj.task = getIdeaTaskText
//   localStorage.setItem(id, JSON.stringify(storedObj))
// })

$('.search-field').on('keyup', function(){
  var searchTerm = $(this).val().toLowerCase();
  $('.input-text').each(function (index, theObject) {
    var text = $(theObject).text().toLowerCase();
    console.log(text)
    var match = !!text.match(searchTerm);
    console.log(match)
    $(this).parent().toggle(match);
  })
});

function disableSaveButton() {
  $('.save-button').prop("disabled", true)
}

function enableSaveButton(){
  $('.save-button').prop("disabled", false)
}

$('.title-input, .task-input').on('keyup', function() {
  var title = $('.title-input').val()
  var task = $('.task-input').val()
    if(title.length > 0 && task.length > 0) {
      enableSaveButton()
    } else  {
      disableSaveButton()
    }
})
