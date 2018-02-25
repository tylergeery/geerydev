function activation() {
    var el = document.querySelector('#geerydev-side-panel');

    if (window && window.pageYOffset > 250) {
        if (el.className.indexOf('fixed top0') !== -1) {
            return;
        }

        el.className = el.className.replace('absolute top250', '') + 'fixed top0';
    } else {
        if (el.className.indexOf('absolute top250') !== -1) {
            return;
        }

        el.className = el.className.replace('fixed top0', '') + 'absolute top250';
    }
}

if (window) {
    window.addEventListener('scroll', activation);
}
