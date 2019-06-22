addLoadEvent(function() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext)
    {
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#f3c62b"; //fill color

        //face
        ctx.beginPath();
        ctx.arc(75,75,50,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle="#2a2a34"; //stroke color

        //smile
        ctx.moveTo(110,75);
        ctx.beginPath();
        ctx.arc(75,75,35,0.15*Math.PI,0.85*Math.PI,false);
        ctx.stroke();

        //left eye
        ctx.moveTo(65,65);
        ctx.beginPath();
        ctx.arc(60,65,5,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fillStyle = "#2a2a34";
        ctx.fill();

        //right eye
        ctx.moveTo(95,65);
        ctx.beginPath();
        ctx.arc(90,65,5,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fillStyle = "#2a2a34";
        ctx.fill();
    }
});