// const { parse } = require('node-html-parser');
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';
import fetch from 'node-fetch';

const turndown = new TurndownService()

const regex = /(?<=url=\/l\/\?uddg=).*$/;
const URL = 'https://mdn.io/' 

function handleMarkdown(text) {
	// text = text.replace('<p>', '').replace('</p>', '').replace('<strong>', '**').replace('</strong>', '**');
	// let idx = text.search('<code>');
	// if(!text[idx - 1] === '>'){
	// 	text = text.replace('<code>', '```js\n').replace('</code>', '```');
	// } else {
	// 	text = text.replace('<code>', '').replace('</code>', '');
	// }
	// text = text.replace('<a[]')
	// return text;
	return turndown.turndown(text).replace('](/', '](https://developer.mozilla.org/');
}

// let search = args.join('+');
async function searchMDN(search) {
	let res = await fetch(URL + search, {followRedirects: true});
	let html = await res.text();
	let metaNodeText = parse(html).querySelectorAll('meta')[3].rawAttrs;
	if(!metaNodeText.includes("url=/l/?uddg=")) {
		return `\`${search}\` term not found!`;
	}
	let mdnURL = metaNodeText.match(regex)[0];
	mdnURL = mdnURL.replace("'", "");
	mdnURL = decodeURIComponent(mdnURL);
	mdnURL = mdnURL.split("&rut")
	mdnURL = mdnURL[0]
	let page = await fetch(mdnURL);
	page = await page.text();
	let parsedPage = parse(page);

	let title = parsedPage.querySelector('title');
	title = handleMarkdown(String(title));
	title = title.replace('- JavaScript | MDN', '');



	let wiki = parsedPage.querySelector('article.main-page-content');
	let pTag = wiki.querySelector('p');
	let desc = handleMarkdown(String(pTag));

	let pTag2 = wiki.querySelectorAll('p')[1];

	let moreDesc = handleMarkdown(String(pTag2));
	let syntax = handleMarkdown(String(wiki.querySelector('pre.syntaxbox.notranslate')));

	let returned = {
		title,
		mdnURL,
		syntax,
		description: desc,
		extendedDescription: moreDesc,
	}

	return returned;

}

export default searchMDN;
