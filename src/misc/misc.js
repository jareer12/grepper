const fetch = require("node-fetch");

function intToBool(int) {
  if (int == "0") return false;
  if (int == "1") return true;
  return false;
}
function boolToInt(int) {
  if (int == true) return 1;
  if (int == false) return 0;
  return 0;
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
  if (!string || string == null)
    return `https://www.codegrepper.com/profile_images/50_50/default_profile.png`;
  return `https://www.codegrepper.com/profile_images/${string}`;
}

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    return { error };
  }
};
module.exports = {
  intToBool: intToBool,
  toAvatar: toAvatar,
  isEmail: isEmail,
  getBuffer: getBuffer,
  boolToInt: boolToInt,
};
