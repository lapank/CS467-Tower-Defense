function saveHighScore(){
    switch(select){
        case 1:
            if (score > highscore1) highscore1 = score;
            break;
        case 2:
            if (score > highscore2) highscore2 = score;
            break;
        case 3:
            if (score > highscore3) highscore3 = score;
            break;
    }
}

// Creates a cookie with current rank and high scores
function setCookie(){
    // Calculate expiration date
    let expireDate = new Date();
    console.log(expireDate);
    expireDate.setDate(expireDate.getDate() + 365);
    console.log(expireDate);
    // Save cookie
}