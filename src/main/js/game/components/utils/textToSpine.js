define(require => {
    const PIXI = require('com/pixijs/pixi');
    const app = require('skbJet/componentManchester/standardIW/app');

    // setText needs the following parameters :
    // spineAnim	:	This is a reference to the spine animation instance that you have created
    // slotName		:	This is the name of the slot where the text needs to be rendered (get this name from the artist that created it)
    // source		:	This is the (container || sprite || text) that is to be used as the source texture
    function setText(spineAnim, slotName, source, flip, clear) {
        // Create a PIXI render texture that will hold the number
        let renderTexture = PIXI.RenderTexture.create(source.width, source.height);

        // Tell PIXI to render the number to the texture
        app.renderer.render(source, renderTexture);

        if (clear) {
            for (let i = 2; i < 7; i++) {
                let str = slotName.substring(0, slotName.length - 1);
                let slot = spineAnim.skeleton.slots[spineAnim.skeleton.findSlotIndex(str + i)];

                slot.meshes[slot.attachment.name].visible = false;
            }

            let slot = spineAnim.skeleton.slots[spineAnim.skeleton.findSlotIndex(slotName)];
            slot.meshes[slot.attachment.name].visible = true;
        }

        // Now we need to find the attachment that we want to replace in the spine animation
        // If the mesh has multiple options of char length/size we may want to clear all of them first
        let slot = spineAnim.skeleton.slots[spineAnim.skeleton.findSlotIndex(slotName)];
        let attachment = slot.attachment;
        // Replace the placeholder texture with our new render texture
        attachment.width = source.width * 100;
        attachment.height = source.height * 100;
        attachment.region.width = source.width * 100;
        attachment.region.height = source.height * 100;
        attachment.region.texture = renderTexture;
        // Update the UVs of the new texture
        attachment.updateUVs();

        if (flip) {
            slot.meshes[slot.attachment.name].scale.x = -1;
        }

        // Finally update the spine animation currentMesh with the new texture and tell Spine and PIXI to render it
        slot.currentMesh.texture = renderTexture;
        slot.currentMesh.uvs = new Float32Array(attachment.regionUVs);
        slot.currentMesh.dirty = true;
    }

    return {
        setText: setText
    };
});
