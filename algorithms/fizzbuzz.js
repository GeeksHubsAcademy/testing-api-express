module.exports = async (max) => {
    max = Number(max);

    if (Number.isNaN(max) ||  max <= 0) {

        throw new Error('I should receive a positive number > 0');
    }

    return []
};
