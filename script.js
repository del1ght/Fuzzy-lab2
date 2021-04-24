function firstTable(){
    let arr1 = [];
    let maxArr1;
    let funsArr1 = [];
    for (let i = 1; i < 11; i++) {
        arr1.push(Number(document.getElementById(`a${i}`).value));
    }

    arr1 = subtractionArray(arr1);

    maxArr1 = maxElemOf2dArray(arr1)

    funsArr1 = arr1.map((arr) => arr.map((a) => (FunS(a, maxArr1).toFixed(3))));

    makeTableHTML(funsArr1)

    properties(funsArr1)
    
}

function secondTable(){
    let arr2 = [];
    let funtArr2 = [];
    let maxArr2;
    let minArr2;
    for (let i = 1; i < 11; i++) {
        arr2.push(Number(document.getElementById(`b${i}`).value));
    }

    arr2 = subtractionArray(arr2);

    maxArr2 = maxElemOf2dArray(arr2);
    minArr2 = -maxArr2;
    funtArr2 = arr2.map((arr) => arr.map((a) => (FunT(a, minArr2, maxArr2).toFixed(3))));
    
    makeTableHTML(funtArr2);

    properties(funtArr2)

}
function subtractionArray(arr){
    tmpArr = [[]];
    for (let i = 0; i < arr.length; i++) {
        tmpArr[i] = [];

        for (let j = 0; j < arr.length; j++) {
            res = arr[i] - arr[j];
            tmpArr[i][j] = Number(res.toFixed(3));

        }
    }
    return tmpArr
}

function maxElemOf2dArray(arr){
    max = arr[0][0]
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] > max) max = arr[i][j]
        }
    }
    return max
}

function FunS(a, max){
    mean = max / 2
    if (a < 0) return 0
    else if (a >= 0 && a <= mean) return 2 * (a / max) ** 2
    else if (a >= mean && a <= max) 
        return 1 - 2 * ((a - max) / (max - 0) * (a - max) / (max - 0))
    else if (a > max) return 1
}

function FunT(a, min, max){
    if (a <= min) return 0
    else if (a >= min && a <= 0) return (a + max) / max
    else if (a >= 0 && a <= max) return (max - a) / max
    else if (a >= max) return 0 
}
function makeTableHTML(myArray) {
    var result = "<table border=1>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<td>"+myArray[i][j]+"</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    document.getElementById('cont').innerHTML = result;
}


function properties(arr){

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
    
    if (refl){
        outerLoop: for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if ( i != j ){
                    if (arr[i][j] == 1){
                        strongRefl = false;
                        break outerLoop
                    }
                }
            } 
        }
    }
    else{
        outerLoop: for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if ( i != j ){
                    if (arr[i][j] == 0){
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

            if (arr[i][j] != arr[j][i]){

                simm = false;
            }

            if (i != j){   // возможно тут неправильно и в будущем надо будет исправить 

                if (arr[i][j] != 0 || arr[j][i] != 0){

                    antiSimm = false; // 

                }
            }

            if (arr[i][j] != 0 || arr[j][i] != 0){

                aSimm = false;

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
                if (mm < minArr[l]){
                    mm = minArr[l];
                }
            }

            if (arr[i][j] < mm){
                tranz = false;
            }
        }
    }


    
}

