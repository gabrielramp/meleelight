
import FALL from "characters/shared/moves/FALL";
import { player} from "main/main";
import {sounds} from "main/sfx";
import {airDrift, fastfall} from "physics/actionStateShortcuts";
import {drawVfx} from "main/vfx/drawVfx";
import {Vec2D} from "../../../main/util/Vec2D";

export default {
  name : "NEUTRALSPECIALAIR",
  setVelocities : [1.794,1.65048,1.51844,1.39697,1.28521,1.18239,1.0878,1.00078,0.92071,0.84706,0.77929,0.71695,0.65959,0.60683,0.55828],
  canPassThrough : false,
  canGrabLedge : [false,false],
  wallJumpAble : false,
  headBonk : false,
  canBeGrabbed : true,
  landType : 1,
  init : function(p,input){
    player[p].actionState = "NEUTRALSPECIALAIR";
    player[p].timer = 0;
    this.main(p,input);
  },
  main : function(p,input){
    player[p].timer++;
    if (!this.interrupt(p,input)){
      if (player[p].timer >= 65) {
        fastfall(p,input);
        airDrift(p,input);
      }
      else if (player[p].timer >= 50) {
        player[p].phys.cVel.x = this.setVelocities[player[p].timer-50] * player[p].phys.face;
        player[p].phys.cVel.y = 0;
      }
      else {
        player[p].phys.cVel.x = Math.sign(player[p].phys.cVel.x) * Math.max(Math.abs(player[p].phys.cVel.x)-player[p].charAttributes.airFriction, 0);
        player[p].phys.cVel.y = Math.max(player[p].phys.cVel.y-player[p].charAttributes.gravity, -player[p].charAttributes.terminalV);
      }
    }
  },
  interrupt : function(p,input){
    if (player[p].timer > 99){
      FALL.init(p,input);
      return true;
    }
    else {
      return false;
    }
  },
  land : function(p,input){
    player[p].actionState = "NEUTRALSPECIALGROUND";
    player[p].phys.cVel.x = 0;
  }
};
