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
			upgradeEff = [];
			for (i=0; i<Game.UpgradesInStore.length; i++) {
				document.getElementById("upgrade"+i).style.removeProperty("background-color");
				var cost = Game.UpgradesInStore[i].getPrice();
				switch (Game.UpgradesInStore[i].id) {
					case  31:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .1);
						break;
					case  32: case 494:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .125);
						break;
					case  54: case 462:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .15);
						break;
					case 108: case 442:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .175);
						break;
					case 169: case 170: case 171: case 172: case 173: case 174: case 645:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.UpgradesInStore[i].power() * .01);
						break;
					case 187: case 320: case 321: case 322: case 425: 
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .2);
						break;
					case 210: case 211: case 212: case 213: case 214: case 215: case 216: case 217: case 218: case 219: case 220: case 221:
						upgradeEff[i] = cost / (Game.cookiesPs * .01);
						break;
//					case 228:
					case 229:
						upgradeEff[i] = cost / (9 * Game.globalCpsMult);
						break;
					case 613:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .115);
						break;
					case 631:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .05);
						break;
					case 639:
						upgradeEff[i] = cost / (Game.cookiesPs * .07);
						break;
					default:
						if (Game.UpgradesInStore[i].pool == "cookie") {
							if (Game.UpgradesInStore[i].unlockAt.season == "valentines") {
								upgradeEff[i] = cost / (Game.cookiesPs * Game.UpgradesInStore[i].power() * .01);
							} else {
								upgradeEff[i] = cost / (Game.cookiesPs * Game.UpgradesInStore[i].power * .01);
							}
						} else if (Game.UpgradesInStore[i].buildingTie) {
							if (Game.UpgradesInStore[i].tier == "fortune") {
								upgradeEff[i] = cost / (Game.UpgradesInStore[i].buildingTie.storedTotalCps * Game.globalCpsMult * .07);
							} else if (Game.UpgradesInStore[i].buildingTie == Game.UpgradesInStore[i].buildingTie1) {
								upgradeEff[i] = cost / (Game.UpgradesInStore[i].buildingTie.storedTotalCps * Game.globalCpsMult);
							} else if (!Game.UpgradesInStore[i].buildingTie1) {
								var building = Game.UpgradesInStore[i].buildingTie;
								var d_cps = building.storedTotalCps * .01 * Game.ObjectsById[1].amount / (building.id - 1);
								upgradeEff[i] = cost / ((d_cps + Game.ObjectsById[1].storedTotalCps) * Game.globalCpsMult);
							} else {
								upgradeEff[i] = Infinity;
							}
						} else if (Game.UpgradesInStore[i].buildingTie2) {
							var buildings = [undefined, Game.UpgradesInStore[i].buildingTie1, Game.UpgradesInStore[i].buildingTie2];
							var d_cps1 = buildings[1].storedTotalCps * .05 * buildings[2].amount;
							var d_cps2 = buildings[2].storedTotalCps * .001 * buildings[1].amount;
							upgradeEff[i] = cost / ((d_cps1 + d_cps2) * Game.globalCpsMult);
						} else {
							upgradeEff[i] = Infinity;
						}
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