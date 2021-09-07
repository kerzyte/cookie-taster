Game.registerMod("cookie taster",{
	init:function(){
		Game.Notify("Cookie Taster loaded","",[16,5]);
		Game.Win("Third-party")

		function calcBank() {
			var bank = Game.shimmerTypes.golden.minTime <= 2250 && Game.Has("Get lucky") ? Game.cookiesPsRaw*60*15/.15*7 : Game.cookiesPsRaw*60*15/.15;
			bank > Game.cookies ? document.getElementById("cookies").style.color = "#f66" : document.getElementById("cookies").style.removeProperty("color");
		}

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
			calcBank();
			calcEff();
		}

		loopItems();
		setInterval(loopItems, 100);
	},
});