var playing = false;//initially we are not playing
var score;
var trialsleft;
var fruits = ["apple","cherry","grapes","pine","orange"];
var step;
var action;

$(function(){
$("#startreset").click(function(){
    if(playing == true)
    {
        location.reload();// to reload the page
    }
    else
    {
        $("#gameover").hide();
        playing = true;
        score = 0;
        $("#scorevalue").html(score);
        $("#trialsleft").show(); // to show the trials left box
        trialsleft = 3;
        addhearts();
        $("#startreset").html("Reset Game");
        startaction();

    }
});

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);
    document.getElementById("audio").play();//using jquery will return an array. so use js or for jquery use the first[0]th element
    clearInterval(action);
    $("#fruit1").hide("explode",500);
    setTimeout(startaction,500); //to wait for the animation to get over

});

function addhearts()
{
    $("#trialsleft").empty();
    for(i=0;i<trialsleft;i++)
    {
        $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
}

function startaction()
{
    $("#fruit1").show();
    choosefruit();

    //for random horizontal positions
    $("#fruit1").css({'left': Math.round(Math.random()*500), 'top': -50});

    //generate a random step
    step = 1 + Math.round(Math.random()*5);

    //move the fruit down by one step every 10ms
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        if($("#fruit1").position().top > $("#fruitcontainer").height())
        {
            if(trialsleft > 1)
            {
                $("#fruit1").show();
                choosefruit();

                //for random horizontal positions
                $("#fruit1").css({'left': Math.round(Math.random()*500), 'top': -50});

                //generate a random step
                step = 1 + Math.round(Math.random()*5);

                trialsleft--;
                addhearts();
            }

            else
            {
                playing = false;
                $("#trialsleft").hide();
                $("#gameover").show();
                $("#gameover").html('<p>Game Over!</p><p>Your score is ' + score +'</p>')
                $("#startreset").html("Start Game");
                stopaction();
            }
        }
    },10);
}

function choosefruit()
{
    $("#fruit1").attr('src','images/'+fruits[Math.round(4*Math.random())]+'.png');

}

function stopaction() // stop dropping the function
{
    clearInterval(action);
    $("#fruit1").hide();
}
});