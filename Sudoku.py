# 数独
# 样例棋盘"700000000006750209004090000400002090080000020050800003000010500103048600000000001"
from flask import Flask, render_template, request
import random

webSudoku = Flask(__name__)


@webSudoku.route("/")  # decide to input data or start a sudoku
def root():
    return webSudoku.send_static_file("sudoku.html")


@webSudoku.route("/sudokuMain")
def sudokuMain():
    file = open('sudoku.data', "r")
    Lines = file.read()
    lines = Lines.splitlines()
    lineCount = len(lines)
    ran = random.randint(0, lineCount - 1)
    file.close()
    return render_template("sudokuMain.html", boardData=lines[ran])


@webSudoku.route("/sudokuData")
def sudokuData():
    return render_template("sudokuData.html")


@webSudoku.route("/sudokuSave", methods=("POST",))
def sudokuSave():
    str = request.form["strSudoku"]
    file = open("sudoku.data", "a")
    if len(str) == 81:
        file.write(str + "\n")
    else:
        print(len(str))
    file.close();
    return render_template("sudokuSave.html")


if __name__ == "__main__":  # 新增代码
    webSudoku.run(host="0.0.0.0", port=80, debug=True)
