from marker.classes import MarkerTypes, Newline, Header
from marker.general_funcs import inrange
import marker.rules as rules


def parse(lines: list[str]) -> list[MarkerTypes]:
    parsed_lines: list[list[MarkerTypes]] = []

    # Here every line is converted to a list of characters, kinda of a bad solution ik
    # then inlines are parsed and replaced with their respective tags
    for line in lines:
        # str -> list of single characters from stripped line
        line_list: list[MarkerTypes] = [char for char in line.strip()]

        # if line is empty, skip
        if len(line_list) == 0:
            continue

        # instead if the line is just a cancel_tag (like \) then we add a newline and skip
        if len(line_list) == 1 and line_list[0] == rules.cancel_tag:
            parsed_lines.append([Newline()])
            continue

        # list of cancel_tag indexes to "hide"
        hide_cancel: list[int] = []

        # a kinda ehh way to store if an inline has been encountered and where
        inline_status: dict[MarkerTypes, tuple[bool, int]] = {
            key: (False, 0) for key, _ in rules.inlines.items()
        }

        # parses all tags in inlines
        # this is also a long chain of ifs and fors, and it's shit but that's how I did it
        for idx, char in enumerate(line_list):
            for inl_char, inl_type in rules.inlines.items():
                if char == inl_char[0]:
                    # checks if tag is not cancelled
                    if line[idx - 1] != rules.cancel_tag[0]:
                        # checking if another inline tag was previously found
                        if inline_status[char][0]:
                            line_list[inline_status[char][1]] = inl_type
                            line_list[idx] = inl_type
                            inline_status[char] = (False, 0)
                        else:
                            inline_status[char] = (True, idx)
                    else:
                        hide_cancel.append(idx - 1)

        if line_list[-1] != rules.cancel_tag:
            line_list.append(Newline())
        else:
            line_list.append(" ")
            hide_cancel.append(len(line_list) - 2)

        # hide cancel_tag
        for i in hide_cancel:
            line_list[i] = ""

        # parse header
        if line_list[0] == rules.header_tag[0]:
            h_level: int = 0
            # count tags
            while line_list[h_level] == rules.header_tag[0]:
                h_level += 1

            if h_level > 0:
                # if there's a space after the tags, apply the header tag
                # locked the header max level to 3, level 6 is too much imo
                if line_list[h_level] == " " and inrange(h_level, 1, 4):
                    line_list = [Header(h_level)] + line_list[h_level + 1 :]

        parsed_lines.append(line_list)
    print(_recompose_lines(parsed_lines))
    return _recompose_lines(parsed_lines)


# smushes together characters into strings into lines into a single list
def _recompose_lines(lines: list[list[MarkerTypes]]) -> list[MarkerTypes]:
    recomposed_lines: list[MarkerTypes] = []
    for line in lines:
        # curr_line: list[any] = []
        curr_str: str = ""
        for char in line:
            # if character just add to list
            if isinstance(char, str):
                curr_str += char
            # if it's not a character
            #    if header, add a newline once this one finishes
            #    if current string is not empty, add it to the list after stripping and adding a space
            else:
                if curr_str != "":
                    recomposed_lines.append(curr_str)
                    curr_str = ""
                recomposed_lines.append(char)
        if curr_str != "":
            recomposed_lines.append(curr_str)

    return recomposed_lines


# opens a file and passes it to the parse function above
def fromfile(filename: str) -> list[MarkerTypes]:
    try:
        file_lines: list[str] = []
        with open(filename) as f:
            file_lines = f.readlines()
            # file_lines = [line for line in f]
            # for line in f:
            #     file_lines.append(line)
        return parse(file_lines)
    except FileNotFoundError:
        print(f"File {filename} not found")
        return []
