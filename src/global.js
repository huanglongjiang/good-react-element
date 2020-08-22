// 生产环境

const constants = {
    APIPATH:'http://www.good1230.com/good/google.php',
    apiReturn:'http://www.good1230.com/good/return.php',
    apiUpdata:'http://www.good1230.com/good/server',
    filePath:'http://www.good1230.com/good',
};

// 开发环境
// "proxy": "http://localhost",    生产环境package.json不需要proxy,开发环境package.json需要proxy

/*const constants = {
    APIPATH:'good/google.php',
    apiReturn:'good/return.php',
    apiUpdata:'good/server',
    filePath:'good',
};*/

export default constants;