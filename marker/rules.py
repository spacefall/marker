from marker.classes import *

# it's obvious no?
# yeah, this was to help with deciding tags, but then I just embedded the tag with the class by returning the tag when
# converting the class to a string, and I'm just too lazy to convert the parser, so it's staying like this for a bit
inlines: dict[str, MarkerTypes] = {
    str(Bold()): Bold(),
    str(Italic()): Italic(),
    str(Strikethrough()): Strikethrough(),
    str(Underline()): Underline(),
}
# Note to self: when you're not lazy, you can use typing.get_args(MarkerTypes()) to get a list of classes in the union
# and loop though that instead of this dict to parse inlines

cancel_tag: str = "\\"  # stops a tag from being parsed if placed before tag, becomes invisible if used
header_tag: str = "#"  # header
