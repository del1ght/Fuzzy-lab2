var result = "<table border=1>";
for (var i = 0; i < 10; i++) {
    result += "<tr>";
    for (var j = 0; j < 10; j++) {
        result += "<td>" + '-------' + "</td>";
    }
    result += "</tr>";
}
result += "</table>";

document.getElementById('cont').innerHTML = result;

function firstTable() {
    let arr1 = [];
    let maxArr1;
    let funsArr1 = [];
    for (let i = 1; i < 11; i++) {
        arr1.push(Number(document.getElementById(`a${i}`).value));
    }

    arr1 = subtractionArrayFunS(arr1);

    maxArr1 = maxElemOf2dArray(arr1)

    funsArr1 = arr1.map((arr) => arr.map((a) => (FunS(a, maxArr1).toFixed(3))));

    makeTableHTML(funsArr1)

    properties(funsArr1)

}

function secondTable() {
    let arr2 = [];
    let funtArr2 = [];
    let maxArr2;
    let minArr2;
    for (let i = 1; i < 11; i++) {
        arr2.push(Number(document.getElementById(`b${i}`).value));
    }

    arr2 = subtractionArrayFunT(arr2);

    maxArr2 = maxElemOf2dArray(arr2);

    console.log(minArr2)
    funtArr2 = arr2.map((arr) => arr.map((a) => (FunT(a, maxArr2).toFixed(3))));

    makeTableHTML(funtArr2);

    properties(funtArr2)

}

function subtractionArrayFunS(arr) {
    tmpArr = [
        []
    ];
    for (let i = 0; i < arr.length; i++) {
        tmpArr[i] = [];

        for (let j = 0; j < arr.length; j++) {
            res = (arr[i] - arr[j]);
            tmpArr[i][j] = Number(res.toFixed(3));

        }
    }
    return tmpArr
}

function subtractionArrayFunT(arr) {
    tmpArr = [
        []
    ];
    for (let i = 0; i < arr.length; i++) {
        tmpArr[i] = [];

        for (let j = 0; j < arr.length; j++) {
            res = Math.abs(arr[i] - arr[j]);
            tmpArr[i][j] = Number(res.toFixed(3));

        }
    }
    return tmpArr
}

function maxElemOf2dArray(arr) {
    max = arr[0][0]
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] > max) max = arr[i][j]
        }
    }
    return max
}

function FunS(a, max) {
    mean = max / 2
    if (a < 0) return 0
    else if (a >= 0 && a <= mean) return 2 * (a / max) ** 2
    else if (a >= mean && a <= max)
        return 1 - 2 * ((a - max) / (max - 0) * (a - max) / (max - 0))
    else if (a > max) return 1
}

function FunT(x, max) {
    if (x >= 0 && x <= max) return (max - x) / max;
    else return 0;
}

function makeTableHTML(myArray) {
    var result = "<table border=1>";
    for (var i = 0; i < myArray.length; i++) {
        result += "<tr>";
        for (var j = 0; j < myArray[i].length; j++) {
            if (i == j) {
                result += "<td bgcolor='lightblue'>" + myArray[i][j] + "</td>";
            } else {
                result += "<td>" + myArray[i][j] + "</td>";
            }

        }
        result += "</tr>";
    }
    result += "</table>";

    document.getElementById('cont').innerHTML = result;
}


function properties(arr) {

    // рефлексивность
    refl = true;
    strongRefl = true;
    strongAntiRefl = true;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][i] != 1) {
            refl = false;
            break
        }
    }

    if (refl) {
        strongAntiRefl = false;
        outerLoop: for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (i != j) {
                    if (arr[i][j] == 1) {
                        strongRefl = false;
                        break outerLoop
                    }
                }
            }
        }
    } else {
        strongRefl = false;
        outerLoop: for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (i != j) {
                    if (arr[i][j] == 0) {
                        strongAntiRefl = false;
                        break outerLoop
                    }
                }
            }
        }
    }


    // симметричность

    simm = true;
    antiSimm = true;
    aSimm = true

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {

            if (arr[i][j] != arr[j][i]) {

                simm = false;
            }

            if (arr[i][i] == 1) {
                aSimm = false;

                if (Math.min(arr[i][j], arr[j][i]) != 0) {
                    antiSimm = false;
                }
            } else {
                antiSimm = false;

                if (Math.min(arr[i][j], arr[j][i]) != 0) {
                    aSimm = false;
                }
            }
        }

    }

    //транзитивность

    tranz = true;
    minArr = []

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            for (let k = 0; k < arr.length; k++) {
                minArr.push(Math.min(arr[i][k], arr[k][j]));

            }
            mm = minArr[0];

            for (let l = 1; l < arr.length; l++) {
                if (mm < minArr[l]) {
                    mm = minArr[l];
                }
            }

            if (arr[i][j] < mm) {
                tranz = false;
            }
        }
    }

    // линейность

    strongLinear = true;
    weakLinear = true;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (!(arr[i][j] == 1 || arr[j][i] == 1)) {
                strongLinear = false;
            }
            if (!(arr[i][j] > 0 || arr[j][i] > 0)) {
                weakLinear = false;
            }
        }
    }


    // вывод в fieldset

    document.getElementById('prop1').innerHTML = refl ? (strongRefl ? 'Сильно' : 'Слабо') : 'Нет';
    document.getElementById('prop2').innerHTML = !refl ? (strongAntiRefl ? 'Сильно' : 'Слабо') : 'Нет';
    document.getElementById('prop3').innerHTML = simm ? 'Да' : 'Нет';
    document.getElementById('prop4').innerHTML = antiSimm ? 'Да' : 'Нет';
    document.getElementById('prop5').innerHTML = aSimm ? 'Да' : 'Нет';
    document.getElementById('prop6').innerHTML = strongLinear ? 'Сильная' : (weakLinear ? 'Слабая' : 'Нет');
    document.getElementById('prop7').innerHTML = tranz ? 'Да' : 'Нет';

}