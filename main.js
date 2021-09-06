Game.registerMod("cookie taster",{
	init:function(){
		Game.Notify("Cookie Taster loaded","",[16,5]);
		Game.Win("Third-party")

		function calcEff() {
			buildingEff = [];

			for(i=0; i<Game.ObjectsById.length; i++) {
				buildingEff[i] = Game.ObjectsById[i].price / (Game.ObjectsById[i].storedCps * Game.globalCpsMult);
				document.getElementById("productName"+i).style.removeProperty("color");
			}

			buildingEff.indexOf(Math.min.apply(null, buildingEff))

			document.getElementById("productName"+buildingEff.indexOf(Math.min.apply(null, buildingEff))).style.color = "#6f6";
		}

		function loopItems() {
			calcEff();
		}

		loopItems();
		setInterval(loopItems, 100);
	},
});