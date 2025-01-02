import { type FormattedString, HeaderFormat, InlineFormat, LineFormat } from "./types.ts";

const htmlPrefix = "<html><head><title>Document</title></head><body>";
const htmlSuffix = "</body></html>";

const tags = new Map<number, [string, string]>([
	[InlineFormat.Bold, ["<b>", "</b>"]],
	[InlineFormat.Italics, ["<i>", "</i>"]],
	[InlineFormat.Underline, ["<u>", "</u>"]],
	[InlineFormat.Strikethrough, ["<span style='text-decoration: line-through;'>", "</span>"]],
	[InlineFormat.Superscript, ["<sup>", "</sup>"]],
	[InlineFormat.Subscript, ["<sub>", "</sub>"]],
	[InlineFormat.Code, ["<code>", "</code>"]],

	[LineFormat.LineBreak, ["<br>", "<br>"]],
	[LineFormat.SeparatorBreak, ["<hr>", "<hr>"]],

	[HeaderFormat.Level1, ["<h1>", "</h1>"]],
	[HeaderFormat.Level2, ["<h2>", "</h2>"]],
	[HeaderFormat.Level3, ["<h3>", "</h3>"]],
	[HeaderFormat.Level4, ["<h4>", "</h4>"]],
	[HeaderFormat.Level5, ["<h5>", "</h5>"]],
	[HeaderFormat.Level6, ["<h6>", "</h6>"]],
]);

export function parsedToHtml(parsedList: FormattedString): string {
	const enabledTags: number[] = [];
	let htmlStr = "";
	for (const elem of parsedList) {
		if (typeof elem === "number") {
			const idx = enabledTags.indexOf(elem);
			if (idx !== -1) {
				enabledTags.splice(idx, 1);
				const htmlTag = tags.get(elem);
				if (htmlTag) htmlStr += htmlTag[1];
			} else {
				enabledTags.push(elem);
				const htmlTag = tags.get(elem);
				if (htmlTag) htmlStr += htmlTag[0];
			}
		} else {
			htmlStr += elem;
		}
	}
	return htmlPrefix + htmlStr + htmlSuffix;
}
