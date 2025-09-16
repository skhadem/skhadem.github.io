import json
import time
import random
from functools import lru_cache

import numpy as np
from termcolor import colored

BLOCK_CHAR = "◼"


class Piece:
    def __init__(self, shape: np.ndarray, color: str, _id: int):
        self.shape = shape  # 2D numpy array with 1s and 0s
        self.color = color
        self._id = _id

    def cells(self) -> list[tuple[int, int]]:
        coords = []
        for i in range(self.shape.shape[0]):
            for j in range(self.shape.shape[1]):
                if self.shape[i, j] == 1:
                    coords.append((j, i))  # (x,y)
        return coords

    def rotate(self) -> "Piece":
        return Piece(np.rot90(self.shape), self.color, self._id)

    def flip(self) -> "Piece":
        return Piece(np.fliplr(self.shape), self.color, self._id)


PIECES = [
    Piece(shape=np.array([[1, 1], [1, 1], [1, 1]]), color="red", _id=1),
    Piece(shape=np.array([[1, 0], [1, 1], [1, 1]]), color="blue", _id=2),
    Piece(shape=np.array([[1, 1], [1, 0], [1, 1]]), color="green", _id=3),
    Piece(shape=np.array([[1, 0], [1, 1], [1, 0], [1, 0]]), color="yellow", _id=4),
    Piece(shape=np.array([[1, 0], [1, 0], [1, 0], [1, 1]]), color="magenta", _id=5),
    Piece(shape=np.array([[1, 0, 0], [1, 0, 0], [1, 1, 1]]), color="cyan", _id=6),
    Piece(shape=np.array([[0, 1, 1], [0, 1, 0], [1, 1, 0]]), color="grey", _id=7),
    Piece(shape=np.array([[0, 1], [1, 1], [1, 0], [1, 0]]), color="white", _id=8),
]
ID_TO_PIECE = {p._id: p for p in PIECES}


class Board:
    def __init__(self, target_date: set[str] = set()):
        self.base_board = [
            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", ""],
            ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
            ["1", "2", "3", "4", "5", "6", "7"],
            ["8", "9", "10", "11", "12", "13", "14"],
            ["15", "16", "17", "18", "19", "20", "21"],
            ["22", "23", "24", "25", "26", "27", "28"],
            ["29", "30", "31", "", "", "", ""],
        ]
        self.rows = 7
        self.cols = 7
        self.target_date = target_date
        self.setup_board()

    def setup_board(self):
        self.board = np.zeros((self.rows, self.cols), dtype=int)
        for i, row in enumerate(self.base_board):
            for j, cell in enumerate(row):
                if cell == "" or cell in self.target_date:
                    self.board[i, j] = -1
                else:
                    # empty and valid
                    self.board[i, j] = 0

    def can_place(self, cells: list[tuple[int, int]], ox: int, oy: int) -> bool:
        for dx, dy in cells:
            x, y = ox + dx, oy + dy
            if not (0 <= x < self.cols and 0 <= y < self.rows):
                return False
            if self.board[y, x] != 0:  # already covered or invalid
                return False
        return True

    def place(self, pid: int, ox: int, oy: int, cells: list[tuple[int, int]]):
        for dx, dy in cells:
            self.board[oy + dy, ox + dx] = pid

    def remove(self, ox: int, oy: int, cells: list[tuple[int, int]]):
        for dx, dy in cells:
            self.board[oy + dy, ox + dx] = 0

    def print_board(self):
        print()
        for i, row in enumerate(self.board):
            print(
                " ".join(
                    f"{self.base_board[i][j]:^5}"
                    if cell == 0 or cell == -1 or cell == -2
                    else colored(f"{BLOCK_CHAR:^5}", ID_TO_PIECE[cell].color)
                    for j, cell in enumerate(row)
                )
            )
        print()


@lru_cache(maxsize=None)
def get_orientations(pid: int) -> list[list[tuple[int, int]]]:
    base = ID_TO_PIECE[pid]
    seen = set()
    result = []
    shape = base
    for _ in range(4):
        for variant in (shape, shape.flip()):
            coords = tuple(variant.cells())
            if coords not in seen:
                seen.add(coords)
                result.append(list(coords))
        shape = shape.rotate()
    return result


ITER_COUNT = 0


def solve(board: Board, pieces_left: tuple[int, ...]) -> Board | None:
    global ITER_COUNT
    ITER_COUNT += 1
    if not pieces_left:
        return board

    for y in range(board.rows):
        for x in range(board.cols):
            if board.board[y, x] == 0:
                for idx, pid in enumerate(pieces_left):
                    for orient in get_orientations(pid):
                        if board.can_place(orient, x, y):
                            board.place(pid, x, y, orient)
                            sol = solve(
                                board, pieces_left[:idx] + pieces_left[idx + 1 :]
                            )
                            if sol is not None:
                                return sol
                            board.remove(x, y, orient)
                break
        else:
            continue
        break

    return None


valid_months = {
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
}
valid_days = {
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
}

if __name__ == "__main__":
    all_solutions = {}
    start_time = time.time()
    for month in valid_months:
        for day in valid_days:
            target_date = {month, day}
            board = Board(target_date=target_date)
            pieces = tuple(random.sample(list(ID_TO_PIECE.keys()), len(ID_TO_PIECE)))
            solution = solve(board, pieces)
            if solution is not None:
                all_solutions[f"{month}_{day}"] = solution.board.tolist()
                solution.print_board()
            json.dump(all_solutions, open("solutions.json", "w"))
    print(f"Total time taken: {time.time() - start_time:0.2f} seconds")
