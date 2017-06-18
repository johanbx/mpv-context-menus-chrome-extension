// Listen for messages and return dom in string format for whole active tab
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === 'report_back') {
    sendResponse( [document.all[0].outerHTML, msg.pageUrl] );
  }
});