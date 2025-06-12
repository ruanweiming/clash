/*
 * Hupu Ad Remover (Combined)
 *
 * @author: ruanweiming
 * @description: 移除虎扑 App 的开屏、社区 Banner、功能模块等。
 */

const url = $request.url;
let body = JSON.parse($response.body);

// 规则一：处理开屏和社区 Banner 广告
if (url.includes('/interfaceAd/')) {
    console.log(`Hupu Ad Remover: 匹配到广告接口 (${url})`);
    if (body && typeof body === 'object') {
        let isModified = false;
        if (body.ads && Array.isArray(body.ads)) {
            body.ads = [];
            isModified = true;
        }
        if (body.ad_code && body.ad_code !== 0) {
            body.ad_code = 0;
            isModified = true;
        }
        if (isModified) {
            $done({ body: JSON.stringify(body) });
        } else {
            $done({});
        }
    } else {
        $done({});
    }
}

// 规则二：处理“我的”页面等的功能模块 (新)
else if (url.includes('/gallery/getmod2')) {
    console.log(`Hupu Ad Remover: 匹配到功能模块接口 (${url})`);
    if (body && body.data) {
        // 删除我们不想要的模块
        delete body.data.mang_mod;
        delete body.data.short_play_mod;
        delete body.data.game_mod;
        console.log("Hupu Ad Remover: 已移除 'mang_mod', 'short_play_mod', 'game_mod' 模块。");
        $done({ body: JSON.stringify(body) });
    } else {
        $done({});
    }
}

// 如果没有匹配到任何规则，原样返回
else {
    $done({});
}
