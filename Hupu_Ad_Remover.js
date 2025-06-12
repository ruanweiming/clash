/*
 * Hupu Ad Remover
 *
 * @author: ruanweiming
 */

// 1. 解析响应体
let body = JSON.parse($response.body);

// 2. 检查 'ads' 数组是否存在
if (body.ads) {
  // 3. 将广告数组清空
  console.log("Hupu: 发现并清空 'ads' 数组。");
  body.ads = [];
}

// 4. 修改广告状态码 (可选但推荐)
if (body.ad_code) {
  console.log("Hupu: 将 'ad_code' 从 " + body.ad_code + " 修改为 0。");
  body.ad_code = 0;
}

// 5. 返回修改后的响应体
$done({ body: JSON.stringify(body) });
