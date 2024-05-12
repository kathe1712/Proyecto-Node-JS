const crypto = require("crypto");

const secret = crypto.randomBytes(32).toString("hex");

console.log(secret); //b3f38599d5ba51c9a80e1ad98b62108bf4fdfe1ac26dbbeb801ae71a63e717a1