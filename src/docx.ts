import * as docx from "docx";
import { type FormattedString, HeaderFormat, InlineFormat, LineFormat } from "./types.ts";

const headerMap = new Map<
	number,
	"Heading1" | "Heading2" | "Heading3" | "Heading4" | "Heading5" | "Heading6" | "Title" | undefined
>([
	[HeaderFormat.Level1, docx.HeadingLevel.HEADING_1],
	[HeaderFormat.Level2, docx.HeadingLevel.HEADING_2],
	[HeaderFormat.Level3, docx.HeadingLevel.HEADING_3],
	[HeaderFormat.Level4, docx.HeadingLevel.HEADING_4],
	[HeaderFormat.Level5, docx.HeadingLevel.HEADING_5],
	[HeaderFormat.Level6, docx.HeadingLevel.HEADING_6],
]);

export async function parsedToDocx(parsedList: FormattedString): Promise<Buffer<ArrayBufferLike>> {
	const enabledTags: number[] = [];
	const paragraphs = [];
	let textRuns = [];
	let currStr = "";
	let linebreak = 0;
	let heading = undefined;

	for (const elem of parsedList) {
		if (typeof elem === "number") {
			const idx = enabledTags.indexOf(elem);

			if (currStr !== "") {
				textRuns.push(createTextRun(enabledTags, currStr, linebreak));
				linebreak = 0;
				currStr = "";
			}

			if (elem === LineFormat.LineBreak || elem === LineFormat.SeparatorBreak) {
				paragraphs.push(
					new docx.Paragraph({
						children: textRuns,
						heading: heading,
						thematicBreak: elem === LineFormat.SeparatorBreak,
					}),
				);
				heading = undefined;
				textRuns = [];
			} else if (headerMap.get(elem)) {
				heading = headerMap.get(elem);
			}

			if (idx !== -1) {
				enabledTags.splice(idx, 1);
			} else {
				enabledTags.push(elem);
			}
		} else {
			currStr += elem;
		}
	}
	textRuns.push(createTextRun(enabledTags, currStr, linebreak));
	paragraphs.push(
		new docx.Paragraph({
			children: textRuns,
			heading: heading,
		}),
	);

	const coolDoc = new docx.Document({
		sections: [
			{
				children: paragraphs,
			},
		],
	});

	return await docx.Packer.toBuffer(coolDoc, true);
}

function createTextRun(enabledTags: number[], text: string, linebreak: number): docx.TextRun {
	return new docx.TextRun({
		text: text,
		bold: enabledTags.includes(InlineFormat.Bold),
		italics: enabledTags.includes(InlineFormat.Italics),
		underline: enabledTags.includes(InlineFormat.Underline) ? { type: "single" } : undefined,
		strike: enabledTags.includes(InlineFormat.Strikethrough),
		superScript: enabledTags.includes(InlineFormat.Superscript),
		subScript: enabledTags.includes(InlineFormat.Subscript),
		font: enabledTags.includes(InlineFormat.Code) ? { name: "Courier New" } : { name: "Arial" },
		break: linebreak,
	});
}
