/*
下面是白名单，如果url匹配这里列出的匹配项之一，则不执行任何动作，浏览器将继续加载
下列值为正则表达式
*/
var whiteList = [];
/*
下面是要替换的链接列表，key为匹配项，value为替换项
如果value为//开头，则执行完全匹配，否则执行replace
如果value为[cancel]，则被匹配的url将被阻止

key是正则表达式

, "www.google-analytics.com":"[cancel]"
, "\\.360\\.com":"[cancel]"
*/
var redirectMap = {};
var headersMap = {};
var mapCount = new Map();

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

function showIcon(id, count) {
  if(count!=undefined) {
    str = "本页处理资源地址：\n"+
         " 替换\t\t"+count.redirected+"处\n"+
         " 阻止\t\t"+count.canceled+"处\n"+
         " 修改HTTP头\t"+count.header+"处";
  }else{
    str = "本页有资源地址被替换或被阻止";
  }
  chrome.pageAction.show(id);
  chrome.pageAction.setTitle({
    'tabId':id,
    'title':str}
  );
}


function loadWhiteList(json) {
  whiteList = JSON.parse(json);
}
function loadRedirectMap(json) {
   var temp = JSON.parse(json);
   redirectMap = {};
   headersMap = {};
   for(var key in temp) {
      var c = temp[key];
      if((typeof c=='string')) {
        redirectMap[key] = c;
      } else if((typeof c=='object')) {
        if(c["headers"]!=undefined) {
          headersMap[key] = c["headers"];
        }
      }
   }
}
function loadConfig(config) {
  loadWhiteList(config.whiteList);
  loadRedirectMap(config.redirectMap);
}

chrome.storage.sync.get({
  whiteList: "[]",
  redirectMap: "{"+
     "   \"ajax\\\\.googleapis\\\\.com\":\"ajax.lug.ustc.edu.cn\""+
     " , \"fonts\\\\.googleapis\\\\.com\":\"fonts.lug.ustc.edu.cn\""+
     " , \"themes\\\\.googleusercontent\\\\.com\":\"google-themes.lug.ustc.edu.cn\""+
     " , \"fonts\\\\.gstatic\\\\.com\":\"fonts-gstatic.lug.ustc.edu.cn\""+
    "}"
}, loadConfig);

chrome.storage.onChanged.addListener(function(changes, namespace){
  if(changes.whiteList!=undefined) {
    loadWhiteList(changes.whiteList.newValue);
  }
  if(changes.redirectMap!=undefined) {
    loadRedirectMap(changes.redirectMap.newValue);
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if(isInWhiteList(info.url))
      return;

    var count = mapCount.get("id"+info.tabId);
    if(count==undefined) {
      count = {
        redirected : 0,
        canceled : 0,
        header : 0
      };
      mapCount.set("id"+info.tabId, count);
    }

    for(var key in redirectMap) {
      var reg = new RegExp(key);
      if(info.url.match(reg)) {
        var newUrl = getRedirectUrl(key, info.url);
        
        if("[cancel]"==newUrl) {
          console.log("阻止加载 "+info.url);
          count.canceled++;
          showIcon(info.tabId, count);
          return {cancel: true};
        } else {
          console.log("重定向 "+info.url+" 到 "+newUrl);
          count.redirected++;
          showIcon(info.tabId, count);
          return {redirectUrl: newUrl};
        }
      }
    }
  },
  // filters
  {
    urls: [
      "*://*/*"
    ]
  },
  // extraInfoSpec
  ["blocking"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
function(info) {
  if(isInWhiteList(info.url))
      return;
  var count = mapCount.get("id"+info.tabId);
  if(count==undefined) {
    count = {
      redirected : 0,
      canceled : 0,
      header : 0
    };
    mapCount.set("id"+info.tabId, count);
  }

  for(var key in headersMap) {
    var reg = new RegExp(key);
    if(info.url.match(reg)) {
      headers = headersMap[key];

      for(var x1=0;x1<headers.length;x1++) {
        var headerAdded = false;
        for(var x2=0;x2<info.requestHeaders.length;x2++) {
          if(headers[x1].name==info.requestHeaders[x2].name) {
            info.requestHeaders.splice(x2, 1, headers[x1]);
            headerAdded = true;
          }
        }
        if(!headerAdded) {
          info.requestHeaders.concat(headers[x1]);
        }
      }

      if(headers.length>0) {
        count.header+=headers.length;
        console.log("修改 "+info.url+" HTTP请求头 "+headers.length+" 处");
        showIcon(info.tabId, count);
      }
    }
  }
  return {requestHeaders: info.requestHeaders};
},
{urls: ["<all_urls>"]},
["blocking", "requestHeaders"]);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.status=='loading') {
    var count = mapCount.get("id"+tabId);
    if(count==undefined) {
      count = {
        redirected : 0,
        canceled : 0
      };
      mapCount.set("id"+tabId, count);
    }else{
      count.redirected=0;
      count.canceled=0;
    }

    chrome.pageAction.hide(tabId);
  }  
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  var count = mapCount.get("id"+tabId);
  if(count!=undefined) {
    mapCount.delete("id"+tabId);
  }
});