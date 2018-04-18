export const saveUId = (uid) => {
    localStorage.setItem('userUID', uid);
};

export const getUID = (key) => {
    return localStorage.getItem(key);
};

export const clearStorage = () => {
    localStorage.clear();
}