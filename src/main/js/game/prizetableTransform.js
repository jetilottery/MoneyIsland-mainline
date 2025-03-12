define(require => {
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');

    let instantWin, islandBonus, cannonBonus, descriptionNames;

    return data => {
        instantWin = resLib.i18n.game.Paytable.instantWin;
        islandBonus = resLib.i18n.game.Paytable.islandBonus;
        cannonBonus = resLib.i18n.game.Paytable.cannonBonus;

        descriptionNames = {
            "A": instantWin, "B": instantWin, "C": instantWin, "D": instantWin, "E": instantWin, "F": instantWin, "G": instantWin, "H": instantWin,
            "I": instantWin, "J": instantWin, "K": instantWin, "L": instantWin, "M": instantWin, "N": instantWin, "O": instantWin, 
            "I1": islandBonus, "I2": islandBonus, "I3": islandBonus, "I4": islandBonus, "I5": islandBonus, "I6": islandBonus, 
            "I7": islandBonus, "I8": islandBonus, "I9": islandBonus, "I10": islandBonus, "I11": islandBonus, "I12": islandBonus, 
            "S1": cannonBonus, "S2": cannonBonus, "S3": cannonBonus, "S4": cannonBonus, "S5": cannonBonus, "S6": cannonBonus, 
            "S7": cannonBonus, "S8": cannonBonus, "S9": cannonBonus, "S10": cannonBonus, "S11": cannonBonus 
        };

        return ({
            cells: {
                prizeLevel: data.division,
                description: descriptionNames[data.description] ? descriptionNames[data.description] : resLib.i18n.game.Paytable.description,
                prizeValue: SKBeInstant.formatCurrency(data.prize).formattedAmount
            },
        });
    };
});
