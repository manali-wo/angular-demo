import {
    isEmpty,
    isString,
    isPlainObject,
} from 'lodash-es';

export const trimDeep = <T>(object: T): {} => {
    if (isEmpty(object)) {
        return object;
    }

    return Object.keys(object).reduce((result, key) => {
        const value = object[key];

        result[key] = isPlainObject(value) ? trimDeep(value) : isString(value) ? value?.trim() : value;

        return result;
    }, {});
};

