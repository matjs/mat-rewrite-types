const fse = require('fs-extra')
const path = require('path')

/**
 * 默认支持.mx/.ts/.es文件
 * 优先顺序 mx > ts > es > js
 */
function rewriteType(url, supportTypes = ['.mx', '.es', '.ts'], cwd) {
    const _cwd = cwd || process.cwd()

    for (let i = 0, len = supportTypes.length; i < len; i++) {
        let type = supportTypes[i]
        let paths = url.split('?')
        let _url = paths[0].replace(/\.js$/g, type)

        if (fse.pathExistsSync(path.resolve(_cwd, _url.slice(1)))) {
            return _url
        }
    }
    return url
}

module.exports = rewriteType