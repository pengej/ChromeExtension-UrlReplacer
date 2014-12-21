/*
下面是白名单，如果url匹配这里列出的匹配项之一，则不执行任何动作，浏览器将继续加载
下列值为正则表达式
*/
var whiteList = [
    "ajax.aspnetcdn.com"
  , "lug.ustc.edu.cn"
  , "getbootstrap.com"
];
/*
下面是要替换的链接列表，key为匹配项，value为替换项
如果value为//开头，则执行完全匹配，否则执行replace
如果value为[cancel]，则被匹配的url将被阻止

key是正则表达式

, "www.google-analytics.com":"[cancel]"
*/
var redirectMap = {
    ".*3.3.1.*bootstrap.min.css":"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.min.css"
  , "bootstrap.min.css":"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.min.css"
  , "googleapis.com":"lug.ustc.edu.cn"
  , "themes.googleusercontent.com":"google-themes.lug.ustc.edu.cn"
  , "fonts.gstatic.com":"fonts-gstatic.lug.ustc.edu.cn"
  
}

var countCanceled = 0;
var countRedirected = 0;

function getRedirectUrl(key, url) {
  var rtn = redirectMap[key];
  if("[cancel]"==rtn) {

  }else if(rtn.substr(0,2)!="//") {
    var reg = new RegExp(key);
    rtn = url.replace(reg, rtn);
  } else {
    rtn = url.substr(0, url.indexOf("//"))+rtn;
  }
  console.log("获取转向地址：" + key + " " + url + " to " + rtn);
  return rtn;
}

function isInWhiteList(url) {
  var rtn = false;
  for(var key in whiteList) {
    var reg = new RegExp(whiteList[key]);
    if(url.match(reg)) {
      rtn = true;
      break;
    }
  }

  return rtn;
}

function showIcon() {
  chrome.tabs.query({'active': true}, function(tabs) {
    chrome.pageAction.show(tabs[0].id);
    chrome.pageAction.setTitle({
      tabId:tabs[0].id,
      title:"本页有资源地址被替换或被阻止"}
    );

  });
}

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if(isInWhiteList(info.url))
      return;
    for(var key in redirectMap) {
      var reg = new RegExp(key);
      if(info.url.match(reg)) {
        var newUrl = getRedirectUrl(key, info.url);
        console.log("重定向 "+info.url+" 到 "+newUrl);
        if("[cancel]"==newUrl) {
          countCanceled++;
          showIcon();
          return {cancel: true};
        } else {
          countRedirected++;
          showIcon();
          return {redirectUrl: newUrl};
        }
      }
    }
  },
  // filters
  {
    urls: [
      "*://*/*"
    ],
    types: ["stylesheet","script"]
  },
  // extraInfoSpec
  ["blocking"]);
