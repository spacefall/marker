# Marker
A markup language made as a solution in search of a problem

## What is it?
As said above, this is a markup language created just because.
It's a simple language, kinda copied from markdown but more focused towards notetaking.

The parser (and language, I'm making it up as I go) is written (badly) in Python and is still in development.
The package also includes a converter to HTML and to MS Word.

## What can it do?
Not much at the moment:
- Headers (up to 3 levels) with `#`, `##` and `###` followed by a space
- Bold with `*text*`
- Italic with `/text/`
- Underline with `_text_`
- Strikethrough with `-text-` <!--Using dashes might not be so great of an idea-->
- Ignore tags with `\tag` 
  - e.g. `\*test\*` will not be bolded
- Weird newline behavior (this is not a bug, it's a feature, it actually is)
  - `\ ` at the end of the line will merge the next line with the current one
  - `\ ` on an empty line will get parsed as a new blank line
  - an empty line will be ignored

There's a lot of stuff planned though, like:
- Tables
- Lists
- Links
- Subscripts and superscripts

and more