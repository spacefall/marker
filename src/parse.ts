import { type FormattedString, InlineFormat, LineFormat } from "./types.ts";

export function parseString(str: string): FormattedString {
	let inlined: FormattedString = [str.trim()];
	inlined = parseInline(inlined);
	inlined = parseNewline(inlined);
	inlined = parseHeadings(inlined);
	inlined = parseHashtags(inlined);
	return inlined;
}

const transfMap = new Map<string, number>([
	["*", InlineFormat.Bold],
	["/", InlineFormat.Italics],
	["_", InlineFormat.Underline],
	["-", InlineFormat.Strikethrough],
	["'", InlineFormat.Superscript],
	[",", InlineFormat.Subscript],
	["^", InlineFormat.Code],
]);

function parseInline(strArray: FormattedString): FormattedString {
	const parsedArray: FormattedString = [];
	let curStr = "";
	for (const elem of strArray) {
		if (typeof elem === "string") {
			for (let i = 0; i < elem.length; i++) {
				if (elem[i] === "\\" && elem[i + 1] === elem[i + 2] && transfMap.get(elem[i + 1])) {
					i += 2;
					curStr += elem[i] + elem[i];
					continue;
				}
				const transform = transfMap.get(elem[i]);
				if (transform && elem[i] === elem[i + 1]) {
					if (curStr !== "") {
						parsedArray.push(curStr);
						curStr = "";
					}
					parsedArray.push(transform);
					i++;
				} else {
					curStr += elem[i];
				}
			}
		} else {
			parsedArray.push(elem);
		}
	}
	parsedArray.push(curStr);
	return parsedArray;
}

function parseNewline(formatArray: FormattedString): FormattedString {
	const parsedArray: FormattedString = [];
	let curStr = "";
	for (const elem of formatArray) {
		if (typeof elem === "string") {
			for (let i = 0; i < elem.length; i++) {
				if (elem[i] === "\n") {
					if (curStr !== "") {
						parsedArray.push(curStr);
						curStr = "";
					}
					parsedArray.push(LineFormat.LineBreak);
				} else {
					if (elem[i] === "\\" && elem[i + 1] === "\n") {
						i++;
					} else {
						curStr += elem[i];
					}
				}
			}
		} else {
			if (curStr !== "") {
				parsedArray.push(curStr);
				curStr = "";
			}
			parsedArray.push(elem);
		}
	}
	parsedArray.push(curStr);
	return parsedArray;
}

// 20 is Header, this is added to the level (1-6)
function parseHeadings(formatArray: FormattedString): FormattedString {
	const parsedArray: FormattedString = [];
	let headerLevel = 0;
	for (const elem of formatArray) {
		if (typeof elem === "string") {
			if (elem[0] === "#" && elem[2] === " " && headerLevel === 0) {
				const level = Number.parseInt(elem[1]);
				if (level > 0 && level < 7) {
					headerLevel = level;
					parsedArray.push(20 + headerLevel);
					parsedArray.push(elem.substring(3));
					continue;
				}
			}
		} else {
			if (elem === LineFormat.LineBreak && headerLevel !== 0) {
				parsedArray.push(20 + headerLevel);
				headerLevel = 0;
			}
		}
		parsedArray.push(elem);
	}
	return parsedArray;
}

function parseHashtags(formatArray: FormattedString): FormattedString {
	const parsedArray: FormattedString = [];
	for (let i = 0; i < formatArray.length; i++) {
		const elem = formatArray[i];
		if (elem === LineFormat.LineBreak && formatArray[i + 1] === "###") {
			parsedArray.push(LineFormat.SeparatorBreak);
			i += 2;
		} else {
			parsedArray.push(elem);
		}
	}
	return parsedArray;
}
