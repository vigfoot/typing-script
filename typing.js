const SPEED_MILLI_SECONDS = 10;


function typingTag(appendHTML, targetObject) {
    const isNull = value => {
        if (value === null || value === undefined)
            return true;
        if (typeof value === 'string' && value?.trim() === '')
            return true;
        if (value instanceof Array && value?.filter(v => !isNull(v)).length === 0)
            return true;
        if (value instanceof Object && isNull(value?.tagName) && Object.keys(value)?.length === 0)
            return true;
        return false;
    };


    let intervalArray = [];
    const tagHtml = appendHTML instanceof Object && Object.keys(appendHTML).length !== 0
        ? appendHTML.innerHTML : appendHTML;

    const appendElement = targetObject instanceof Object && !isNull(value?.tagName)
        ? targetObject : document.querySelector(targetObject);

    if (isNull(tagHtml) || isNull(appendElement)) return;

    function typing(html, target, index, callback) {
        let tagSpell = tagSplitter(html.substring(index, html.length - 1));
        let timeout = setTimeout(() => {
            if (index < tagSpell.length) {
                target.innerHTML += Array.from(tagSpell)[index];
                typing(html, target, ++index);

                if (!isNull(callback)) callback();
            }
        }, SPEED_MILLI_SECONDS);
        intervalArray.push(timeout);
    }

    function tagSplitter(html) {
        if (html.indexOf('<') === 0) {
            return html.substring(0, html.indexOf('>'));

        } else if (html.indexOf('>') === 0) {
            return html.substring(0, html.length - 1);
        }

        return html;
    }

    try {
        typing(tagHtml, appendElement, 0);

    } catch (e) {
        console.log(e);
        for (const address of intervalArray)
            clearInterval(address);
    }
}