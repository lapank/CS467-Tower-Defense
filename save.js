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
    // Retrieve needed values
    // Calculate expiration date
    // Save cookie
}