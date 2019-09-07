chrome.runtime.onInstalled.addListener(function() {

    chrome.storage.sync.set({ 'scripts': [] });

}); // END chrome.runtime.onInstalled.addListener(function() {
