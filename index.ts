import { printList } from "./src/console.ts";
import { parsedToDocx } from "./src/docx.ts";
import { parsedToHtml } from "./src/html.ts";
import { parseString } from "./src/parse.ts";

const filename = "test2.mkr";
const file = Bun.file(filename);
const filestr = await file.text();

const list = parseString(filestr);

const docx = parsedToDocx(list);

const html = parsedToHtml(list);

await Bun.write("test.html", html);
await Bun.write("test.docx", await docx);

console.log("Done!");

printList(list);
