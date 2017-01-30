/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(1);
	__webpack_require__(2);
	var $title = $('.title-input');
	var $task = $('.task-input');
	var $saveButton = $('.save-button');

	var valueArray = ['none', 'low', 'normal', 'high', 'critical'];

	$(document).ready(function () {
	  var completedArray = Object.keys(localStorage).filter(completeFilter).sort();
	  var sortedArray = Object.keys(localStorage).sort().filter(incompleteFilter).slice(-10);

	  sortedArray.concat(completedArray).forEach(function (key) {
	    append(JSON.parse(localStorage[key]));
	  });
	  var completedTask = $('.bottom-container').find('.completed');
	  completedTask.hide();
	});

	// EVENT LISTENERS
	$saveButton.on('click', function (e) {
	  e.preventDefault();
	  grabToDo();
	  clearFields();
	  disableSaveButton();
	});

	$('.bottom-container').on('click', '.up-vote, .down-vote', function (e) {
	  var getToDo = $(e.currentTarget).closest('.todo-section');
	  var id = getToDo.prop('id');
	  var importance = getToDo.find('.importance').text();
	  var upVoteOrDownVote = $(e.currentTarget).prop('class');
	  var newImportance = sortButtons(upVoteOrDownVote, importance);
	  getToDo.find('.importance').text(newImportance);
	  var storedObj = JSON.parse(localStorage.getItem(id));
	  console.log(newImportance);
	  storedObj.importance = newImportance;
	  storeItem(storedObj);
	});

	$('.bottom-container').on('click', '.completed-task', function (e) {
	  $(e.currentTarget).closest('.todo-section').toggleClass('completed');
	  var id = $(e.currentTarget).closest('.todo-section').prop('id');
	  var todo = JSON.parse(localStorage.getItem(id));
	  var currentClass = $(e.currentTarget).closest('.todo-section').prop('class');
	  todo.complete = !todo.complete;
	  storeItem(todo);
	});

	$('.bottom-container').on('blur', '.todo-title, .todo-task', function (e) {
	  var id = $(e.currentTarget).closest('.todo-section').prop('id');
	  var todo = JSON.parse(localStorage.getItem(id));
	  todo.title = $(e.currentTarget).closest('.todo-section').find('.todo-title').text();
	  todo.task = $(e.currentTarget).closest('.todo-section').find('.todo-task').text();
	  storeItem(todo);
	});

	$('.title-input, .task-input').on('keyup', function () {
	  var title = $title.val();
	  var task = $task.val();
	  if (title.length > 0 && task.length > 0) {
	    enableSaveButton();
	  } else {
	    disableSaveButton();
	  }
	});

	$('.task-input').on('input', function (e) {
	  var max = 120;
	  var length = $(e.currentTarget).val().length;
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

	$('.none').on('click', function () {
	  $('.todo-section').find('.importance').each(function (index, quality) {
	    var text = $(quality).text();
	    if (text === 'none') {} else {
	      $(this).closest('.todo-section').toggle();
	      var completedTask = $('.bottom-container').find('.completed');
	      completedTask.hide();
	    }
	  });
	});

	$('.low').on('click', function () {
	  $('.todo-section').find('.importance').each(function (index, quality) {
	    var text = $(quality).text();
	    if (text === 'low') {} else {
	      $(this).closest('.todo-section').toggle();
	      var completedTask = $('.bottom-container').find('.completed');
	      completedTask.hide();
	    }
	  });
	});

	$('.normal').on('click', function () {
	  $('.todo-section').find('.importance').each(function (index, quality) {
	    var text = $(quality).text();
	    if (text === 'normal') {} else {
	      $(this).closest('.todo-section').toggle();
	      var completedTask = $('.bottom-container').find('.completed');
	      completedTask.hide();
	    }
	  });
	});

	$('.high').on('click', function () {
	  $('.todo-section').find('.importance').each(function (index, quality) {
	    var text = $(quality).text();
	    if (text === 'high') {} else {
	      $(this).closest('.todo-section').toggle();
	      var completedTask = $('.bottom-container').find('.completed');
	      completedTask.hide();
	    }
	  });
	});

	$('.critical').on('click', function () {
	  $('.todo-section').find('.importance').each(function (index, quality) {
	    var text = $(quality).text();
	    if (text === 'critical') {} else {
	      $(this).closest('.todo-section').toggle();
	      var completedTask = $('.bottom-container').find('.completed');
	      completedTask.hide();
	    }
	  });
	});

	// GLOBAL FUNCTIONS

	var ToDo = function ToDo(title, task) {
	  _classCallCheck(this, ToDo);

	  this.title = title;
	  this.task = task;
	  this.id = Date.now();
	  this.importance = 'normal';
	  this.complete = false;
	};

	function grabToDo() {
	  var title = $title.val();
	  var task = $task.val();
	  var todo = new ToDo(title, task);
	  storeItem(todo);
	  append(todo);
	}

	function append(todo) {
	  $('.appended-card').prepend('<section id=' + todo.id + ' class="todo-section">\n      <ul class="input-text">\n      <li class=\'todo-title\' contenteditable>' + todo.title + '</li>\n      <li class=\'todo-task\' contenteditable>' + todo.task + '</li>\n      </ul>\n      <button class=\'up-vote buttons\'>up</button>\n      <button class=\'down-vote buttons\'>down</button>\n      <p tabindex="0">importance: <span class="importance">' + todo.importance + '</span></p>\n      <button aria-label="mark as completed task" class=\'completed-task\'>completed task</button>\n      <button class=\'delete-button buttons\'>delete</button>\n    </section>');
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

	function enableSaveButton() {
	  $saveButton.prop("disabled", false);
	};

	function storeItem(todo) {
	  localStorage.setItem(todo.id, JSON.stringify(todo));
	};

	function upVote(importance) {
	  var index = valueArray.indexOf(importance);
	  if (index < valueArray.length - 1) {
	    index++;
	    return valueArray[index];
	  }
	  return valueArray[index];
	};

	function downVote(importance) {
	  var index = valueArray.indexOf(importance);

	  if (index > 0) {
	    index--;
	    return valueArray[index];
	  }
	  return valueArray[index];
	};

	function sortButtons(upVoteOrDownVote, importance) {
	  if (upVoteOrDownVote === 'up-vote buttons') {
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var valueArray = ['none', 'low', 'normal', 'high', 'critical'];

	$('.bottom-container').on('click', '.delete-button', function (e) {
	  $(e.currentTarget).closest('.todo-section').remove();
	  var idKey = $(e.currentTarget).closest('.todo-section').attr('id');
	  localStorage.removeItem(idKey);
	});

	$('.show-complete').on('click', function (e) {
	  e.preventDefault();
	  var completedTask = $('.bottom-container').find('.completed');
	  if ($('.show-complete').text() === 'show completed todos') {
	    completedTask.toggle();
	    $('.show-complete').text('hide completed todos');
	  } else {
	    completedTask.toggle();
	    $('.show-complete').text('show completed todos');
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	$('.search-field').on('keyup', function () {
	  var searchTerm = $(this).val().toLowerCase();
	  $('.input-text').each(function (index, theObject) {
	    var text = $(theObject).text().toLowerCase();
	    var match = !!text.match(searchTerm);
	    $(this).parent().toggle(match);
	  });
	});

/***/ }
/******/ ]);