export default (elem) => {
    try {
        return elem.getBoundingClientRect();
    } catch (e) {
        return e;
    }
};
