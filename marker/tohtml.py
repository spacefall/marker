from marker.parser import fromfile
from marker.classes import *


def tohtml(parsed_mkr: list[MarkerTypes], output_filename: str) -> None:
    final: str = (
        "<!DOCTYPE html>\n<html>\n<head>\n"
        +
        # '<link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">\n +
        "</head>\n<body>\n"
    )
    paragraph: bool = False
    # same message as in todocx
    # this is a very manual way of doing this, a more dynamic way would be better
    # but that would require a failsafe for when the script doesn't recognize the tag
    # so I think it's better to leave it like this for now
    h_level: int = 0
    infodict: dict[str, bool] = {
        k: False
        for k in [
            "h",  # header
            "b",  # bold
            "i",  # italic
            "s",  # strikethrough
            "u",  # underline
        ]
    }

    for elem in parsed_mkr:
        if (
            not isinstance(elem, Newline)
            # and not isinstance(elem, Header)
            and not paragraph
            and not infodict["h"]
        ):
            final += "<p>"
            paragraph = True

        match elem:
            case Header():
                if paragraph:
                    final += "</p>\n"
                    paragraph = False
                final += f"<h{elem.level}>"
                infodict["h"] = True
                h_level = elem.level
            case Bold():
                final += "<b>" if not infodict["b"] else "</b>"
                infodict["b"] = not infodict["b"]
            case Italic():
                final += "<i>" if not infodict["i"] else "</i>"
                infodict["i"] = not infodict["i"]
            case Strikethrough():
                final += "<s>" if not infodict["s"] else "</s>"
                infodict["s"] = not infodict["s"]
            case Underline():
                final += "<u>" if not infodict["u"] else "</u>"
                infodict["u"] = not infodict["u"]
            case Newline():
                if paragraph:
                    final += "</p>\n"
                    paragraph = False
                    # closing header tag
                elif infodict["h"]:
                    final += f"</h{h_level}>\n"
                    infodict["h"] = False
                    h_level = 0
                else:
                    final += "<br>\n"
            case str():
                final += elem

    final += "</body>\n</html>"

    if output_filename[-5:] != ".html":
        output_filename += ".html"

    with open(output_filename, "w") as f:
        f.write(final)


if __name__ == "__main__":
    tohtml(fromfile("test.mkr"), "test.html")
