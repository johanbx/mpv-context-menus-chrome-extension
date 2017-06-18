// Might have to change if you changed anything in the python script
var localhost = "127.0.0.1";
var port = "8080";

// Get the video dom as string in next callback
function getDomString(info, tab, callback){
  chrome.tabs.sendMessage(tab.id, {text: 'report_back', pageUrl: info.pageUrl}, getSrcs);
}

// Automatic find the video tag
function autoPlayFromDom(info, tab)
{
  activePageUrl = info.pageUrl;
  getDomString(info, tab, getSrcs);
}

// Take url from link directly
function playFromLinkUrl(info, tab){
  sourceHandler([info.linkUrl], info.pageUrl);
}

// Take url from video src directly
function playFromVideoSrc(info, tab){
  sourceHandler([info.srcUrl], info.pageUrl);
}

// Take url directly from selection
function playFromSelectedTextUrl(info, tab)
{
  sourceHandler([info.selectionText], info.pageUrl);
}

// Function that parse domstring with regex, will return all
// src from all video tags.
function getSrcs(info){
  var domString = info[0];
  var pageUrl = info[1];
  var re_attrs = /<video(\b[^>]*)>[\s\S]*?<\/video>/gm;
  var re_src = /src=\"([\s\S]*?)\"/gm;
  var videosources = [];
  var video_tag, src;

  // find the src attribute values in the video tags, also check for "blob"
  while(video_tag = re_attrs.exec(domString)) {
    while(src = re_src.exec(video_tag[1])){
      videosources.push(src[1]);
    }
  }

  sourceHandler(videosources, pageUrl);
}

// simple check for "blob" in string
function haveBlob(src)
{
  return /blob/gm.test(src);
}

// Handle the sources
// todo: handle multiple sources
// todo: lookup what blob really means...
function sourceHandler(videosources, alternative_url){
  if(videosources.length > 0)
  {
    // Temporary, only take first source (usually works just fine)
    var first_source = videosources[0];

    // If blob, use page url. (etc youtube)
    if(haveBlob(first_source)){
      playVideo(alternative_url);
    }
    else{
      playVideo(first_source);
    }
  }
}

// Give an ajax call to running python webserver to start mpv for given source
// obs, server need to be running on port 8080
function playVideo(src){
  var xhttp = new XMLHttpRequest();
  // dont change "?a=", it is ugly parsed in python script
  xhttp.open("GET", "http://"+localhost+":"+port+"?a="+src, true);
  xhttp.send();
}

// Add context menu
var mpv_page_context = {"title": "mpv: auto", "contexts":["page"], "onclick": autoPlayFromDom}
var mpv_link_context = {"title": "mpv: link", "contexts":["link"], "onclick": playFromLinkUrl}
var mpv_video_context = {"title": "mpv: video", "contexts":["video"], "onclick": playFromVideoSrc}
var mpv_selection_context = {"title": "mpv: text", "contexts":["selection"], "onclick": playFromSelectedTextUrl}
chrome.contextMenus.create(mpv_page_context);
chrome.contextMenus.create(mpv_link_context);
chrome.contextMenus.create(mpv_video_context);
chrome.contextMenus.create(mpv_selection_context);