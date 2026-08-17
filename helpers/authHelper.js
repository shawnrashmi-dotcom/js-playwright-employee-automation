function generateUniqueUsername(baseUsername) {
    return `${baseUsername}${Date.now()}`;
}

module.exports = {
    generateUniqueUsername
};