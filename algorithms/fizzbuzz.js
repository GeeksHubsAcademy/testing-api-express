module.exports = async (max) => {
    max = Number(max);

    if (Number.isNaN(max) ||  max <= 0) {

        throw new Error('I should receive a positive number > 0');
    }

    const output = []


    for (let index = 1; index <= max; index++) {

        let item = ''
        item += index % 3 === 0 ? 'fizz' : '';
        item += index % 5 === 0 ? 'buzz' : '';

        if (index % 3 !== 0 && index % 5 !== 0) {
            item = String(index);
        }


        output.push(item);

    }

    return output;
};
