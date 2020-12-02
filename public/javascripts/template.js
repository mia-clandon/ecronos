jQuery(function($) {
	"use strict";

	/* Масштабирование map */
	let imageServices = document.getElementById('image-services');

	if (imageServices) {
		let timerReWriteArea;
		let use_map;

		onload = listenerMap;
		onresize = listenerMap;

		function listenerMap() {
			// Мобильная map
			if (window.innerWidth < 992) {
				use_map = "#map-services_mobile";
			}
			else {
				use_map = "#map-services";
			}

			clearTimeout(timerReWriteArea);
			timerReWriteArea = setTimeout(reWriteArea, 250, imageServices, use_map);
		}
	}

	function reWriteArea(img, use_map) {
		let imgWidth = img.naturalWidth
		imgWidth = imgWidth <= 930 ? 930 : 1920;
		let imgAdjustWidth = img.width;
		let myArea = document.querySelectorAll(use_map+" area");
		let myMap = document.querySelector(use_map);
		
		let virtualMap = myMap.cloneNode(true);
		virtualMap.name = 'virtual-map'; // Название создаваемой map
		virtualMap.id = virtualMap.name;
		let virtual_map_node = document.getElementById(virtualMap.id);
		if (virtual_map_node) {
			document.body.removeChild(virtual_map_node);
		}
		document.body.append(virtualMap);
		let virtualArea = virtualMap.querySelectorAll('area');
		
		for(let a=0; a<myArea.length; a++) {
			let myCoords = myArea[a].coords; 
			let evMyCoords = myCoords.split(","); 
			let myRel = imgAdjustWidth / imgWidth;

			for (let c in evMyCoords) {
				evMyCoords[c] = Math.round(evMyCoords[c] * myRel); 
			}

			evMyCoords = evMyCoords.join(","); 
			virtualArea[a].coords = evMyCoords; 
		}
	}
	/* Масштабирование map */

	/* Мобильное меню */
	let navBars = document.getElementsByClassName('btn-menubar');
	[].forEach.call(navBars, function(navBar) {
		let navBarTarget = navBar.dataset.target;
		let navCollapse = document.querySelector(navBarTarget);
		navBar.addEventListener('click', function() {
			if (navBar.classList.contains('collapsed')) {
				navCollapse.style.display = 'block';
				navBar.classList.remove('collapsed');
			}
			else {
				navCollapse.style.display = 'none';
				navBar.classList.add('collapsed');
			}
		});
	});
	/* Мобильное меню */
});
