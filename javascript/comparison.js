function initComparisons() 
{
  var x, i;
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) 
  {
	compareImages(x[i]);
  }

  function compareImages(img) 
  {
	var slider, img, clicked = 0, w, h;

	w = img.offsetWidth;
	h = img.offsetHeight;

	img.style.width = (w / 2) + "px";

	slider = document.createElement("DIV");
	slider.setAttribute("class", "img-comp-slider");

	img.parentElement.insertBefore(slider, img);

	slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
	slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

	slider.addEventListener("mousedown", slideReady);
	window.addEventListener("mouseup", slideFinish);
	slider.addEventListener("touchstart", slideReady);
	window.addEventListener("touchend", slideFinish);
	
	function slideReady(e) 
	{
	  e.preventDefault();
	  clicked = 1;

	  window.addEventListener("mousemove", slideMove);
	  window.addEventListener("touchmove", slideMove);
	}
	function slideFinish() 
	{
	  clicked = 0;
	}
	function slideMove(e) 
	{
	  var pos;

	  if (clicked == 0) 
		return false;

	  pos = getCursorPos(e)
	  
	  if (pos < 0) 
		pos = 0;
	  if (pos > w) 
		pos = w;

	  slide(pos);
	}
	function getCursorPos(e) 
	{
	  var a, x = 0;
	  e = e || window.event;
	  a = img.getBoundingClientRect();
	  x = e.pageX - a.left;
	  x = x - window.pageXOffset;
	  return x;
	}
	function slide(x) 
	{
	  img.style.width = x + "px";
	  slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
	}
  }
}