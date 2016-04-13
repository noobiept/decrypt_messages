/*global createjs, Message, Decrypt*/
/*exported PRELOAD*/
'use strict';

var PRELOAD = null;


window.onload = function()
{
PRELOAD = new createjs.LoadQueue();

    // only put here messages (since we get the length of this array to know the amount of messages available)
var messageManifest = [
        { id: 'message1', src: 'messages/message1.txt' },
        { id: 'message2', src: 'messages/message2.txt' },
        { id: 'message3', src: 'messages/message3.txt' },
        { id: 'message4', src: 'messages/message4.txt' },
        { id: 'message5', src: 'messages/message5.txt' },
        { id: 'message6', src: 'messages/message6.txt' },
        { id: 'message7', src: 'messages/message7.txt' },
        { id: 'message8', src: 'messages/message8.txt' },
        { id: 'message9', src: 'messages/message9.txt' },
        { id: 'message10', src: 'messages/message10.txt' },
        { id: 'message11', src: 'messages/message11.txt' },
        { id: 'message12', src: 'messages/message12.txt' },
        { id: 'message13', src: 'messages/message13.txt' },
        { id: 'message14', src: 'messages/message14.txt' },
        { id: 'message15', src: 'messages/message15.txt' },
        { id: 'message16', src: 'messages/message16.txt' }
    ];

Message.init( messageManifest.length );

PRELOAD.loadManifest( messageManifest, true );
PRELOAD.on( 'complete', Decrypt.init );
};
