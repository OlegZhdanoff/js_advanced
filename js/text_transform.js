

// sourceText = document.getElementById('sourceText').innerText;
resultTextBlock = document.getElementById('resultText');
sourceTextList = document.getElementById('sourceText').querySelectorAll("p");

function textTransform(src) {
    let result = '';
    for (const p in src) {
        if (src[p].innerText) {
            console.log(src[p].innerText);
            let tmp = src[p].innerText.replace(/\s+'/g, ' "').replace(/'\s+/g, '" ')
                .replace(/('$)/g, '"');
            result += `<p>${tmp}</p>`;
        }
    }
    return result;
}

document.getElementById('textTransform').addEventListener('click', e => {
    resultTextBlock.innerHTML = textTransform(sourceTextList);
});