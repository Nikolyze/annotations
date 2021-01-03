import getCoords from "./getCoords";

class CountPositions {
    constructor(evt) {
        this.evt = evt;
        this.body = {
            pos: {
                x: null,
                y: null
            }
        };
        this.client = {
            resYTop: null,
            resXLeft: null,
            shiftX: null,
            shiftY: null
        };
        this.imgCoords = getCoords(document.querySelector('div.main'));
    }

    countingWithoutShift() {
        const {
            top,
            left
        } = this.evt.target.getBoundingClientRect();

        const height = this.evt.target.height;
        const width = this.evt.target.width;

        const clientX = this.evt.clientX;
        const clientY = this.evt.clientY;

        const resYTop = clientX - left;
        const resXLeft = clientY - top;

        this.body.pos = {
            x: resYTop / width,
            y: resXLeft / height
        };
    }

    countingWithShift(
        pageX = this.evt.pageX,
        pageY = this.evt.pageY,
        shiftX = this.evt.shiftX,
        shiftY = this.evt.shiftY
    ) {
        const {
            top: targetTop,
            left: targetLeft,
            width: targetWidth
        } = getCoords(this.evt.target);

        const { left, top, width, height } = this.imgCoords;

        const currentShiftX = shiftX || pageX - targetLeft;
        const currentShiftY = shiftY || pageY - targetTop;
        const resYTop = pageX - left - currentShiftX + (targetWidth / 2);
        const resXLeft = pageY - top - currentShiftY + (targetWidth / 2);

        if (resYTop < 0 || resXLeft < 0 || width < resYTop || height < resXLeft) return;
        this.body.pos = {
            x: resYTop / width,
            y: resXLeft / height
        };

        this.client = {
            resYTop,
            resXLeft,
            shiftX: currentShiftX,
            shiftY: currentShiftY,
        };
    }
}

export default CountPositions;
