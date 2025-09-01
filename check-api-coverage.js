#!/usr/bin/env node

/**
 * API接口完整性检查脚本
 * 验证前端页面所需的所有API接口是否正常工作
 */

const http = require('http');
const API_BASE_URL = 'http://localhost:3001/api';

// 颜色输出
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// HTTP请求封装
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    // 确保路径以 /api 开头
    const apiPath = path.startsWith('/api') ? path : `/api${path}`;
    const fullUrl = `${API_BASE_URL.replace('/api', '')}${apiPath}`;
    const url = new URL(fullUrl);
    
    const options = {
      hostname: url.hostname,
      port: url.port || 3001,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve({
            status: res.statusCode,
            data: result,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        } catch (error) {
          reject(new Error(`JSON解析失败: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data && method === 'POST') {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// 定义所有需要测试的API接口
const apiTests = [
  // 首页相关API
  {
    group: '首页相关API',
    tests: [
      { name: '轮播图数据', path: '/home/banners' },
      { name: '企业实力数据', path: '/home/company-stats' },
      { name: '服务介绍数据', path: '/home/services' },
      { name: '服务网络数据', path: '/home/network-map' },
      { name: '客户证言', path: '/home/testimonials' },
      { name: '最新动态', path: '/home/latest-news' },
      { name: '燃油价格', path: '/home/fuel-price' },
      { 
        name: '立即询价', 
        path: '/home/quick-quote', 
        method: 'POST',
        data: {
          contactName: "测试用户",
          phone: "13800138000",
          company: "测试公司", 
          requirement: "需要500升柴油",
          location: "舟山市",
          source: "api_test"
        }
      }
    ]
  },
  
  // 关于我们API
  {
    group: '关于我们API',
    tests: [
      { name: '公司信息', path: '/about/company-info' },
      { name: '核心价值观', path: '/about/core-values' },
      { name: '车队与储存信息', path: '/about/fleet-storage' },
      { name: '管理团队', path: '/about/leadership-team' }
    ]
  },
  
  // 产品服务API
  {
    group: '产品服务API',
    tests: [
      { name: '产品列表', path: '/products' },
      { name: '产品分类', path: '/products/categories' },
      { name: '服务模块', path: '/products/services' },
      { name: '价格信息', path: '/products/pricing' },
      { name: '下载文件列表', path: '/products/downloads' },
      { name: '产品详情', path: '/products/1' }
    ]
  },
  
  // 安全合规API
  {
    group: '安全合规API',
    tests: [
      { name: '安全政策', path: '/safety/policies' },
      { name: '认证证书', path: '/safety/certifications' },
      { name: '安全设备', path: '/safety/equipment' }
    ]
  },
  
  // 新闻中心API
  {
    group: '新闻中心API',
    tests: [
      { name: '新闻列表', path: '/news' },
      { name: '新闻分类', path: '/news/categories' },
      { name: '新闻详情', path: '/news/1' }
    ]
  },
  
  // 招聘信息API
  {
    group: '招聘信息API',
    tests: [
      { name: '职位列表', path: '/careers/positions' },
      { name: '企业福利', path: '/careers/benefits' },
      { name: '企业文化', path: '/careers/culture' },
      { name: '企业文化视频', path: '/careers/culture-video' }
    ]
  },
  
  // 联系我们API
  {
    group: '联系我们API',
    tests: [
      { name: '联系信息', path: '/contact/info' },
      { name: '办公地点', path: '/contact/offices' },
      { name: '服务区域', path: '/contact/service-areas' }
    ]
  },
  
  // 系统管理API
  {
    group: '系统管理API',
    tests: [
      { name: '网站配置', path: '/system/config' }
    ]
  }
];

// 页面功能检查
const pageChecks = [
  {
    page: '首页 (/)',
    requiredAPIs: [
      '/home/banners', '/home/company-stats', '/home/services',
      '/home/network-map', '/home/testimonials', '/home/latest-news',
      '/home/fuel-price'
    ],
    interactiveAPIs: ['/home/quick-quote'],
    description: '首页需要展示轮播图、企业实力、服务介绍、客户证言、最新动态等'
  },
  {
    page: '关于我们 (/about)',
    requiredAPIs: [
      '/about/company-info', '/about/core-values', 
      '/about/fleet-storage', '/about/leadership-team'
    ],
    interactiveAPIs: [],
    description: '关于我们页面需要展示公司信息、核心价值观、车队储存、管理团队'
  },
  {
    page: '产品服务 (/products)',
    requiredAPIs: [
      '/products', '/products/categories', '/products/services',
      '/products/pricing', '/products/downloads'
    ],
    interactiveAPIs: ['/products/quote-request', '/products/technical-inquiry'],
    description: '产品页面需要展示产品列表、服务模块、价格信息，支持询价和咨询'
  },
  {
    page: '新闻中心 (/news)',
    requiredAPIs: ['/news', '/news/categories'],
    interactiveAPIs: ['/news/1/share'],
    description: '新闻中心需要展示新闻列表、分类，支持分享功能'
  },
  {
    page: '招聘信息 (/careers)',
    requiredAPIs: ['/careers/positions', '/careers/benefits', '/careers/culture'],
    interactiveAPIs: ['/careers/applications', '/careers/internship-application'],
    description: '招聘页面需要展示职位列表、企业福利，支持在线申请'
  },
  {
    page: '联系我们 (/contact)',
    requiredAPIs: ['/contact/info', '/contact/service-areas'],
    interactiveAPIs: ['/contact/messages'],
    description: '联系页面需要展示联系信息、服务区域，支持留言功能'
  }
];

// 执行API测试
async function runAPITests() {
  log('\n🚀 开始API接口完整性检查...', 'blue');
  log('=' .repeat(60), 'blue');
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = [];

  for (const group of apiTests) {
    log(`\n📁 ${group.group}`, 'yellow');
    log('-'.repeat(40), 'yellow');
    
    for (const test of group.tests) {
      totalTests++;
      try {
        const result = await makeRequest(
          test.path, 
          test.method || 'GET', 
          test.data || null
        );
        
        if (result.success) {
          log(`  ✅ ${test.name}`, 'green');
          passedTests++;
          
          // 检查数据结构
          if (result.data.code === 200 && result.data.data) {
            if (Array.isArray(result.data.data)) {
              log(`    📊 返回 ${result.data.data.length} 条数据`, 'blue');
            } else if (typeof result.data.data === 'object') {
              const keys = Object.keys(result.data.data);
              log(`    📊 返回对象包含: ${keys.slice(0, 3).join(', ')}${keys.length > 3 ? '...' : ''}`, 'blue');
            }
          }
        } else {
          log(`  ❌ ${test.name} - 状态码: ${result.status}`, 'red');
          failedTests.push(`${group.group} - ${test.name}`);
        }
      } catch (error) {
        log(`  ❌ ${test.name} - 错误: ${error.message}`, 'red');
        failedTests.push(`${group.group} - ${test.name}: ${error.message}`);
      }
      
      // 添加小延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return { totalTests, passedTests, failedTests };
}

// 执行页面功能检查
async function runPageChecks(testResults) {
  log('\n🌐 开始页面功能完整性检查...', 'blue');
  log('=' .repeat(60), 'blue');
  
  for (const page of pageChecks) {
    log(`\n📄 ${page.page}`, 'yellow');
    log(`   ${page.description}`, 'blue');
    log('-'.repeat(40), 'yellow');
    
    // 检查必需的API
    let requiredMissing = 0;
    let interactiveMissing = 0;
    
    for (const api of page.requiredAPIs) {
      const isWorking = !testResults.failedTests.some(failed => failed.includes(api));
      if (isWorking) {
        log(`  ✅ 必需API: ${api}`, 'green');
      } else {
        log(`  ❌ 必需API缺失: ${api}`, 'red');
        requiredMissing++;
      }
    }
    
    // 检查交互式API
    for (const api of page.interactiveAPIs) {
      const isWorking = !testResults.failedTests.some(failed => failed.includes(api));
      if (isWorking) {
        log(`  ✅ 交互API: ${api}`, 'green');
      } else {
        log(`  ⚠️  交互API缺失: ${api}`, 'yellow');
        interactiveMissing++;
      }
    }
    
    // 页面状态评估
    if (requiredMissing === 0 && interactiveMissing === 0) {
      log(`  🎉 页面功能完整！`, 'green');
    } else if (requiredMissing === 0) {
      log(`  ✅ 页面基本功能正常，${interactiveMissing}个交互功能需要完善`, 'yellow');
    } else {
      log(`  ❌ 页面功能不完整，缺失${requiredMissing}个必需API`, 'red');
    }
  }
}

// 主函数
async function main() {
  try {
    // 首先检查API服务器是否运行
    log('🔍 检查API服务器状态...', 'blue');
    await makeRequest('/home/banners');
    log('✅ API服务器运行正常', 'green');
    
    // 执行API测试
    const testResults = await runAPITests();
    
    // 执行页面检查
    await runPageChecks(testResults);
    
    // 输出总结
    log('\n📊 测试结果总结', 'blue');
    log('=' .repeat(60), 'blue');
    log(`总接口数: ${testResults.totalTests}`, 'blue');
    log(`通过测试: ${testResults.passedTests}`, 'green');
    log(`失败测试: ${testResults.failedTests.length}`, testResults.failedTests.length > 0 ? 'red' : 'green');
    log(`成功率: ${Math.round((testResults.passedTests / testResults.totalTests) * 100)}%`, 'blue');
    
    if (testResults.failedTests.length > 0) {
      log('\n❌ 失败的接口:', 'red');
      testResults.failedTests.forEach(failed => {
        log(`  - ${failed}`, 'red');
      });
    } else {
      log('\n🎉 所有API接口测试通过！前端页面可以正常获取数据！', 'green');
    }
    
  } catch (error) {
    log(`❌ 检查失败: ${error.message}`, 'red');
    log('请确保API服务器正在运行: npm run server 或 node server.js', 'yellow');
    process.exit(1);
  }
}

// 运行检查
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { makeRequest, runAPITests, runPageChecks };