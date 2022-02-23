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

// Deletes the stored cookie
function deleteCookie(){
    document.cookie = "saveHS1= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

// Resets saved data to default values
function resetScores(){
    highscore1 = 0;
    highscore2 = 0;
    highscore3 = 0;
    rank = 1;
}

// Creates a cookie with current rank and high scores
function setCookie(){
    // Stringify save data
    let saveData = {
        saveHS1: highscore1,
        saveHS2: highscore2,
        saveHS3: highscore3,
        saveRank: rank
    };
    // Calculate an expiration date 1 year in the future.
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 365);
    let cookieExpire = 'expires=' + expireDate + ';';
    // Store cookie
    document.cookie = 'saveHS1=' + '&' + JSON.stringify(saveData) + '&; ' + cookieExpire;
}

// Loads the cookie data
function getCookie(){
    if (document.cookie.length != 0){
        // Parse data from cookie
        let dataArray = document.cookie.split('&');
        let saveData = JSON.parse(dataArray[1]);
        // Restore data from save
        highscore1 = saveData.saveHS1;
        highscore2 = saveData.saveHS2;
        highscore3 = saveData.saveHS3;
        rank = saveData.saveRank;
    }
}

// Detects key strokes to trigger cheat activation 
function detectCheat(){
    cheatCount = 5;
    // Activate when all keys pressed in correct order
    if (cheatCount === 5) cheat = true;
}