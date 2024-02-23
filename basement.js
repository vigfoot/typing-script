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
        if (!check.isNull(this.option.method)
            && this.option.method.trim().toUpperCase() === 'GET'
            && !check.isNull(this.option.body)) {

            this.option.url += '?';
            for (const key in this.option.body) {
                this.option.url += 'key=' + this.option.body[key] + '&';
            }
            this.option.body = {};
        }

        xhr.open(this.option.method, this.option.url, this.option.async);
        if (!check.isNull(this.option.headers)) {
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

const check = {
    isNull: value => {
        if (value === null || value === undefined)
            return true;
        if (typeof value === 'string' && value?.trim() === '')
            return true;
        if (value instanceof Array && value?.filter(v => !check.isNull(v)).length === 0)
            return true;
        if (value instanceof Object && check.isNull(value?.tagName) && Object.keys(value)?.length === 0)
            return true;
        return false;
    },
}

function init() {
    typingTag('<h1>hi</h1>helll324osdafsdfasdfasdfasdfsdfas<div>heg</div>ooooooooo', 'body');
}

init();