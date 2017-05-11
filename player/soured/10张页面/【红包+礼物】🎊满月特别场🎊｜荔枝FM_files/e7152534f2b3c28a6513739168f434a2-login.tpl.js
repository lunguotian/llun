(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.loginTpl = global.loginTpl || {})));
}(this, (function (exports) { 'use strict';

function loginTpl(el) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '订阅喜欢的播客，精彩直播不再错过';
    var isPopup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var needWeixinLogin = false;
    var needQQLogin = true;
    el.innerHTML = "<div class=\"login\">\n        <div class=\"login-text\">\n            " + text + "\n        </div>\n        " + function () {
        if (needWeixinLogin) {
            return "<button class=\"login-btn login-weixin-btn\"> \u5FAE\u4FE1\u767B\u5F55</button>";
        } else {
            return "";
        }
    }() + "\n        " + function () {
        if (needQQLogin) {
            return "<button class=\"login-btn login-qq-btn\">QQ\u767B\u5F55</button>";
        } else {
            return "";
        }
    }() + "\n        " + function () {
        if (isPopup) {
            return "<div class=\"js-close login-close-btn\">&times;</div>";
        } else {
            return "";
        }
    }() + "\n    </div>";
    if (needWeixinLogin) {
        el.querySelector(".login-weixin-btn").addEventListener("click", function () {});
    }
    if (needQQLogin) {
        el.querySelector(".login-qq-btn").addEventListener("click", function () {
            var redirectUri = "http://appweb.lizhi.fm/h5/qqLogin?url=" + encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
            window.open("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100484528&redirect_uri=" + encodeURIComponent(redirectUri) + "&state=1&scope=get_user_info,get_info");
        });
    }
}

var popup = document.createElement('div');
popup.className = "login-popup";
popup.style.display = "none";
popup.addEventListener('click', function (e) {
    if (e.target === popup || e.target.className.indexOf("js-close") !== -1) {
        popup.style.display = "none";
    }
}, false);
document.body.appendChild(popup);
function loginPopup() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '立即登录，尽情参与互动';

    loginTpl(popup, text, true);
    popup.style.display = "block";
}

exports.loginTpl = loginTpl;
exports.loginPopup = loginPopup;

Object.defineProperty(exports, '__esModule', { value: true });

})));
