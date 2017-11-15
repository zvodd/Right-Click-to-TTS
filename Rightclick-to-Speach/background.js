
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        tts_play(selection);
    });
});


chrome.contextMenus.removeAll(
    function() {
        var id = chrome.contextMenus.create({
            title: "Speak selected text ",
            contexts: ["selection"],
            onclick: ttsClickHandler
        });
    }
);


function ttsClickHandler(info, tab) {
    tts_play(info.selectionText);
}

function tts_play(input){
    tts_stop();
    var msg = new SpeechSynthesisUtterance(input);
    window.speechSynthesis.speak(msg);
}

function tts_stop(){
    if (window.speechSynthesis.paused || window.speechSynthesis.pending || window.speechSynthesis.speaking){
        window.speechSynthesis.cancel();
    }
}


// function tts_resume(){
//     if (window.speechSynthesis.paused){
//         window.speechSynthesis.resume();
//     }
// }

// function tts_pause(){
//     if (window.speechSynthesis.speaking){
//         window.speechSynthesis.pause();
//     }
// }