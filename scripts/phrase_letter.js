(function(window)
{
function PhraseLetter( symbol, htmlElement )
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
}


PhraseLetter.prototype.decrypt = function( key )
{
var letters = _.keys( key );
var found = false;

for (var a = 0 ; a < letters.length ; a++)
    {
    var letter = letters[ a ];
    var symbol = key[ letter ];

    if ( symbol == this.symbol )
        {
        this.htmlElement.innerHTML = letter;
        found = true;
        break;
        }
    }

if ( !found )
    {
    this.htmlElement.innerHTML = this.symbol;
    }
};



window.PhraseLetter = PhraseLetter;

}(window));