define({
    // UI
    click: ['ui_click', 0],
    buy: ['ui_buy', 1],
    costMax: ['ui_betMax', 0],
    costDown: ['ui_betDown', 0],
    costUp: ['ui_betUp', 1],

    // BaseGame
    BG_music: ['BaseGameLoop', 2],
    chest_reveal: ['RevealChestOpen', 8],
    no_prize: ['NoMatch01', 7],
    chest_reset: ['ChestReset', 7],
    chest_bonus: ['ChestBonusSymbol', 7],
    bonus_triggered: ['BonusTriggered', 1],
    bonus_icon_1: ['BonusSymbol01', 0],
    bonus_icon_2: ['BonusSymbol02', 0],
    bonus_icon_3: ['BonusSymbol03', 0],

    // Transition
    Chest_Appear: ['ChestAppear', 6],
    Bonus_Transition: ['BonusTransition', 6],

    // Cannon Bonus
    cannon_bonus_music: ['CanonBattleLoop', 2],
    shoot_cannon: ['CannonFire', 4],
    boat_collect: ['BoatRevealCollect', 5],

    // Island Bonus
    island_bonus_music: ['HuntLoopNoMelody', 2],
    next_island: ['IslandsTransition', 4],
    scroll_open: ['ScrollReveal', 8],
    scroll_select: ['ScrollSelect', 7],
    scroll_close: ['ScrollReset', 8],
    island_win: ['IslandWin', 7],
    island_lose: ['IslandLose', 7],
    drop_anchor: ['AnchorReveal', 8],
    points_up: ['PointsRollUp', 1],
    points_end: ['PointsRollUpEnd', 1],


    winTerminator: ['WinTerm', 3],
    loseTerminator: ['LoseTerm', 3],

    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

    chestPrize: ['ChestWin01', 3],
    chestPrize_2: ['ChestWin02', 4],
    chestPrize_3: ['ChestWin03', 5],
    chestPrize_4: ['ChestWin04', 6],

    boatWin: ['BoatRevealWin', 7],
    boatWin_2: ['BoatRevealWin', 8],
});
