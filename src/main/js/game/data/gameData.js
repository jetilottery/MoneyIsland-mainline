define(() => {
    let data;
    return data = {
        gameTypes: ['baseGame', 'cannonBonus', 'islandBonus'],
        activeGame: 'baseGame',
        bgActive: true,

        reset() {
            data.activeGame = data.gameTypes[0];
            data.bgActive = true;
        }
    };
});