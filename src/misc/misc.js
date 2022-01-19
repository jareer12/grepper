function intToBool(int) {
    if (int == "0") return false;
    if (int == "1") return true;
    return false;
}

function isEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}

function toAvatar(string) {
    if (!string || string == null) return `https://www.codegrepper.com/profile_images/50_50/default_profile.png`;
    return `https://www.codegrepper.com/profile_images/${string}`;
}
module.exports = {
    intToBool: intToBool,
    toAvatar: toAvatar,
    isEmail: isEmail,
}