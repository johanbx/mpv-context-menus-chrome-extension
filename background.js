// Might have to change if you changed anything in the python script
var localhost = '127.0.0.1'
var port = '8080'

// Get the video dom as string in next callback
function getDomString (info, tab, callback) {
  chrome.tabs.sendMessage(tab.id, {text: 'report_back', pageUrl: info.pageUrl}, getSrcs)
}

// Automatic find the video tag
function autoPlayFromDom (info, tab) {
  activePageUrl = info.pageUrl
  getDomString(info, tab, getSrcs)
}

// Take url from link directly
function playFromLinkUrl (info, tab) {
  sourceHandler([info.linkUrl], info.pageUrl)
}

// Take url from video src directly
function playFromVideoSrc (info, tab) {
  sourceHandler([info.srcUrl], info.pageUrl)
}

// Take url directly from selection
function playFromSelectedTextUrl (info, tab) {
  sourceHandler([info.selectionText], info.pageUrl)
}

// Function that parse domstring with regex, will return all
// src from all video tags.
function getSrcs (info) {
  var domString = info[0]
  var pageUrl = info[1]
  var reAttrs = /<video(\b[^>]*)>[\s\S]*?<\/video>/gm
  var reSrc = /src=\"([\s\S]*?)\"/gm
  var videoSources = []
  var videoTag, src

  // find the src attribute values in the video tags, also check for "blob"
  while (videoTag = reAttrs.exec(domString)) {
    while (src = reSrc.exec(videoTag[1])) {
      videoSources.push(src[1])
    }
  }

  sourceHandler(videoSources, pageUrl)
}

// simple check for "blob" in string
function haveBlob (src) {
  return /blob/gm.test(src)
}

// Handle the sources
// todo: handle multiple sources
// todo: lookup what blob really means...
function sourceHandler (videoSources, alternativeUrl) {
  if (videoSources.length > 0) {
    // Temporary, only take first source (usually works just fine)
    var firstSource = videoSources[0]

    // If blob, use page url. (etc youtube)
    if (haveBlob(firstSource)) {
      playVideo(alternativeUrl)
    } else {
      playVideo(firstSource)
    }
  }
}

// Give an ajax call to running python webserver to start mpv for given source
// obs, server need to be running on port 8080
function playVideo (src) {
  var xhttp = new XMLHttpRequest()
  // dont change "?a=", it is ugly parsed in python script
  xhttp.open('GET', 'http://' + localhost + ':' + port + '?a=' + src, true)
  xhttp.send()
}

// Add context menu
var mpvPageContext = {'title': 'mpv: auto', 'contexts': ['page'], 'onclick': autoPlayFromDom}
var mpvLinkContext = {'title': 'mpv: link', 'contexts': ['link'], 'onclick': playFromLinkUrl}
var mpvVideoContext = {'title': 'mpv: video', 'contexts': ['video'], 'onclick': playFromVideoSrc}
var mpvSelectionContext = {'title': 'mpv: text', 'contexts': ['selection'], 'onclick': playFromSelectedTextUrl}
chrome.contextMenus.create(mpvPageContext)
chrome.contextMenus.create(mpvLinkContext)
chrome.contextMenus.create(mpvVideoContext)
chrome.contextMenus.create(mpvSelectionContext)
