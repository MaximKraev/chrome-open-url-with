
function onClick(info, tab) {
	sendMessage(info.linkUrl)
}

function onClickPage(info, tab) {
	sendMessage(info.pageUrl)
}

function onClickIcon(info, tab) {
	sendMessage(info.url)
}

function sendMessage(url) {
	chrome.runtime.sendNativeMessage('info.cbmoto.openurlwith', { srcUrl: url },
		function(response) {
	    if (chrome.runtime.lastError) {
	        console.log("ERROR: " + chrome.runtime.lastError.message);
	    } else {
	        console.log("Mpv player is started with : ", response);
	    }
		}
	);
}

chrome.contextMenus.create({"title": "Open with mpv", "contexts":["link"], "onclick": onClick});
chrome.contextMenus.create({"title": "Open with mpv", "contexts":["page"], "onclick": onClickPage});
chrome.browserAction.onClicked.addListener(onClickIcon);
