/*global createjs, Message, Decrypt*/
/*exported PRELOAD, BASE_URL*/
'use strict';

var PRELOAD = null;
var BASE_URL = '';


window.onload = function()
{
PRELOAD = new createjs.LoadQueue();

    // only put here messages (since we get the length of this array to know the amount of messages available)
var messageManifest = [
        { id: 'message1', src: BASE_URL + 'messages/message1.txt' },
        { id: 'message2', src: BASE_URL + 'messages/message2.txt' },
        { id: 'message3', src: BASE_URL + 'messages/message3.txt' },
        { id: 'message4', src: BASE_URL + 'messages/message4.txt' },
        { id: 'message5', src: BASE_URL + 'messages/message5.txt' },
        { id: 'message6', src: BASE_URL + 'messages/message6.txt' },
        { id: 'message7', src: BASE_URL + 'messages/message7.txt' },
        { id: 'message8', src: BASE_URL + 'messages/message8.txt' },
        { id: 'message9', src: BASE_URL + 'messages/message9.txt' },
        { id: 'message10', src: BASE_URL + 'messages/message10.txt' },
        { id: 'message11', src: BASE_URL + 'messages/message11.txt' },
        { id: 'message12', src: BASE_URL + 'messages/message12.txt' },
        { id: 'message13', src: BASE_URL + 'messages/message13.txt' },
        { id: 'message14', src: BASE_URL + 'messages/message14.txt' },
        { id: 'message15', src: BASE_URL + 'messages/message15.txt' },
        { id: 'message16', src: BASE_URL + 'messages/message16.txt' }
    ];

Message.init( messageManifest.length );

PRELOAD.loadManifest( messageManifest, true );
PRELOAD.on( 'complete', Decrypt.init );
};
