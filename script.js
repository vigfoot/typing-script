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
        if (!vig.isNull(tcp.option.method)
            && tcp.option.method.trim().toUpperCase() === 'GET'
            && !vig.isNull(tcp.option.body)) {

            tcp.option.url += '?';
            for (const key in tcp.option.body) {
                tcp.option.url += 'key=' + tcp.option.body[key] + '&';
            }
            tcp.option.body = {};
        }

        xhr.open(tcp.option.method, tcp.option.url, tcp.option.async);
        if (!vig.isNull(tcp.option.headers)) {
            for (const headerKey in tcp.option.headers) {
                let headerValue = tcp.option.headers[headerKey];
                xhr.setRequestHeader(headerKey, headerValue);
            }
        }
        xhr.send(tcp.option.body);
    },
    fetch: () => {
        if (tcp.option.async === false) return tcp.ajax();

        return fetch(tcp.option.url, {
            headers: tcp.option.headers,
            method: tcp.option.method,
            body: tcp.option.body
        }).then(value => value.json())
    },
}

const vig = {
    isNull: value => {
        if (value === null || value === undefined)
            return true;
        if (typeof value === 'string' && value.trim() === '')
            return true;
        if (value instanceof Array && value.filter(v => !tcp.isNull(v)).length === 0)
            return true;
        if (value instanceof Object && Object.keys(value).length === 0)
            return true;
        return false;
    },
}

const decorator = {
    speed: 10,
    intervalAddress: {},
    typingTag: (appendHTML, targetObject) => {
        const tagHtml = appendHTML instanceof Object && Object.keys(appendHTML).length !== 0
            ? appendHTML.innerHTML : appendHTML;

        const appendElement = targetObject instanceof Object && Object.keys(targetObject).length !== 0
            ? targetObject : document.querySelector(appendHTML);

        if (vig.isNull(tagHtml) || vig.isNull(appendElement)) return;

        function typing(html, target, index) {
            setTimeout(() => {
                if (index < html.length) {
                    target.innerHTML += Array.from(html)[index];
                    typing(html, target, index++);
                }
            }, this.speed);
        }

        typing(tagHtml, targetObject, 0);
    },
    interruptAll: () => {
        for (const address of this.intervalAddress) clearInterval(address);
    }
}