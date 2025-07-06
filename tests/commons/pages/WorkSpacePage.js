class workSpacePage{

catalog = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::div//input[contains(@id,'%s')]";
toolbarBtn = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::*[contains(@id,'%s')]";
inputValues = "(//label[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'%s')]/following-sibling::*[contains(@id,'%s')])[1]";
labelField = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/preceding-sibling::input[contains(@id,'%s')]";
workspaceIcons = "//*[local-name()='ids-card'][@data-osp-id='osp-ws-is-icon']";
popupMsg = "//*[@class='toast-message']";
btnClose = "//button[contains(@class,'btn-close')]";
widgetBtn = "//span[normalize-space()='%s']/parent::*[contains(@id,'add-banner-widget')]";
workspaceBtn = "//*[@id='%s']";
textFld = "//input[contains(@id,'%s')]";
addWidget = "(//h3[text()='%s']/parent::div/preceding-sibling::div//button[@icon='add'])[last()]";
configBtn = "//div[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'%s')]/following-sibling::*/div/div/following-sibling::div/button[normalize-space()='%s']";
dropdown = "//*[contains(@aria-label,'%s')]";
selectValue = "//*[@role='option'][contains(normalize-space(),'%s')]";
toolbarIcons = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::button[@data-osp-id='%s']";
closeBtn = "//*[text()='%s']/ancestor::*/following-sibling::*/button[@icon='close']";
inputData = "(//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/following-sibling::input)[1]";
ellipsesBtn = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";
lockIcon = "//*[contains(@href,'icon-locked')]";
button = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";
actionMsg = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";
}

export default workSpacePage;