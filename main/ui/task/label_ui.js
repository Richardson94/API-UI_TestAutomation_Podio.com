/**
 * POM Abstractions for Labels Section
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const config = require('../../../core/utils/configuration_manager');
/**
 * Page Model for Labels Section
 */
class LabelInTaskPodio {
  sectionLabels = By.className('side-bar-labels labels');
  plusLabel = By.css('a[class*="new-label"] div[class="img space-right"]');
  newLabel = By.css('a[class*="new-label"] div[class="bd"]');
  addLabelNameInput = By.css(
    'div[style="display: block;"] input[id="task_label_text"]'
  );
  fieldLabelForm = By.css(
    'div[style="display: block;"] form[id="new_task_label"]'
  );
  colorSelect = By.className('color-select');
  colorsDiv = By.css('div[class*="task-label-choose-color-box"]');
  yellowColor = By.css('li[data-color="FFD652"]');
  labelIDCreated = By.css('div[class="side-bar-labels labels"] li');
  labelCreatedLabel = By.css(
    'div[class*="side-bar-labels"] ul div[class="label"]'
  );
  labelValidate = By.css('div[class*="side-bar-labels"] li');
  labelDeleteDiv = By.css('div[class*="side-bar-labels"] ul div[class="bd"]');
  deleteLabelIcon = By.css('span[class*="delete-icon"]');

  /**
   * Create a Label
   * @param name
   */
  async create(name) {
    await conditions.untilVisible(this.sectionLabels);
    if (config.setUp.browser === 'firefox') {
      const displayLabel = await conditions.untilLocated(this.newLabel);
      await actions.hoverMouse(displayLabel);
    } else {
      await actions.clickOn(this.plusLabel);
    }
    await conditions.untilLocated(this.fieldLabelForm);
    await actions.fillFieldPlusEnter(this.addLabelNameInput, name);
  }

  /**
   * Create a Label for E2E
   * @param name
   */
  async createLabel(name) {
    await conditions.untilVisible(this.sectionLabels);
    const nameElement = await actions.getWebElement(this.newLabel);
    await actions.driver.actions().click(nameElement).pause(500).perform();
    await conditions.untilLocated(this.fieldLabelForm);
    await actions.fillFieldPlusEnter(this.addLabelNameInput, name);
  }

  /**
   * Select a color
   */
  async selectColor() {
    await conditions.untilLocated(this.colorsDiv);
    await actions.clickOn(this.colorSelect);
    await actions.clickOn(this.yellowColor);
  }

  /**
   * Get ID of the new Label
   */
  async getIDLabel() {
    let result = await actions.getAttributeValue(
      this.labelIDCreated,
      'data-id'
    );
    result = parseInt(result);
    return result;
  }
}

const labelInTaskPodio = new LabelInTaskPodio();
module.exports = labelInTaskPodio;
