module.exports = {
    getTopicKeys: function(filePath) {
        const fs = require('fs');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return Object.keys(data);
    }
};