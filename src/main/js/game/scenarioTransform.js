define((require) => {
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const bonusData = require('game/data/bonusData');

    return function scenarioTransform(scenarioString) {
        // scenario example: "CKEAHJDIBGF|XAFIAEAHGYIHBJIK|TWUPWWZ|W2";
        // scenarioString = '2X12XX1X||';
        // scenarioString = '2X12AX2X||';
        // scenarioString = 'A2X12X2X||S6,M,M,S8,S11,S2,M,S1,M,S8,X'; // Cannon Bonus
        // scenarioString = 'X122X1X1|I11,115,57,59:I9,242,68,61:I7,354,67,49:I5,487,63,65:I2,616,61,67|'; // island Bonus
        // scenarioString = 'X122X1X1|I11,115,57,59:I9,122,68,61:I7,114,67,49:I5,487,63,65:I2,616,61,67|'; // island Bonus
        const scenarioArr = scenarioString.split('|');

        let symbols = [];
        let symbolPrizes = [];
        let revealOrder = [];
        let cannonBonus = [];
        let islandBonusPrizes = [];
        let islandBonus;



        //basegame symbol order
        symbols = scenarioArr[0].split('');

        //basegame push prize data to *symbolPrizes*
        symbolPrizes = symbols.map(e => {
            return prizeData.prizeTable[e];
        });

        revealOrder = scenarioArr[0].split('');

        // If we have cannonBonus string, get the prizedata 
        if (scenarioArr[2] !== '') {
            cannonBonus = scenarioArr[2].split(',').map(prize => {
                return prize === 'M' || prize === 'X' ? prize : prizeData.prizeTable[prize];
                // return prize === 'M' || prize === 'X' ? prize : prizeData.prizeTable[cannonBonusPrizeIndex[prize]]; // Change to line above when we get real data
            });
        } else {
            cannonBonus = false;
        }

        islandBonus = scenarioArr[1] !== '' ? scenarioArr[1] : false;

        if (islandBonus) {
            let islandLevels = islandBonus.split(':');
            islandLevels.forEach((lvl, i) => {
                lvl = lvl.split(',');
                islandBonusPrizes.push(prizeData.prizeTable[lvl[0]]);
                // islandBonusPrizes.push(prizeData.prizeTable[islandBonusPrizeIndex[lvl[0]]]); // Change to line above when we get real data
                bonusData.islandData.levels[i].target = lvl[1];
                if (i > 0) {
                    let pointsCollected = 0;
                    for (let l = i; l > 0; l--) {
                        pointsCollected += (parseInt(bonusData.islandData.levels[l - 1].sq1Total) + parseInt(bonusData.islandData.levels[l - 1].sq2Total));
                    }
                    bonusData.islandData.levels[i].target = parseInt(lvl[1]) - pointsCollected;
                }

                bonusData.islandData.levels[i].sq1Total = lvl[2];
                bonusData.islandData.levels[i].sq2Total = lvl[3];
            });
        }

        bonusData.cannonBonus = cannonBonus;
        bonusData.islandBonus = islandBonus;
        bonusData.symbolPrizes = symbolPrizes;

        return {
            symbols,
            symbolPrizes,
            revealOrder,
            cannonBonus,
            islandBonus,
            islandBonusPrizes,
            scenario: {
                'symbols': symbols,
                'prizes': symbolPrizes,
                'revealOrder': revealOrder,
                'cannonBonus': cannonBonus,
                'islandBonus': islandBonus,
                'islandBonusPrizes': islandBonusPrizes,
            }
        };
    };
});
