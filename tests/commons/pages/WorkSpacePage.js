class workSpacePage{

catalog = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::div//input[contains(@id,'%s')]";
toolbarBtn = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::*[contains(@id,'%s')]";
inputValues = "(//label[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'%s')]/following-sibling::*[contains(@id,'%s')])[1]";
labelField = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/preceding-sibling::input[contains(@id,'%s')]";
workspaceIcons = "//*[local-name()='ids-card'][@data-osp-id='osp-ws-is-icon']";
popupMsg = "//*[@class='toast-message']";
btnClose = "//button[contains(@class,'btn-close')]";
widgetBtn = "//*[local-name()='ids-icon']/following-sibling::*[normalize-space()='%s']";
workspaceBtn = "//*[@id='%s']";
textFld = "//input[contains(@id,'%s')]";
addWidget = "//h3[text()='%s']/parent::div/preceding-sibling::div//button[@icon='add']";
}

export default workSpacePage;