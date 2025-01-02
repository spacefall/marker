export type FormattedString = (string | number)[];

export enum LineFormat {
	LineBreak = 0,
	SeparatorBreak = 1,
}

export enum InlineFormat {
	Bold = 10,
	Italics = 11,
	Underline = 12,
	Strikethrough = 13,
	Superscript = 14,
	Subscript = 15,
	Code = 16,
}

export enum HeaderFormat {
	Level1 = 21,
	Level2 = 22,
	Level3 = 23,
	Level4 = 24,
	Level5 = 25,
	Level6 = 26,
}
