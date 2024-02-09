from typing import Any


def inrange(value: Any, start: int, end: int) -> bool:
    if isinstance(value, str):
        if value.isdigit():
            return int(value) in range(start, end)
        else:
            return False
    elif isinstance(value, int):
        return value in range(start, end)
    else:
        return False
