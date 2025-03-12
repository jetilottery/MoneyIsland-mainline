define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const PIXI = require('com/pixijs/pixi');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const text = require('skbJet/componentManchester/standardIW/layout/text');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const fittedText = require('skbJet/componentManchester/standardIW/components/fittedText');

    let p2TopContainer, p3TopContainer, p2TL, p2TR, p2Rest, p3TL, p3TR, p3Rest;

    let iconSize = 50;
    let smlIconSize = 100;

    function init() {
        // Page 1
        let bonus_1 = PIXI.Texture.fromFrame('islandSymbol');
        bonus_1 = new PIXI.Sprite(bonus_1);
        bonus_1.width = smlIconSize;
        bonus_1.height = smlIconSize;
        bonus_1.anchor.x = 0.5;
        bonus_1.anchor.y = 0;
        bonus_1.x = -smlIconSize * 0.8;
        let bonus_2 = PIXI.Texture.fromFrame('cannonSymbol');
        bonus_2 = new PIXI.Sprite(bonus_2);
        bonus_2.width = smlIconSize;
        bonus_2.height = smlIconSize;
        bonus_2.anchor.x = 0.5;
        bonus_2.anchor.y = 0;
        bonus_2.x = smlIconSize * 0.8;
        displayList.howToPlayBonusCoins1.addChild(bonus_1, bonus_2);


        const smallSpace = 5;

        // ************************** Page 2 ************************** 
        let line1 = resLib.i18n.game.Game.page2.split("{line1complete}")[0];
        let line2n3 = resLib.i18n.game.Game.page2.split("{line1complete}")[1];
        let p2Text = line1.split("{islandSymbol}");

        p2TL = new fittedText(p2Text[0]);
        p2TR = new fittedText(p2Text[1]);
        p2Rest = new fittedText(line2n3);
        text.update(p2TL, textStyles.howToPlayText);
        text.update(p2TR, textStyles.howToPlayTextL1);
        text.update(p2Rest, textStyles.howToPlayText);

        let islandBonus = PIXI.Texture.fromFrame('islandSymbol');
        islandBonus = new PIXI.Sprite(islandBonus);
        islandBonus.width = iconSize;
        islandBonus.height = iconSize;

        p2TL.anchor.y = p2TR.anchor.y = p2Rest.anchor.x = islandBonus.anchor.y = 0.5;

        // Position top line elements
        p2TL.x = 0;
        islandBonus.x = p2TL.width + smallSpace;
        p2TR.x = islandBonus.x + islandBonus.width + smallSpace;

        p2TopContainer = new PIXI.Container();
        p2TopContainer.addChild(p2TL, islandBonus, p2TR);

        displayList.howToPlayPageText2.addChild(p2TopContainer, p2Rest);

        // ************************** Page 3 ************************** 
        line1 = resLib.i18n.game.Game.page3.split("{line1complete}")[0];
        line2n3 = resLib.i18n.game.Game.page3.split("{line1complete}")[1];
        let p3Text = line1.split("{cannonSymbol}");

        p3TL = new fittedText(p3Text[0]);
        p3TR = new fittedText(p3Text[1]);
        p3Rest = new fittedText(line2n3);
        text.update(p3TL, textStyles.howToPlayText);
        text.update(p3TR, textStyles.howToPlayTextL1);
        text.update(p3Rest, textStyles.howToPlayText);

        let cannonBonus = PIXI.Texture.fromFrame('cannonSymbol');
        cannonBonus = new PIXI.Sprite(cannonBonus);
        cannonBonus.width = iconSize;
        cannonBonus.height = iconSize;

        p3TL.anchor.y = p3TR.anchor.y = p3Rest.anchor.x = cannonBonus.anchor.y = 0.5;

        // Position top line elements
        p3TL.x = 0;
        cannonBonus.x = p3TL.width + smallSpace;
        p3TR.x = cannonBonus.x + cannonBonus.width + smallSpace;

        p3TopContainer = new PIXI.Container();
        p3TopContainer.addChild(p3TL, cannonBonus, p3TR);

        displayList.howToPlayPageText3.addChild(p3TopContainer, p3Rest);

        orientationChanged();
        msgBus.subscribe('GameSize.OrientationChange', orientationChanged);
    }

    function orientationChanged() {
        let containterPos = {
            landscape: {
                x: 720,
                height: 810,
                l1Wrap: 1800,
                restOffset: 30,
                restWrap: 900,
                p1Height: 350,
                p1Offset: 200,
                p1Padding: 0,
                scale: 0.9
            },
            portrait: {
                x: 405,
                height: 1440,
                l1Wrap: 700,
                restOffset: -120,
                restWrap: 600,
                p1Height: 630,
                p1Offset: 220,
                p1Padding: 0,
                scale: 0.75
            }
        };

        // let contentHeight = displayList.howToPlayBonusCoins1.height + displayList.howToPlayPageText1.height

        let p1Offset = containterPos[orientation.get()].p1Offset;
        let p1Height = containterPos[orientation.get()].p1Height;
        // let p1Padding = containterPos[orientation.get()].p1Padding;

        // displayList.howToPlayPageText1.y = p1Offset + p1Height / 2 - displayList.howToPlayPageText1.height / 2 - p1Padding;
        // displayList.howToPlayBonusCoins1.y = p1Offset + p1Height / 2 + displayList.howToPlayBonusCoins1.height / 2 + p1Padding;

        // displayList.howToPlayPageText1.y = p1Offset + p1Height / 2 - (p1Height - contentHeight) / 2;
        // displayList.howToPlayBonusCoins1.y = p1Offset + p1Height / 2 + (p1Height - contentHeight) / 2;

        displayList.howToPlayPageText1.anchor.set(0.5, 0);

        // displayList.howToPlayPageText1.y = p1Offset + p1Height / 2 - displayList.howToPlayPageText1.height / 2 - displayList.howToPlayBonusCoins1.height;
        displayList.howToPlayPageText1.y = p1Offset + p1Height / 2 - displayList.howToPlayPageText1.height / 2;
        if (orientation.get() === "landscape") {
            displayList.howToPlayBonusCoins1.y = p1Offset + p1Height / 2 + displayList.howToPlayBonusCoins1.height;
        } else {
            displayList.howToPlayBonusCoins1.y = p1Offset + p1Height / 2 + displayList.howToPlayPageText1.height / 2 + 10;
        }

        // displayList.howToPlayPageText1.y = p1Offset + p1Height / 2 - displayList.howToPlayPageText1.height / 2 - p1Padding;


        displayList.howToPlayPageText2.x = containterPos[orientation.get()].x;
        displayList.howToPlayPageText2.scale.set(containterPos[orientation.get()].scale);
        p2TR.style.wordWrapWidth = containterPos[orientation.get()].l1Wrap;

        p2Rest.style.wordWrapWidth = containterPos[orientation.get()].restWrap;

        displayList.howToPlayPageText2.y = containterPos[orientation.get()].height / 2 - displayList.howToPlayPageText2.height / 2 + containterPos[orientation.get()].restOffset;
        p2TopContainer.x = -(p2TopContainer.width / 2);


        displayList.howToPlayPageText3.x = containterPos[orientation.get()].x;
        displayList.howToPlayPageText3.scale.set(containterPos[orientation.get()].scale);
        p3TR.style.wordWrapWidth = containterPos[orientation.get()].l1Wrap;

        p3Rest.style.wordWrapWidth = containterPos[orientation.get()].restWrap;

        displayList.howToPlayPageText3.y = containterPos[orientation.get()].height / 2 - displayList.howToPlayPageText3.height / 2 + containterPos[orientation.get()].restOffset;
        p3TopContainer.x = -(p3TopContainer.width / 2);

    }

    return {
        init,
    };
});