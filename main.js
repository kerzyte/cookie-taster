Game.registerMod("cookie taster",{
	init:function(){
		Game.Notify("Cookie Taster loaded","",[16,5]);
		Game.Win("Third-party");

		var buildingEff = [];
		var recommendedCost;
		var upgradeEff = [];

		function calcBank() {
			var bank = Game.shimmerTypes.golden.minTime <= 2250 && Game.Has("Get lucky") ? Game.cookiesPsRaw*60*15/.15*7 : Game.cookiesPsRaw*60*15/.15;
			if (Game.cookies < bank) {
				document.getElementById("cookies").style.color = "#f66";
			} else if (Game.cookies > bank + recommendedCost) {
				document.getElementById("cookies").style.color = "#6f6";
			} else {
				document.getElementById("cookies").style.removeProperty("color");
			}
		}

		function calcBuildingCPS() {
			for (i=0; i<Game.ObjectsById.length; i++) {
				document.getElementById("productName"+i).style.removeProperty("color");
				buildingEff[i] = Game.ObjectsById[i].price / (Game.ObjectsById[i].storedCps * Game.globalCpsMult);
			}
		}

		function calcUpgradeCPS() {
			for (i=0; i<Game.UpgradesInStore.length; i++) {
				document.getElementById("upgrade"+i).style.removeProperty("backgroundColor");
				if (Game.UpgradesInStore[i].pool == "cookie") {
					upgradeEff[i] = Game.UpgradesInStore[i].basePrice / (Game.cookiesPsRaw * Game.UpgradesInStore[i].power / 100);
				} else {
					upgradeEff[i] = Infinity;
				}
			}
		}

		function colorRecommended() {
			calcBuildingCPS();
			calcUpgradeCPS();
			if (Math.min.apply(null, buildingEff) < Math.min.apply(null, upgradeEff)) {
				document.getElementById("productName"+buildingEff.indexOf(Math.min.apply(null, buildingEff))).style.color = "#6f6";
				recommendedCost = Game.ObjectsById[buildingEff.indexOf(Math.min.apply(null, buildingEff))].price;
			} else {
				if (document.getElementById("upgrade"+upgradeEff.indexOf(Math.min.apply(null, upgradeEff)))) {
					document.getElementById("upgrade"+upgradeEff.indexOf(Math.min.apply(null, upgradeEff))).style.backgroundColor = "#6f6";
					recommendedCost = Game.UpgradesInStore[upgradeEff.indexOf(Math.min.apply(null, upgradeEff))].basePrice;
				}
			}
		}

		function drawLoop() {
			colorRecommended();
			calcBank();
		}

		drawLoop();
		setInterval(drawLoop, 100);
	},
});