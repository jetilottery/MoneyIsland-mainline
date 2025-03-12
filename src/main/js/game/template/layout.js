define({
    _BASE_APP: {
        children: ['backgrounds', 'logoContainer', 'infoArea', 'playerNumbers', 'baseGameFG', 'cannonBonus', 'islandBonus', 'particles', 'transitions']
    },

    /*
     * BACKGROUND
     */
    backgrounds: {
        type: 'container',
        children: ['baseGameBG', 'cannonBonusBG', 'islandBonusBG']
    },
    baseGameBG: {
        type: 'container',
        portrait: {
            x: 405,
            y: 710
        },
        landscape: {
            x: 720,
            y: 390
        }
    },
    cannonBonusBG: {
        type: 'container',
        portrait: {
            x: 405,
            y: 485,
            scale: {
                x: 1.2,
                y: 1.2
            }
        },
        landscape: {
            x: 720,
            y: 390,
            scale: {
                x: 1,
                y: 1
            }
        }
    },
    islandBonusBG: {
        type: 'container',
        portrait: {
            x: 405,
            y: 690
        },
        landscape: {
            x: 720,
            y: 390
        }
    },
    logoContainer: {
        type: 'container',
        children: ['logo']
    },

    /*
     * LOGO
     */
    logo: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'landscape_gameLogo',
            x: 720,
            y: 57,
            scale: {
                x: 0.75,
                y: 0.75
            }
        },
        portrait: {
            texture: 'portrait_gameLogo',
            x: 405,
            y: 90,
            scale: {
                x: 1.2,
                y: 1.2
            }
        }
    },
    infoArea: {
        type: 'container',
        children: ['CB_Meter', 'BB_Meter', 'bPips', 'cPips', 'boatBonusText', 'cannonBonusText', 'winUpTo'],
        landscape: {
            y: 0
        },
        portrait: {
            y: 0
        }
    },
    bPips: {
        type: 'container',
        children: ['bPip_1', 'bPip_2', 'bPip_3'],
        landscape: {
            x: 445,
            y: 80
        },
        portrait: {
            x: 230,
            y: 205
        }
    },
    bPip_1: {
        x: 0,
        y: 0
    },
    bPip_2: {
        x: 35,
        y: 0
    },
    bPip_3: {
        x: 70,
        y: 0
    },
    cPips: {
        type: 'container',
        children: ['cPip_1', 'cPip_2', 'cPip_3'],
        landscape: {
            x: 920,
            y: 80
        },
        portrait: {
            x: 500,
            y: 205
        }
    },
    cPip_1: {
        x: 0,
        y: 0
    },
    cPip_2: {
        x: 35,
        y: 0
    },
    cPip_3: {
        x: 70,
        y: 0
    },
    CB_Meter: {
        type: 'container',
        landscape: {
            x: 1020,
            y: 80
        },
        portrait: {
            x: 600,
            y: 205
        }
    },
    BB_Meter: {
        type: 'container',
        landscape: {
            x: 415,
            y: 80
        },
        portrait: {
            x: 200,
            y: 205
        }
    },
    boatBonusText: {
        type: 'text',
        style: 'bonusPrize',
        anchor: 0.5,
        visible: false,
        maxWidth: 120,
        landscape: {
            x: 487,
            y: 78
        },
        portrait: {
            x: 271,
            y: 204
        }
    },
    cannonBonusText: {
        type: 'text',
        style: 'bonusPrize',
        anchor: 0.5,
        visible: false,
        maxWidth: 120,
        landscape: {
            x: 952,
            y: 78
        },
        portrait: {
            x: 533,
            y: 204
        }
    },

    /*
     * WIN UP TO
     */
    winUpTo: {
        type: 'container',
        children: ['winUpToIn', 'winUpToOut'],
        landscape: {
            x: 720,
            y: 127
        },
        portrait: {
            x: 405,
            y: 250
        }
    },
    winUpToIn: {
        type: 'container',
        children: ['winUpToInTextLower', 'winUpToInTextUpper']
    },
    winUpToInTextLower: {
        type: 'text',
        style: 'winUpToLower',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400
    },
    winUpToInTextUpper: {
        type: 'text',
        style: 'winUpToUpper',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400
    },
    winUpToOut: {
        type: 'container',
        children: ['winUpToOutTextLower', 'winUpToOutTextUpper']
    },
    winUpToOutTextLower: {
        type: 'text',
        style: 'winUpToLower',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400
    },
    winUpToOutTextUpper: {
        type: 'text',
        style: 'winUpToUpper',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400
    },

    /*
     * PLAYER NUMBERS
     */
    playerNumbers: {
        type: 'container',
        children: ['playerNumber1', 'playerNumber2', 'playerNumber3', 'playerNumber4', 'playerNumber5', 'playerNumber6', 'playerNumber7', 'playerNumber8', 'playerNumber9', 'playerNumber10', 'playerNumber11', 'playerNumber12', 'playerNumber13', 'playerNumber14', 'playerNumber15', 'playerNumber16'],
        landscape: {
            x: 50,
            y: 200
        },
        portrait: {
            x: 100,
            y: 400
        }
    },
    /////////////////////////////
    playerNumber1: {
        type: 'container',
        children: ['playerNumberChest1'],
        landscape: {
            x: 235,
            y: 65
        },
        portrait: {
            x: 45,
            y: 70
        }
    },
    playerNumberChest1: {
        type: 'container',
        landscape: {
            scale: {
                x: -0.7,
                y: 0.7
            },
            rotation: -0.4
        },
        portrait: {
            scale: {
                x: -0.75,
                y: 0.7
            },
            rotation: -0.25
        }
    },
    playerNumber2: {
        type: 'container',
        children: ['playerNumberChest2'],
        landscape: {
            x: 430,
            y: 10
        },
        portrait: {
            x: 180,
            y: -20
        }
    },
    playerNumberChest2: {
        type: 'container',
        landscape: {
            scale: {
                x: -0.7,
                y: 0.7
            },
            rotation: 0
        },
        portrait: {
            scale: {
                x: -0.68,
                y: 0.68
            },
            rotation: 0.25
        }
    },
    playerNumber3: {
        type: 'container',
        children: ['playerNumberChest3'],
        landscape: {
            x: 660,
            y: 35
        },
        portrait: {
            x: 400,
            y: -30
        }
    },
    playerNumberChest3: {
        type: 'container',
        landscape: {
            scale: {
                x: -0.7,
                y: 0.7
            },
            rotation: -0.25
        },
        portrait: {
            scale: {
                x: 0.65,
                y: 0.65
            },
            rotation: 0
        }
    },
    playerNumber4: {
        type: 'container',
        children: ['playerNumberChest4'],
        landscape: {
            x: 837,
            y: 20
        },
        portrait: {
            x: 420,
            y: 105
        }
    },
    playerNumberChest4: {
        type: 'container',
        landscape: {
            scale: {
                x: -0.7,
                y: 0.7
            }
        },
        portrait: {
            scale: {
                x: -0.85,
                y: 0.85
            }
        }
    },
    playerNumber5: {
        type: 'container',
        children: ['playerNumberChest5'],
        landscape: {
            x: 1050,
            y: 28
        },
        portrait: {
            x: 230,
            y: 110
        }
    },
    playerNumberChest5: {
        type: 'container',
        landscape: {
            scale: {
                x: 0.8,
                y: 0.8
            }
        },
        portrait: {
            scale: {
                x: -0.85,
                y: 0.85
            }
        }
    },
    playerNumber6: {
        type: 'container',
        children: ['playerNumberChest6'],
        landscape: {
            x: 1188,
            y: 130
        },
        portrait: {
            x: 600,
            y: 200
        }
    },
    playerNumberChest6: {
        type: 'container',
        landscape: {
            scale: {
                x: 0.8,
                y: 0.8
            },
            rotation: 0.2
        },
        portrait: {
            scale: {
                x: 0.9,
                y: 0.9
            },
            rotation: 0.2
        }
    },
    playerNumber7: {
        type: 'container',
        children: ['playerNumberChest7'],
        landscape: {
            x: 100,
            y: 200
        },
        portrait: {
            x: 400,
            y: 280
        }
    },
    playerNumberChest7: {
        type: 'container',
        landscape: {
            scale: {
                x: -1,
                y: 1
            }
        },
        portrait: {
            scale: {
                x: -0.9,
                y: 0.9
            }
        }
    },
    playerNumber8: {
        type: 'container',
        children: ['playerNumberChest8'],
        landscape: {
            x: 360,
            y: 170
        },
        portrait: {
            x: 340,
            y: 450
        }
    },
    playerNumberChest8: {
        type: 'container',
        landscape: {
            scale: {
                x: -0.8,
                y: 0.8
            },
            rotation: 0.35
        },
        portrait: {
            scale: {
                x: 1,
                y: 1
            },
            rotation: 0
        }
    },
    playerNumber9: {
        type: 'container',
        children: ['playerNumberChest9'],
        landscape: {
            x: 545,
            y: 170
        },
        portrait: {
            x: 70,
            y: 440
        }
    },
    playerNumberChest9: {
        type: 'container',
        landscape: {
            scale: {
                x: -0.8,
                y: 0.8
            },
            rotation: -0.25
        },
        portrait: {
            scale: {
                x: -0.85,
                y: 0.85
            },
            rotation: -0.3
        }
    },
    playerNumber10: {
        type: 'container',
        children: ['playerNumberChest10'],
        landscape: {
            x: 770,
            y: 170
        },
        portrait: {
            x: 200,
            y: 260
        }
    },
    playerNumberChest10: {
        type: 'container',
        scale: {
            x: -0.85,
            y: 0.85
        },
        landscape: {
            rotation: -0.2
        },
        portrait: {
            rotation: -0.3
        }
    },
    playerNumber11: {
        type: 'container',
        children: ['playerNumberChest11'],
        landscape: {
            x: 950,
            y: 182
        },
        portrait: {
            x: 310,
            y: 640
        }
    },
    playerNumberChest11: {
        type: 'container',
        landscape: {
            scale: {
                x: -0.8,
                y: 0.8
            },
            rotation: 0
        },
        portrait: {
            scale: {
                x: -1,
                y: 1
            },
            rotation: 0.3
        }
    },
    playerNumber12: {
        type: 'container',
        children: ['playerNumberChest12'],
        landscape: {
            x: 280,
            y: 320
        },
        portrait: {
            x: 30,
            y: 620
        }
    },
    playerNumberChest12: {
        type: 'container'
    },
    playerNumber13: {
        type: 'container',
        children: ['playerNumberChest13'],
        landscape: {
            x: 510,
            y: 350
        },
        portrait: {
            x: -10,
            y: 230
        }
    },
    playerNumberChest13: {
        type: 'container',
        landscape: {
            scale: {
                x: 1,
                y: 1
            },
            rotation: 0
        },
        portrait: {
            scale: {
                x: 0.8,
                y: 0.8
            },
            rotation: -0.2
        }
    },
    playerNumber14: {
        type: 'container',
        children: ['playerNumberChest14'],
        landscape: {
            x: 730,
            y: 330
        },
        portrait: {
            x: 600,
            y: 40
        }
    },
    playerNumberChest14: {
        type: 'container',
        landscape: {
            scale: {
                x: 1,
                y: 1
            },
            rotation: 0
        },
        portrait: {
            scale: {
                x: 0.75,
                y: 0.75
            },
            rotation: 0.3
        }
    },
    playerNumber15: {
        type: 'container',
        children: ['playerNumberChest15'],
        landscape: {
            x: 960,
            y: 350
        },
        portrait: {
            x: 580,
            y: 620
        }
    },
    playerNumberChest15: {
        type: 'container'
    },
    playerNumber16: {
        type: 'container',
        children: ['playerNumberChest16'],
        landscape: {
            x: 1185,
            y: 280
        },
        portrait: {
            x: 590,
            y: 430
        }
    },
    playerNumberChest16: {
        type: 'container'
    },
    baseGameFG: {
        type: 'container',
        portrait: {
            x: 405,
            y: 690
        },
        landscape: {
            x: 720,
            y: 390
        }
    },
    //////////////////////////////////////
    cannonBonus: {
        type: 'container',
        children: ['cannonBonusInfo', 'cannonBonusP1', 'cannonBonusP2', 'cannonBonusP3', 'cannonBonusP4', 'cannonBonusP5', 'cannonBonusP6', 'cannonBonusP7', 'cannonBonusP8', 'cannonBonusP9', 'cannonBonusP10', 'cannonBonusP11', 'cannonBonusP12', 'cannonBall', 'cannonBonusCannon', 'bonusRevealAllContainer', 'cannonSummary']
    },
    cannonBonusInfo: {
        type: 'container',
        children: ['cbInfoBG', 'cbInfoTotalFade', 'cbInfoTotal', 'cbInfoMultiFade', 'cbInfoMulti']
    },
    cbInfoBG: {
        type: 'sprite',
        anchor: 0.5,
        texture: 'cannonMeter',
        landscape: {
            x: 730,
            y: 87
        },
        portrait: {
            x: 403,
            y: 107
        }
    },
    cbInfoTotal: {
        type: 'text',
        style: 'cannonTotal',
        anchor: 0.5,
        wordWrap: false,
        maxWidth: 170,
        align: 'center',
        landscape: {
            x: 563,
            y: 83
        },
        portrait: {
            x: 235,
            y: 105
        }
    },
    cbInfoTotalFade: {
        type: 'text',
        style: 'cannonTotal',
        anchor: 0.5,
        wordWrap: false,
        maxWidth: 170,
        align: 'center',
        landscape: {
            x: 563,
            y: 83
        },
        portrait: {
            x: 235,
            y: 105
        }
    },
    cbInfoMulti: {
        type: 'text',
        style: 'cannonTotal',
        anchor: 0.5,
        wordWrap: false,
        maxWidth: 170,
        align: 'center',
        landscape: {
            x: 900,
            y: 83
        },
        portrait: {
            x: 573,
            y: 105
        }
    },
    cbInfoMultiFade: {
        type: 'text',
        style: 'cannonTotal',
        anchor: 0.5,
        wordWrap: false,
        maxWidth: 170,
        align: 'center',
        landscape: {
            x: 900,
            y: 83
        },
        portrait: {
            x: 573,
            y: 105
        }
    },
    // Max 665, Min 135
    cannonBonusP1: {
        type: 'container',
        landscape: {
            x: 120,
            y: 160,
            scale: {
                x: 0.85,
                y: 0.85
            }
        },
        portrait: {
            x: 665,
            y: 260,
            scale: {
                x: 1,
                y: 1
            }
        }
    },
    cannonBonusP2: {
        type: 'container',
        landscape: {
            x: 340,
            y: 270,
            scale: {
                x: -0.85,
                y: 0.85
            }
        },
        portrait: {
            x: 340,
            y: 370,
            scale: {
                x: -1,
                y: 1
            }
        }
    },
    cannonBonusP3: {
        type: 'container',
        landscape: {
            x: 540,
            y: 220,
            scale: {
                x: 0.85,
                y: 0.85
            }
        },
        portrait: {
            x: 135,
            y: 275,
            scale: {
                x: 1,
                y: 1
            }
        }
    },
    cannonBonusP4: {
        type: 'container',
        landscape: {
            x: 850,
            y: 220,
            scale: {
                x: 0.85,
                y: 0.85
            }
        },
        portrait: {
            x: 135,
            y: 530,
            scale: {
                x: 1,
                y: 1
            }
        }
    },
    cannonBonusP5: {
        type: 'container',
        landscape: {
            x: 1090,
            y: 240,
            scale: {
                x: -0.85,
                y: 0.85
            }
        },
        portrait: {
            x: 135,
            y: 780,
            scale: {
                x: -1,
                y: 1
            }
        }
    },
    cannonBonusP6: {
        type: 'container',
        landscape: {
            x: 1290,
            y: 180,
            scale: {
                x: 0.85,
                y: 0.85
            }
        },
        portrait: {
            x: 665,
            y: 540,
            scale: {
                x: 1,
                y: 1
            }
        }
    },
    cannonBonusP7: {
        type: 'container',
        landscape: {
            x: 135,
            y: 400
        },
        portrait: {
            x: 500,
            y: 470
        }
    },
    cannonBonusP8: {
        type: 'container',
        landscape: {
            x: 340,
            y: 500
        },
        portrait: {
            x: 380,
            y: 680
        }
    },
    cannonBonusP9: {
        type: 'container',
        landscape: {
            x: 600,
            y: 425
        },
        portrait: {
            x: 650,
            y: 770
        }
    },
    cannonBonusP10: {
        type: 'container',
        landscape: {
            x: 900,
            y: 460,
            scale: {
                x: -1
            }
        },
        portrait: {
            x: 390,
            y: 920,
            scale: {
                x: -1
            }
        }
    },
    cannonBonusP11: {
        type: 'container',
        landscape: {
            x: 1105,
            y: 500
        },
        portrait: {
            x: 135,
            y: 1000
        }
    },
    cannonBonusP12: {
        type: 'container',
        landscape: {
            x: 1295,
            y: 410
        },
        portrait: {
            x: 665,
            y: 1010
        }
    },
    cannonBall: {
        type: 'container'
    },
    cannonBonusCannon: {
        type: 'container',
        landscape: {
            x: 720,
            y: 405,
            scale: {
                x: 1,
                y: 1
            }
        },
        portrait: {
            x: 405,
            y: 920,
            scale: {
                x: 1.1,
                y: 1.1
            }
        }
    },
    bonusRevealAllContainer: {
        type: 'container',
        children: ['bonusRevealAll'],
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 701
        },
        portrait: {
            x: 405,
            y: 1300
        }
    },
    bonusRevealAll: {
        type: 'button',
        string: 'button_autoPlay',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    cannonSummary: {
        type: 'container',
        anchor: 0.5,
        portrait: {
            x: 405,
            y: 690
        },
        landscape: {
            x: 720,
            y: 390
        }
    },
    islandBonus: {
        type: 'container',
        children: ['islandBonusMeter', 'islandScroll', 'islandGrid', 'islandTutorial', 'startIslandButton', 'islandScrollButtonContainer']
    },
    islandBonusMeter: {
        type: 'container',
        landscape: {
            x: 720,
            y: 60,
            scale: {
                x: 1,
                y: 1
            }
        },
        portrait: {
            x: 388,
            y: 100,
            scale: {
                x: 0.85,
                y: 0.85
            }
        }
    },
    islandScroll: {
        type: 'container',
        landscape: {
            y: 20
        },
        portrait: {
            y: 0
        }
    },
    islandGrid: {
        type: 'container',
        children: ['sq1', 'sq2', 'sq3', 'sq4', 'sq5', 'sq6', 'sq7', 'sq8', 'sq9'],
        portrait: {
            x: 247,
            y: 551
        },
        landscape: {
            x: 562,
            y: 258
        }
    },
    sq1: {
        x: 0,
        y: 0
    },
    sq2: {
        x: 152,
        y: 0
    },
    sq3: {
        x: 304,
        y: 0
    },
    sq4: {
        x: 0,
        y: 152
    },
    sq5: {
        x: 152,
        y: 152
    },
    sq6: {
        x: 304,
        y: 152
    },
    sq7: {
        x: 0,
        y: 304
    },
    sq8: {
        x: 152,
        y: 304
    },
    sq9: {
        x: 304,
        y: 304
    },
    islandTutorial: {
        type: 'container',
        children: ['islandBonusTitle', 'islandBonusTitleGradient', 'islandTutorialText'],
        alpha: 0,
        visible: false,
        portrait: {
            x: 405,
            y: 540
        },
        landscape: {
            x: 720,
            y: 210
        }
    },
    startIslandButton: {
        type: 'button',
        string: 'button_start',
        visible: false,
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 701
        },
        portrait: {
            x: 405,
            y: 1300
        },
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'tutorialOKButtonEnabled',
            over: 'tutorialOKButtonOver',
            pressed: 'tutorialOKButtonPressed',
            disabled: 'standardButtonPressed'
        }
    },
    islandBonusTitle: {
        type: 'text',
        string: 'islandBonus',
        style: 'howToPlayTitleLower',
        anchor: 0.5,
        landscape: {
            y: 0
        },
        portrait: {
            y: 0
        }
    },
    islandBonusTitleGradient: {
        type: 'text',
        string: 'islandBonus',
        style: 'howToPlayTitleUpper',
        anchor: 0.5,
        landscape: {
            y: 0
        },
        portrait: {
            y: 0
        }
    },
    islandTutorialText: {
        type: 'text',
        string: 'islandTutorial',
        style: 'islandTutorial',
        anchor: 0.5,
        landscape: {
            y: 200,
            wordWrapWidth: 900
        },
        portrait: {
            y: 200,
            wordWrapWidth: 650
        }
    },
    islandScrollButtonContainer: {
        type: 'container',
        children: ['islandScrollButton'],
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 701
        },
        portrait: {
            x: 405,
            y: 1300
        }
    },
    islandScrollButton: {
        type: 'button',
        string: 'button_autoPlay',
        visible: false,
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    particles: {
        type: 'container'
    },
    transitions: {
        type: 'container',
        landscape: {
            x: 720,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720
        }
    },

    /*
     * How To Play
     */
    howToPlayOverlay: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tutorialOverlay',
            y: 0
        },
        portrait: {
            texture: 'portrait_tutorialOverlay',
            y: -100
        }
    },
    howToPlayContainer: {
        type: 'container',
        children: ['howToPlayOverlay', 'howToPlayBackground', 'howToPlayPages', 'versionText', 'audioButtonContainer', 'howToPlayPrevious', 'howToPlayNext', 'howToPlayClose', 'howToPlayIndicators'],
        portrait: {
            y: 100
        },
        landscape: {
            y: 0
        }
    },
    howToPlayBackground: {
        type: 'sprite',
        anchor: {
            x: 0.5
        },
        y: 98,
        landscape: {
            x: 720,
            texture: 'landscape_tutorialBackground'
        },
        portrait: {
            x: 405,
            texture: 'portrait_tutorialBackground'
        }
    },
    versionText: {
        type: 'text',
        style: 'versionText',
        landscape: {
            x: 140
        },
        portrait: {
            x: 40
        },
        y: 150,
        alpha: 0.5
    },
    howToPlayClose: {
        type: 'button',
        string: 'button_ok',
        landscape: {
            x: 720,
            y: 671
        },
        portrait: {
            x: 405,
            y: 951
        },
        textures: {
            enabled: 'tutorialOKButtonEnabled',
            over: 'tutorialOKButtonOver',
            pressed: 'tutorialOKButtonPressed'
        },
        style: {
            enabled: 'tutorialOKButtonEnabled',
            over: 'tutorialOKButtonOver',
            pressed: 'tutorialOKButtonPressed'
        }
    },
    howToPlayPrevious: {
        type: 'button',
        landscape: {
            x: 125,
            y: 418
        },
        portrait: {
            x: 70,
            y: 568
        },
        textures: {
            enabled: 'tutorialLeftButtonEnabled',
            disabled: 'tutorialLeftButtonDisabled',
            over: 'tutorialLeftButtonOver',
            pressed: 'tutorialLeftButtonPressed'
        }
    },
    howToPlayNext: {
        type: 'button',
        landscape: {
            x: 1320,
            y: 418
        },
        portrait: {
            x: 740,
            y: 568
        },
        textures: {
            enabled: 'tutorialRightButtonEnabled',
            disabled: 'tutorialRightButtonDisabled',
            over: 'tutorialRightButtonOver',
            pressed: 'tutorialRightButtonPressed'
        }
    },
    howToPlayIndicators: {
        type: 'container',
        children: ['howToPlayIndicatorActive', 'howToPlayIndicatorInactive'],
        landscape: {
            x: 720,
            y: 600
        },
        portrait: {
            x: 405,
            y: 870
        }
    },
    audioButtonContainer: {
        type: 'container',
        landscape: {
            x: 79,
            y: 671
        },
        portrait: {
            x: 78,
            y: 951
        }
    },
    howToPlayPages: {
        type: 'container',
        children: ['howToPlayPage1', 'howToPlayPage2', 'howToPlayPage3'],
        landscape: {
            anchor: -0.5,
            scale: 0.9,
            x: 80
        },
        portrait: {
            anchor: -0.5,
            scale: 1,
            x: 0
        }
    },
    howToPlayPage1: {
        type: 'container',
        children: ['howToPlayTitle1', 'howToPlayTitle1Gradient', 'howToPlayPageText1', 'howToPlayBonusCoins1']
    },
    howToPlayTitle1: {
        type: 'text',
        string: 'howToPlay',
        style: 'howToPlayTitleLower',
        anchor: 0.5,
        scale: {
            x: 1.3,
            y: 1.3
        },
        landscape: {
            x: 720,
            y: 178
        },
        portrait: {
            x: 405,
            y: 190
        }
    },
    howToPlayTitle1Gradient: {
        type: 'text',
        string: 'howToPlay',
        style: 'howToPlayTitleUpper',
        anchor: 0.5,
        scale: {
            x: 1.3,
            y: 1.3
        },
        landscape: {
            x: 720,
            y: 178
        },
        portrait: {
            x: 405,
            y: 190
        }
    },
    howToPlayPageText1: {
        type: 'text',
        string: 'page1',
        style: 'howToPlayText',
        fontSize: 30,
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 380,
            wordWrapWidth: 1000
        },
        portrait: {
            x: 405,
            y: 520,
            wordWrapWidth: 500
        }
    },
    howToPlayBonusCoins1: {
        type: 'container',
        landscape: {
            x: 720,
            y: 530
        },
        portrait: {
            x: 405,
            y: 670
        }
    },
    howToPlayPage2: {
        type: 'container',
        children: ['howToPlayTitle2', 'howToPlayTitle2Gradient', 'howToPlayCoin2', 'howToPlayPageText2'],
        landscape: {
            x: -200,
            y: -50,
            scale: {
                x: 1.3,
                y: 1.3
            }
        },
        portrait: {
            y: 0,
            x: 0,
            scale: {
                x: 1,
                y: 1
            }
        }
    },
    howToPlayTitle2: {
        type: 'text',
        string: 'islandBonus',
        style: 'howToPlayTitleLower',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 178
        },
        portrait: {
            x: 405,
            y: 190
        }
    },
    howToPlayTitle2Gradient: {
        type: 'text',
        string: 'islandBonus',
        style: 'howToPlayTitleUpper',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 178
        },
        portrait: {
            x: 405,
            y: 190
        }
    },
    howToPlayCoin2: {
        type: 'container',
        landscape: {
            x: 720,
            y: 310,
            scale: {
                x: 0.3,
                y: 0.3
            }
        },
        portrait: {
            x: 405,
            y: 375
        }
    },
    howToPlayPageText2: {
        type: 'container',
        // string: 'page2',
        // style: 'howToPlayText',
        // fontSize: 30,
        //wordWrap: true,
        //wordWrapWidth: 1100,
        //maxWidth: 850 // wordWrap: true,
        // anchor: 0.5,
        // align: 'center',
        landscape: {
            x: 720,
            y: 485,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 550,
            wordWrapWidth: 4560
        }
    },
    howToPlayPage3: {
        type: 'container',
        children: ['howToPlayTitle3', 'howToPlayTitle3Gradient', 'howToPlayCoin3', 'howToPlayPageText3'],
        landscape: {
            x: -200,
            y: -50,
            scale: {
                x: 1.3,
                y: 1.3
            }
        },
        portrait: {
            y: -50,
            x: 0,
            scale: {
                x: 1,
                y: 1
            }
        }
    },
    howToPlayTitle3: {
        type: 'text',
        string: 'cannonBonus',
        style: 'howToPlayTitleLower',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 178
        },
        portrait: {
            x: 405,
            y: 240
        }
    },
    howToPlayTitle3Gradient: {
        type: 'text',
        string: 'cannonBonus',
        style: 'howToPlayTitleUpper',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 178
        },
        portrait: {
            x: 405,
            y: 240
        }
    },
    howToPlayCoin3: {
        type: 'container',
        landscape: {
            x: 720,
            y: 310,
            scale: {
                x: 0.3,
                y: 0.3
            }
        },
        portrait: {
            x: 405,
            y: 375,
            scale: {
                x: 1,
                y: 1
            }
        }
    },
    howToPlayPageText3: {
        type: 'container',
        // string: 'page3',
        // style: 'howToPlayText',
        // fontSize: 30,
        // wordWrap: true,
        // anchor: 0.5,
        // align: 'center',
        landscape: {
            x: 720,
            y: 485,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: -250,
            wordWrapWidth: 800
        }
    },
    resultPlaquesContainer: {
        type: 'container',
        children: ['resultPlaqueOverlay', 'winPlaqueBacking', 'bigWinCoins', 'winPlaqueBG', /*'winPlaqueMessageWithGradient' ,*/ 'winPlaqueMessage', 'winPlaqueValue', 'winPlaqueCloseButton', 'losePlaqueBG', 'losePlaqueMessage', 'losePlaqueCloseButton'],
        landscape: {
            x: 720,
            y: 377
        },
        portrait: {
            x: 405,
            y: 725
        }
    },
    resultPlaqueOverlay: {
        type: 'sprite',
        anchor: 0.5
    },
    winPlaqueBacking: {
        type: 'container',
        anchor: 0.5
    },
    bigWinCoins: {
        type: 'container',
        landscape: {
            x: -720,
            y: -377
        },
        portrait: {
            x: -405,
            y: -725
        }
    },
    winPlaqueBG: {
        type: 'container',
        anchor: 0.5
    },
    winPlaqueMessage: {
        type: 'text',
        string: 'message_win',
        style: 'winPlaqueBody',
        y: -50,
        anchor: 0.5,
        maxWidth: 550
    },
    /*
    winPlaqueMessageWithGradient: {
        type: 'text',
        string: 'message_win',
        style: 'winPlaqueBodyGradient',
        y: -50,
        anchor: 0.5,
        maxWidth: 550
    },
    */
    winPlaqueValue: {
        type: 'text',
        style: 'winPlaqueValue',
        y: 40,
        anchor: 0.5,
        maxWidth: 550
    },
    winPlaqueCloseButton: {
        type: 'button',
        alpha: 0,
        textures: {
            enabled: 'winPlaque',
            over: 'winPlaque',
            pressed: 'winPlaque'
        }
    },
    losePlaqueBG: {
        type: 'container',
        anchor: 0.5
    },
    losePlaqueMessage: {
        type: 'text',
        string: 'message_nonWin',
        style: 'losePlaqueBody',
        anchor: 0.5,
        portrait: {
            maxWidth: 400
        },
        landscape: {
            maxWidth: 400
        }
    },
    losePlaqueCloseButton: {
        type: 'button',
        alpha: 0,
        textures: {
            enabled: 'winPlaque',
            over: 'winPlaque',
            pressed: 'winPlaque'
        }
    },
    errorMessage: {
        type: 'text',
        style: 'errorMessage',
        anchor: 0.5,
        wordWrap: true,
        landscape: {
            x: 720,
            y: 365,
            wordWrapWidth: 750
        },
        portrait: {
            x: 405,
            y: 560,
            wordWrapWidth: 700
        }
    },
    timeoutExit: {
        type: 'button',
        landscape: {
            x: 585,
            y: 560
        },
        portrait: {
            x: 270,
            y: 735
        },
        style: {
            enabled: 'errorButtonEnabled',
            over: 'errorButtonOver',
            pressed: 'errorButtonPressed'
        },
        textures: {
            enabled: 'timeOutButtonEnabled',
            over: 'timeOutButtonOver',
            pressed: 'timeOutButtonPressed'
        }
    },
    timeoutContinue: {
        type: 'button',
        landscape: {
            x: 855,
            y: 560
        },
        portrait: {
            x: 540,
            y: 735
        },
        style: {
            enabled: 'errorButtonEnabled',
            over: 'errorButtonOver',
            pressed: 'errorButtonPressed'
        },
        textures: {
            enabled: 'timeOutButtonEnabled',
            over: 'timeOutButtonOver',
            pressed: 'timeOutButtonPressed'
        }
    },
    buyButtonAnim: {
        type: 'sprite',
        anchor: 0.5,
        x: 0,
        y: 0
    },
    tryButtonAnim: {
        type: 'sprite',
        anchor: 0.5,
        x: 0,
        y: 0
    },
    buyButton: {
        type: 'button',
        string: 'button_buy',
        textures: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        },
        style: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        }
    },
    tryButton: {
        type: 'button',
        string: 'button_try',
        textures: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        },
        style: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        }
    },
    // buttonBar:{
    //         type: 'container',
    //         portrait: {
    //                 y: 1245,
    //         }
    // },
    autoPlayButton_default: {
        type: 'point',
        landscape: {
            x: 720,
            y: 700
        },
        portrait: {
            x: 405,
            y: 1300
        }
    },
    autoPlayButton_multi: {
        type: 'point',
        landscape: {
            x: 918,
            y: 700
        },
        portrait: {
            x: 405,
            y: 1300
        }
    },
    autoPlayStartButton: {
        type: 'button',
        string: 'button_autoPlay',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        maxWidth: 20
    },
    moveToMoneyButton: {
        type: 'button',
        string: 'button_moveToMoney',
        textures: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        },
        style: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        }
    },
    ticketSelectBarSmall: {
        type: 'container',
        landscape: {
            x: 580,
            y: 699
        },
        portrait: {
            x: 405,
            y: 1205
        },
        children: ['ticketSelectBarBG', 'ticketSelectCostValue', 'ticketCostDownButtonStatic', 'ticketCostUpButtonStatic', 'ticketCostDownButton', 'ticketCostUpButton', 'ticketCostIndicators']
    },
    ticketSelectCostValue: {
        type: 'text',
        portrait: {
            y: -7
        },
        landscape: {
            y: -7
        },
        anchor: 0.5,
        style: 'ticketSelectCostValue',
        maxWidth: 215
    },
    ticketCostDownButton: {
        type: 'button',
        portrait: {
            x: -208
        },
        landscape: {
            x: -143
        },
        textures: {
            enabled: 'minusButtonEnabled',
            disabled: 'minusButtonDisabled',
            over: 'minusButtonOver',
            pressed: 'minusButtonPressed'
        }
    },
    ticketCostUpButton: {
        type: 'button',
        portrait: {
            x: 208
        },
        landscape: {
            x: 143
        },
        textures: {
            enabled: 'plusButtonEnabled',
            disabled: 'plusButtonDisabled',
            over: 'plusButtonOver',
            pressed: 'plusButtonPressed'
        }
    },
    ticketCostDownButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: {
            x: -208
        },
        landscape: {
            x: -143
        },
        texture: 'minusButtonDisabled'
    },
    ticketCostUpButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: {
            x: 208
        },
        landscape: {
            x: 143
        },
        texture: 'plusButtonDisabled'
    },
    buttonBar: {
        type: 'container',
        landscape: {
            x: 0,
            y: 649
        },
        portrait: {
            x: 0,
            y: 1250
        },
        children: ['helpButtonStatic', 'helpButton', 'homeButtonStatic', 'homeButton', 'exitButton', 'playAgainButton', 'tryAgainButton', 'buyButton', 'buyButtonAnim', 'tryButton', 'tryButtonAnim', 'moveToMoneyButton', 'retryButton']
    },
    footerContainer: {
        type: 'container',
        children: ['footerBG', 'balanceMeter', 'ticketCostMeter', 'winMeter', 'divider_1_3', 'divider_2_3', 'divider_1_2'],
        landscape: {
            y: 761
        },
        portrait: {
            y: 1349
        }
    },
    footerBG: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_footerBar',
            y: 5
        },
        portrait: {
            texture: 'portrait_footerBar',
            y: 5
        }
    }
});
//# sourceMappingURL=layout.js.map