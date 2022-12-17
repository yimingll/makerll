//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - Params
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 装备强化插件
 * @author 神仙狼
 *
 * @help
 *
 * 属性插件，为SSMBS所有插件调整属性
 *
 */

Game_BattlerBase.prototype.param = function(paramId) {
	var value =
		this.paramBasePlus(paramId) *
		this.paramRate(paramId) *
		this.paramBuffRate(paramId);
	if( this._actorId && this._equips[0]._itemId!=0 && (paramId == 2 || paramId == 4 ) ){
		value += $gameParty.enhanceWeapons[this._equips[0]._itemId-1].enhanceTimes * 
				($dataWeapons[this._equips[0]._itemId].meta.upgradePlus?
					$dataWeapons[this._equips[0]._itemId].meta.upgradePlus:$dataWeapons[this._equips[0]._itemId].params[paramId]/10);
	}
	if( this._actorId && (paramId == 3 || paramId == 5 ) ){
		for( i in this._equips){
			if( this._equips[i]._dataClass == 'armor' && this._equips[i]._itemId != 0 ){
				value += $gameParty.enhanceArmors[this._equips[i]._itemId-1].enhanceTimes * 
				($dataArmors[this._equips[i]._itemId].meta.upgradePlus?
					$dataArmors[this._equips[i]._itemId].meta.upgradePlus:$dataArmors[this._equips[i]._itemId].params[paramId]/10);
			}
		}
	}
	if(this._actorId ){
		for(let i = 0 ; i < this._equips.length ; i ++ ){
			if(this._equips[i]._itemId!=0){
				let theEquip ;
				if(this._equips[i]._dataClass == 'armor'){
					theEquip = $dataArmors[this._equips[i]._itemId];
				}
				if(this._equips[i]._dataClass == 'weapon'){
					theEquip = $dataWeapons[this._equips[i]._itemId];
				}
				if(theEquip.meta.mhp && paramId==0) {value+=Number(theEquip.meta.mhp)};
				if(theEquip.meta.mmp && paramId==1) {value+=Number(theEquip.meta.mmp)};
				if(theEquip.meta.atk && paramId==2) {value+=Number(theEquip.meta.atk)};
				if(theEquip.meta.def && paramId==3) {value+=Number(theEquip.meta.def)};
				if(theEquip.meta.mat && paramId==4) {value+=Number(theEquip.meta.mat)};
				if(theEquip.meta.mdf && paramId==5) {value+=Number(theEquip.meta.mdf)};
				if(theEquip.meta.agi && paramId==6) {value+=Number(theEquip.meta.agi)};
				if(theEquip.meta.luk && paramId==7) {value+=Number(theEquip.meta.luk)};

			}
			
		}
	}
	if( this._actorId ){
		value += this.paramAdd?this.paramAdd[paramId]:0;
	}
	var maxValue = this.paramMax(paramId);
	var minValue = this.paramMin(paramId);
	return Math.round(value.clamp(minValue, maxValue));
};