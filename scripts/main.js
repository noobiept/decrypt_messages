var PRELOAD = null;
var BASE_URL = '';

window.onload = function()
{
PRELOAD = new createjs.LoadQueue();

var manifest = [
        { id: 'message1', src: BASE_URL + 'messages/message1.txt' },
        { id: 'message2', src: BASE_URL + 'messages/message2.txt' }
    ];

PRELOAD.loadManifest( manifest, true );
PRELOAD.on( 'complete', Decrypt.init );
};
