/*exported severalRandomInts, getRandomInt*/
'use strict';

function severalRandomInts( min, max, howMany )
{
if ( (max - min) < howMany )
    {
    return null;
    }

var numbers = [];

while( numbers.length < howMany )
    {
    var randomNumber = getRandomInt( min, max );

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
}


function getRandomInt( min, max )
{
return Math.floor( Math.random() * (max - min + 1) ) + min;
}
