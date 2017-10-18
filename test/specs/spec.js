const assert = require('assert');
const fs = require('fs');

describe('webdriver.io page', () => {
  it('should have the right title - the fancy generator way', () => {
    browser.url('http://webdriver.io');
    const title = browser.getTitle();
    let screenshot = browser.saveScreenshot(); // returns base64 string buffer
    fs.writeFileSync('./myShort.png', screenshot)
    // save screenshot to file and receive as Buffer
    screenshot = browser.saveScreenshot('./snapshot.png');
    // save screenshot to file
    browser.saveScreenshot('./snapshot.png');
    assert.equal(title, 'WebdriverIO - WebDriver bindings for Node.js');
  });
});

describe('DuckDuckGo search', function() {
  it('searches for WebdriverIO', function() {
      browser.url('https://duckduckgo.com/');
      browser.setValue('#search_form_input_homepage', 'WebdriverIO');
      browser.click('#search_button_homepage');
      var title = browser.getTitle();
      console.log('Title is: ' + title);
      // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
  });
});
