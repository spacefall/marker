import fs from "node:fs";
import { printList } from "./src/console.ts";
import { parsedToDocx } from "./src/docx.ts";
import { parsedToHtml } from "./src/html.ts";
import { parseString } from "./src/parse.ts";

const filestr = fs.readFileSync("test2.mkr", "utf8");

const list = parseString(filestr);

const docx = parsedToDocx(list);

const html = parsedToHtml(list);

fs.writeFileSync("test.html", html);
fs.writeFileSync("test.docx", await docx);

console.log("Done!");

printList(list);
