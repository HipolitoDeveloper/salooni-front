import Constants from "./Constants";

export const handleError = (error, model) => {
    if (model === 'login') {
        throw Constants.LOGIN_ERROR
    } else {
        throw error;
    }
}
