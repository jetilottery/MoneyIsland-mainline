define({
    plaqueMessageSmall: {},
    buttonText: {},

    //-------------------TEXT SEPARATED INTO UPPER AND LOWER FIELDS FOR iOS ACCENT ISSUE (MISLAND-403)
    winUpToLower: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 4,
        dropShadowDistance: 3,
        fill: "white",
        fontFamily: "KOMTITP__",
        fontSize: 27,
        lineJoin: "round",
        padding: 10,
        stroke: "#554444"

    },
    winUpToUpper: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 4,
        dropShadowDistance: 3,
        dropShadowAlpha: 0,
        fill: ["white", "yellow", "#ff8000"],
        fillGradientStops: [0.37, 0.4, 0.6],
        fontFamily: "KOMTITP__",
        fontSize: 27,
        lineJoin: "round",
        padding: 10,
        stroke: "#554444"
    },

    howToPlayTitle: {
        dropShadow: true,
        dropShadowAlpha: 0.4,
        dropShadowAngle: 1.6,
        dropShadowBlur: 9,
        dropShadowDistance: 3,
        fill: "yellow",
        fontFamily: "KOMTITP__",
        fontSize: 40,
        fontVariant: "normal",
        lineJoin: "round",
        stroke: "black",
        padding: 38
    },

    //-------------------TEXT SEPARATED INTO UPPER AND LOWER FIELDS FOR iOS ACCENT ISSUE (MISLAND-403)
    howToPlayTitleLower: {
        dropShadow: true,
        dropShadowAlpha: 0.4,
        dropShadowAngle: 1.6,
        dropShadowBlur: 9,
        dropShadowDistance: 3,
        fill: "white",
        fontFamily: "KOMTITP__",
        fontSize: 40,
        fontVariant: "normal",
        //fontWeight: 800,
        lineJoin: "round",
        stroke: "black",
        padding: 38 //strokeThickness: 3

    },
    howToPlayTitleUpper: {
        dropShadow: true,
        dropShadowAlpha: 0,
        dropShadowAngle: 1.6,
        dropShadowBlur: 9,
        dropShadowDistance: 3,
        fill: ["white", "yellow", "#ff7800", "#db2606"],
        fillGradientStops: [0.38, 0.43, 0.62, 0.7],
        fontFamily: "KOMTITP__",
        fontSize: 40,
        fontVariant: "normal",
        //fontWeight: 800,
        lineJoin: "round",
        stroke: "black",
        padding: 38 //strokeThickness: 3
    },

    howToPlayTextL1: {
        fill: "white",
        fontFamily: "KOMTITP__",
        fontSize: 25,
        //fontVariant: "normal",
        lineJoin: "round",
        padding: 38,
        wordWrap: true,
        wordWrapWidth: 1400
    },
    howToPlayText: {
        fill: "white",
        fontFamily: "KOMTITP__",
        fontSize: 25,
        //fontVariant: "normal",
        lineJoin: "round",
        padding: 38,
        wordWrap: true,
        wordWrapWidth: 1400
    },
    prizeTableColHeader: {
        fontFamily: 'oswald',
        fontSize: 26,
        fontWeight: 'bold',
        fill: 'fontColourTableTitles'
    },
    prizeTableValues: {
        fontFamily: 'oswald',
        fontSize: 26,
        fontWeight: 'bold',
        fill: 'fontColourTableValues'
    },
    prizeTableValuesWin: {
        fontFamily: 'oswald',
        fontSize: 26,
        fontWeight: 'bold',
        fill: 'fontColourTableValuesWin'
    },
    bonusPrize: {
        fontFamily: 'KOMTIT__',
        fontSize: 35,
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowAngle: 1,
        dropShadowAlpha: 0.5,
        dropShadowBlur: 5,
        dropShadowColor: "#000000",
        dropShadowDistance: 3,
        fill: ["white", "#ff8000", "yellow"],
        fillGradientStops: [0.3, 1, 0.5],
        stroke: "#acb6bd" //strokeThickness: 1

    },
    cardValue: {
        fontFamily: 'KOMTITP__',
        fontSize: 60,
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowAngle: 1,
        dropShadowAlpha: 0.5,
        dropShadowBlur: 5,
        dropShadowColor: "#000000",
        dropShadowDistance: 3,
        fill: ["white", "#ff8000", "yellow"],
        fillGradientStops: [0.3, 1, 0.5] //stroke: "#acb6bd"
        //strokeThickness: 1

    },
    cardValueWin: {
        fontFamily: 'oswald',
        fontSize: 30,
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowAngle: 1.4,
        dropShadowBlur: 5,
        dropShadowColor: "#ffeb63",
        dropShadowDistance: 2,
        fill: ["#e69500", "#913702"],
        fillGradientStops: [0.2, 0.8] //stroke: "#6b3d02"
        //strokeThickness: 1

    },
    cannonValue: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 4,
        dropShadowDistance: 3,
        fill: ["white", "#ff8000", "yellow"],
        fillGradientStops: [0.3, 1, 0.5],
        fontFamily: "KOMTIT__",
        fontVariant: "normal",
        lineJoin: "round",
        miterLimit: 100,
        lineHeight: 100,
        fontSize: 100,
        //fontWeight: 800,
        padding: 20 //stroke: "yellow"
        //strokeThickness: 2

    },
    cannonMulti: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 4,
        dropShadowDistance: 3,
        fill: ["#fdffa3", "#ff9500"],
        fillGradientStops: [0.3, 0.6],
        fontFamily: "KOMTIT__",
        fontVariant: "normal",
        fontSize: 100,
        //fontWeight: 800,
        padding: 40,
        stroke: "#000000" //strokeThickness: 2

    },
    cannonCollect: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 4,
        dropShadowDistance: 3,
        fill: ["white", "#6df3f0"],
        fillGradientStops: [0.5, 0.9],
        fontFamily: "KOMTIT__",
        fontSize: 100,
        //fontWeight: 800,
        padding: 40,
        stroke: "#C310FF" //strokeThickness: 3

    },
    cannonSumText: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 4,
        dropShadowDistance: 3,
        fill: ["white"],
        fontFamily: "KOMTITP__",
        fontSize: 60,
        //fontWeight: 800,
        padding: 40,
        stroke: "#ffffff" //strokeThickness: 2

    },
    cannonTotalText: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 4,
        dropShadowDistance: 3,
        fill: ["white", "#ff8000", "yellow"],
        fillGradientStops: [0.3, 1, 0.5],
        fontFamily: "KOMTITP__",
        fontVariant: "normal",
        fontSize: 80,
        //fontWeight: 800,
        padding: 40,
        stroke: "yellow" //strokeThickness: 2

    },

    //-------------------TEXT SEPARATED INTO UPPER AND LOWER FIELDS FOR iOS ACCENT ISSUE (MISLAND-403)
    cannonTotalTitleTextLower: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 4,
        dropShadowDistance: 3,
        fill: '#ff4',
        fontFamily: "KOMTITP__",
        fontSize: 45,
        padding: 3
    },
    cannonTotalTitleTextUpper: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 4,
        dropShadowAlpha: 0,
        dropShadowDistance: 3,
        fill: ['#ff4', '#e80', '#d40'],
        fillGradientStops: [0.3, 0.7, 0.9],
        fontFamily: "KOMTITP__",
        fontSize: 45,
        padding: 3
    },

    cannonTotal: {
        fontFamily: 'KOMTITP__',
        fontSize: 45,
        padding: 10,
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowAlpha: 0.4,
        dropShadowBlur: 5,
        fontVariant: "normal",
        fill: "#ffffff",
        stroke: "#ffffff",
        strokeThickness: 0
    },
    islandTutorial: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 6,
        dropShadowAlpha: 0.4,
        fill: "white",
        fontFamily: "KOMTITP__",
        fontVariant: "normal",
        fontSize: 26,
        padding: 38,
        stroke: "#555",
        strokeThickness: 3,
        lineJoin: "round",
        wordWrap: true
    },
    valueDefault: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        dropShadowAlpha: 0.4,
        fill: ["white", "#6df3f0"],
        fillGradientStops: [0.4, 0.8],
        fontFamily: "KOMTITP__",
        fontSize: 28,
        //fontWeight: 800,
        padding: 10,
        //stroke: "#265e57",
        //strokeThickness: 4,
        lineJoin: "round"
    },
    valueWon: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        dropShadowAlpha: 0.4,
        fill: ["white", "#ffbb00", "#ffff00"],
        fillGradientStops: [0.1, 0.7, 0.6],
        fontFamily: "KOMTITP__",
        fontSize: 34,
        //fontWeight: 800,
        padding: 10,
        //strokeThickness: 0,
        lineJoin: "round"
    },
    valueNull: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        dropShadowAlpha: 0.4,
        fill: ["#777700", "#555500", "#660000"],
        fillGradientStops: [0.4, 0.5, 0.8],
        fontFamily: "KOMTITP__",
        fontSize: 34,
        //fontWeight: 800,
        padding: 10,
        //stroke: "#777700",
        //strokeThickness: 2,
        lineJoin: "round"
    },
    sqPointsVal: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        fill: ["#00e1cf", "#00e15d"],
        fillGradientStops: [0.3, 1],
        fontFamily: "KOMTITP__",
        fontSize: 45,
        //fontWeight: 800,
        lineJoin: "round",
        padding: 10,
        stroke: "#004d4e" //strokeThickness: 6

    },
    sqPoints: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        fill: ["#00e1cf", "#00e15d"],
        fillGradientStops: [0.3, 1],
        fontFamily: "KOMTITP__",
        fontSize: 35,
        //fontWeight: 800,
        lineJoin: "round",
        padding: 38,
        stroke: "#004d4e" //strokeThickness: 6

    },
    totalPointsTitle: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        fill: ["white", "#6df3f0"],
        fillGradientStops: [0.35, 0.8],
        fontFamily: "KOMTIT__",
        fontSize: 45,
        //fontWeight: 800,
        lineJoin: "round",
        miterLimit: 58,
        lineHeight: 60,
        padding: 38 //stroke: "#baf1f5",
        //strokeThickness: 3

    },

    //-------------------TEXT SEPARATED INTO UPPER AND LOWER FIELDS FOR iOS ACCENT ISSUE (MISLAND-403)
    totalPointsTitleLower: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        fill: "white",
        fontFamily: "KOMTIT__",
        fontSize: 45,
        lineJoin: "round",
        miterLimit: 58,
        lineHeight: 60,
        padding: 38

    },
    totalPointsTitleUpper: {
        align: "center",
        dropShadow: true,
        dropShadowAlpha: 0,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        fill: ["white", "#6df3f0"],
        fillGradientStops: [0.35, 0.8],
        fontFamily: "KOMTIT__",
        fontSize: 45,
        lineJoin: "round",
        miterLimit: 58,
        lineHeight: 60,
        padding: 38

    },

    totalPoints: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        fill: ["#00e1cf", "#00e15d"],
        fillGradientStops: [0.3, 1],
        fontFamily: "KOMTITP__",
        fontSize: 50,
        lineJoin: "round",
        miterLimit: 28,
        padding: 41
    },
    
    messageBarText: {
        fontFamily: 'oswald',
        fontSize: 30,
        fontWeight: 'bold',
        fill: 'FontColourMessageBarTextColour'
    },
    buyButtonEnabled: {
        fontFamily: 'oswald',
        fontSize: 38,
        fill: 'buyButtonEnabledFontColour',
        padding: 10
    },
    buyButtonDisabled: {
        fontFamily: 'oswald',
        fontSize: 38,
        fill: 'buyButtonDisabledFontColour',
        padding: 10
    },
    buyButtonOver: {
        fontFamily: 'oswald',
        fontSize: 38,
        fill: 'buyButtonEnabledFontColour',
        padding: 10
    },
    buyButtonPressed: {
        fontFamily: 'oswald',
        fontSize: 41,
        fill: 'buyButtonPressedFontColour',
        padding: 10
    },
    standardButtonPressed: {
        fontFamily: 'oswald',
        fontSize: 41,
        fill: 'white',
        padding: 10
    },
    losePlaqueBody: {
        fontFamily: 'KOMTITP__',
        fontSize: 70,
        fontWeight: 'bold',
        align: 'center',
        fill: 'white',
        padding: 10,
        maxWidth: 500
    },
    winPlaqueBody: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        fill: "white",
        //fillGradientStops: [0.5, 0.9],
        fontFamily: "KOMTIT__",
        fontSize: 60,
        lineJoin: "round",
        miterLimit: 58,
        lineHeight: 70,
        padding: 10 //stroke: "#baf1f5",
        //strokeThickness: 2

    },
    winPlaqueBodyGradient: {
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        fill: ["white", "#6df3f0"],
        fillGradientStops: [0.5, 0.9],
        fontFamily: "KOMTIT__",
        fontSize: 60,
        fontVariant: "normal",
        //fontWeight: 800,
        lineJoin: "round",
        stroke: "black",
        padding: 10 //strokeThickness: 3

    },
    winPlaqueValue: {
        align: "center",
        dropShadow: true,
        dropShadowAngle: 1.3,
        dropShadowBlur: 7,
        dropShadowDistance: 4,
        fill: ["white", "#ff8000", "yellow"],
        fillGradientStops: [0.35, 1, 0.5],
        fontFamily: "KOMTIT__",
        fontSize: 110,
        //fontWeight: 800,
        padding: 10,
        //stroke: "yellow",
        //strokeThickness: 4,
        lineJoin: "round"
    },
    errorMessage: {
        fill: 'white',
        fontFamily: "KOMTIT__",
        fontSize: 22,
        lineHeight: 35,
        align: 'center'
    },
    mainButtonEnabled: {
        fontFamily: 'oswald',
        fontSize: 28,
        fill: 'fontColourMainButtonEnabled',
        padding: 10,
        align: 'center'
    },
    mainButtonDisabled: {
        fontFamily: 'oswald',
        fontSize: 28,
        fill: 'fontColourMainButtonDisabled',
        padding: 10,
        align: 'center'
    },
    mainButtonOver: {
        fontFamily: 'oswald',
        fontSize: 28,
        fill: 'fontColourMainButtonOver',
        padding: 10,
        align: 'center'
    },
    mainButtonPressed: {
        fontFamily: 'oswald',
        fontSize: 30,
        fill: 'fontColourMainButtonPressed',
        padding: 10,
        align: 'center'
    }
});
