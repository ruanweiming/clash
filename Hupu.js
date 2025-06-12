/*
 * Hupu Ad Remover (Universal & Robust)
 * @author: ruanweiming
 * @description: 移除虎扑 App 的开屏、社区 Banner、功能模块等。
 */

const url = $request.url;
let body = JSON.parse($response.body);

// 规则一：处理包含 "ads" 字段的广告接口
if (url.includes('/interfaceAd/')) {
    console.log(`Hupu: Matched Ads API (${url})`);
    if (body) {
        if (body.ads) body.ads = [];
        if (body.ad_code) body.ad_code = 0;
        $done({ body: JSON.stringify(body) });
        return;
    }
}

// 规则二：处理功能模块接口
else if (url.includes('/gallery/getmod2')) {
    console.log(`Hupu: Matched Module API (${url})`);
    if (body && body.data) {
        // --- 核心修改在这里 ---
        // 不直接 delete，而是将它们置为空对象，这通常更安全
        if (body.data.mang_mod) body.data.mang_mod = {};
        if (body.data.short_play_mod) body.data.short_play_mod = {};
        if (body.data.game_mod) body.data.game_mod = {};
        
        // 也可以尝试将整个 data 置空
        // body.data = {};

        console.log("Hupu: 已清空 'mang_mod', 'short_play_mod', 'game_mod' 模块。");
        $done({ body: JSON.stringify(body) });
        return;
    }
}

// 未匹配到任何规则，原样返回
$done({});
