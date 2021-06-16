const MSG_STATUS_READY = 0;

window.onload = () => {
	browser.runtime.sendMessage({type: "status", status: MSG_STATUS_READY});
}
browser.runtime.onMessage.addListener((message) => {
	if (message.type === "status")
	{
		console.log(`RX: ${message.content}`);
	}
	else if (message.type === "result") 
	{
		console.log(`RX RESULT: ${message.content}`);
	}
	else 
	{
		console.log(`RX UNKNOWN RESPONSE: ${JSON.stringify(message)}`);
	}
	console.log(`POPUP: RX: ${message}`);
	document.getElementById("selection-text").innerText = message;
})
