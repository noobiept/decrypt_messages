/*global UndoRedo, Decrypt*/
'use strict';

var Menu;
(function(Menu) {


Menu.init = function()
{
var container = document.querySelector( '#Menu' );

    // undo
var undo = container.querySelector( '#Undo' );
undo.onclick = UndoRedo.undo;

    // redo
var redo = container.querySelector( '#Redo' );
redo.onclick = UndoRedo.redo;

    // reset
var reset = container.querySelector( '#Reset' );
reset.onclick = Decrypt.resetUserKey;

    // new message
var newMessage = container.querySelector( '#NewMessage' );
newMessage.onclick = Decrypt.restart;

    // help
var help = container.querySelector( '#Help' );
help.onclick = Decrypt.help;

container.classList.remove( 'hidden' );
};


})(Menu || (Menu = {}));
