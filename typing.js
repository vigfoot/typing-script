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

    function typing(html, target, index) {
        const tagSpell = tagSplitter(html);
        if (!isNull(tagSpell.prefix)) {
            target.innerHTML += tagSpell.prefix;
            index += tagSpell.prefix.length;

        }

        let timeout = setTimeout(() => {
            if (index < html.length) {
                target.innerHTML += Array.from(html)[index];
                typing(html, target, ++index);
            }
        }, SPEED_MILLI_SECONDS);
        intervalArray.push(timeout);
    }

    function tagSplitter(html) {
        const htmlComponent = document.createElement('component');
        htmlComponent.innerHTML = html;
        const indexOfPrefixEnd = htmlComponent.innerHTML.indexOf('>');

        const prefix = htmlComponent.innerHTML.substring(0, indexOfPrefixEnd);
        const suffix = null;

        let result = {"prefix": null, "html": null, "suffix": null};

        if (!isNull(prefix)) result.prefix = prefix;
        if (!isNull(suffix)) result.suffix = suffix;

        result.html = textContent;

        return result;
    }


    try {
        typing(tagHtml, appendElement, 0);

    } catch (e) {
        console.log(e);
        for (const address of intervalArray)
            clearInterval(address);
    }
}