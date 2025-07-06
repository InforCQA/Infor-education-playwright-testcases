class workSpacePage{

catalog = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::div//input[contains(@id,'%s')]";
toolbarBtn = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::*[contains(@id,'%s')]";
inputValues = "(//label[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'%s')]/following-sibling::*[contains(@id,'%s')])[1]";
labelField = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/preceding-sibling::input[contains(@id,'%s')]";
workspaceIcons = "//*[local-name()='ids-card'][@data-osp-id='osp-ws-is-icon']";
popupMsg = "//*[@class='toast-message']";
btnClose = "//button[contains(@class,'btn-close')]";
widgetBtn = "//*[local-name()='ids-icon']/following-sibling::*[normalize-space()='%s']";
workspaceBtn = "//h3[normalize-space()='%s']";
textFld = "//input[contains(@id,'%s')]";
addWidget = "(//h3[text()='%s']/parent::div/preceding-sibling::div//button[@icon='add'])[last()]";
toolbarIcons = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::button[@data-osp-id='%s']";
closeBtn=  "//*[text()='%s']/ancestor::*/following-sibling::*/button[@icon='close']";
widgetTitle = "(//div[contains(@class,'widget-title')][normalize-space()='%s'])[1]";
ellipseIcon= "(//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/following-sibling::*//button[@data-osp-id='%s'])[1]";
ellipseOptions="//*[contains(@class,'open')]//*[contains(@data-osp-id,'%s')][normalize-space()='%s']";
lockIcon= "//*[contains(@href,'icon-locked')]";
inputData= "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/following-sibling::input";
inputField="//label[normalize-space()='%s']/following-sibling::*//input";
button= "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";
configBtn= "//div[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'%s')]/following-sibling::*/div/div/following-sibling::div/button[normalize-space()='%s']";
hyperText="//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/following-sibling::*/a[normalize-space()='%s']";
hyperLink="//*[@class='hyperlink'][translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";
}

export default workSpacePage;