/*global PRELOAD, getRandomInt*/
'use strict';

var Message;
(function(Message) {


var TOTAL = 0;


Message.init = function( totalOfMessages )
{
TOTAL = totalOfMessages;
};


Message.getRandom = function()
{
var position = getRandomInt( 1, TOTAL );

return PRELOAD.getResult( 'message' + position );
};


})(Message || (Message = {}));
