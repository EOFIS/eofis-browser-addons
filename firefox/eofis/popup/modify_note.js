
window.onload = () => {
	browser.runtime.sendMessage({ok: true});
	console.log("SENT OK ACK");
}
browser.runtime.onMessage.addListener((selectionText) => {
	console.log(`POPUP: RX: ${selectionText}`);
	document.getElementById("success-text").innerText = selectionText;
})
