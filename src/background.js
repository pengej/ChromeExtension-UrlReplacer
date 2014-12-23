/*
下面是白名单，如果url匹配这里列出的匹配项之一，则不执行任何动作，浏览器将继续加载
下列值为正则表达式
*/
var whiteList = [
    "ajax.aspnetcdn.com"
  , "lug.ustc.edu.cn"
  , "getbootstrap.com"
  , "bootcss.com"
  , "bootcdn.cn" /*一个CDN*/
  , "gtimg.cn" /* QZone */
  , "qq.com"
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
  "(((1.2.1)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.2.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.min.js"
  , "(((1.2.0)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.2.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.0.min.js"
  , "(((1.1.1)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.1.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.1.1.min.js"
  , "(((1.1.0)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.1.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.1.0.min.js"
  , "(((1.0.0)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.0.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.0.0.min.js"
  , "(((1.11.2)+.*(jquery-ui)+)|((jquery-ui)+.*(1.11.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.11.2.min.js"
  , "(((1.11.1)+.*(jquery-ui)+)|((jquery-ui)+.*(1.11.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.11.1.min.js"
  , "(((1.11.0)+.*(jquery-ui)+)|((jquery-ui)+.*(1.11.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.11.0.min.js"
  , "(((1.10.4)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.4)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.4.min.js"
  , "(((1.10.3)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.3)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.3.min.js"
  , "(((1.10.2)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.2.min.js"
  , "(((1.10.1)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.1.min.js"
  , "(((1.10.0)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.0.min.js"
  , "(((1.9.2)+.*(jquery-ui)+)|((jquery-ui)+.*(1.9.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.9.2.min.js"
  , "(((1.9.1)+.*(jquery-ui)+)|((jquery-ui)+.*(1.9.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.9.1.min.js"
  , "(((1.9.0)+.*(jquery-ui)+)|((jquery-ui)+.*(1.9.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.9.0.min.js"
  , "(((1.8.24)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.24)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.24.min.js"
  , "(((1.8.23)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.23)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.23.min.js"
  , "(((1.8.22)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.22)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.22.min.js"
  , "(((1.8.21)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.21)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.21.min.js"
  , "(((1.8.20)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.20)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.20.min.js"
  , "(((1.8.19)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.19)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.19.min.js"
  , "(((1.8.18)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.18)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.18.min.js"
  , "(((1.8.17)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.17)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.17.min.js"
  , "(((1.8.16)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.16)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.16.min.js"
  , "(((1.8.15)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.15)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.15.min.js"
  , "(((1.8.14)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.14)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.14.min.js"
  , "(((1.8.13)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.13)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.13.min.js"
  , "(((1.8.12)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.12)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.12.min.js"
  , "(((1.8.11)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.11)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.11.min.js"
  , "(((1.8.10)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.10)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.10.min.js"
  , "(((1.8.9)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.9)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.9.min.js"
  , "(((1.8.8)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.8)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.8.min.js"
  , "(((1.8.7)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.7)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.7.min.js"
  , "(((1.8.6)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.6)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.6.min.js"
  , "(((1.8.5)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.5)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.5.min.js"
  , "(((1.13.1)+.*(jquery.validate)+)|((jquery.validate)+.*(1.13.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.13.1.min.js"
  , "(((1.13.0)+.*(jquery.validate)+)|((jquery.validate)+.*(1.13.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.13.0.min.js"
  , "(((1.12.0)+.*(jquery.validate)+)|((jquery.validate)+.*(1.12.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.12.0.min.js"
  , "(((1.11.1)+.*(jquery.validate)+)|((jquery.validate)+.*(1.11.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.11.1.min.js"
  , "(((1.11.0)+.*(jquery.validate)+)|((jquery.validate)+.*(1.11.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.11.0.min.js"
  , "(((1.10.0)+.*(jquery.validate)+)|((jquery.validate)+.*(1.10.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.10.0.min.js"
  , "(((1.9)+.*(jquery.validate)+)|((jquery.validate)+.*(1.9)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.9.min.js"
  , "(((1.8.1)+.*(jquery.validate)+)|((jquery.validate)+.*(1.8.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.8.1.min.js"
  , "(((1.8)+.*(jquery.validate)+)|((jquery.validate)+.*(1.8)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.8.min.js"
  , "(((1.7)+.*(jquery.validate)+)|((jquery.validate)+.*(1.7)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.7.min.js"
  , "(((1.6)+.*(jquery.validate)+)|((jquery.validate)+.*(1.6)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.6.min.js"
  , "(((1.5.5)+.*(jquery.validate)+)|((jquery.validate)+.*(1.5.5)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.5.5.min.js"
  , "(((2.1.1)+.*(jquery)+)|((jquery)+.*(2.1.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js"
  , "(((2.1.0)+.*(jquery)+)|((jquery)+.*(2.1.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.min.js"
  , "(((2.0.3)+.*(jquery)+)|((jquery)+.*(2.0.3)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.min.js"
  , "(((2.0.2)+.*(jquery)+)|((jquery)+.*(2.0.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.2.min.js"
  , "(((2.0.1)+.*(jquery)+)|((jquery)+.*(2.0.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.1.min.js"
  , "(((2.0.0)+.*(jquery)+)|((jquery)+.*(2.0.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.0.min.js"
  , "(((1.11.1)+.*(jquery)+)|((jquery)+.*(1.11.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js"
  , "(((1.11.0)+.*(jquery)+)|((jquery)+.*(1.11.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.0.min.js"
  , "(((1.10.2)+.*(jquery)+)|((jquery)+.*(1.10.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.2.min.js"
  , "(((1.10.1)+.*(jquery)+)|((jquery)+.*(1.10.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.1.min.js"
  , "(((1.9.1)+.*(jquery)+)|((jquery)+.*(1.9.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js"
  , "(((1.9.0)+.*(jquery)+)|((jquery)+.*(1.9.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.0.min.js"
  , "(((1.8.3)+.*(jquery)+)|((jquery)+.*(1.8.3)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.3.min.js"
  , "(((1.8.2)+.*(jquery)+)|((jquery)+.*(1.8.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js"
  , "(((1.8.1)+.*(jquery)+)|((jquery)+.*(1.8.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.1.min.js"
  , "(((1.8.0)+.*(jquery)+)|((jquery)+.*(1.8.0)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.min.js"
  , "(((1.7.2)+.*(jquery)+)|((jquery)+.*(1.7.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js"
  , "(((1.7.1)+.*(jquery)+)|((jquery)+.*(1.7.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js"
  , "(((1.7)+.*(jquery)+)|((jquery)+.*(1.7)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.min.js"
  , "(((1.6.4)+.*(jquery)+)|((jquery)+.*(1.6.4)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.4.min.js"
  , "(((1.6.3)+.*(jquery)+)|((jquery)+.*(1.6.3)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.3.min.js"
  , "(((1.6.2)+.*(jquery)+)|((jquery)+.*(1.6.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.2.min.js"
  , "(((1.6.1)+.*(jquery)+)|((jquery)+.*(1.6.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.1.min.js"
  , "(((1.6)+.*(jquery)+)|((jquery)+.*(1.6)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.min.js"
  , "(((1.5.2)+.*(jquery)+)|((jquery)+.*(1.5.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.2.min.js"
  , "(((1.5.1)+.*(jquery)+)|((jquery)+.*(1.5.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.1.min.js"
  , "(((1.5)+.*(jquery)+)|((jquery)+.*(1.5)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.min.js"
  , "(((1.4.4)+.*(jquery)+)|((jquery)+.*(1.4.4)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.4.min.js"
  , "(((1.4.3)+.*(jquery)+)|((jquery)+.*(1.4.3)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.3.min.js"
  , "(((1.4.2)+.*(jquery)+)|((jquery)+.*(1.4.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.2.min.js"
  , "(((1.4.1)+.*(jquery)+)|((jquery)+.*(1.4.1)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.1.min.js"
  , "(((1.4)+.*(jquery)+)|((jquery)+.*(1.4)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.min.js"
  , "(((1.3.2)+.*(jquery)+)|((jquery)+.*(1.3.2)+)).*(min)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.3.2.min.js"
  , "(((2.1.1)+.*(jquery)+)|((jquery)+.*(2.1.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js"
  , "(((2.1.0)+.*(jquery)+)|((jquery)+.*(2.1.0)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.min.js"
  , "(((2.0.3)+.*(jquery)+)|((jquery)+.*(2.0.3)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.min.js"
  , "(((2.0.2)+.*(jquery)+)|((jquery)+.*(2.0.2)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.2.min.js"
  , "(((2.0.1)+.*(jquery)+)|((jquery)+.*(2.0.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.1.min.js"
  , "(((2.0.0)+.*(jquery)+)|((jquery)+.*(2.0.0)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.0.min.js"
  , "(((1.11.1)+.*(jquery)+)|((jquery)+.*(1.11.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js"
  , "(((1.11.0)+.*(jquery)+)|((jquery)+.*(1.11.0)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.0.min.js"
  , "(((1.10.2)+.*(jquery)+)|((jquery)+.*(1.10.2)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.2.min.js"
  , "(((1.10.1)+.*(jquery)+)|((jquery)+.*(1.10.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.1.min.js"
  , "(((1.9.1)+.*(jquery)+)|((jquery)+.*(1.9.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js"
  , "(((1.9.0)+.*(jquery)+)|((jquery)+.*(1.9.0)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.0.min.js"
  , "(((1.8.3)+.*(jquery)+)|((jquery)+.*(1.8.3)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.3.min.js"
  , "(((1.8.2)+.*(jquery)+)|((jquery)+.*(1.8.2)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js"
  , "(((1.8.1)+.*(jquery)+)|((jquery)+.*(1.8.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.1.min.js"
  , "(((1.8.0)+.*(jquery)+)|((jquery)+.*(1.8.0)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.min.js"
  , "(((1.7.2)+.*(jquery)+)|((jquery)+.*(1.7.2)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js"
  , "(((1.7.1)+.*(jquery)+)|((jquery)+.*(1.7.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js"
  , "(((1.7)+.*(jquery)+)|((jquery)+.*(1.7)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.min.js"
  , "(((1.6.4)+.*(jquery)+)|((jquery)+.*(1.6.4)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.4.min.js"
  , "(((1.6.3)+.*(jquery)+)|((jquery)+.*(1.6.3)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.3.min.js"
  , "(((1.6.2)+.*(jquery)+)|((jquery)+.*(1.6.2)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.2.min.js"
  , "(((1.6.1)+.*(jquery)+)|((jquery)+.*(1.6.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.1.min.js"
  , "(((1.6)+.*(jquery)+)|((jquery)+.*(1.6)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.min.js"
  , "(((1.5.2)+.*(jquery)+)|((jquery)+.*(1.5.2)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.2.min.js"
  , "(((1.5.1)+.*(jquery)+)|((jquery)+.*(1.5.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.1.min.js"
  , "(((1.5)+.*(jquery)+)|((jquery)+.*(1.5)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.min.js"
  , "(((1.4.4)+.*(jquery)+)|((jquery)+.*(1.4.4)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.4.min.js"
  , "(((1.4.3)+.*(jquery)+)|((jquery)+.*(1.4.3)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.3.min.js"
  , "(((1.4.2)+.*(jquery)+)|((jquery)+.*(1.4.2)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.2.min.js"
  , "(((1.4.1)+.*(jquery)+)|((jquery)+.*(1.4.1)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.1.min.js"
  , "(((1.4)+.*(jquery)+)|((jquery)+.*(1.4)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.min.js"
  , "(((1.3.2)+.*(jquery)+)|((jquery)+.*(1.3.2)+)).*(min)+.*.(map)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.3.2.min.js"


  , "(((1.2.1)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.2.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.js"
  , "(((1.2.0)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.2.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.0.js"
  , "(((1.1.1)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.1.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.1.1.js"
  , "(((1.1.0)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.1.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.1.0.js"
  , "(((1.0.0)+.*(jquery-migrate)+)|((jquery-migrate)+.*(1.0.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.0.0.js"
  , "(((1.11.2)+.*(jquery-ui)+)|((jquery-ui)+.*(1.11.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.11.2.js"
  , "(((1.11.1)+.*(jquery-ui)+)|((jquery-ui)+.*(1.11.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.11.1.js"
  , "(((1.11.0)+.*(jquery-ui)+)|((jquery-ui)+.*(1.11.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.11.0.js"
  , "(((1.10.4)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.4)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.4.js"
  , "(((1.10.3)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.3)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.3.js"
  , "(((1.10.2)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.2.js"
  , "(((1.10.1)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.1.js"
  , "(((1.10.0)+.*(jquery-ui)+)|((jquery-ui)+.*(1.10.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.10.0.js"
  , "(((1.9.2)+.*(jquery-ui)+)|((jquery-ui)+.*(1.9.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.9.2.js"
  , "(((1.9.1)+.*(jquery-ui)+)|((jquery-ui)+.*(1.9.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.9.1.js"
  , "(((1.9.0)+.*(jquery-ui)+)|((jquery-ui)+.*(1.9.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.9.0.js"
  , "(((1.8.24)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.24)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.24.js"
  , "(((1.8.23)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.23)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.23.js"
  , "(((1.8.22)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.22)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.22.js"
  , "(((1.8.21)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.21)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.21.js"
  , "(((1.8.20)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.20)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.20.js"
  , "(((1.8.19)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.19)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.19.js"
  , "(((1.8.18)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.18)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.18.js"
  , "(((1.8.17)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.17)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.17.js"
  , "(((1.8.16)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.16)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.16.js"
  , "(((1.8.15)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.15)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.15.js"
  , "(((1.8.14)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.14)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.14.js"
  , "(((1.8.13)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.13)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.13.js"
  , "(((1.8.12)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.12)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.12.js"
  , "(((1.8.11)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.11)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.11.js"
  , "(((1.8.10)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.10)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.10.js"
  , "(((1.8.9)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.9)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.9.js"
  , "(((1.8.8)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.8)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.8.js"
  , "(((1.8.7)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.7)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.7.js"
  , "(((1.8.6)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.6)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.6.js"
  , "(((1.8.5)+.*(jquery-ui)+)|((jquery-ui)+.*(1.8.5)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.ui/jquery-ui-1.8.5.js"
  , "(((1.13.1)+.*(jquery.validate)+)|((jquery.validate)+.*(1.13.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.13.1.js"
  , "(((1.13.0)+.*(jquery.validate)+)|((jquery.validate)+.*(1.13.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.13.0.js"
  , "(((1.12.0)+.*(jquery.validate)+)|((jquery.validate)+.*(1.12.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.12.0.js"
  , "(((1.11.1)+.*(jquery.validate)+)|((jquery.validate)+.*(1.11.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.11.1.js"
  , "(((1.11.0)+.*(jquery.validate)+)|((jquery.validate)+.*(1.11.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.11.0.js"
  , "(((1.10.0)+.*(jquery.validate)+)|((jquery.validate)+.*(1.10.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.10.0.js"
  , "(((1.9)+.*(jquery.validate)+)|((jquery.validate)+.*(1.9)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.9.js"
  , "(((1.8.1)+.*(jquery.validate)+)|((jquery.validate)+.*(1.8.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.8.1.js"
  , "(((1.8)+.*(jquery.validate)+)|((jquery.validate)+.*(1.8)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.8.js"
  , "(((1.7)+.*(jquery.validate)+)|((jquery.validate)+.*(1.7)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.7.js"
  , "(((1.6)+.*(jquery.validate)+)|((jquery.validate)+.*(1.6)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.6.js"
  , "(((1.5.5)+.*(jquery.validate)+)|((jquery.validate)+.*(1.5.5)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jquery.validate/jquery.validate-1.5.5.js"
  , "(((2.1.1)+.*(jquery)+)|((jquery)+.*(2.1.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.js"
  , "(((2.1.0)+.*(jquery)+)|((jquery)+.*(2.1.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.js"
  , "(((2.0.3)+.*(jquery)+)|((jquery)+.*(2.0.3)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.js"
  , "(((2.0.2)+.*(jquery)+)|((jquery)+.*(2.0.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.2.js"
  , "(((2.0.1)+.*(jquery)+)|((jquery)+.*(2.0.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.1.js"
  , "(((2.0.0)+.*(jquery)+)|((jquery)+.*(2.0.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.0.js"
  , "(((1.11.1)+.*(jquery)+)|((jquery)+.*(1.11.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.js"
  , "(((1.11.0)+.*(jquery)+)|((jquery)+.*(1.11.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.0.js"
  , "(((1.10.2)+.*(jquery)+)|((jquery)+.*(1.10.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.2.js"
  , "(((1.10.1)+.*(jquery)+)|((jquery)+.*(1.10.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.1.js"
  , "(((1.9.1)+.*(jquery)+)|((jquery)+.*(1.9.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js"
  , "(((1.9.0)+.*(jquery)+)|((jquery)+.*(1.9.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.0.js"
  , "(((1.8.3)+.*(jquery)+)|((jquery)+.*(1.8.3)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.3.js"
  , "(((1.8.2)+.*(jquery)+)|((jquery)+.*(1.8.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.js"
  , "(((1.8.1)+.*(jquery)+)|((jquery)+.*(1.8.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.1.js"
  , "(((1.8.0)+.*(jquery)+)|((jquery)+.*(1.8.0)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"
  , "(((1.7.2)+.*(jquery)+)|((jquery)+.*(1.7.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.js"
  , "(((1.7.1)+.*(jquery)+)|((jquery)+.*(1.7.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.js"
  , "(((1.7)+.*(jquery)+)|((jquery)+.*(1.7)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.js"
  , "(((1.6.4)+.*(jquery)+)|((jquery)+.*(1.6.4)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.4.js"
  , "(((1.6.3)+.*(jquery)+)|((jquery)+.*(1.6.3)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.3.js"
  , "(((1.6.2)+.*(jquery)+)|((jquery)+.*(1.6.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.2.js"
  , "(((1.6.1)+.*(jquery)+)|((jquery)+.*(1.6.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.1.js"
  , "(((1.6)+.*(jquery)+)|((jquery)+.*(1.6)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.js"
  , "(((1.5.2)+.*(jquery)+)|((jquery)+.*(1.5.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.2.js"
  , "(((1.5.1)+.*(jquery)+)|((jquery)+.*(1.5.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.1.js"
  , "(((1.5)+.*(jquery)+)|((jquery)+.*(1.5)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.js"
  , "(((1.4.4)+.*(jquery)+)|((jquery)+.*(1.4.4)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.4.js"
  , "(((1.4.3)+.*(jquery)+)|((jquery)+.*(1.4.3)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.3.js"
  , "(((1.4.2)+.*(jquery)+)|((jquery)+.*(1.4.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.2.js"
  , "(((1.4.1)+.*(jquery)+)|((jquery)+.*(1.4.1)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.1.js"
  , "(((1.4)+.*(jquery)+)|((jquery)+.*(1.4)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.4.js"
  , "(((1.3.2)+.*(jquery)+)|((jquery)+.*(1.3.2)+)).*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.3.2.js"
  /*, ".*(jquery)+.*.(js)+":"//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js"*/

  , "((3.3.1)+.*(bootstrap.js)+)"                     :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/bootstrap.js"
  , "((3.3.1)+.*(bootstrap.min.js)+)"                 :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/bootstrap.min.js"
  , "((3.3.1)+.*(bootstrap.css)+)"                    :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.css"
  , "((3.3.1)+.*(bootstrap.css.map)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.css.map"
  , "((3.3.1)+.*(bootstrap.min.css)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap.min.css"
  , "((3.3.1)+.*(bootstrap-theme.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap-theme.css"
  , "((3.3.1)+.*(bootstrap-theme.css.map)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap-theme.css.map"
  , "((3.3.1)+.*(bootstrap-theme.min.css)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/css/bootstrap-theme.min.css"
 /* , "((3.3.1)+.*(glyphicons-halflings-regular.eot)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.eot"
  , "((3.3.1)+.*(glyphicons-halflings-regular.svg)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.svg"
  , "((3.3.1)+.*(glyphicons-halflings-regular.ttf)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.ttf"
  , "((3.3.1)+.*(glyphicons-halflings-regular.woff)+)":"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.woff"*/
  , "((3.3.0)+.*(bootstrap.js)+)"                     :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/bootstrap.js"
  , "((3.3.0)+.*(bootstrap.min.js)+)"                 :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/bootstrap.min.js"
  , "((3.3.0)+.*(bootstrap.css)+)"                    :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/css/bootstrap.css"
  , "((3.3.0)+.*(bootstrap.css.map)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/css/bootstrap.css.map"
  , "((3.3.0)+.*(bootstrap.min.css)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/css/bootstrap.min.css"
  , "((3.3.0)+.*(bootstrap-theme.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/css/bootstrap-theme.css"
  , "((3.3.0)+.*(bootstrap-theme.css.map)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/css/bootstrap-theme.css.map"
  , "((3.3.0)+.*(bootstrap-theme.min.css)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/css/bootstrap-theme.min.css"
  /*, "((3.3.0)+.*(glyphicons-halflings-regular.eot)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/fonts/glyphicons-halflings-regular.eot"
  , "((3.3.0)+.*(glyphicons-halflings-regular.svg)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/fonts/glyphicons-halflings-regular.svg"
  , "((3.3.0)+.*(glyphicons-halflings-regular.ttf)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.ttf"
  , "((3.3.0)+.*(glyphicons-halflings-regular.woff)+)":"//ajax.aspnetcdn.com/ajax/bootstrap/3.3.0/fonts/glyphicons-halflings-regular.woff"*/
  , "((3.2.0)+.*(bootstrap.js)+)"                     :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/bootstrap.js"
  , "((3.2.0)+.*(bootstrap.min.js)+)"                 :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/bootstrap.min.js"
  , "((3.2.0)+.*(bootstrap.css)+)"                    :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/css/bootstrap.css"
  , "((3.2.0)+.*(bootstrap.css.map)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/css/bootstrap.css.map"
  , "((3.2.0)+.*(bootstrap.min.css)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/css/bootstrap.min.css"
  , "((3.2.0)+.*(bootstrap-theme.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/css/bootstrap-theme.css"
  , "((3.2.0)+.*(bootstrap-theme.css.map)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/css/bootstrap-theme.css.map"
  , "((3.2.0)+.*(bootstrap-theme.min.css)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/css/bootstrap-theme.min.css"
 /* , "((3.2.0)+.*(glyphicons-halflings-regular.eot)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/fonts/glyphicons-halflings-regular.eot"
  , "((3.2.0)+.*(glyphicons-halflings-regular.svg)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/fonts/glyphicons-halflings-regular.svg"
  , "((3.2.0)+.*(glyphicons-halflings-regular.ttf)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/fonts/glyphicons-halflings-regular.ttf"
  , "((3.2.0)+.*(glyphicons-halflings-regular.woff)+)":"//ajax.aspnetcdn.com/ajax/bootstrap/3.2.0/fonts/glyphicons-halflings-regular.woff"*/
  , "((3.1.1)+.*(bootstrap.js)+)"                     :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/bootstrap.js"
  , "((3.1.1)+.*(bootstrap.min.js)+)"                 :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/bootstrap.min.js"
  , "((3.1.1)+.*(bootstrap.css)+)"                    :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/css/bootstrap.css"
  , "((3.1.1)+.*(bootstrap.css.map)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/css/bootstrap.css.map"
  , "((3.1.1)+.*(bootstrap.min.css)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/css/bootstrap.min.css"
  , "((3.1.1)+.*(bootstrap-theme.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/css/bootstrap-theme.css"
  , "((3.1.1)+.*(bootstrap-theme.css.map)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/css/bootstrap-theme.css.map"
  , "((3.1.1)+.*(bootstrap-theme.min.css)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/css/bootstrap-theme.min.css"
 /* , "((3.1.1)+.*(glyphicons-halflings-regular.eot)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/fonts/glyphicons-halflings-regular.eot"
  , "((3.1.1)+.*(glyphicons-halflings-regular.svg)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/fonts/glyphicons-halflings-regular.svg"
  , "((3.1.1)+.*(glyphicons-halflings-regular.ttf)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/fonts/glyphicons-halflings-regular.ttf"
  , "((3.1.1)+.*(glyphicons-halflings-regular.woff)+)":"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.1/fonts/glyphicons-halflings-regular.woff"*/
  , "((3.1.0)+.*(bootstrap.js)+)"                     :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/bootstrap.js"
  , "((3.1.0)+.*(bootstrap.min.js)+)"                 :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/bootstrap.min.js"
  , "((3.1.0)+.*(bootstrap.css)+)"                    :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/css/bootstrap.css"
  , "((3.1.0)+.*(bootstrap.css.map)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/css/bootstrap.css.map"
  , "((3.1.0)+.*(bootstrap.min.css)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/css/bootstrap.min.css"
  , "((3.1.0)+.*(bootstrap-theme.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/css/bootstrap-theme.css"
  , "((3.1.0)+.*(bootstrap-theme.css.map)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/css/bootstrap-theme.css.map"
  , "((3.1.0)+.*(bootstrap-theme.min.css)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/css/bootstrap-theme.min.css"
 /* , "((3.1.0)+.*(glyphicons-halflings-regular.eot)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/fonts/glyphicons-halflings-regular.eot"
  , "((3.1.0)+.*(glyphicons-halflings-regular.svg)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/fonts/glyphicons-halflings-regular.svg"
  , "((3.1.0)+.*(glyphicons-halflings-regular.ttf)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/fonts/glyphicons-halflings-regular.ttf"
  , "((3.1.0)+.*(glyphicons-halflings-regular.woff)+)":"//ajax.aspnetcdn.com/ajax/bootstrap/3.1.0/fonts/glyphicons-halflings-regular.woff"*/
  , "((3.0.3)+.*(bootstrap.js)+)"                     :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/bootstrap.js"
  , "((3.0.3)+.*(bootstrap.min.js)+)"                 :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/bootstrap.min.js"
  , "((3.0.3)+.*(bootstrap.css)+)"                    :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/css/bootstrap.css"
  , "((3.0.3)+.*(bootstrap.css.map)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/css/bootstrap.css.map"
  , "((3.0.3)+.*(bootstrap.min.css)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/css/bootstrap.min.css"
  , "((3.0.3)+.*(bootstrap-theme.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/css/bootstrap-theme.css"
  , "((3.0.3)+.*(bootstrap-theme.css.map)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/css/bootstrap-theme.css.map"
  , "((3.0.3)+.*(bootstrap-theme.min.css)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/css/bootstrap-theme.min.css"
 /* , "((3.0.3)+.*(glyphicons-halflings-regular.eot)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/fonts/glyphicons-halflings-regular.eot"
  , "((3.0.3)+.*(glyphicons-halflings-regular.svg)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/fonts/glyphicons-halflings-regular.svg"
  , "((3.0.3)+.*(glyphicons-halflings-regular.ttf)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/fonts/glyphicons-halflings-regular.ttf"
  , "((3.0.3)+.*(glyphicons-halflings-regular.woff)+)":"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.3/fonts/glyphicons-halflings-regular.woff"*/
  , "((3.0.2)+.*(bootstrap.js)+)"                     :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/bootstrap.js"
  , "((3.0.2)+.*(bootstrap.min.js)+)"                 :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/bootstrap.min.js"
  , "((3.0.2)+.*(bootstrap.css)+)"                    :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/css/bootstrap.css"
  , "((3.0.2)+.*(bootstrap.css.map)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/css/bootstrap.css.map"
  , "((3.0.2)+.*(bootstrap.min.css)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/css/bootstrap.min.css"
  , "((3.0.2)+.*(bootstrap-theme.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/css/bootstrap-theme.css"
  , "((3.0.2)+.*(bootstrap-theme.css.map)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/css/bootstrap-theme.css.map"
  , "((3.0.2)+.*(bootstrap-theme.min.css)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/css/bootstrap-theme.min.css"
  /*, "((3.0.2)+.*(glyphicons-halflings-regular.eot)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/fonts/glyphicons-halflings-regular.eot"
  , "((3.0.2)+.*(glyphicons-halflings-regular.svg)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/fonts/glyphicons-halflings-regular.svg"
  , "((3.0.2)+.*(glyphicons-halflings-regular.ttf)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/fonts/glyphicons-halflings-regular.ttf"
  , "((3.0.2)+.*(glyphicons-halflings-regular.woff)+)":"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.2/fonts/glyphicons-halflings-regular.woff"*/
  , "((3.0.1)+.*(bootstrap.js)+)"                     :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/bootstrap.js"
  , "((3.0.1)+.*(bootstrap.min.js)+)"                 :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/bootstrap.min.js"
  , "((3.0.1)+.*(bootstrap.css)+)"                    :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/css/bootstrap.css"
  , "((3.0.1)+.*(bootstrap.css.map)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/css/bootstrap.css.map"
  , "((3.0.1)+.*(bootstrap.min.css)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/css/bootstrap.min.css"
  , "((3.0.1)+.*(bootstrap-theme.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/css/bootstrap-theme.css"
  , "((3.0.1)+.*(bootstrap-theme.css.map)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/css/bootstrap-theme.css.map"
  , "((3.0.1)+.*(bootstrap-theme.min.css)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/css/bootstrap-theme.min.css"
  /*, "((3.0.1)+.*(glyphicons-halflings-regular.eot)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/fonts/glyphicons-halflings-regular.eot"
  , "((3.0.1)+.*(glyphicons-halflings-regular.svg)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/fonts/glyphicons-halflings-regular.svg"
  , "((3.0.1)+.*(glyphicons-halflings-regular.ttf)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/fonts/glyphicons-halflings-regular.ttf"
  , "((3.0.1)+.*(glyphicons-halflings-regular.woff)+)":"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.1/fonts/glyphicons-halflings-regular.woff"*/
  , "((3.0.0)+.*(bootstrap.js)+)"                     :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/bootstrap.js"
  , "((3.0.0)+.*(bootstrap.min.js)+)"                 :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/bootstrap.min.js"
  , "((3.0.0)+.*(bootstrap.css)+)"                    :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/css/bootstrap.css"
  , "((3.0.0)+.*(bootstrap.css.map)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/css/bootstrap.css.map"
  , "((3.0.0)+.*(bootstrap.min.css)+)"                :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/css/bootstrap.min.css"
  , "((3.0.0)+.*(bootstrap-theme.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/css/bootstrap-theme.css"
  , "((3.0.0)+.*(bootstrap-theme.css.map)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/css/bootstrap-theme.css.map"
  , "((3.0.0)+.*(bootstrap-theme.min.css)+)"          :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/css/bootstrap-theme.min.css"
  /*, "((3.0.0)+.*(glyphicons-halflings-regular.eot)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.eot"
  , "((3.0.0)+.*(glyphicons-halflings-regular.svg)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.svg"
  , "((3.0.0)+.*(glyphicons-halflings-regular.ttf)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.ttf"
  , "((3.0.0)+.*(glyphicons-halflings-regular.woff)+)":"//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.woff"*/

  , "((2.3.2)+.*(bootstrap.js)+)"                   :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/bootstrap.js"
  , "((2.3.2)+.*(bootstrap.min.js)+)"               :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/bootstrap.min.js"
  , "((2.3.2)+.*(bootstrap.css)+)"                  :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/css/bootstrap.css"
  , "((2.3.2)+.*(bootstrap.min.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/css/bootstrap.min.css"
  , "((2.3.2)+.*(bootstrap-responsive.css)+)"       :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/css/bootstrap-theme.css"
  , "((2.3.2)+.*(bootstrap-responsive.min.css)+)"   :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/css/bootstrap-theme.min.css"
  , "((2.3.2)+.*(glyphicons-halflings.png)+)"       :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/img/glyphicons-halflings.png"
  , "((2.3.2)+.*(glyphicons-halflings-white.png)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.2/img/glyphicons-halflings-white.png"
  , "((2.3.1)+.*(bootstrap.js)+)"                   :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.1/bootstrap.js"
  , "((2.3.1)+.*(bootstrap.min.js)+)"               :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.1/bootstrap.min.js"
  , "((2.3.1)+.*(bootstrap.css)+)"                  :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.1/css/bootstrap.css"
  , "((2.3.1)+.*(bootstrap.min.css)+)"              :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.1/css/bootstrap.min.css"
  , "((2.3.1)+.*(bootstrap-responsive.css)+)"       :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.1/css/bootstrap-theme.css"
  , "((2.3.1)+.*(bootstrap-responsive.min.css)+)"   :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.1/css/bootstrap-theme.min.css"
  , "((2.3.1)+.*(glyphicons-halflings.png)+)"       :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.1/img/glyphicons-halflings.png"
  , "((2.3.1)+.*(glyphicons-halflings-white.png)+)" :"//ajax.aspnetcdn.com/ajax/bootstrap/2.3.1/img/glyphicons-halflings-white.png"

  /*google api和字体本地镜像*/
  , "ajax\\.googleapis\\.com":"ajax.lug.ustc.edu.cn"
  , "fonts\\.googleapis\\.com":"fonts.lug.ustc.edu.cn"
  , "themes\\.googleusercontent\\.com":"google-themes.lug.ustc.edu.cn"
  , "fonts\\.gstatic\\.com":"fonts-gstatic.lug.ustc.edu.cn"
  
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
        
        if("[cancel]"==newUrl) {
          console.log("阻止加载 "+info.url);

          countCanceled++;
          showIcon();
          return {cancel: true};
        } else {
          console.log("重定向 "+info.url+" 到 "+newUrl);

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
    ]/*,
    types: ["stylesheet","script"]*/
  },
  // extraInfoSpec
  ["blocking"]);
