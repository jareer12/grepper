function intToBool(int) {
    if (int == "0") return false;
    if (int == "1") return true;
    return false;
}

module.exports = {
    intToBool: intToBool
}