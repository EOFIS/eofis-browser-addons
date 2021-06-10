document.body.style.border = "5px solid red";

browser.contextMenus.create({
    id: 'eofisNoted',
    title: 'Note: "%s"',
    contexts: ["selection"]
})

var selectionText
browser.contextMenus.onClicked.addListener((info, tab) => {
    selectionText = onClickData.selectionText
    let popup = browser.runtime.getURL('popup/modify_note.html')
    browser.browserAction.setPopup({'popup': popup})
    browser.browserAction.openPopup()
})



browser.runtime.onMessage.addListener(message => {
    if (message.ok) {
        console.log("SENDING TEXT");
        browser.runtime.sendMessage(selectionText);
        selectionText = "";
    } else if (message.ok != null && message.ok === false) {
        console.error("An error occurred while opening the EOFIS Noted popup.");
        browser.runtime.sendMessage("An error occurred. Try again, then please report it.");
    }
})
