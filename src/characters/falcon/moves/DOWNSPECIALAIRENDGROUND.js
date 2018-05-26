/* eslint-disable */
import WAIT from "characters/shared/moves/WAIT";
import FALL from "characters/shared/moves/FALL";
import {player} from "main/main";
import {sounds} from "main/sfx";
import {turnOffHitboxes} from "physics/actionStateShortcuts";
import {drawVfx} from "main/vfx/drawVfx";
import {Vec2D} from "../../../main/util/Vec2D";
import {gameSettings} from "settings";

export default {
  name : "DOWNSPECIALAIRENDGROUND",
  canPassThrough : false,
  canEdgeCancel : false,
  canGrabLedge : [false,false],
  wallJumpAble : false,
  headBonk : false,
  canBeGrabbed : true,
  init : function(p,input){
    player[p].actionState = "DOWNSPECIALAIRENDGROUND";
    player[p].timer = 0;
    player[p].phys.fastfalled = false;
    player[p].phys.cVel.y = 0;
    player[p].phys.cVel.x = 0.98542 * player[p].phys.face;
    turnOffHitboxes(p);
    this.main(p,input);
  },
  main : function(p,input){
    player[p].timer++;
    if (!this.interrupt(p,input)){
      player[p].phys.cVel.x = Math.sign(player[p].phys.cVel.x) * Math.max(Math.abs(player[p].phys.cVel.x)-0.24, 0); 
    }
  },
  interrupt : function(p,input){
    if (player[p].timer > 45){
      WAIT.init(p,input);
      return true;
    }
    else {
      return false;
    }
  }
};
