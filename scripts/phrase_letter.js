(function(window)
{
function PhraseLetter( symbol, htmlElement, isUpperCase )
{
htmlElement.innerHTML = symbol;
htmlElement.className = 'button';
htmlElement.onclick = (function(symbol)
    {
    return function()
        {
        Decrypt.selectSymbol( symbol );
        };
    })( symbol );

this.symbol = symbol;
this.htmlElement = htmlElement;
this.is_upper_case = isUpperCase;
}


PhraseLetter.prototype.decrypt = function( key )
{
var letters = Object.keys( key );
var found = false;

for (var a = 0 ; a < letters.length ; a++)
    {
    var letter = letters[ a ];
    var symbol = key[ letter ];

    if ( symbol == this.symbol )
        {
        this.htmlElement.classList.add( 'letterSet' );

        if ( this.is_upper_case === true )
            {
            this.htmlElement.innerHTML = letter.toUpperCase();
            }

        else
            {
            this.htmlElement.innerHTML = letter.toLowerCase();
            }

        found = true;
        break;
        }
    }

if ( !found )
    {
    this.htmlElement.classList.remove( 'letterSet' );
    this.htmlElement.innerHTML = this.symbol;
    }
};



window.PhraseLetter = PhraseLetter;

}(window));