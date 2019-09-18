// Language used: NodeJS

var fs = require('fs');
var textByLine = fs.readFileSync('input.txt').toString().trim().split("\r\n");

let totalTestCases = textByLine.shift();
textByLine.shift();


// clearing output file content
fs.writeFileSync('output.txt', '');

let textArrayIndex = 0;

//  Looping to check all testcases one by one
for(let i=0; i<totalTestCases; i++){

    let inputSet = [];
    // collecting all the bits of current testcase
    while(textArrayIndex < textByLine.length && textByLine[textArrayIndex] !== ''){
        inputSet.push(textByLine[textArrayIndex]);
        textArrayIndex++;
    }
    textArrayIndex++;

    let sortedRecords = inputSet.sort(function(a,b){
        return a.length < b.length;
    });

    let outputString=sortedRecords[0];

    for(let j=1; j<sortedRecords.length; j++){

        let caseString = sortedRecords[j];

        if(outputString.includes(caseString)) continue;

            // find missing char of case in output
            let caseStringArray = caseString.split('');

            for(let k=0; k<caseStringArray.length; k++){
                let charSet = caseStringArray.slice(0,k+1);
                let prependedString = (charSet.join('') + outputString);
                let appendedString = (charSet.join('') + outputString);

                // break point to check if its getting more than 256 bytes.
                if(prependedString.length > 8)  throw ("No possible output in 256 byte result.");
                 
                if(appendedString.includes(caseString)){
                    outputString = appendedString;
                    break;
                }
                if(prependedString.includes(caseString)){
                    outputString = prependedString;
                     break;
                }   

            }
    }

    fs.appendFileSync('output.txt', outputString+'\n');

}



