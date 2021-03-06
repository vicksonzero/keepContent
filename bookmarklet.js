//javascript:
/**
 * Google Keep Quick Jump Plugin 
 * by Dickson(git:vicksonzero)
 * uncomment the first line (remove the first two //'s) to use the script as bookmarklet
 * Disclaimer: 
 * use at your own risk, as it is just a hack to grab all 
 * information from the page. It is not supported by Google at all
 * 
 * License: public domain
 */
var a = (function() {
	/* Edit this object to customize */
	var options={
		/* css styles for the content panel */
		style:{
			x:"0px",
			y:"100px",
			width:"300px",
			height:"550px",
			/* if you cannot see all notes, try adjusting height or hit refresh */
			bgc:"rgba(100,100,100,0.2)",
			zIndex:"1000"
		},
		jumpToCardTrigger:"onclick",/* any jquery event on a link, eg: onclick, onmouseenter */
		classNames:{
			container:"notes-container",
			card:"IZ65Hb-n0tgWb",
			title:"r4nke-YPqjbf"
		}
	};
	/* Not for customization beyond this line */
	var listContainer;
	var d = document.createElement("div");
	setStyles(d);

	var buttons = document.createElement("div");
	buttons.innerHTML = 
		"<a href='javascript:void(0);' onclick='this.parentNode.toggleCollapse();'>Expand/Collapse</a>"+
		" | <a href='javascript:void(0);' onclick='this.parentNode.refresh();'>Refresh<span class='needRefresh'></span></a> "+
		" | <a href='javascript:void(0);' onclick='this.parentNode.remove();'>Exit</a> "+
		"";
	/* TODO: implement needRefresh */
	buttons.toggleCollapse = function(){
		listContainer.style.display = listContainer.style.display=="none"?"block":"none";
	};
	buttons.refresh = function refresh(){
		d.removeChild(listContainer);
		listContainer = document.createElement("div");
		setScrollerStyle(listContainer);
		d.appendChild(listContainer);
		cards = generateList(listContainer);
	};
	buttons.remove = function(){
		document.getElementsByClassName(options.classNames.container)[0].removeChild(d);
	};
	d.appendChild(buttons);

	listContainer = document.createElement("div");
	setScrollerStyle(listContainer);
	d.appendChild(listContainer);
	var cards = generateList(listContainer);
	document.getElementsByClassName(options.classNames.container)[0].appendChild(d);

	function generateList(listContainer){
		var cards = [].slice.call(document.getElementsByClassName(options.classNames.card));
		var titleList = [];
		cards.forEach(function(element) {
			var b = {
				title: "",
				body: ""
			};
			b.title = element.getElementsByClassName(options.classNames.title)[1].innerHTML;
			titleList.push({
				element: element,
				title: b.title==""?"n/a":b.title
			});

		});
		var list = document.createElement("ol");
		titleList.forEach(function(element) {
			var li = document.createElement("li");
			li.target = element.element;
			li.scrollToCard = scrollToCard;
			li.innerHTML = "<a href='javascript:void(0);' "+options.jumpToCardTrigger+"='this.parentNode.scrollToCard()'>" + element.title + "</a>";
			list.appendChild(li);
		});
		listContainer.appendChild(list);
		return cards;
	}

	function scrollToCard() {
		document.body.scrollTop = this.target.offsetTop;
	}
	function setStyles(d){
		d.style.position = "fixed";
		d.style.left = options.style.x;
		d.style.top = options.style.y;
		d.style.width = options.style.width;
		d.style.zIndex = options.style.zIndex;
		d.style.backgroundColor = options.style.bgc;
	}
	function setScrollerStyle(d){
		d.style.height = options.style.height;
		d.style.width = "100%";
		d.style.overflow = "scroll";
	}


	return cards;
})();
