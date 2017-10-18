const assert = require('assert');
const settings = require('../../config.js').module;

xdescribe('webdriver.io page', () => {
  it('should have the right title - the fancy generator way', () => {
    browser.url('http://webdriver.io');
    const title = browser.getTitle();
    // let screenshot = browser.saveScreenshot(); // returns base64 string buffer
    // fs.writeFileSync('./myShort.png', screenshot)
    // // save screenshot to file and receive as Buffer
    // screenshot = browser.saveScreenshot('./snapshot.png');
    // // save screenshot to file
    // browser.saveScreenshot('./snapshot.png');
    assert.equal(title, 'WebdriverIO - WebDriver bindings for Node.js');
  });
});

describe('GitHub', () => {
  it('navigates to GitHub', () => {
    browser.url(settings.url);
    browser.click("a[href='/login']");
    browser.setValue('input#login_field', settings.email);
    browser.setValue('input#password', settings.password);
    browser.click("[value='Sign in'][type='submit']")
    const username = browser.getText('span.js-select-button');
    console.log(`username is ${username}`);
    assert.equal(username, settings.username);
  });

  it('navigates to wdioPractice repo', () => {
    const repoName1 = browser.getText("[href='/JasonMFry/wdioPractice']")
    browser.click("[href='/JasonMFry/wdioPractice']");
    const repoName2 = browser
      .getText("[itemprop='name'] [data-pjax='#js-repo-pjax-container']");
    assert.equal(repoName1, repoName2);
  });

  it('creates a new issue', () => {
    const sampleIssueTitle = 'Test Issue';
    const sampleIssueComment = 'Test Comment';
    browser.click("[href='/JasonMFry/wdioPractice/issues']");
    // browser.waitForVisible(".btn-primary[href='/JasonMFry/wdioPractice/issues/new']", 2000);
    browser.click(".btn-primary[href='/JasonMFry/wdioPractice/issues/new']");
    // browser.waitForVisible("[name='issue[title]']", 2000);
    browser.setValue("[name='issue[title]']", sampleIssueTitle);
    browser.setValue(".js-improved-comment-field", sampleIssueComment);
    browser.click(".btn-primary[data-disable-with='']");
    const issueTitle = browser.getText(".js-issue-title");
    const issueComment = browser.getText(".js-comment-body");
    assert.equal(sampleIssueTitle, issueTitle);
    assert.equal(sampleIssueComment, issueComment);
  });
});
