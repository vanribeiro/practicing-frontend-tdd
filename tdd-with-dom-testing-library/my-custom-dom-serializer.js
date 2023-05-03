import { JSDOM } from 'jsdom';

const readHtmlFile = async () => await JSDOM.fromFile('index.html');

async function serialize () {
    return new JSDOM(await readHtmlFile().then(htmlFile => htmlFile.serialize()), { runScripts: 'dangerously' });
}

export default serialize;