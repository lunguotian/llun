window.wxShare = function(shareData) {
    function isWeixin() {
        return /micromessenger/i.test(window.navigator.userAgent)
    }

    function ajax(cb) {
        var xhr = new window.XMLHttpRequest()

        xhr.addEventListener('load', function() {
            var data = JSON.parse(xhr.responseText)
            cb(data)
        })
        xhr.open('GET', '/getJSConfig?url=' + (window.encodeURIComponent(location.href)))
        xhr.send()
    }

    if(isWeixin() === false) {
        return
    }

    var jsApiList = [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
    ]

    ajax(function(sdkConfig) {
        sdkConfig.debug = false
        sdkConfig.jsApiList = jsApiList.slice()

        wx.config(sdkConfig)
        wx.ready(function() {
            for(var i = 0; i < jsApiList.length; i++) {
                wx[jsApiList[i]](shareData)
            }
        })
    })
}
