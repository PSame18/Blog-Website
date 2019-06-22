addLoadEvent(function toggleBtn() {
        if(document.getElementById('lw-btn').classList.contains('normal'))
        {
            document.getElementById('lw-btn').classList.remove('normal');
            document.getElementById('lw-btn').classList.add('lwpeople');
        }


        if(document.getElementById("lw-btn").classList.contains('normal'))
        {
            document.getElementById('heading').style.color = "red";
        }
        else
        {
            document.getElementById('heading').style.color = "white";
        }
});
