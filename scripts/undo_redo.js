(function(window)
{
function UndoRedo()
{

}

var UNDO = [];
var REDO = [];

UndoRedo.undo = function()
{
if ( UNDO.length === 0 )
    {
    console.log( 'Nothing to undo.' );
    return;
    }

var element = UNDO.pop();

REDO.push( element );

updateKey({
        letter: element.letter,
        symbol: element.symbol,
        add: false,
        addToUndo: false
    });
};


UndoRedo.redo = function()
{
if ( REDO.length === 0 )
    {
    console.log( 'Nothing to redo.' );
    return;
    }

var element = REDO.pop();

UNDO.push( element );

updateKey({
        letter: element.letter,
        symbol: element.symbol,
        add: true,
        addToUndo: false
    });
};


UndoRedo.add = function( letter, symbol )
{
var element = {
        letter: letter,
        symbol: symbol
    };


UNDO.push( element );

    // clear the redo everytime anything is added (to avoid creating conflicts)
REDO.length = 0;
};


UndoRedo.clear = function()
{
UNDO.length = 0;
REDO.length = 0;
};


window.UndoRedo = UndoRedo;

}(window));