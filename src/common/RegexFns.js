export const removeParenthesis = (text) => {
    return text.replace(/([\()\s])/g, '');
}
