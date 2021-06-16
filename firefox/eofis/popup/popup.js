const MSG_TYPE_STATUS = "status";
const MSG_TYPE_SELECTION = "selection";
const MSG_TYPE_RESULT = "result";

const MSG_STATUS_READY = "ready";
const MSG_STATUS_PROCESSING = "processing";
const MSG_STATUS_DONE = "done";
const MSG_STATUS_ERROR = "error";

const result = document.getElementById("result");
const status = document.getElementById("status");
const selection = document.getElementById("selection");

window.onload = () => {
	browser.runtime.sendMessage({type: "status", status: MSG_STATUS_READY});
}
browser.runtime.onMessage.addListener((message) => {
	if (message.type === "status")
	{
		console.log(`RX POPUP STATUS: ${message.content}`);
		status.innerText = message.status;
	}
	else if (message.type === MSG_TYPE_SELECTION)
	{
		console.log(`RX POPUP SELECTION: ${message.content}`);
		selection.innerText = message.content;
	}
	else if (message.type === "result") 
	{
		console.log(`RX POPUP RESULT: ${message.content} ||| ${JSON.stringify(message)}`);
		//result.innerText = message.content;
		const notes = BSON.EJSON.parse(message.content);
		console.log(`BSON DESERIALIZED: ${notes}`);
		for (note of notes) {
			//console.log(`Note: ${note.fields[0]} / ${note.fields[1]} ||| ${JSON.stringify(note)} ||| ${elem}`);
			var noteElem = document.createElement("li");
			// TODO: Do this better
			let elem = `<li class="box column is-one-quarter question"><strong>${note.fields[0]}</strong><hr/><i class="answer">${note.fields[1]}</i></li>`;
			noteElem.innerHTML = elem;
			result.append(noteElem);
		}
	}
	else 
	{
		console.log(`RX POPUP UNKNOWN RESPONSE: ${JSON.stringify(message)}`);
	}
})
