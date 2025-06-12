/*
 * Hupu Ad Remover
 * @author: ruanweiming
 */
const url = $request.url;
let body = JSON.parse($response.body);

// 规则一：处理包含 "ads" 字段的广告接口
if (url.includes('/interfaceAd/')) {
    if (body && typeof body === 'object') {
        if (body.ads) body.ads = [];
        if (body.ad_code) body.ad_code = 0;
        $done({ body: JSON.stringify(body) });
        return;
    }
}

// 规则二：处理包含功能模块的接口
else if (url.includes('/gallery/getmod2')) {
    if (body && body.data) {
        delete body.data.mang_mod;
        delete body.data.short_play_mod;
        delete body.data.game_mod;
        $done({ body: JSON.stringify(body) });
        return;
    }
}

// 未匹配到任何规则，原样返回
$done({});
