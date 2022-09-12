const stringToObjCookie = (str: string = '') => {
    const splitStr = str.split(';');
    const obj = {};

    if(splitStr.length > 0) {
        splitStr.forEach(v => {
            const tmp = v.split('=');

            if(tmp.length > 1) {
                const key = tmp[0];
                const value = tmp[1];

                obj[key] = value;
            }
        });
    }

    return obj;
};

export const getCookie = () => {
    const cookie: string = document.cookie || '';
    const objCookie = stringToObjCookie(cookie) as any;

    console.log('objCookie', objCookie);

    return objCookie;
};