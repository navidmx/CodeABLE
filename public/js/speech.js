// status fields and start button in UI
var phraseDiv;
var startRecognizeOnceAsyncButton;

// subscription key and region for speech services.
var subscriptionKey, serviceRegion;
var authorizationToken;
var SpeechSDK;
var recognizer;
var speechConfig;

var doVoice = 1;

document.addEventListener('DOMContentLoaded', function() {
    subscriptionKey = 'a23b0fdd276340c293953660d299c231';
    serviceRegion = 'eastus2';

    // if we got an authorization token, use the token. Otherwise use the provided subscription key

    speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
        subscriptionKey,
        serviceRegion
    );

    speechConfig.speechRecognitionLanguage = 'en-US';

    navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(function() {
            var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
            recognizer = new SpeechSDK.SpeechRecognizer(
                speechConfig,
                audioConfig
            );
            window.startVoice = function() {
                var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
                recognizer = new SpeechSDK.SpeechRecognizer(
                    speechConfig,
                    audioConfig
                );
                recognizer.recognizeOnceAsync(
                    function(result) {
                        recognizer.close();
                        recognizer = undefined;
                        if (doVoice) {
                            commandDisplay(result.text);
                        } else {
                            doVoice = 0;
                        }
                    },
                    function(err) {
                        phraseDiv.innerHTML += err;
                        console.log(err);
                        recognizer.close();
                        recognizer = undefined;
                    }
                );
                return true;
            };
        });
});

function endVoice() {
    doVoice = 0;
}
