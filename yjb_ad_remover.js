/*
 * 名称: 佣金宝广告移除
 * 功能: 清空多个广告接口的数据
 * 作者: ruanweiming
 * 更新日期: 2023-10-27
 */

const url = $request.url;
let body = JSON.parse($response.body);

// 打印日志，方便调试
console.log(`[YJB Remover] Machining URL: ${url}`);

// 规则一：处理第一个广告接口
// URL: https://comarket.yongjinbao.com.cn/yjbapi/advertisement/clientid/future/query
if (url.includes('/yjbapi/advertisement/clientid/future/query')) {
  console.log('[YJB Remover] Matched rule 1: /yjbapi/advertisement');
  if (body.result && Array.isArray(body.result) && body.result.length > 0 && body.result[0].list) {
    console.log('[YJB Remover] Clearing ads in body.result[0].list');
    body.result[0].list = [];
  }
}

// 规则二：处理第二个广告接口 (新发现的)
// URL: https://webapps.yongjinbao.com.cn/yjbwebservice/core/api/json
if (url.includes('/yjbwebservice/core/api/json')) {
  console.log('[YJB Remover] Matched rule 2: /yjbwebservice');
  if (body.GRID0 && body.GRID0.result && Array.isArray(body.GRID0.result)) {
    console.log('[YJB Remover] Found GRID0.result, iterating to clear lists...');
    // 遍历每一个广告位，清空其 list 数组
    for (let adLocation of body.GRID0.result) {
      if (adLocation.list) {
        console.log(`[YJB Remover] Clearing list for adLocationNo: ${adLocation.adLocationNo}`);
        adLocation.list = [];
      }
    }
  }
}

// 将修改后的数据重新打包成 JSON 字符串，返回给 App
$done({ body: JSON.stringify(body) });
