import fs from "node:fs";
import { printList } from "./src/console.ts";
import { parsedToDocx } from "./src/docx.ts";
import { parsedToHtml } from "./src/html.ts";
import { parseString } from "./src/parse.ts";

const filestr = fs.readFileSync(`${process.argv[2]}.mkr`, "utf8");

const list = parseString(filestr);

const docx = parsedToDocx(list);

const html = parsedToHtml(list);

fs.writeFileSync(`${process.argv[2]}.html`, html);
fs.writeFileSync(`${process.argv[2]}.docx`, await docx);

console.log("Done!");

printList(list);
