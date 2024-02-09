class Header:
    def __init__(self, level: int) -> None:
        if level < 1:
            self.level = 1
        elif level > 6:
            self.level = 6
        else:
            self.level = level

    def __str__(self) -> str:
        htags: str = ""
        for _ in range(self.level):
            htags += "#"
        return htags

    def __int__(self) -> int:
        return self.level

    def __repr__(self) -> str:
        return f"Header(level: {self.level})"


class Bold:
    def __init__(self) -> None:
        pass

    def __str__(self) -> str:
        return "*"

    def __int__(self) -> int:
        return -1

    def __repr__(self) -> str:
        return "Bold()"


class Italic:
    def __init__(self) -> None:
        pass

    def __str__(self) -> str:
        return "/"

    def __int__(self) -> int:
        return -1

    def __repr__(self) -> str:
        return "Italic()"


class Strikethrough:
    def __init__(self) -> None:
        pass

    def __str__(self) -> str:
        return "-"

    def __int__(self) -> int:
        return -1

    def __repr__(self) -> str:
        return "Strikethrough()"


class Underline:
    def __init__(self) -> None:
        pass

    def __str__(self) -> str:
        return "_"

    def __int__(self) -> int:
        return -1

    def __repr__(self) -> str:
        return "Underline()"


class Newline:
    def __init__(self) -> None:
        pass

    def __str__(self) -> str:
        return "\n"

    def __int__(self) -> int:
        return -1

    def __repr__(self) -> str:
        return "Newline()"


MarkerTypes = str | Newline | Header | Bold | Italic | Strikethrough | Underline
