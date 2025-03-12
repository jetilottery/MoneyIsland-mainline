define(require => {
    const fittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const text = require('skbJet/componentManchester/standardIW/layout/text');
    const textToSpine = require('game/components/utils/textToSpine');
    const CannonPicker = require('./CannonPicker');
    var orientation = require('skbJet/componentManchester/standardIW/orientation');


    class Cannon extends CannonPicker {
        constructor() {
            super();

            this.winAmount = new fittedText("");
            this.winAmount.x = 5;
            this.winAmount.y = -5;
            //this.winAmount.maxWidth = 130;
            // this.winAmount.anchor.x = 0.5;

            text.update(this.winAmount, textStyles.cannonValue);

            this.resultContainer.addChild(this.winAmount);


        }

        populate(val, text) {
            if (val) {
                this.value = val;
                this.winAmount.text = SKBeInstant.formatCurrency(val).formattedAmount;
                this.charLength = this.winAmount.text.split('').length;
            }
            if (text) {
                this.value = text;
                this.winAmount.text = text;
                this.charLength = this.winAmount.text.split('').length;
            }

            if (this.charLength > 6) {
                this.charLength = 6;
            }
            if (this.charLength < 2) {
                this.charLength = 2;
            }
            // let prevScaleX = this.winAmount.scale.x;
            // let prevScaleY = this.winAmount.scale.y;
            // this.winAmount.scale.set(0);
            // Tween.to(this.winAmount.scale, 0.35, { ease: "Back.easeOut", x: prevScaleX, y: prevScaleY });
        }

        addValueText(spineAnim) {
            this.winAmount.text = SKBeInstant.formatCurrency(this.value).formattedAmount;
            text.update(this.winAmount, textStyles.cannonValue);
            textToSpine.setText(spineAnim, 'VALUE_MESH' + this.charLength, this.winAmount, this.boatFlips, true); //spineAnim, slotName, source           
        }

        addMultiplierText(spineAnim) {
            this.winAmount.text = this.value;
            text.update(this.winAmount, textStyles.cannonMulti);
            textToSpine.setText(spineAnim, 'VALUE_MESH' + this.charLength, this.winAmount, this.boatFlips, true); //spineAnim, slotName, source
        }

        addCollectText(spineAnim) {
            this.winAmount.text = this.value;
            text.update(this.winAmount, textStyles.cannonCollect);
            textToSpine.setText(spineAnim, 'COLLECT_MESH', this.winAmount, this.boatFlips); //spineAnim, slotName, source


            if (orientation.get() === orientation.PORTRAIT) {
                spineAnim.scale.set(0.8);
            }
        }

        reset() {
            super.reset();
            this.matched = false;
            this.charLength = 0;
            text.update(this.winAmount, textStyles.cannonValue);
        }

        static fromContainer(container) {
            const card = new Cannon();
            container.addChild(card);
            return card;
        }
    }

    return Cannon;
});