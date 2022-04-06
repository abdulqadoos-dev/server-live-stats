const getDate = () => {
    const date = new Date();
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

const randomIntGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const camelToSnakeCase  = string => string.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

module.exports = {
    getDate, randomIntGenerator, camelToSnakeCase
}
