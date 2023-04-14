/**
 * POM Abstractions for login Page
 */
const actions = require('../../core/utils/actions');
const conditions = require('../../core/utils/conditions');
const { By } = require('selenium-webdriver');
const configurationManager = require('../../core/utils/configuration_manager');
const logger = require('../../core/utils/logger_manager');

class LoginPodio {
  userEmailInput = By.id('email');
  userPasswordInput = By.id('password');
  signInButton = By.id('loginFormSignInButton');
  homeComponent = By.className('logo');
  users = configurationManager.environment.users;

  /**
   * Login into Podio
   */
  async login(user) {
    logger.debug(`Deleting All Cookies`);
    actions.driver.manage().deleteAllCookies();
    await actions.setText(this.userEmailInput, this.users[user].Email);
    await actions.setText(this.userPasswordInput, this.users[user].Password);
    await actions.clickOn(this.signInButton);
    await conditions.untilUrlLoaded(
      configurationManager.environment.guiUrl + 'home'
    );
  }

  /**
   * verify component on home loaded
   */
  async verifyHome() {
    return (await conditions.untilLocated(this.homeComponent)) !== undefined
      ? true
      : false;
  }
}

const loginPodio = new LoginPodio();
module.exports = loginPodio;
