from flask import Flask, render_template, request, session
import random

sample_board = "700000000006750209004090000400002090080000020050800003000010500103048600000000001"  # 样例棋盘
webSudoku = Flask(__name__)


@webSudoku.route("/")  # 主界面
def root():
    return render_template("sudoku.html")


@webSudoku.route("/sudokuMain")  # 正式进行数独的界面
def sudokuMain():
    file = open('sudoku.data', "r")
    board = sample_board
    current_user, current_level = "未登录", 5  # 默认值
    if "current_user" in session:
        current_user = session["current_user"]
    if "current_level" in session:
        current_level = session["current_level"]
    Lines = file.read()
    lines = Lines.splitlines()
    lineCount = len(lines)
    if lineCount > 0:
        lines.sort(key=lambda x: session[x])  # 按照难度排序
        level = int(current_level / 10 * (lineCount - 1))
        ran = random.randint(level, lineCount - 1)  # 在难度区间之中随机选择
        board = lines[ran]
        session["current_board"] = board
        file.close()
    return render_template("sudokuMain.html", boardData=board, userData=current_user)


@webSudoku.route("/sudokuData")  # 录入数据的界面
def sudokuData():
    return render_template("sudokuData.html")


@webSudoku.route("/register")  # 注册登录页面
def Register():
    return render_template("register.html")


@webSudoku.route("/success", methods=("GET",))  # 显示数独成功完成并重新开始对局界面
def success():
    score = 60  # 默认值
    time = request.args.get("time")
    current_user, current_level = "", 5
    if "current_user" in session:
        current_user = session["current_user"]
    if "current_level" in session:
        current_level = session["current_level"]
    if time:
        score = int(time)
    board = session["current_board"]
    board_level = session[board]
    if score < 60:  # 题目太简单、用户太强
        current_level += 1
        board_level -= 1
        if current_level > 10:
            current_level = 10
        if board_level < 0:
            board_level = 0
        session[board] = board_level
    else:  # 题目太难，用户太弱
        if score > 180:
            current_level -= 1
            board_level += 1
            if current_level < 0:
                current_level = 0
            if board_level > 10:
                board_level = 10
            session[board] = board_level
    if current_user in session:
        session[current_user] = current_level
    return render_template("success.html", score=score)


@webSudoku.route("/sudokuSave", methods=("POST",))  # 录入数度数据之后，保存数独数据，提示返回首页界面
def sudokuSave():
    Str = request.form["strSudoku"]
    if Str[0].isdigit():  # 这是一局数独数据
        file = open("sudoku.data", "a")
        if len(Str) == 81:
            file.write(Str + "\n")  # 输入对局信息以及难度，默认难度为5
            session[Str] = 5
        else:
            print("error length" + str(len(Str)))
        file.close()
    else:  # 这是用户名,保存到session中
        if Str in session:
            session["current_level"] = session[Str]
        else:
            session[Str] = 5
            session["current_level"] = session[Str]
        session["current_user"] = Str
    return render_template("sudokuSave.html")


if __name__ == "__main__":
    webSudoku.config["SECRET_KEY"] = 'TPmi4aLWRbyVq8zu9v82dWYW1'
    webSudoku.run(host="0.0.0.0", port=80, debug=True)
