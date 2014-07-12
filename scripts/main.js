
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


var isAlphanumeric = /^[a-z]$/i;

    // add the message
var messageContainer = document.querySelector( '#MessageContainer' );

for (var a = 0 ; a < EXAMPLE.length ; a++)
    {
    var letter = EXAMPLE[ a ].toLowerCase();

    var htmlElement = document.createElement( 'span' );

    if ( isAlphanumeric.test( letter ) )
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
};


function selectLetter( letter )
{
var letterElement = LETTERS_ELEMENTS[ letter ];

if ( SELECTED_LETTER === null )
    {
    letterElement.classList.add( 'selected' );

    SELECTED_LETTER = { letter: letter, element: letterElement };
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
if ( SELECTED_LETTER === null )
    {

    }

else
    {
        // clear the previous letter/symbol
    var letters = _.keys( PLAYER_KEY );

    for (var a = 0 ; a < letters.length ; a++)
        {
        var letter = letters[ a ];

        if ( PLAYER_KEY[ letter ] == symbol )
            {
            PLAYER_KEY[ letter ] = '';
            break;
            }
        }

    PLAYER_KEY[ SELECTED_LETTER.letter ] = symbol;
    SELECTED_LETTER.element.classList.remove( 'selected' );
    SELECTED_LETTER = null;

    decryptMessage( PLAYER_KEY );
    }
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