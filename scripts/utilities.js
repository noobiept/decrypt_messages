'use strict';

var Utilities;
(function(Utilities) {


Utilities.severalRandomInts = function( min, max, howMany )
{
if ( (max - min) < howMany )
    {
    return null;
    }

var numbers = [];

while( numbers.length < howMany )
    {
    var randomNumber = Utilities.getRandomInt( min, max );

    var alreadyIn = false;

    for (var a = 0 ; a < numbers.length ; a++)
        {
        if ( numbers[ a ] === randomNumber )
            {
            alreadyIn = true;
            break;
            }
        }

    if ( !alreadyIn )
        {
        numbers.push( randomNumber );
        }
    }

return numbers;
};


Utilities.getRandomInt = function( min, max )
{
return Math.floor( Math.random() * (max - min + 1) ) + min;
};


})(Utilities || (Utilities = {}));
