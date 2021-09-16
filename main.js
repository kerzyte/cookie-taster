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
				document.getElementById("upgrade"+i).style.removeProperty("background-color");
				if (Game.UpgradesInStore[i].pool == "cookie") {
					if (Game.UpgradesInStore[i].unlockAt.season == "valentines") {
						upgradeEff[i] = Game.UpgradesInStore[i].getPrice() / (Game.cookiesPs * Game.UpgradesInStore[i].power() / 100);
					} else {
						upgradeEff[i] = Game.UpgradesInStore[i].getPrice() / (Game.cookiesPs * Game.UpgradesInStore[i].power / 100);
					}
				} else if (Game.UpgradesInStore[i].buildingTie1) {
					upgradeEff[i] = Game.UpgradesInStore[i].getPrice() / (Game.UpgradesInStore[i].buildingTie1.storedTotalCps * Game.globalCpsMult);
				} else if (Game.UpgradesInStore[i].kitten) {
					switch (Game.UpgradesInStore[i].tier) {
						case 1: mult = .1; break;
						case 2: mult = .125; break;
						case 3: mult = .15; break;
						case 4: mult = .175; break;
						case 5: mult = .2; break;
						case 6: mult = .2; break;
						case 7: mult = .2; break;
						case 8: mult = .2; break;
						case 9: mult = .2; break;
						case 10: mult = .175; break;
						case 11: mult = .15; break;
						case 12: mult = .125; break;
						case 13: mult = .115; break;
						case "fortune": mult = .05; break;
						default: mult = 0;
					}
					upgradeEff[i] = Game.UpgradesInStore[i].getPrice() / (Game.cookiesPs * Game.milkProgress * mult);
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
					recommendedCost = Game.UpgradesInStore[upgradeEff.indexOf(Math.min.apply(null, upgradeEff))].getPrice();
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