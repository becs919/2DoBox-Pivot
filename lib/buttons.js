const valueArray = [
  'none',
  'low',
  'normal',
  'high',
  'critical'
]

$('.bottom-container').on('click', '.delete-button', (e) => {
  $(e.currentTarget).closest('.todo-section').remove();
  let idKey = $(e.currentTarget).closest('.todo-section').attr('id');
  localStorage.removeItem(idKey);
});


$('.show-complete').on('click', (e)=> {
  e.preventDefault();
  let completedTask = $('.bottom-container').find('.completed');
  if ($('.show-complete').text() === 'show completed todos') {
    completedTask.toggle();
    $('.show-complete').text('hide completed todos')
  } else {
    completedTask.toggle();
    $('.show-complete').text('show completed todos')
  }

});
