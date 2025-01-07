# marker

A basic markdown-like language and parser for writing notes.  
The parser converts .mkr files to docx and html. After conversion the parser prints the output to console.

## Usage
This should run on node, but it has been made using `bun init` and its default typescript options might require some tweaking to compile for node.
Once setup (with bun install, npm install, etc.), you can run the parser with `bun index.js <mkr_file>` (the file must be without extension).

## Syntax
### Inline
Marker supports the following tags for inline formatting:  
- `**bold**` => **bold**  
- `//italic//` => *italic*  
- `__underline__` => <ins>underline</ins>  
- `--strikethrough--` => ~strikethrough~  
- `^^inline code^^` => `inline code`  
- `''superscript''` => <sup>superscript</sup>
- `,,subscript,,` => <sub>subscript</sub>

### Headers
Marker supports headers from level 1-6 with the following syntax: `#<level> `  
This is a valid example: `#1 test`, but these aren't `#2test`, `#9 test`  

### Additional features
Marker will interpret a line containing only "###" as a separator, similar to this:
***

Like markdown a tag escaped with a backslash is not parsed: `**hello \** world**` => **hello \*\* world**  
In addition putting a backslash at the end of the line will put everything from the current and next line in the same line:
```
for example this line \
and this line will be together
```
when converted becomes:
`for example this line and this line will be together`
