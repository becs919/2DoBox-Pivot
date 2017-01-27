const assert = require('chai').assert;
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');



describe('testing ideabox', function () {
 let driver;

 test.beforeEach(()=>{
 this.timeout(100000);
 driver = new webdriver.Builder()
                       .forBrowser('chrome')
                       .build();
 driver.get('http://localhost:8080');
});

test.afterEach(()=>{
 driver.quit();
});

test.it('should allow me to add a title and a description', ()=>{

 const title = driver.findElement({className: 'title-input' });
 const task = driver.findElement({className: 'task-input' });

 title.sendKeys('this is a title').then(()=> { return title.getAttribute('value');}).then((value)=>{
   assert.equal(value, 'this is a title');
 });

 task.sendKeys('this is a task').then(()=> { return task.getAttribute('value')}).then((value)=>{
   assert.equal(value, 'this is a task');
 });
});

test.it('should append todo to the dom', ()=>{
  const title = driver.findElement({className: 'title-input' });
  const task = driver.findElement({className: 'task-input' });
  const button = driver.findElement({className: 'save-button'});

title.sendKeys('this is a title');
task.sendKeys('this is a task');
button.click();

const todo = driver.findElement({className: 'input-text'});

todo.getText().then((idea) =>{
  assert.equal(idea,'this is a title\nthis is a task');
});
});

test.it('should append multiple todos and delete one from the dom the dom should know when the todo is deleted', ()=>{
  const title = driver.findElement({className: 'title-input' });
  const task = driver.findElement({className: 'task-input' });
  const button = driver.findElement({className: 'save-button'});

  title.sendKeys('this is a title');
  task.sendKeys('this is a task');
  button.click();

  title.sendKeys('this is a title');
  task.sendKeys('this is a task');
  button.click();

  driver.findElements({className: 'input-text'}).then((li) =>{
    assert.equal(li.length, 2);
  });

  driver.findElement({className: 'delete-button'}).click();

  driver.findElements({className: 'input-text'}).then((li) =>{
    assert.equal(li.length, 1);
  });
});

test.it('importance should increase when up button is clicked', ()=>{
  const title = driver.findElement({className: 'title-input' });
  const task = driver.findElement({className: 'task-input' });
  const button = driver.findElement({className: 'save-button'});

  title.sendKeys('this is a title');
  task.sendKeys('this is a task');
  button.click();

  const importance = driver.findElement({className: 'importance'});


  importance.getText().then((importance) =>{
      assert.equal(importance, 'normal');
  });

  driver.findElement({className: 'up-vote'}).click();

  importance.getText().then((importance) =>{
      assert.equal(importance, 'high');
  });
});

test.it('importance should decrease when down button is clicked', ()=>{
  const title = driver.findElement({className: 'title-input' });
  const task = driver.findElement({className: 'task-input' });
  const button = driver.findElement({className: 'save-button'});

  title.sendKeys('this is a title');
  task.sendKeys('this is a task');
  button.click();

  const importance = driver.findElement({className: 'importance'});


  importance.getText().then((importance) =>{
      assert.equal(importance, 'normal');
  });

  driver.findElement({className: 'down-vote'}).click();

  importance.getText().then((importance) =>{
      assert.equal(importance, 'low');
  });
});


test.it('search field should filter matches and hide non-matches', () =>{
  const title = driver.findElement({className: 'title-input' });
  const task = driver.findElement({className: 'task-input' });
  const button = driver.findElement({className: 'save-button'});

  title.sendKeys('cat');
  task.sendKeys('this is a cat');
  button.click();

  title.sendKeys('cat2');
  task.sendKeys('this is another cat');
  button.click();

  title.sendKeys('dog');
  task.sendKeys('this is a dog');
  button.click();

  driver.findElements({className: 'input-text'}).then((li) =>{
    assert.equal(li.length, 3);
  });

  const search = driver.findElement({className: 'search-field'})

  search.sendKeys('dog');

// NEED TO DO!!!!!!!!!!!

  // driver.findElements({className: 'input-text'}).then((li) =>{
  //   assert.equal(li.length, 1);
  //   // HAVE TO FILTER OUT CSS DISPLAY: NONE!!!!!
  // });
})

});
