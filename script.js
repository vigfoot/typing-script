const tcp = {
    option: {
        method: null,
        async: false,
        url: null,

    },
    ajax: function () {

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

        return false;
    }
}