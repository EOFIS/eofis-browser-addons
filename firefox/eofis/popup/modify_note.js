window.onload = () => {
	browser.runtime.sendMessage({ok: true});
	console.log("SENT OK ACK");
}
browser.runtime.onMessage.addListener((selectionText) => {
	console.log("Recieved selection text: ${selectionText}");
})
