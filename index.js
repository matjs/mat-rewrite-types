const fse = require('fs-extra')
const path = require('path')

/**
 * 默认支持.mx/.ts/.es文件
 * 优先顺序 mx > ts > es > js
 */
function rewriteType(url, supportTypes = ['.mx', '.es', '.ts']) {

    for (let i = 0, len = supportTypes.length; i < len; i++) {
        let type = supportTypes[i]
        let _url = url.replace(/\.js/g, type)

        if (fse.pathExistsSync(path.resolve(process.cwd(), _url.slice(1)))) {
            return _url
        }
    }
    return url
}

module.exports = rewriteType