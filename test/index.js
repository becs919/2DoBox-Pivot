const assert = require('chai').assert
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');



describe('our test bundle', function () {
  it('should work', function () {
    assert(true)
    })
  })


describe('testing ideabox', function () {
  let driver

  test.beforeEach(()=>{
  this.timeout(100000000)
  driver = new webdriver.Builder()
                        .forBrowser('chrome')
                        .build();
  driver.get('http://localhost:8080');
})

test.afterEach(()=>{
  driver.quit()
});

test.it('should allow me to add a title and a description', ()=>{

  const title       = driver.findElement({ name: 'title-input' });
  // const description = driver.findElement({name: 'task-input' });

  title.sendKeys('this is a title').then(()=> { return title.getAttribute('value')}).then((value)=>{
    assert.equal(value, 'this is a title');
  });


  // description.sendKeys('this is a description').then(()=> { return description.getAttribute('value')}).then((value)=>{
  //   assert.equal(value, 'this is a description');
  //   // driver.quit()
  // });
});
});
