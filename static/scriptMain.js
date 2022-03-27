var board = new Array(9);
var board1 = new Array(9);
var error_exists = false;
var success = false;
var has_board_data = false;

for (var i = 0; i < 9; i++) { //一维长度为3
    board[i] = new Array(9).fill(0);
    board1[i] = new Array(9).fill(0);

}
var board0 = [
    [0, 3, 1, 8, 2, 0, 7, 0, 0],
    [0, 0, 0, 4, 0, 1, 0, 0, 3],
    [0, 8, 5, 9, 0, 0, 0, 0, 4],
    [0, 4, 0, 0, 1, 0, 2, 0, 9],
    [0, 0, 6, 5, 0, 2, 3, 0, 0],
    [1, 0, 2, 0, 7, 0, 0, 8, 0],
    [9, 0, 0, 0, 0, 3, 5, 1, 0],
    [2, 0, 0, 7, 0, 6, 0, 0, 0],
    [0, 0, 7, 0, 8, 9, 4, 6, 0]
]

function getBoard(i, j) {
    var name = `table .r${i+1} .c${j+1}`;
    return document.querySelector(name);
}

function checkBoard() {
    var count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ret = true;
    for (var i = 0; i < 9; ++i)
        for (var j = 0; j < 9; ++j) {
            $(`table .r${i+1} .c${j+1}`).removeClass('error');
        }
    for (var i = 0; i < 9; ++i) {
        var invalid = false;
        count.fill(0);
        for (var j = 0; j < 9; ++j) {
            var str = $(`table .r${i+1} .c${j+1}`).html();
            var num = 0;
            if (str != "") num = parseInt(str);

            if (num == 0) continue;
            if (count[num - 1] > 0) {
                invalid = true;
                break;
            } else {
                count[num - 1] = 1;
            }
        }
        if (invalid == true) {
            ret = false;
            for (var j = 0; j < 9; ++j)
                $(`table .r${i+1} .c${j+1}`).addClass('error');
        }
    }
    for (var j = 0; j < 9; ++j) {
        var invalid = false;
        count.fill(0);
        for (var i = 0; i < 9; ++i) {
            var str = $(`table .r${i+1} .c${j+1}`).html();
            var num = 0;
            if (str != "") num = parseInt(str);
            if (num == 0) continue;
            if (count[num - 1] > 0) {
                invalid = true;
                break;
            } else {
                count[num - 1] = 1;
            }
        }
        if (invalid == true) {
            ret = false;
            for (var i = 0; i < 9; ++i)
                $(`table .r${i+1} .c${j+1}`).addClass('error');
        }
    }
    success = true;
    for (var u = 0; u < 3; u++)
        for (var v = 0; v < 3; v++) {
            var invalid = false;
            count.fill(0);
            for (var i = 3 * u; i < 3 * u + 3; ++i)
                for (var j = 3 * v; j < 3 * v + 3; ++j) {
                    var str = $(`table .r${i+1} .c${j+1}`).html();
                    var num = 0;
                    if (str != "") num = parseInt(str);
                    if (num == 0) continue;
                    if (count[num - 1] > 0) {
                        invalid = true;
                        break;
                    } else {
                        count[num - 1] = 1;
                    }
                }
            for (var key = 0; key < 9; ++key) {
                if (count[key] == 0) success = false;
            }
            if (invalid == true) {
                ret = false;
                success = false;
                for (var i = 3 * u; i < 3 * u + 3; ++i)
                    for (var j = 3 * v; j < 3 * v + 3; ++j)
                        $(`table .r${i+1} .c${j+1}`).addClass('error');
            }
        }
    return ret;
}

function inputNum() {
    var num = prompt('input a number', "0");
    num = parseInt(num);
    if (!(num >= 0 && num <= 9)) {
        alert('incorrect input');
        return;
    }
    var str = num.toString();
    if (num == 0) str = ""
    $(this).html(str);
    if (checkBoard() == false) {
        error_exists = true;
        $('.menu .info .content').html("A confliction occured!");
    } else {
        $('.menu .info .content').html("enjoy sudoku!");
    }
    if (success == true) {
        $('.menu .info .content').html("You make it.Congratulations!");
    }
}

function restart() {
    initBoard();
    showBoard();
    checkBoard();
}

function initBoard() {
    if (has_board_data == true) {
        boardCopy(board1);
    } else {
        boardCopy(board0);
    }
    $('.menu .restart').unbind();
    $('.menu .restart').mouseover(function() {
        $(this).css("background-color", "gray")
    });
    $('.menu .restart').mouseout(function() {
        $(this).css("background-color", "silver")
    });
    $('.menu .restart').click(restart);
    $('.menu .info .content').html("enjoy sudoku!");
    for (var i = 0; i < 9; ++i) {
        for (var j = 0; j < 9; ++j) {
            $(`table .r${i+1} .c${j+1}`).unbind();
            if (board[i][j] != 0) {
                $(`table .r${i+1} .c${j+1}`).addClass('fix')
            } else {
                $(`table .r${i+1} .c${j+1}`).click(inputNum);
                $(`table .r${i+1} .c${j+1}`).removeClass('fix');
            }
        }
    }
}

function showBoard() {
    for (var i = 0; i < 9; ++i) {
        for (var j = 0; j < 9; ++j) {
            var content = board[i][j] != 0 ? board[i][j].toString() : "";
            var point = getBoard(i, j);
            point.innerHTML = content;
        }
    }
}

function init() {
    var data = $('#boardData').html();
    console.log(data);
    if (data.length == 81) {
        has_board_data = true;
        for (var k = 0; k < data.length; k++) {
            var i = Math.floor(k / 9),
                j = k % 9;
            board1[i][j] = data[k];
        }
    }
}

function boardGet() {
    for (var i = 0; i < 9; ++i)
        for (var j = 0; j < 9; ++j) {
            var str = $(`table .r${i+1} .c${j+1}`).html();
            var num = 0;
            if (str != "") {
                num = ParseInt(str);
            }
            board[i][j] = num;
        }
}

function boardCopy(sourceBoard) {
    for (var i = 0; i < 9; ++i)
        for (var j = 0; j < 9; ++j)
            board[i][j] = sourceBoard[i][j];
}



function main() {
    init();
    initBoard();
    showBoard();
}
main();