
    document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);

document.querySelector("#search_bar").addEventListener("click",function(){
	x=document.getElementById("search_input");
	y=document.getElementById("cross");
	if(x.display="none")
	{
		x.style.display="inline";
		x.focus();
	}
	if(y.display="none")
	{
		y.style.display="inline";
	}
});

document.querySelector("#cross").addEventListener("click",function(){
	x=document.getElementById("search_input");
	y=document.getElementById("cross");

		x.style.display="none";

		y.style.display="none";

});
