const tcp = {
    option: {
        headers: {},
        async: false,
        method: null,
        url: null,
        body: {},
    },
    ajax: () => {
        let xhr = new XMLHttpRequest();
        if (!vig.isNull(this.option.method)
            && this.option.method.trim().toUpperCase() === 'GET'
            && !vig.isNull(this.option.body)) {

            this.option.url += '?';
            for (const key in this.option.body) {
                this.option.url += 'key=' + this.option.body[key] + '&';
            }
            this.option.body = {};
        }

        xhr.open(this.option.method, this.option.url, this.option.async);
        if (!vig.isNull(this.option.headers)) {
            for (const headerKey in this.option.headers) {
                let headerValue = this.option.headers[headerKey];
                xhr.setRequestHeader(headerKey, headerValue);
            }
        }
        xhr.send(this.option.body);
    },
    fetch: () => {
        if (this.option.async === false) return this.ajax();

        return fetch(this.option.url, {
            headers: this.option.headers,
            method: this.option.method,
            body: this.option.body
        }).then(value => value.json())
    },
}

const vig = {
    isNull: value => {
        if (value === null || value === undefined)
            return true;
        if (typeof value === 'string' && value?.trim() === '')
            return true;
        if (value instanceof Array && value?.filter(v => !vig.isNull(v)).length === 0)
            return true;
        if (value instanceof Object && vig.isNull(value?.tagName) && Object.keys(value)?.length === 0)
            return true;
        return false;
    },
}

const decorator = {
    speed: 10,
    typingTag: (appendHTML, targetObject) => {
        let intervalArray = [];
        const tagHtml = appendHTML instanceof Object && Object.keys(appendHTML).length !== 0
            ? appendHTML.innerHTML : appendHTML;

        const appendElement = targetObject instanceof Object && !vig.isNull(value?.tagName)
            ? targetObject : document.querySelector(targetObject);

        if (vig.isNull(tagHtml) || vig.isNull(appendElement)) return;

        function typing(html, target, index) {
            let timeout = setTimeout(() => {
                if (index < html.length) {
                    target.innerHTML += Array.from(html)[index];
                    typing(html, target, ++index);
                }
            }, this.speed);
            intervalArray.push(timeout);
        }

        try {
            typing(tagHtml, appendElement, 0);

        } catch (e) {
            for (const address of intervalArray)
                clearInterval(address);

        }
    },
}

function init() {
    decorator.typingTag('heloooooooooo', 'body');
}

init();