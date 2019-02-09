// status fields and start button in UI
var phraseDiv;
var startRecognizeOnceAsyncButton;

// subscription key and region for speech services.
var subscriptionKey, serviceRegion;
var authorizationToken;
var SpeechSDK;
var recognizer;

document.addEventListener('DOMContentLoaded', function() {
    subscriptionKey = 'a23b0fdd276340c293953660d299c231';
    serviceRegion = 'eastus2';
    phraseDiv = document.getElementById('output');

    phraseDiv.innerHTML = '';

    // if we got an authorization token, use the token. Otherwise use the provided subscription key
    var speechConfig;
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
            recognizer.recognizeOnceAsync(
                function(result) {
                    phraseDiv.innerHTML += result.text;
                    console.log(result);

                    recognizer.close();
                    recognizer = undefined;
                },
                function(err) {
                    phraseDiv.innerHTML += err;
                    console.log(err);

                    recognizer.close();
                    recognizer = undefined;
                }
            );
        });
});
