let popup = browser.runtime.getURL('popup/popup.html');
let results_popup = browser.runtime.getURL("popup/results_popup.html");

let _RXPopupMessages = [];
const addMessage = (msg, queue) => queue.push(msg);
const getMessage = (queue)      => queue.shift();

var RXPopupMessages = new Proxy(_RXPopupMessages, {
	set: function (target, key, value) {
		console.log(`${key} <- ${value}`);
		target[key] = value;
		return true;
	},
	get: function (target, key) {
		console.log(`${key} -> ${target[key]}`);
		return target[key];
	},
	push: function (target, value) {
		console.log(`<<${value}`);
		target.push(value);
		return true;
	}
});

browser.contextMenus.create({
	id: 'eofisNoted',
	title: 'Note: "%s"',
	contexts: ["selection"]
});

/* MESSAGING */
/* Connect to eofis desktop app
 * Manifest files needed in specific places for macOS and linux
 * Registry Key needed for Windows pointing to manifest file location
 * */
var eofisNative = browser.runtime.connectNative("eofis");

const MSG_SRC_APP = 0;
const MSG_SRC_POPUP = 1;
const MSG_SRC_CONTEXT_MENU = 2;

const MSG_TYPE_STATUS = "status";
const MSG_TYPE_SELECTION = "selection";
const MSG_TYPE_RESULT = "result";

const MSG_STATUS_READY = "ready";
const MSG_STATUS_PROCESSING = "processing";
const MSG_STATUS_DONE = "done";
const MSG_STATUS_ERROR = "error";

const sendAppMessage =   (type, message) => eofisNative.postMessage({"type": type, "content": message});
const sendPopupMessage = (type, message) => browser.runtime.sendMessage({"type": type, "content": message});

function onMessage(source, message) {
	switch (source)
	{
		case MSG_SRC_APP:
			if (message.type === MSG_TYPE_STATUS)
			{
				console.log(`RX: ${message.content}`);
			}
			else if (message.type === MSG_TYPE_RESULT) 
			{
				console.log(`RX RESULT: ${message.content}`);
			}
			else 
			{
				console.log(`RX UNKNOWN RESPONSE: ${JSON.stringify(message)}`);
			}
			break;
		case MSG_SRC_POPUP:
			if (message.type === MSG_TYPE_STATUS)
			{
				if (message.status === MSG_STATUS_READY) {
					sendPopupMessage(selectionText);
					selectionText = "";
				} 
				else if (message.status != null && message.status === MSG_STATUS_ERROR) {
					console.error("An error occurred while opening the EOFIS Noted popup: "+message.error);
					sendPopupMessage(error, "An error occurred. Try again, then please report it.");
				}
			}
			break;
		case MSG_SRC_CONTEXT_MENU:
			sendAppMessage(message);
			break;
		default:
			console.log(`BACKGROUND.JS received msg from unknown source: ${source} : ${message}`);
	}					
}

/* Listen for messages from the app */
eofisNative.onMessage.addListener((response) => {
	onMessage(MSG_SRC_APP, response);
});

/* Listen for messages from the popup */
browser.runtime.onMessage.addListener(message => {
	onMessage(MSG_SRC_POPUP, message);
});

var selectionText
browser.contextMenus.onClicked.addListener((info, tab) => {
	let message = {"type": MSG_TYPE_SELECTION, "content": info.selectionText};
	onMessage(MSG_SRC_CONTEXT_MENU, message);

	/* Connectionless */
	/*
		var eofisAppX = browser.runtime.sendNativeMessage(
				"eofis",
				message);
		eofisAppX.then((response) => {
			if (response.type === MSG_TYPE_STATUS)
			{
				console.log(`RX: ${response.content}`);
			} else if (response.type === "result") 
			{
				console.log(`RX RESULT: ${response.content}`);
			} else 
			{
				console.log(`RX UNKNOWN RESPONSE: ${JSON.stringify(response)}`);
			}
		}, (error) => {
				console.log(`ERROR: ${error}`);
		});
		*/
	browser.browserAction.setPopup({'popup': popup});
	browser.browserAction.openPopup();
});

