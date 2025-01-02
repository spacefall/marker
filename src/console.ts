import { type FormattedString, HeaderFormat, InlineFormat, LineFormat } from "./types.ts";

const tags = new Map<number, string>([
	[InlineFormat.Bold, "\x1B[1m"],
	[InlineFormat.Italics, "\x1B[3m"],
	[InlineFormat.Underline, "\x1B[4m"],
	[InlineFormat.Strikethrough, "\x1B[9m"],
	[InlineFormat.Superscript, "\x1B[35m"],
	[InlineFormat.Subscript, "\x1B[34m"],
	[InlineFormat.Code, "\x1B[33m"],
]);

const reset = "\x1B[0m";

export function printList(parsedList: FormattedString) {
	console.log("Start --->");
	const currTags: string[] = [];
	for (const elem of parsedList) {
		if (typeof elem === "string") {
			process.stdout.write(elem);
		} else {
			const ansiTag = tags.get(elem);
			if (ansiTag) {
				if (currTags.includes(ansiTag)) {
					process.stdout.write(reset);
					currTags.splice(currTags.indexOf(ansiTag), 1);
					process.stdout.write(currTags.join(""));
				} else {
					process.stdout.write(ansiTag);
					currTags.push(ansiTag);
				}
				continue;
			}
			switch (elem) {
				case HeaderFormat.Level1:
				case HeaderFormat.Level2:
				case HeaderFormat.Level3:
				case HeaderFormat.Level4:
				case HeaderFormat.Level5:
				case HeaderFormat.Level6:
					for (let i = 20; i < elem; i++) {
						process.stdout.write("#");
					}
					break;

				case LineFormat.LineBreak:
					process.stdout.write("\n");
					break;

				case LineFormat.SeparatorBreak:
					process.stdout.write("\n---\n");
					break;

				default:
					process.stdout.write("??");
					break;
			}
		}
	}
	console.log("---> End");
}
