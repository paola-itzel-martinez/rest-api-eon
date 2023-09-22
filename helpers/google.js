const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

async function googleLoginVerify(idToken) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    return ticket.getPayload()
}

module.exports = {
    googleLoginVerify
}
