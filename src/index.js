const path = require('path')
const fs = require('fs')
const include = ['cache']

const Grepper = {}

function search(dir) {
    require('fs').readdirSync(dir).forEach(function (file) {
        const stat = fs.statSync(path.join(dir, file))
        if (stat.isFile() || include.indexOf(file) !== -1) {
            Grepper[file.replace('.js', '')] = require(dir + '/' + file)
        } else if (stat.isDirectory()) {
            search(path.join(dir, file))
        }
    })
}

search(__dirname)

for (const name in Grepper) {
    const exporter = Grepper[name]
    if (Object.prototype.hasOwnProperty.call(exporter, 'func')) {
        module.exports[name] = Grepper.wrap.wrapExport(exporter.func, exporter.required || [], exporter.optional || [])
    } else {
        module.exports[name] = Grepper[name]
    }
}