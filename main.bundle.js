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
/***/ function(module, exports) {

	'use strict';

	var $title = $('.title-input');
	var $task = $('.task-input');
	var $saveButton = $('.save-button');

	$(document).ready(function () {
	  for (var i = 0; i < localStorage.length; i++) {
	    append(JSON.parse(localStorage.getItem(localStorage.key(i))));
	  }
	});
	//for let is low key dangerous. Can cause problems.


	// EVENT LISTENERS
	$saveButton.on('click', function () {
	  grabToDo();
	  clearFields();
	  disableSaveButton();
	});

	$('.bottom-container').on('click', '.delete-button', function () {
	  $(this).closest('.todo-section').remove();
	  var idKey = $(this).closest('.todo-section').attr('id');
	  localStorage.removeItem(idKey);
	});

	$('.bottom-container').on('click', '.up-vote, .down-vote', function () {
	  var getToDo = $(this).closest('.todo-section');
	  var id = getToDo.prop('id');
	  var importance = getToDo.find('.importance').text();
	  var upVoteOrDownVote = $(this).prop('class');
	  var newImportance = sortButtons(upVoteOrDownVote, importance);
	  getToDo.find('.importance').text(newImportance);
	  var storedObj = JSON.parse(localStorage.getItem(id));
	  storedObj.importance = newImportance;
	  storeItem(storedObj);
	});

	$('.bottom-container').on('blur', '.todo-title, .todo-task', function () {
	  var id = $(this).closest('.todo-section').prop('id');
	  var todo = JSON.parse(localStorage.getItem(id));
	  todo.title = $(this).closest('.todo-section').find('.todo-title').text();
	  todo.task = $(this).closest('.todo-section').find('.todo-task').text();
	  localStorage.setItem(id, JSON.stringify(todo));
	});

	$('.search-field').on('keyup', function () {
	  var searchTerm = $(this).val().toLowerCase();
	  $('.input-text').each(function (index, theObject) {
	    var text = $(theObject).text().toLowerCase();
	    var match = !!text.match(searchTerm);
	    $(this).parent().toggle(match);
	  });
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

	// GLOBAL FUNCTIONS
	function ToDo(title, task) {
	  this.title = title;
	  this.task = task;
	  this.id = Date.now();
	  this.importance = 'normal';
	}

	function grabToDo() {
	  var title = $title.val();
	  var task = $task.val();
	  var todo = new ToDo(title, task);
	  storeItem(todo);
	  append(todo);
	}

	function append(todo) {
	  $('ul').prepend('<section id=' + todo.id + ' class="todo-section">\n      <div class="input-text">\n      <li class=\'todo-title\' contenteditable>' + todo.title + '</li>\n      <li class=\'todo-task\' contenteditable>' + todo.task + '</li>\n      </div>\n      <button class=\'up-vote buttons\'>up</button>\n      <button class=\'down-vote buttons\'>down</button>\n      <button class=\'completed-task\'>Completed Task</button>\n      <p>importance: <span class="importance">' + todo.importance + '</span></p>\n      <button class=\'delete-button buttons\'>delete</button>\n      </section>');
	};

	function clearFields() {
	  $title.val('');
	  $task.val('');
	}

	function disableSaveButton() {
	  $saveButton.prop("disabled", true);
	}

	function enableSaveButton() {
	  $saveButton.prop("disabled", false);
	}

	function upVote(importance) {
	  switch (importance) {
	    case 'none':
	      return 'low';
	    case 'low':
	      return 'normal';npm;
	    case 'normal':
	      return 'high';
	    case 'high':
	      return 'critical';
	    default:
	      return 'critical';
	  }
	}

	function downVote(importance) {
	  switch (importance) {
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

	function sortButtons(upVoteOrDownVote, importance) {
	  if (upVoteOrDownVote === 'up-vote buttons') {
	    return upVote(importance);
	  } else {
	    return downVote(importance);
	  }
	}

	function storeItem(todo) {
	  localStorage.setItem(todo.id, JSON.stringify(todo));
	}

	// COMPLETED TASK BUTTON
	$('.bottom-container').on('click', '.completed-task', function () {
	  $(this).closest('.todo-section').find('.input-text').toggleClass('strike-through');
	  console.log('hey');
	});

	// On reloading the page the page the completed TODOs should be exempted from the list.
	// When the user clicks the show completed TODOs The completed TODOs should be loaded back onto the top of the todo list.

/***/ }
/******/ ]);