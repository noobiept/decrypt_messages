/*global Decrypt*/
'use strict';

var UndoRedo;
(function(UndoRedo) {


var UNDO = [];
var REDO = [];

    // the html elements (to set/clear the css class)
var UNDO_HTML = null;
var REDO_HTML = null;


UndoRedo.init = function()
{
UNDO_HTML = document.querySelector( '#Undo' );
REDO_HTML = document.querySelector( '#Redo' );
};


UndoRedo.undo = function()
{
if ( UNDO.length === 0 )
    {
    return;
    }

    // going from 1 to 0 redo elements, button is not available anymore
if ( UNDO.length === 1 )
    {
    UNDO_HTML.classList.add( 'buttonNotAvailable' );
    }

    // going from 0 to 1 undo elements, button is available
if ( REDO.length === 0 )
    {
    REDO_HTML.classList.remove( 'buttonNotAvailable' );
    }


var element = UNDO.pop();

REDO.push( element );

Decrypt.updateKey({
        letter: element.letter,
        symbol: element.symbol,
        add: !element.add,
        addToUndo: false
    });
};


UndoRedo.redo = function()
{
if ( REDO.length === 0 )
    {
    return;
    }


    // going from 1 to 0 redo elements, button is not available anymore
if ( REDO.length === 1 )
    {
    REDO_HTML.classList.add( 'buttonNotAvailable' );
    }

    // going from 0 to 1 undo elements, button is available
if ( UNDO.length === 0 )
    {
    UNDO_HTML.classList.remove( 'buttonNotAvailable' );
    }

var element = REDO.pop();

UNDO.push( element );

Decrypt.updateKey({
        letter: element.letter,
        symbol: element.symbol,
        add: element.add,
        addToUndo: false
    });
};


UndoRedo.add = function( letter, symbol, add )
{
var element = {
        letter: letter,
        symbol: symbol,
        add: add
    };


    // going from 0 to 1 element in the undo
    // set the undo button as available
if ( UNDO.length === 0 )
    {
    UNDO_HTML.classList.remove( 'buttonNotAvailable' );
    }

    // if there's redo elements, we need to update the button's css class (since we're clearing the redo array)
if ( REDO.length > 0 )
    {
    REDO_HTML.classList.add( 'buttonNotAvailable' );
    }

UNDO.push( element );

    // clear the redo everytime anything is added (to avoid creating conflicts)
REDO.length = 0;
};


UndoRedo.clear = function()
{
if ( UNDO.length > 0 )
    {
    UNDO_HTML.classList.add( 'buttonNotAvailable' );
    }

if ( REDO.length > 0 )
    {
    REDO_HTML.classList.add( 'buttonNotAvailable' );
    }

UNDO.length = 0;
REDO.length = 0;
};


})(UndoRedo || (UndoRedo = {}));
