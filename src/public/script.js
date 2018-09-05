function init() {
    // new SmoothScroll2(document, 120, 12);
}


function SmoothScroll2(target, speed, smoothness) {
    if (target === document) {
        target = (document.documentElement || document.body.parentNode || document.body);
    }
    let moving = false;
    let pos = target.scrollTop;

    target.addEventListener('mousewheel', scrolled, false);
    target.addEventListener('DOMMouseScroll', scrolled, false);

    function scrolled(e) {
        pos = target.scrollTop;

        e.preventDefault();
        let delta = e.delta || e.wheelDelta;
        if (delta === undefined) {
            //firefox ftw
            delta = -e.detail;
        }
        delta = Math.max(-1, Math.min(1, delta)); //cap to [-1, 1]
        console.log(delta);

        pos += -delta * speed;
        pos = Math.max(0, Math.min(pos, target.scrollHeight - target.clientHeight)); //limit scrolling

        if  (!moving) update();
    }

    function update() {
        moving = true;
        const delta = (pos - target.scrollTop) / smoothness;
        target.scrollTop += delta;

        if (Math.abs(delta) > 0) {
            requestFrame(update);
            console.log(Math.abs(delta) < smoothness - 1)
        } else if (Math.abs(delta) < smoothness - 1) {
            moving = false;
        } else {
            moving = false;
        }
    }
}

const requestFrame = function () { // requestAnimationFrame cross browser
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (func) {
            window.setTimeout(func, 1000 / 60);
        }
    );
}(e => console.log(e));
