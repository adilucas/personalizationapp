module.exports = {

    getPort: () => {
        return process.env.PORT || 3000;
    },

    getDatabaseURI: () => {
        const DATABASE_NAME = 'mgrnews-personalization';
        const DATABASE_USER = 'personalizationapp';
        const DATABASE_PASS = 'qwerty123';

        return `mongodb://${DATABASE_USER}:${DATABASE_PASS}@ds239873.mlab.com:39873/${DATABASE_NAME}`;
    }

};