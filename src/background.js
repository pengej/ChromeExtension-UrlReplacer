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
, "\\.360\\.com":"[cancel]"
*/
var redirectMap = {
    ".*3.3.1.*bootstrap.min.css":"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.min.css"
  , "bootstrap.min.css":"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.min.css"
  , "jquery-2.1.1.js":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.js"
  , "jquery-2.1.1.min.js":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js"
  , "jquery-2.1.1.min.map":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.map"
  , "googleapis.com":"lug.ustc.edu.cn"
  , "themes.googleusercontent.com":"google-themes.lug.ustc.edu.cn"
  , "fonts.gstatic.com":"fonts-gstatic.lug.ustc.edu.cn"
  
}
/*

1.2.1	jquery-migrate		//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.0.js
		jqyery-migrate min	//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.0.min.js
1.2.0
1.1.1
1.1.0
1.0.0

1.11.2	jquery-ui		//ajax.aspnetcdn.com/ajax/jquery.ui/1.11.2/jquery-ui.js
		jquery-ui min	//ajax.aspnetcdn.com/ajax/jquery.ui/1.11.2/jquery-ui.min.js
1.11.1
1.11.0
1.10.4
1.10.3
1.10.2
1.10.1
1.10.0
1.9.2
1.9.1
1.9.0
1.8.24
1.8.23
1.8.22
1.8.21
1.8.20
1.8.19
1.8.18
1.8.17
1.8.16
1.8.15
1.8.14
1.8.13
1.8.12
1.8.11
1.8.10
1.8.9
1.8.8
1.8.7
1.8.6
1.8.5

1.13.1	jquery.validate	//ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.js
						//ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js
						//ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.js
						//ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.min.js
						//ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/localization/messages_##.js
1.13.0
1.12.0
1.11.1
1.11.0
1.10.0
1.9
1.8.1
1.8
1.7
1.6
1.5.5


########################################################################
#######################   jQuery Mobile   ##############################
########################################################################


						
2.1.1	jquery	//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.js
				//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js
				//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.map
2.1.0
2.0.3
2.0.2
2.0.1
2.0.0
1.11.1
1.11.0
1.10.2
1.10.1
1.9.1
1.9.0
1.8.3
1.8.2
1.8.1
1.8.0
1.7.2
1.7.1
1.7
1.6.4
1.6.3
1.6.2
1.6.1
1.6
1.5.2
1.5.1
1.5
1.4.4
1.4.3
1.4.2
1.4.1
1.4
1.3.2




3.3.1		bootstrap	//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/bootstrap.js
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/bootstrap.min.js
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.css
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.css.map
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.min.css
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap-theme.css
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap-theme.css.map
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap-theme.min.css
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.eot
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.svg
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.ttf
						//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.woff
3.3.0
3.2.0
3.1.1
3.1.0
3.0.3
3.0.2
3.0.1
3.0.0

2.3.2	bootstrap	//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/bootstrap.js
					//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/bootstrap.min.js
					//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/css/bootstrap.css
					//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/css/bootstrap.min.css
					//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/css/bootstrap-responsive.css
					//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/css/bootstrap-responsive.min.css
					//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/img/glyphicons-halflings.png
					//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/img/glyphicons-halflings-white.png
2.3.1



*/
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
      title:"本页有资源地址被替换"+countRedirected+"处，被阻止"+countCanceled+"处"}
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
