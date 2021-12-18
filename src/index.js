const path = require('path')
const include = ['cache']
const fs = require('fs')
const GREPPER = {}

function __Search(dir) {
    require('fs').readdirSync(dir).forEach(function (file) {
        const stat = fs.statSync(path.join(dir, file))
        if (stat.isFile() || include.indexOf(file) !== -1) {
            GREPPER[file.replace('.js', '')] = require(dir + '/' + file)
        } else if (stat.isDirectory()) {
            __Search(path.join(dir, file))
        }
    })
} __Search(__dirname)

for (const name in GREPPER) {
    const exporter = GREPPER[name]
    if (Object.prototype.hasOwnProperty.call(exporter, 'func')) {
        module.exports[name] = GREPPER.wrap.wrapExport(exporter.func, exporter.required || [], exporter.optional || [])
    } else {
        module.exports[name] = GREPPER[name]
    }
}