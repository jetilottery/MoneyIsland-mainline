define(() => {
    let bonusData;
    return bonusData = {
        cannonBonus: false,
        islandBonus: false,

        islandData: {
            selectedSquares: [],
            squares: null,
            currentLevel: null,
            levels: [
                { target: null, sq1Total: null, sq2Total: null },
                { target: null, sq1Total: null, sq2Total: null },
                { target: null, sq1Total: null, sq2Total: null },
                { target: null, sq1Total: null, sq2Total: null },
                { target: null, sq1Total: null, sq2Total: null },
            ]
        },

        reset() {
            bonusData.cannonBonus = false;
            bonusData.islandBonus = false;
            bonusData.islandData.selectedSquares = [];
            bonusData.islandData.currentLevel = null;
            bonusData.islandData.levels.forEach(lvl => {
                lvl.target = null;
                lvl.sq1Total = null;
                lvl.sq2Total = null;
            });
        }
    };
});