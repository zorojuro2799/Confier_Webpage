const targetLang = 'hi';
const texts = ['Hello world', 'Our Range', 'Success Stories', 'Innovation Lab'];
const text = texts.join('\n~|~\n');
const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t`;
const body = new URLSearchParams({ q: text });
fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
  .then(res => res.json())
  .then(data => {
    const translated = data[0].map(item => item[0]).join('');
    const translatedArray = translated.split(/\n\s*~\|~\s*\n/).map(s => s.trim());
    console.log("Expected:", texts.length, "Got:", translatedArray.length);
    console.log(translatedArray);
  })
  .catch(console.error);
