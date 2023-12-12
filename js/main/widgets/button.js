const Button = {
    iconButton: {
        /**
         * 
         * @param { string } icon 
         * @param { string | Array<string> } Class 
         * @param { string } Id 
         * @param { Function } fnOnclick
         */
        create: function (icon, Class = undefined, fnOnclick = undefined, Id = undefined) {
            var _button = document.createElement('button');
            _button.innerHTML = icon;
            if (Class) _button.classList.add((Class instanceof Array) ? Class : Class.split(" "));
            _button.classList.add('google-symbols', 'icon-button');
            if (Id) _button.id = Id;
            if (fnOnclick) _button.onclick = function () {
                fnOnclick();
            }
            return _button;
        }
    },
    iconLink: {
        create: function (icon, href = undefined, Class = undefined, Id = undefined) {
            var _button = document.createElement('a');
            _button.innerHTML = icon;
            if (Class) _button.classList.add((Class instanceof Array) ? Class : Class.split(" "));
            _button.classList.add('google-symbols', 'icon-button');
            if (Id) _button.id = Id;
            if (href) _button.href = href;
            return _button;
        }
    }
}

export default Button;