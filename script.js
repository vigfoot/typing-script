const tcp = {
    option: {
        header: {},
        async: false,
        method: null,
        url: null,
        body: null,
    },
    ajax: function () {
        let xhr = new XMLHttpRequest();
        xhr.open(tcp.option.method, tcp.option.url, tcp.option.async);
        if (!tcp.isNull(tcp.option.header)){
            for (const headerKey in tcp.option.header) {
                let headerValue = tcp.option.header[headerKey];
                xhr.setRequestHeader(headerKey, headerValue);
            }
        }
        xhr.send(tcp.option.body);
    },
    fetch: function () {

    },
    isNull: function (value) {
        if (value === null || value === undefined)
            return true;
        if (typeof value === 'string' && value.trim() === '')
            return true;
        if (value instanceof Array && value.filter(v => !tcp.isNull(v)).length === 0)
            return true;
        if (value instanceof Object && Object.keys(value).length === 0)
            return false;
        return false;
    }
}