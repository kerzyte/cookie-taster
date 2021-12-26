Game.registerMod("cookie taster",{
	init:function(){
//		Game.Notify("Cookie Taster loaded","",[16,5]);
//		Game.Win("Third-party");

		var buildingEff = [];
		var recommendedCost;
		var upgradeEff = [];

		function calcBank() {
			var bank = Game.shimmerTypes.golden.minTime <= 2250 && Game.Has("Get lucky") ? Game.cookiesPsRaw*60*15/.15*7 : Game.cookiesPsRaw*60*15/.15;
			if (Game.cookies < bank) {
				document.getElementById("cookies").style.color = "#f66";
			} else if (Game.cookies >= bank + recommendedCost) {
				document.getElementById("cookies").style.color = "#6f6";
			} else {
				document.getElementById("cookies").style.removeProperty("color");
			}
		}

		function calcBuildingCPS() {
			for (i=0; i<Game.ObjectsById.length; i++) {
				document.getElementById("productName"+i).style.removeProperty("color");
				var cost = Game.ObjectsById[i].getSumPrice(Game.buyBulk);
				buildingEff[i] = cost / (Game.ObjectsById[i].storedCps * Game.globalCpsMult * Math.max(Game.buyBulk, 1));
			}
		}

		function calcUpgradeCPS() {
			upgradeEff = [];
			for (i=0; i<Game.UpgradesInStore.length; i++) {
				document.getElementById("upgrade"+i).style.removeProperty("background-color");
				if (Game.vault.includes(Game.UpgradesInStore[i].id)) {
					upgradeEff[i] = Infinity;
					continue;
				}
				var cost = Game.UpgradesInStore[i].getPrice();
				var denom = 4;
				switch (Game.UpgradesInStore[i].id) {
					//cursor
					case 0: case 1: case 2:
						upgradeEff[i] = cost / (Game.globalCpsMult * Game.ObjectsById[0].storedTotalCps);
						break;
					/*
					3
					4
					5
					6
					43
					82
					109
					188
					189
					660
					//mouse
					case 75: case 76: case 77: case 78: case 119: case 190: case 191:
					case 366: case 367: case 427: case 460: case 461: case 661:
						//1% click stuff here
						break;
					//golden
					52
					53
					86
					*/
					//research
					case 64:
						upgradeEff[i] = cost / (Game.globalCpsMult * Game.ObjectsById[1].storedTotalCps * 3);
						break;
					case 67: case 162:
						upgradeEff[i] = cost / (Game.globalCpsMult * Game.ObjectsById[1].storedTotalCps);
						break;
					/*
					69
					71
					73
					87
					*/
					//fortune
					case 638:
						//missing cost reduction aspect
						upgradeEff[i] = cost / (Game.cookiesPs * .01);
						break;
					/*
					640
					642
					*/
					//kitten
					case 31:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .100);
						break;
					case 32: case 494:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .125);
						break;
					case 54: case 462:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .150);
						break;
					case 108: case 442:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .175);
						break;
					case 187: case 320: case 321: case 322: case 425:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .200);
						break;
					case 613:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .115);
						break;
					case 641:
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .050);
						break;
					//garden
					case 470:
						d_cps = Game.globalCpsMult * Game.ObjectsById[1].storedTotalCps * .02;
						upgradeEff[i] = cost / ((Game.cookiesPs + d_cps) * .02);
						break;
					/*
					473
					474
					475
					*/
					//egg
					case 65: case 155: case 156: case 476:
					case 210: case 211: case 212: case 213: case 214: case 215: case 216: case 217: case 218: case 219: case 220: case 221:
						upgradeEff[i] = cost / (Game.cookiesPs * .01);
						break;
					case 66: case 471:
						upgradeEff[i] = cost / (Game.cookiesPs * .02);
						break;
					case 68: case 648:
						upgradeEff[i] = cost / (Game.cookiesPs * .03);
						break;
					case 70:
						upgradeEff[i] = cost / (Game.cookiesPs * .04);
						break;
					case 72:
						upgradeEff[i] = cost / (Game.cookiesPs * .05);
						break;
					case 639:
						upgradeEff[i] = cost / (Game.cookiesPs * .07);
						break;
					case 472:
						upgradeEff[i] = cost / (Game.cookiesPs * .10);
						break;
					case 153: case 154:
						upgradeEff[i] = cost / (Game.cookiesPs * .15);
						break;
					/*
					222:
					223:
					224:
					225:
					226:
					227:
					*/
					case 228:
						// Excerpt from main.js?v=2.091
						var eggMult=1;
						var day=Math.floor((Date.now()-Game.startDate)/1000/10)*10/60/60/24;
						day=Math.min(day,100);
						eggMult*=1+(1-Math.pow(1-day/100,3))*0.1;
						// End Excerpt
						upgradeEff[i] = cost / (Game.cookiesPs * (eggMult - 1));
						break;
					case 229:
						upgradeEff[i] = cost / (Game.globalCpsMult * 9);
						break;
					//christmas
					case 152: case 324:
						upgradeEff[i] = cost / Infinity;
						break;
					/*
					157
					158
					159
					160
					161
					163
					164
					*/
					case 165:
						upgradeEff[i] = cost / (Game.cookiesPs * (Game.santaLevel + 1) * .03);
						break;
					/*
					//math doesn't add up
					case 166:
						var milkMult = 1.05;
						// Excerpt from main.js?v=2.091
						milkMult*=1+Game.auraMult('Breath of Milk')*0.05;
						if (Game.hasGod)
						{
							var godLvl=Game.hasGod('mother');
							if (godLvl==1) milkMult*=1.1;
							else if (godLvl==2) milkMult*=1.05;
							else if (godLvl==3) milkMult*=1.03;
						}
						// End Excerpt
						
						upgradeEff[i] = cost / (Game.cookiesPs * Game.milkProgress * .05)
					*/
					case 168:
						//missing cost reduction aspect
						upgradeEff[i] = cost / (Game.cookiesPs * .20);
						break;
					//dragon
					/*
					649
					650
					651
					*/
					//heavenly
					case 129:
						var heavenlyMult = .05;
						// Excerpt from main.js?v=2.091
						heavenlyMult*=1+Game.auraMult('Dragon God')*0.05;
						if (Game.Has('Lucky digit')) heavenlyMult*=1.01;
						if (Game.Has('Lucky number')) heavenlyMult*=1.01;
						if (Game.Has('Lucky payout')) heavenlyMult*=1.01;
						if (Game.hasGod)
						{
							var godLvl=Game.hasGod('creation');
							if (godLvl==1) heavenlyMult*=0.7;
							else if (godLvl==2) heavenlyMult*=0.8;
							else if (godLvl==3) heavenlyMult*=0.9;
						}
						// End Excerpt
						upgradeEff[i] = cost / (Game.cookiesPs * Game.prestige * heavenlyMult / 100);
						break;
					case 130:
						var base = Game.cookiesPs / (1 + Game.prestige * Game.GetHeavenlyMultiplier() / 100);
						upgradeEff[i] = cost / ((Game.cookiesPs - base) * denom);
						break;
					case 131:
						denom -= 1;
					case 132:
						denom -= 1;
					case 133:
						denom -= 1;
						var base = Game.cookiesPs / (1 + Game.prestige * Game.GetHeavenlyMultiplier() / 100);
						upgradeEff[i] = cost / ((Game.cookiesPs - base) / denom);
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
								//missing cost reduction aspect
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

		function colorAmount() {
			document.getElementById("storeBulk1").style.removeProperty("color");
			document.getElementById("storeBulk10").style.removeProperty("color");
			if (Game.hasGod && Game.hasGod("order") && Game.BuildingsOwned%10==0) {
				document.getElementById("storeBulk10").style.color = "#6f6";
			} else {
				document.getElementById("storeBulk1").style.color = "#6f6";
			}
		}

		function colorRecommended() {
			calcBuildingCPS();
			calcUpgradeCPS();
			if (Math.min.apply(null, upgradeEff) < Math.min.apply(null, buildingEff)) {
				document.getElementById("upgrade"+upgradeEff.indexOf(Math.min.apply(null, upgradeEff))).style.backgroundColor = "#6f6";
				recommendedCost = Game.UpgradesInStore[upgradeEff.indexOf(Math.min.apply(null, upgradeEff))].getPrice();
			} else if (Game.buyMode == 1) {
				document.getElementById("productName"+buildingEff.indexOf(Math.min.apply(null, buildingEff))).style.color = "#6f6";
				recommendedCost = Game.ObjectsById[buildingEff.indexOf(Math.min.apply(null, buildingEff))].getSumPrice(Game.buyBulk);
			}
		}

		function drawLoop() {
			colorAmount();
			colorRecommended();
			calcBank();
		}

		drawLoop();
		setInterval(drawLoop, 10);
	},
});