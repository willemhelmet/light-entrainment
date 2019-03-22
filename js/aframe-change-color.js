AFRAME.registerComponent('change-color', {
    schema: {
        color1: {type: 'string'},
        color2: {type: 'string'},
        interval: {type: 'int'}
    },
    init: function() {
        var _color1 = this.data.color1;
        var _color2 = this.data.color2;
        var _interval = this.data.interval;

        var _isColor1 = true;
        var intervalFunc = setInterval(() => {
            if (_isColor1) {
                this.el.setAttribute('color', _color1);
            }
            else {
                this.el.setAttribute('color', _color2);
            }
            _isColor1 = !_isColor1;
        }, _interval);
    }
})