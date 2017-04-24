const ALPHABET = require("./ALPHABET");

function stringToInteger(string) {

    integer = 0;
    for(let p = 0, q=10000 , r = 3; p < string.length; p++, q = Math.pow(10, r), r--) {
        letter = string[p];
        integer += ALPHABET[letter] * q;
    }

    return integer;
}

module.exports = stringToInteger;

// TODO - Commandline script to test words against each other or just get the int you request.
if(process.argv[2]){
    // *******************  Tests  ********************
    // console.log(stringToInteger("mmmmm"))


    // adyata
    const expectedInteger_adyta = 305587;
    const actualInteger_adyta = stringToInteger("adyta");

    console.log("\n\n");
    console.log("stringToInteger('adyta') --> " + actualInteger_adyta);
    console.log(`Actual: ${actualInteger_adyta} | Expected: ${expectedInteger_adyta}`);
    console.log("Test Pass: ", actualInteger_adyta === expectedInteger_adyta);
    console.log("\n\n");

    // cat
    const expectedInteger_cat = 321600;
    const actualInteger_cat = stringToInteger("cat");

    console.log("stringToInteger('cat') --> " + actualInteger_cat);
    console.log(`Actual: ${actualInteger_cat} | Expected: ${expectedInteger_cat}`);
    console.log("Test Pass: ", actualInteger_cat === expectedInteger_cat);
    console.log("\n\n");

    // yet

    const expectedInteger_yet = 545600;
    const actualInteger_yet = stringToInteger("yet");

    console.log("stringToInteger('yet') --> " + actualInteger_yet);
    console.log(`Actual: ${actualInteger_yet} | Expected: ${expectedInteger_yet}`);
    console.log("Test Pass: ", actualInteger_yet === expectedInteger_yet);
    console.log("\n\n");

    // zebra

    const expectedInteger_zebra = 554267;
    const actualInteger_zebra = stringToInteger("zebra");

    console.log("stringToInteger('zebra') --> " + actualInteger_zebra);
    console.log(`Actual: ${actualInteger_zebra} | Expected: ${expectedInteger_zebra}`);
    console.log("Test Pass: ", actualInteger_zebra === expectedInteger_zebra);
    console.log("\n\n");

    // adyta < cat < yet < zebra

    console.log("Alphabetical Order from Lowest Integer to Highest:");

    console.log("adyta < cat < yet < zebra :", actualInteger_adyta < actualInteger_cat < actualInteger_yet < actualInteger_zebra);

    console.log("\n\n\n*");
};

