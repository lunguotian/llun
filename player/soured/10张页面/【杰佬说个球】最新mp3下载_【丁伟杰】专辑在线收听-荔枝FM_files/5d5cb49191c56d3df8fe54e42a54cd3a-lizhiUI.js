/* Index */
var LizhiUI={}
LizhiUI.userAgent = navigator.userAgent.toLowerCase();
LizhiUI.browser = {
    version: (LizhiUI.userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(LizhiUI.userAgent),
    opera: /opera/.test(LizhiUI.userAgent),
    msie: /msie/.test(LizhiUI.userAgent) && !/opera/.test(LizhiUI.userAgent),
    mozilla: /mozilla/.test(LizhiUI.userAgent) && !/(compatible|webkit)/.test(LizhiUI.userAgent)
};
LizhiUI.phoneList = new Array("2.0 MMP", "240320", "AvantGo", "BlackBerry", "Blazer", "Cellphone", "Danger", "DoCoMo", "Elaine/3.0", "EudoraWeb",
    "hiptop", "IEMobile", "KYOCERA/WX310K", "LG/U990", "MIDP-2.0", "MMEF20", "MOT-V", "NetFront", "Newt", "Nintendo Wii",
    "Nitro", "Nokia","Opera Mini", "Opera Mobi","Palm", "Playstation Portable", "portalmmm", "Proxinet", "ProxiNet",
    "SHARP-TQ-GX10", "Small", "SonyEricsson", "Symbian", "TS21i-10", "UP.Browser", "UP.Link", "Windows CE", "WinWAP",
    "iPhone", "iPod", "Windows Phone", "HTC", "ucweb", "Mobile", "Android");
LizhiUI.isOnTouchStart = function () { return typeof (ontouchstart) != "undefined"; }
LizhiUI.isiPad = function () { return LizhiUI.userAgent.indexOf("ipad") >= 0; }
LizhiUI.isAndroid = function () { return (LizhiUI.userAgent.indexOf("Android") > -1 ||LizhiUI.userAgent.indexOf("android") > -1); }
LizhiUI.isiPhone = function () { return (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1); }
LizhiUI.isWinPhone = function () { return LizhiUI.userAgent.indexOf("windows phone") != -1; }
LizhiUI.isPhone = function () {
    for (var i = 0; i < LizhiUI.phoneList.length; i++) {
        if (LizhiUI.userAgent.indexOf(LizhiUI.phoneList[i].toLowerCase()) >= 0 && LizhiUI.userAgent.indexOf("ipad") == -1) {
            return true;
        }
    }
    var appNameList = new Array("Microsoft Pocket Internet Explorer");
    for (var i = 0; i < appNameList.length; i++) {
        if (LizhiUI.userAgent.indexOf(appNameList[i]) >= 0) {
            return true;
        }
    }
    return false;
}
LizhiUI.isMobile = function () { return LizhiUI.isAndroid() || LizhiUI.isPhone() || LizhiUI.isiPad() || LizhiUI.isWinPhone();}

/**
 * Transform the seconds to a format like this:
 * 44'11''
 *
 * @param sec
 * @returns {String}
 */
function show_duration(sec) {
    var minute = parseInt(sec / 60);
    var second = parseInt(sec % 60);
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;
    if (isNaN(minute)||isNaN(second)) {
        return "";
    }else{
        return minute + "'" + second+"''";
    }
}


/***********************************************************
 *
 * weixin helper.
 *
***********************************************************/
LizhiUI.weixin = (function(){
	return {
		isWeixin: function() { return LizhiUI.userAgent.indexOf("micromessenger") > -1 },
		version: function () {
			if(this.isWeixin()){
				var wxUa = LizhiUI.userAgent.match(/.*?(micromessenger\/([0-9.]+))\s*/);
				return wxUa[2];
			}
			return "";
		}
	}
})();

/***********************************************************
 *
 * Lizhi logic
 *
***********************************************************/
LizhiUI.logic = (function(){
	return {
		redirectDownloadPage: function(){
		    if(LizhiUI.isWinPhone()){
		    	return document.location='//www.lizhi.fm/download/wp';
		    }
		    if(LizhiUI.weixin.isWeixin() && LizhiUI.weixin.version() >="5.0.3"){
		        if(LizhiUI.isAndroid()){
		            return document.location='http://a.app.qq.com/o/simple.jsp?pkgname=com.yibasan.lizhifm&g_f=991784';
		        }
		        return document.location='http://a.app.qq.com/o/simple.jsp?pkgname=com.yibasan.lizhifm&g_f=991784';
		    }
		    if(LizhiUI.isAndroid()){
		        return document.location='//www.lizhi.fm/android/lizhifm.apk';
		    }
		    document.location = '//itunes.apple.com/cn/app/li-zhifm-ren-ren-dou-shi-zhu-bo/id689967400?mt=8';
		}
	}
})();
