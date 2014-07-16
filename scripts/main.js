var PRELOAD = null;
var BASE_URL = '';

window.onload = function()
{
PRELOAD = new createjs.LoadQueue();

    // only put here messages (since we get the length of this array to know the amount of messages available)
var messageManifest = [
        { id: 'message1', src: BASE_URL + 'messages/message1.txt' },
        { id: 'message2', src: BASE_URL + 'messages/message2.txt' }
    ];

Message.init( messageManifest.length );

PRELOAD.loadManifest( messageManifest, true );
PRELOAD.on( 'complete', Decrypt.init );
};
