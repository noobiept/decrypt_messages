
var EXAMPLE = 'Hello there, how are you doing?';

var LETTERS = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

    // japanese hiragana characters
var SYMBOLS = [ 'あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'ゐ', 'ゑ', 'を' ];


var KEY = {};
var PLAYER_KEY = {};


var SELECTED_LETTER = null;
var SELECTED_SYMBOL = null;
var LETTERS_ELEMENTS = {};
var PHRASE_ELEMENTS = [];

window.onload = function()
{
generateKey();


var isEnglishAlphabet = /^[a-z]$/i;

    // add the message
var messageContainer = document.querySelector( '#MessageContainer' );

for (var a = 0 ; a < EXAMPLE.length ; a++)
    {
    var letter = EXAMPLE[ a ].toLowerCase();

    var htmlElement = document.createElement( 'span' );

    if ( isEnglishAlphabet.test( letter ) )
        {
        var symbol = KEY[ letter ];

        var phraseLetter = new PhraseLetter( symbol, htmlElement );

        PHRASE_ELEMENTS.push( phraseLetter );
        }

    else
        {
        htmlElement.innerHTML = letter;
        }

    messageContainer.appendChild( htmlElement );
    }

    // add the letters
var lettersContainer = document.querySelector( '#LettersContainer' );
var tableRow;


for (var a = 0 ; a < LETTERS.length ; a++)
    {
    var letter = LETTERS[ a ];

    if ( a % 13 === 0 )
        {
        tableRow = document.createElement( 'tr' );

        lettersContainer.appendChild( tableRow );
        }

    var td = document.createElement( 'td' );

    td.innerHTML = letter;
    td.className = 'button';
    td.onclick = (function( letter )
        {
        return function()
            {
            selectLetter( letter );
            };
        })( letter );

    tableRow.appendChild( td );

    LETTERS_ELEMENTS[ letter ] = td;
    }

Menu.init();
};


function selectLetter( letter )
{
var letterElement = LETTERS_ELEMENTS[ letter ];

if ( SELECTED_LETTER === null )
    {
        // select a letter
    if ( SELECTED_SYMBOL === null )
        {
        letterElement.classList.add( 'selected' );

        SELECTED_LETTER = { letter: letter, element: letterElement };
        }

        // both a letter and symbol selected
    else
        {
        updateKey({
                letter: letter,
                symbol: SELECTED_SYMBOL.symbol
            });
        }
    }

else
    {
    SELECTED_LETTER.element.classList.remove( 'selected' );

    if ( SELECTED_LETTER.element === letterElement )
        {
        SELECTED_LETTER = null;
        }

    else
        {
        letterElement.classList.add( 'selected' );
        SELECTED_LETTER = { letter: letter, element: letterElement };
        }
    }
}


function selectSymbol( symbol )
{
var symbolElements = [];

for (var a = 0 ; a < PHRASE_ELEMENTS.length ; a++)
    {
    if ( symbol == PHRASE_ELEMENTS[ a ].symbol )
        {
        symbolElements.push( PHRASE_ELEMENTS[ a ].htmlElement );
        }
    }

if ( SELECTED_SYMBOL === null )
    {
    if ( SELECTED_LETTER === null )
        {
        for (var a = 0 ; a < symbolElements.length ; a++)
            {
            symbolElements[ a ].classList.add( 'selected' );
            }


        SELECTED_SYMBOL = { symbol: symbol, elements: symbolElements };
        }

    else
        {
        updateKey({
                letter: SELECTED_LETTER.letter,
                symbol: symbol
            });
        }
    }

else
    {
    for (var a = 0 ; a < SELECTED_SYMBOL.elements.length ; a++)
        {
        SELECTED_SYMBOL.elements[ a ].classList.remove( 'selected' );
        }

    if ( SELECTED_SYMBOL.symbol == symbol )
        {
        SELECTED_SYMBOL = null;
        }

    else
        {
        for (var a = 0 ; a < symbolElements.length ; a++)
            {
            symbolElements[ a ].classList.add( 'selected' );
            }

        SELECTED_SYMBOL = { symbol: symbol, elements: symbolElements };
        }
    }
}




function updateKey( args )
{
if ( typeof args.letter === 'undefined' ||
     typeof args.symbol === 'undefined' )
    {
    return;
    }

var selectedLetter = args.letter;
var selectedSymbol = args.symbol;

_.defaults( args,
    {
        add: true,
        addToUndo: true
    });


    // clear the previous letter/symbol
var letters = _.keys( PLAYER_KEY );

for (var a = 0 ; a < letters.length ; a++)
    {
    var letter = letters[ a ];

    if ( PLAYER_KEY[ letter ] == selectedSymbol )
        {
        PLAYER_KEY[ letter ] = '';

        LETTERS_ELEMENTS[ letter ].classList.remove( 'alreadyUsed' );
        break;
        }
    }


if ( args.add === true )
    {
    PLAYER_KEY[ selectedLetter ] = selectedSymbol;

    LETTERS_ELEMENTS[ selectedLetter ].classList.add( 'alreadyUsed' );
    }

else
    {
    PLAYER_KEY[ selectedLetter ] = '';
    }

decryptMessage( PLAYER_KEY );

if ( SELECTED_LETTER )
    {
    SELECTED_LETTER.element.classList.remove( 'selected' );
    SELECTED_LETTER = null;
    }

if ( SELECTED_SYMBOL )
    {
    for (var a = 0 ; a < SELECTED_SYMBOL.elements.length ; a++)
        {
        SELECTED_SYMBOL.elements[ a ].classList.remove( 'selected' );
        }
    SELECTED_SYMBOL = null;
    }

if ( args.addToUndo === true )
    {
    UndoRedo.add( selectedLetter, selectedSymbol );
    }


if ( isDecrypted() )
    {
    window.alert( 'You won!' );
    restart();
    }
}


function restart()
{

}


function generateKey()
{
var positions = severalRandomInts( 0, SYMBOLS.length - 1, LETTERS.length );

for (var a = 0 ; a < positions.length ; a++)
    {
    var letter = LETTERS[ a ];
    var randomPosition = positions[ a ];
    var symbol = SYMBOLS[ randomPosition ];

    KEY[ letter ] = symbol;
    PLAYER_KEY[ letter ] = '';
    }
}



function decryptMessage( key )
{
for (var a = 0 ; a < PHRASE_ELEMENTS.length ; a++)
    {
    var element = PHRASE_ELEMENTS[ a ];

    element.decrypt( key );
    }
}


function isDecrypted()
{
    // get the current message
var messageContainer = document.querySelector( '#MessageContainer' );
var length = messageContainer.childNodes.length;
var currentMessage = '';

for (var a = 0 ; a < length ; a++)
    {
    currentMessage += messageContainer.childNodes[ a ].innerHTML;
    }

if ( currentMessage.toLowerCase() === EXAMPLE.toLowerCase() )
    {
    return true;
    }

return false;
}


function resetUserKey()
{
var letters = _.keys( PLAYER_KEY );

for (var a = 0 ; a < letters.length ; a++)
    {
    PLAYER_KEY[ letters[ a ] ] = '';
    }

decryptMessage( PLAYER_KEY );

    // remove the css classes for selected elements
var selectedLetters = document.querySelectorAll( '.selected' );
var alreadyUsedLetters = document.querySelectorAll( '.alreadyUsed' );

for (var a = 0 ; a < selectedLetters.length ; a++)
    {
    selectedLetters[ a ].classList.remove( 'selected' );
    }

for (var a = 0 ; a < alreadyUsedLetters.length ; a++)
    {
    alreadyUsedLetters[ a ].classList.remove( 'alreadyUsed' );
    }

SELECTED_LETTER = null;
SELECTED_SYMBOL = null;

UndoRedo.clear();
}