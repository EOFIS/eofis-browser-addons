export const openMainPage = () => {
  console.log(`Opening main page...`);
  chrome.tabs.create({
    "url": "/standalone.html"
  }).then((tab: chrome.tabs.Tab) => {
    chrome.tabs.sendMessage(tab.id!, {message: "MOUNT"});
  });
};