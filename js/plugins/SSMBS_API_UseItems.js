
//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System _ UseSkills
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 简易的地图战斗系统附属，使用物品的快捷方式
 * @author 神仙狼
 * 
 */

sxlSimpleABS.useItem = function(item,user){
	//装备的情况
	if( item.etypeId ){
		//判断是否可用
		if(user.battler().canEquip(item)){
			//可用
			SoundManager.playEquip();
			user.battler().changeEquip( item.etypeId - 1 , item )
		}else{
			//无法使用

		}
		
	}
	//物品的情况
	if( item.itypeId){
		if(user == $gamePlayer){
			let cd = item.meta.cooldown?Number(item.meta.cooldown):30;
			for( let s = 0 ; s < $gameParty.shortcutGirdItems.length ; s ++ ){
				if( $gameParty.shortcutGirdItems[s]==item){
					$gameParty.triggerKeysCooldown[s] = cd;
				}
			}
		}
		if(item.itypeId && item.occasion != 3){
			let cd = item.meta.cooldown?Number(item.meta.cooldown):30;
			item.MaxCD = cd;
			item.cd = cd;
		}
		//判断是否是消耗品
		
		//计算物品效果(物品大于0的情况)
		if( $gameParty.numItems(item) > 0 ){
			if(item.consumable){
				//判断物品数量是否足够
				if($gameParty.numItems(item) > 0){
					//消耗物品
					if(!item.meta.useSkill) $gameParty.consumeItem(item)
				}else{
					//物品不足
				}
			}
			//显示动画
			$gameTemp.requestAnimation( [user], item.animationId , false );
			//判定物品效果
			let itemAction = new Game_Action( user.battler() );
			itemAction.setItem( item.id );
			itemAction.apply( user.battler() );
			if(item.meta.resetParamPoints){
				SSMBS_Window_Equip.resetParamPoints(user.battler()._actorId)
			}
			if(item.meta.useSkill){
				
				if(user.sequence.length==0 || $dataSkills[Number(item.meta.useSkill)].meta.force){
					let skill = $dataSkills[Number(item.meta.useSkill)];
					let skillNeedWeapon = [];
					let canUseWeapon = false;
					if(skill.meta.requiredWtypes){
						for(let w = 0 ; w < skill.meta.requiredWtypes.split(',').length ; w ++ ){
							skillNeedWeapon.push( Number(skill.meta.requiredWtypes.split(',')[w]) );
						}
					}
					skillNeedWeapon.push( skill.requiredWtypeId1 );
					skillNeedWeapon.push( skill.requiredWtypeId2 );
					if(user==$gamePlayer && skillNeedWeapon.indexOf(user.battler().equips()[0].wtypeId)>-1){
						canUseWeapon = true;
					}
					if(user==$gamePlayer && !skill.meta.requiredWtypes && skill.requiredWtypeId1 == 0 && skill.requiredWtypeId2 == 0){
						canUseWeapon = true;
					}
					if(user != $gamePlayer){
						canUseWeapon = true;
					}
					if(canUseWeapon && user.battler()._mp >= (skill.mpCost*user.battler().mcr)){
						sxlSimpleABS.useSkill($dataSkills[Number(item.meta.useSkill)],user);
						$gameParty.consumeItem(item);
					}
					if(!canUseWeapon){
						SoundManager.playBuzzer();
						SSMBS_Window_Notification.addNotification('无法使用'+skill.name+'(请注意技能所需武器)',10,skill);
					}
				}
			}
			if(item.meta.resetSkillPoints){
				user.battler().resetSkillPoints();
			}
			if(item.meta.resetParamPoints){
				user.battler().resetParamPoints();
			}
			//执行公共事件
			for(effect of item.effects){
				if(effect.code==44){
					$gameTemp.reserveCommonEvent(effect.dataId);
				}
			}
		}else{
			SoundManager.playBuzzer();
			SSMBS_Window_Notification.addNotification('无法使用'+item.name+': 数量不足',10,item);
		}
	}
};

