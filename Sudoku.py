#数独
dataSudoku="700000000006750209004090000400002090080000020050800003000010500103048600000000001"
from flask import Flask,render_template,request

webSudoku=Flask(__name__)

@webSudoku.route("/") #decide to input data or start a sudoku
def root():
    return webSudoku.send_static_file("sudoku.html")

@webSudoku.route("/sudokuMain")
def sudokuMain():
	return render_template("sudokuMain.html")

@webSudoku.route("/sudokuData")
def sudokuData():
	return render_template("sudokuData.html")

@webSudoku.route("/sudokuSave",methods=("POST",))
def sudokuSave():
	str=request.form["strSudoku"]
	file=open("sudoku.data","a")
	file.write(str+"\n")
	return render_template("sudokuSave.html")

if __name__=="__main__": #新增代码
	webSudoku.run(host="0.0.0.0",port=80,debug=True)
