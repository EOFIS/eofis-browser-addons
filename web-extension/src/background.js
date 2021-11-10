browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(`Hello from the background: ${request}, ${sender}, ${sendResponse}`);

    browser.tabs.executeScript({
        file: "content-script.js",
    });
});

/*
    // Animatable badge for in process?
    // Tick for done and ready
    browser.browserAction.setBadgeText(
        {'text': 'S'}
    );
*/
let EOFISNote = {};
window.EOFISNote = {
    $user: null,
    $curService: null,
    $curURL: null,

    createAutoNote: async function (noteSource) {
        const type = noteSource.type;
        const submittedDate = new Date();
        // TODO: setup settings and defaults
        //const enableAutoTagging = await db.get('enableAutoTagging');
        //let entry;
        //let error = '';
        console.log(`Creating auto note of type '${type}' with date '${submittedDate}'`);
        EOFISNote.$curService = (noteSource || {}).service;
        EOFISNote.$curURL = (noteSource || {}).url;

    },
    contextMenuClick: function (info, tab) {
        if (tab) { alert(JSON.stringify(tab)); }
        EOFISNote.createAutoNote(
            {
                type: 'autoNote',
                service: 'contextMenu',
                url: tab.url,
                tab: tab,
                description: info.selectionText
            }
        );
    },
    toggleContextMenuEnable: function (show) {
        if (!browser.contextMenus) {
            // Mobile browsers unsupported
            return;
        }

        //if (info.menuItemId == "eofis-note") {
        if (show) {
            browser.contextMenus.create({
                id: "eofis-note-page",
                title: 'Note entire page',
                contexts: ['page'],
            });
            browser.contextMenus.create({
                id: "eofis-note-selection",
                title: "Note selection '%s'",
                contexts: ['selection'],
            });
            browser.contextMenus.onClicked.addListener(
                EOFISNote.contextMenuClick
            );
        } else {
            browser.contextMenus.removeAll();
        }
    },
};
/*
db.get('showRightClickButton')
  .then((setting) => {
    TogglButton.toggleRightClickButton(setting);
  });
*/
EOFISNote.toggleContextMenuEnable(true);
