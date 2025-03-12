define(require => {
    // const PIXI = require('com/pixijs/pixi');
    // const resLib = require('skbJet/component/resourceLoader/resourceLib');
    // const utils = require('skbJet/componentManchester/standardIW/layout/utils');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const text = require('skbJet/componentManchester/standardIW/layout/text');
    const fittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
    const textToSpine = require('game/components/utils/textToSpine');
    const NumberCard = require('./NumberCard');

    class PlayerNumber extends NumberCard {
        constructor() {
            super();
            // const revealFrames = utils.findFrameSequence('symbolCover');
            // this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);

            // this.pillar.anchor.set(0.5);
            // this.pillar.y = 278;

            this.winAmount = new fittedText("");
            // this.winAmount.maxWidth = 100;

            // this.winAmount.anchor.set(0.5);
            // this.winAmount.y = 10;

            text.update(this.winAmount, textStyles.cardValue);

            // this.resultContainer.scale.set(0.7);

            this.resultContainer.addChild(this.winAmount);
        }

        update(scenario) {
            super.update(scenario);
        }

        populate(chest) {
            this.value = chest.val;
            this.chestPrize = chest.data;
            // super.populate(chest);
        }

        addText(spineAnim) {
            this.winAmount.text = SKBeInstant.formatCurrency(this.value).formattedAmount;
            this.charLength = this.winAmount.text.split('').length;
            if (this.charLength > 6) {
                this.charLength = 6;
            }
            if (this.charLength < 2) {
                this.charLength = 2;
            }

            textToSpine.setText(spineAnim, 'WIN_MESH' + this.charLength, this.resultContainer, false, true);//spineAnim, slotName, source, flip, clear other meshes
        }

        reset() {
            super.reset();
            this.charLength = 0;
            text.update(this.winAmount, textStyles.cardValue);
        }

        static fromContainer(container) {
            const card = new PlayerNumber();
            container.addChild(card);
            return card;
        }
    }

    return PlayerNumber;
});
