export function hashToObj(hash) {
    const hashParams = hash.substr(1).split('&');
    const obj = {};

    for (const param of hashParams) {
        const [key, value] = param.split('=');
        if (key && value) {
            obj[key] = value;
        }
    }

    return obj;
}