export default {
    wait(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }
};
