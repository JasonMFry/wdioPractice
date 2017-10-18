# Learning WebDriverIO

## [Getting Started](http://webdriver.io/guide/getstarted/install.html)
I'll be walking you through how to get WebdriverIO setup on your system. wdio's walkthrough is fine, but I hope mine will be more clear and concise, but also more opinionated for better or worse.

This walkthrough assumes you have [Node.js](http://nodejs.org/), [NPM](https://www.npmjs.org/), [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html), and [Firefox](https://www.mozilla.org/en-US/firefox/new/) installed on your machine. Once those are installed, install WebdriverIO locally with `npm install webdriverio --save-dev`.

Now we're going to install GeckoDriver and ChromeDriver so we can run tests on Firefox and Chrome. On Mac, install both of these using [homebrew](https://brew.sh/) by typing `brew install geckodriver` and then `brew install chromedriver` into the terminal. Using homebrew instead of other methods primarily skips the step where you have to put both of the drivers into your PATH.

Next you need to setup your config file. You have two options, either the manual way, or using [wdio's walkthrough](http://webdriver.io/guide.html#Let’s-get-serious). We'll start with the walkthrough and then later make some manual changes. To start the walkthrough type `./node_modules/.bin/wdio config` into the terminal. It will ask you several questions. If you're not sure what to answer, just use the answer they suggest from the wdio walkthrough link above. And don't worry, you can change the answers manually later.

Lastly, you'll need to get the [selenium server setup](http://webdriver.io/guide/services/selenium-standalone.html). You can set it up such that you have to manually start the server before you run your tests, or such that it runs automatically when running tests. We're going to do the second way :) Type `npm install wdio-selenium-standalone-service --save-dev` into the terminal. Now go to your wdio.conf.js file and search for the word `services` until you find this line, around line 117, `// services: [],//`. Uncomment it and modify it to look like this, `services: ['selenium-standalone']`.

If the test fails because you don't have Java downloaded, then [go download it](https://www.java.com/en/download/manual.jsp).

## Writing and running tests

### Sample Test
Now that the setup is finished, we can actually write and run a test. Put the following code in `./test/specs/spec.js` (you will have to create those directories and that file first).

```javascript
const assert = require('assert');

describe('webdriver.io page', () => {
  it('should have the right title - the fancy generator way', () => {
    browser.url('http://webdriver.io');
    const title = browser.getTitle();
    assert.equal(title, 'WebdriverIO - WebDriver bindings for Node.js');
  });
});
```

Run your test by typing `./node_modules/.bin/wdio` into the terminal. After several seconds, perhaps as many as 30, you should get this output in the terminal: `1 passing (21.20s)`. In the meantime you probably saw Firefox pop up in your dock, though it's in the background by default.

### Testing GitHub.com


## Further configuration
Go to wdio.conf.js and search for 'capabilities'. Here's where you can change [lots of stuff](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities), including the browser you want to use by adding `browserName: 'chrome',` inside the capabilities object. You can also add chromeOptions like so, 
```javascript
chromeOptions: {
    args: ['--headless', '--disable-gpu', '--window-size=1280,800']
}
```
For a more complete list of chromeOptions, go [here](https://sites.google.com/a/chromium.org/chromedriver/capabilities) and scroll down to `chromeOptions object`. When you're writing and testing your tests, you'll probably want to use `args: ['--start-maximized']`, but when you're just running your tests I suggest using the args listed above. Headless mode means there's no GUI so it will run faster, but if it fails you won't be able to see what's happening. We'll walk through how to take a screenshot on a failure, but I like to also see the entire test when I'm developing.

## Using a testing framework
### Screenshotting errors
When you setup your config file using wdio's walkthrough, it asked you what framework you want to use. I prefer Jasmine so that's what we'll discuss here. If you want Jasmine to take a screenshot when a test fails, go to wdio.conf.js and make sure `jasmineNodeOpts: {}` already exists beneath `reporters: ['dot']`. If it does it should also have `defaultTimeoutInterval: 10000` and `expectationResultHandler: function(passed, assertion) {}`. If not, add them. Now modify expectationResultHandler to look like this,
```javascript
expectationResultHandler: (passed, assertion) => {
    if(passed) return;
    browser.saveScreenshot(`assertionError_${assertion.error.message}.png`);
}
```

## Using WebdriverCSS to make ART easier

search for WebdriverCSS in wdio.conf.js.

## Better reporting with Allure
https://medium.com/@boriscoder/setting-up-selenium-tests-with-webdriver-io-cc7fc3c86629

## Using cloud services
http://webdriver.io/guide/usage/cloudservices.html