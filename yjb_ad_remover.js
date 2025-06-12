/*
 * 名称: 佣金宝广告移除
 * 功能: 清空广告列表
 * 作者: YourName
 */

// 1. 解析服务器返回的原始 JSON 数据
const body = JSON.parse($response.body);

// 2. 定位到广告列表并清空它
//    根据你的 JSON 结构，路径是 body.result[0].list
//    我们加上一些判断，防止 App 其他请求返回不同结构时脚本出错
if (body.result && Array.isArray(body.result) && body.result.length > 0 && body.result[0].list) {
  console.log('成功定位到佣金宝广告列表，准备清空...');
  body.result[0].list = []; //  <- 核心操作：将广告数组置为空
}

// 3. 将修改后的数据重新打包成 JSON 字符串，返回给 App
$done({ body: JSON.stringify(body) });
