// ==UserScript==
// @name         alert2tip
// @namespace    https://github.com/JoiWeT/alert2tip
// @supportURL   https://github.com/JoiWeT/alert2tip/issues
// @version      1.0
// @description  try to take over the alert!
// @author       JoiWeT
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
var tipsFadeCronIds = [];

(function() {
   'use strict';
   window.longlong_alert = window.alert;
   var longlong_alert = alert;
   function alert(...message) {
      alert2tips(message);
   }
   window.alert = function (...message) { alert2tips(message);};
})();

function alert2tips(...message) {
    var pos=-1;
    for (var i=0;i<tipsFadeCronIds.length;i++) {
       if (!tipsFadeCronIds[i]) {
          pos=i;
          break;
       }
    }
    if (pos<0) {
       tipsFadeCronIds.push(0);
       pos=tipsFadeCronIds.length-1;
    }
    var alert_tip_div=document.createElement("div");
    alert_tip_div.id="jwt_alert_tip"+pos;
    var heightPos=(10+8*(pos%10));
    alert_tip_div.style="opacity:0.8;width:30%;right:35%;left:35%;position: absolute; top:"+heightPos+"%;z-index:999; text-align:center; font-size:24px; padding:10px 20px; background-color:#dff0d8;";
    alert_tip_div.innerText=message;
    alert_tip_div.addEventListener('mouseenter', function() { clearTipsFadeCron(pos); }, false); //mouseover
    alert_tip_div.addEventListener('mouseleave', function() { setTipsFadeCron(pos); }, false); //mouseout
    document.body.appendChild(alert_tip_div);
    setTipsFadeCron(pos);
}
function fadeTips(pos) {
    var tipEle=document.getElementById('jwt_alert_tip'+pos);
    tipEle.parentNode.removeChild(tipEle);
    tipsFadeCronIds[pos]=0;
    clearTimeout(tipsFadeCronIds[pos]);
}
function clearTipsFadeCron(pos) {
    clearTimeout(tipsFadeCronIds[pos]); //鼠标离开时仍使用本pos设置任务，清空与否无所谓
}
function setTipsFadeCron(pos) {
    tipsFadeCronIds[pos]=window.setTimeout(function() {fadeTips(pos);},2000);
}
