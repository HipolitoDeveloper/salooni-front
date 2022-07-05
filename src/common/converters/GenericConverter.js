export const convertToObj = parseObject => {
    return JSON.parse(JSON.stringify(parseObject));
};

export const convertToBRL = value => {

    let numero = value?.toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');

    return numero.join(',');
};

export const convertBRLToFloat = value => {
    return parseFloat(value.replace(',', ''))
}
