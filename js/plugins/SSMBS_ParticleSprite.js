//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 弹道处理
 * @author 神仙狼
 * @help
 * 必须与SSMBS_BattleCore同时使用
 *
 * 
 * 
 */

const _parprite_initialize = Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function() {
	_parprite_initialize.call(this);
	sxlSimpleABS.particle = [];
	
};

const _parprite_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_parprite_update.call(this);
	sxlSimpleABS.spritesetMap = this;
	if(sxlSimpleABS.particle.length>0){
		this.moveParticle();
		this.triggerParticle();
	};
};

Spriteset_Map.prototype.createParticle = function(user,target,faction,skill,storeX,storeY,nextSkillId,angle){
	var userX = user.screenX();
	var userY = user.screenY();
	if(target){
		var targetX = target.screenX() ;
		var targetY = target.screenY() ;
	}else{
		if( user != $gamePlayer && user.target){
			var targetX = user.target.screenX() ;
			var targetY = user.target.screenY() ;
			
		}else{
			var targetX;
			var targetY;
			if(sxlSimpleABS.smp.mobileMode){
				if($gamePlayer._direction == 2 ){
					targetX = $gamePlayer.screenX();
					targetY = $gamePlayer.screenY()+Graphics.height/2;
				}
				if($gamePlayer._direction == 4 ){
					targetX = $gamePlayer.screenX()-Graphics.width/2;
					targetY = $gamePlayer.screenY();
				}
				if($gamePlayer._direction == 6 ){
					targetX = $gamePlayer.screenX()+Graphics.width/2;
					targetY = $gamePlayer.screenY();
				}
				if($gamePlayer._direction == 8 ){
					targetX = $gamePlayer.screenX();
					targetY = $gamePlayer.screenY()-Graphics.height/2;
				}
			}else{
				targetX = TouchInput.x ;
				targetY = TouchInput.y + 24  ;
			}
		}
	}

	var distanceX = targetX - userX;
	var distanceY = targetY - userY;
	var radian = Math.atan2( distanceY, distanceX );

	var metaSplit = skill.meta.img.split(',')
	var skillImg = metaSplit[0];
	var skillAnim = metaSplit[1];

	if(user == $gamePlayer){
		var userMember = $gameParty.members()[0]
	}else if (user._memberIndex){
		var userMember = $gameParty.members()[user._memberIndex];
	}else if (user._battler && user._battler._enemyId){
		var userMember = user._battler;
	}

	if(skillImg){
		if(skillImg!='weaponParticle'){
			var img = skillImg;
		}else{
			
			var img = userMember.equips()[0].meta.weaponParticle
		}
		
	}

	this.particle = new Sprite();
	this.particle.bitmap = ImageManager.loadSystem(skillImg);
	this.particle.x = user.screenX();
	this.particle.y = user.screenY()-24;
	this.particle.behaviors = [];

	

	if(nextSkillId){
		this.particle.nextSkillId = nextSkillId;

	}


	// 隐藏弹道图像
	if( skill.meta.hideImg && !sxlSimpleABS.debugMode){
		this.particle.opacity = 0;
	}
	
	// 从角色前方出现弹道
	
	if(user.battler()&&user.battler()._equips){
		for( let i = 0 ; i < user.battler().equips().length;i++){
			if(user.battler().equips()[i].meta.infront){
				let dis = Number(user.battler().equips()[i].meta.infront);
				this.particle.x =  user.screenX() + Math.cos(radian) * dis;
				this.particle.y = user.screenY() - 24 + Math.sin(radian) * dis;
			}
		}
	}
	if(skill.meta.infront){
		this.particle.x =  user.screenX() + Math.cos(radian) * Number(skill.meta.infront);
		this.particle.y = user.screenY() - 24 + Math.sin(radian) * Number(skill.meta.infront);
	}
	
	

	this.particle.anchor.x = 0.5;
	this.particle.anchor.y = 0.5;
	if(storeX&&storeY&&skill.meta.appearAtSkillPostion){
		this.particle.x = storeX;
		this.particle.y = storeY;
	}
	if(skill.meta.stayTime){
		this.particle._stayTime = Number(skill.meta.stayTime);
	}else{
		this.particle._stayTime = 60;
	}

	if(!user == $gamePlayer && !skill.meta.noTarget){
		this.particle._target = target;
		this.particle.target = target;
	}

	if( user != $gamePlayer && user._battler && user._battler._enemyId && user._battler._aggro && this.particle.targetBattler){
		this.particle.targetBattler = $gameActors.actor(user._battler._aggro[0]);
		this.particle.target = this.particle.targetBattler.player;
	}
	if( user != $gamePlayer && user._memberIndex){
		this.particle._target = target;
		this.particle.target = target;
	}

	this.particle.jumpTargets = []
	this.particle.jumpTargetCount = 0;
	this.particle.counter = 0;
	this.particle.hadFirstTarget = false;
	this.particle.rotation = radian;
	this.particle.faction = faction;
	this.particle.skill = skill;
	this.particle.speed = skill.speed;
	this.particle.speed/=sxlSimpleABS.skillSpeedBase;
	if(user == $gamePlayer && sxlSimpleABS.moveAttackMode && !skill.meta.constantSpeed){
		this.particle.speed += ($gameParty.members()[0].cnt)*100;
	}
	if(user == $gamePlayer && sxlSimpleABS.moveAttackMode && !skill.meta.constantSpeed && skill.meta.slvEffectSpeed){
		this.particle.speed += Number(skill.meta.slvEffectSpeed)*user.battler().skillLevels[skill.id];
		
	}

	this.particle.user = user;
	this.particle.userMember = userMember;
	this.particle.nowFrame = 0;
	this.particle.oriX = $gameMap._displayX;
	this.particle.oriY = $gameMap._displayY;
	this.particle.animSprite = new Sprite();
	this.particle.animSprite.bitmap =  ImageManager.loadSystem(skill.meta.destroyAnim);
	this.particle.animSprite.opacity = 0;
	this.particle.frameCount = 0;
	this.particle.moveFrame = 0;
	this.particle.blendMode = skill.meta.blendMode?Number(skill.meta.blendMode):0;
	
	if(skillAnim){
		this.particle.anim = $dataAnimations[skillAnim].rotation?new Sprite_Animation():new Sprite_AnimationMV();
		
		this.particle.anim.anchor.x = 0.5;
		this.particle.anim.anchor.y = 0.5;
		this.particle.anim.setup( [this.particle],$dataAnimations[skillAnim],false,this.animationBaseDelay(), null );
		this.particle.anim.x = this.particle.x;
		this.particle.anim.y = this.particle.y
		this._tilemap.addChild(this.particle.anim)
		// this.createAnimationSprite(this.particle,$dataAnimations[skillAnim],false,0)
	}
	if(skill.meta.light){
		this.particle.light = new Sprite();
		this.particle.lightImg = skill.meta.light;
		this.particle.light.x = this.particle.x;
		this.particle.light.y = this.particle.y;
		this.particle.light.offsetX = 0;
		this.particle.light.offsetY = 0;
		if(skill.meta.lightOffsetX) this.particle.light.offsetX = Number(skill.meta.lightOffsetX);

		if(skill.meta.lightOffsetY) this.particle.light.offsetY = Number(skill.meta.lightOffsetY);
		this._tilemap.addChild(this.particle.light);
	}
	if(skill.meta.knockBackType){
		this.particle.knockBackType = skill.meta.knockBackType;
	}else{
		this.particle.knockBackType = sxlSimpleABS.knockBackType;
	}
	if(skill.meta.startScale){
		this.particle.scale.x = Number(skill.meta.startScale);
		this.particle.scale.y = Number(skill.meta.startScale);
	}
	if(skill.meta.moveFrame){
		this.particle.setFrame(this.particle.moveFrame % 5*Number(skill.meta.moveFrame),Math.floor(this.particle.moveFrame / 5)*Number(skill.meta.moveFrame),Number(skill.meta.moveFrame),Number(skill.meta.moveFrame));
	}
	if(skill.meta.destroyParticle){
		this.particle.destroyParticle = true;
	}
	if(skill.meta.cantDestroy){
		this.particle.cantDestroy = true;
	}
	if(skill.meta.slowParticle){
		this.particle.slowParticle = Number(skill.meta.slowParticle);
	}
	if(skill.meta.cantSlow){
		this.particle.cantSlow = true;
	}
	if(skill.meta.reflectParticle){
		this.particle.reflectParticle = true;
	}
	if(skill.meta.cantReflect){
		this.particle.cantReflect = true;
	}
	if(angle){
		this.particle.moveAngleSet = angle;
	}
	if(skill.meta.moveAngle){
		this.particle.moveAngleSet = skill.meta.moveAngle;
	}
	this._tilemap.addChild(this.particle);
	this._tilemap.addChild(this.particle.animSprite)
	
	sxlSimpleABS.particle.push(this.particle);
	
	// sxlSimpleABS.users.push(user);
};

Spriteset_Map.prototype.moveParticle = function(){
	for( i = 0 ; i < sxlSimpleABS.particle.length ; i ++  ){
		if(sxlSimpleABS.particle[i]){
			var particle = sxlSimpleABS.particle[i];
			var skill = particle.skill;
			var user = particle.user;
			var target = particle.target;
			// console.log(target)
			var minX = 0 ;
			var maxX = 0 ;
			var minY = 0 ;
			var maxY = 0 ;
			if( particle ){
				if(skill.meta.imgRange){
					minX = particle.x - Number(skill.meta.imgRange/2)*particle.scale.x;
					maxX = particle.x + Number(skill.meta.imgRange/2)*particle.scale.x;
					minY = particle.y - Number(skill.meta.imgRange/2)*particle.scale.y;
					maxY = particle.y + Number(skill.meta.imgRange/2)*particle.scale.y;
				}else if(particle._bounds){
					minX = particle._bounds.minX;
					maxX = particle._bounds.maxX;
					minY = particle._bounds.minY;
					maxY = particle._bounds.maxY;
				}

				if(particle){
					if(particle.anim&&particle.anim.anchor){
						particle.anim.anchor.x = 0.5;
						particle.anim.anchor.y = 0.5;
						particle.anim.x = particle.x;
						particle.anim.y = particle.y
					}
				}
				if(!particle.addFrame || particle.addFrame<0){
					particle.addFrame = 0;
				}else{
					if(particle.addFrame > 0 ) particle.addFrame --;
				}
				if(skill.meta.anchorX){
					particle.anchor.x = Number(skill.meta.anchorX);
				}
				if(skill.meta.anchorY){
					particle.anchor.y = Number(skill.meta.anchorY);
				}
				particle.triggerMinX = minX;
				particle.triggerMaxX = maxX;
				particle.triggerMinY = minY;
				particle.triggerMaxY = maxY;
				if(user == $gamePlayer){
					var userMember = $gameParty.members()[0]
				}else if (user._memberIndex){
					var userMember = $gameParty.members()[user._memberIndex];
				}else if (user._battler && user._battler._enemyId){
					var userMember = user._battler;
				}
				if( !user || !userMember){
					particle._stayTime = 0;
				}
				if(target){
					// console.log(target)
					var targetX = target.screenX() ;
					var targetY = target.screenY() ;
				}else{
					if( user != $gamePlayer && user.target){
						var targetX = user.target.screenX() ;
						var targetY = user.target.screenY() ;
						
					}else{
						var targetX;
						var targetY;
						if(sxlSimpleABS.smp.mobileMode){
							if($gamePlayer._direction == 2 ){
								targetX = $gamePlayer.screenX();
								targetY = $gamePlayer.screenY()+Graphics.height/2;
							}
							if($gamePlayer._direction == 4 ){
								targetX = $gamePlayer.screenX()-Graphics.width/2;
								targetY = $gamePlayer.screenY();
							}
							if($gamePlayer._direction == 6 ){
								targetX = $gamePlayer.screenX()+Graphics.width/2;
								targetY = $gamePlayer.screenY();
							}
							if($gamePlayer._direction == 8 ){
								targetX = $gamePlayer.screenX();
								targetY = $gamePlayer.screenY()-Graphics.height/2;
							}
						}else{
							targetX = TouchInput.x ;
							targetY = TouchInput.y + 24  ;
						}
					}
					
				}

				if( particle && particle._stayTime>0 && skill.meta.rotate && !particle.addFrame ){
					var meta = skill.meta.rotate.split(',');
					var rotate = meta[0];
					var stopWhenDestroy = meta[1];
					particle.rotation += Number(rotate);
				}
				if( particle.oriX != $gameMap._displayX || particle.oriY != $gameMap._displayY ){
					particle.x -= ($gameMap._displayX - particle.oriX)*48;
					particle.oriX = $gameMap._displayX;
					particle.y -= ($gameMap._displayY - particle.oriY)*48;
					particle.oriY = $gameMap._displayY;
				}
				if(skill.meta.moveFrame ){

					if(!particle.addFrame) particle.moveFrame += skill.meta.frameSpeed?Number(skill.meta.frameSpeed):1 ;
					if(Math.floor(particle.moveFrame)>=5*Math.floor(particle.bitmap.height/Number(skill.meta.moveFrame))){
						particle.moveFrame = 0;
					}
					particle.setFrame(Math.floor(particle.moveFrame) % 5*Number(skill.meta.moveFrame),Math.floor(particle.moveFrame / 5)*Number(skill.meta.moveFrame),Number(skill.meta.moveFrame),Number(skill.meta.moveFrame));
				}
				if(skill.meta.img == 'weaponParticle' && userMember.equips()[0].meta.moveFrame ){
					
					if(!particle.addFrame) particle.moveFrame += userMember.equips()[0].meta.frameSpeed?Number(userMember.equips()[0].meta.frameSpeed):1 ;
					if(Math.floor(particle.moveFrame)>=5*Math.floor(particle.bitmap.height/Number(userMember.equips()[0].meta.moveFrame))){
						particle.moveFrame = 0;
					}
					particle.setFrame(Math.floor(particle.moveFrame) % 5*Number(userMember.equips()[0].meta.moveFrame),Math.floor(particle.moveFrame / 5)*Number(userMember.equips()[0].meta.moveFrame),Number(userMember.equips()[0].meta.moveFrame),Number(userMember.equips()[0].meta.moveFrame));
				}
				
				if( particle._stayTime > 0 ){

					var userX = user.screenX();
					var userY = user.screenY();
					if(particle.jumpTargets.length>0 &&
					particle.counter > 0 && 
					$gameMap.events()[Number(particle.jumpTargets[Number(particle.jumpTargetCount)])]){
						particle.counter = 0;
						// for( s in $gameMap.events()[Number(particle.jumpTargets[Number(particle.jumpTargetCount)])].lastSkill ){
						// 	if( $gameMap.events()[Number(particle.jumpTargets[Number(particle.jumpTargetCount)])].lastSkill[s] == particle ){
						// 		$gameMap.events()[Number(particle.jumpTargets[Number(particle.jumpTargetCount)])].lastSkill.splice(s);
						// 		$gameMap.events()[Number(particle.jumpTargets[Number(particle.jumpTargetCount)])].lastSkillTimer.splice(s);
						// 	}
						// }
						targetX = $gameMap.events()[Number(particle.jumpTargets[Number(particle.jumpTargetCount)])].screenX();
						targetY = $gameMap.events()[Number(particle.jumpTargets[Number(particle.jumpTargetCount)])].screenY()-24;
						userX = particle.x;
						userY = particle.y;
						if( particle.jumpTargetCount < particle.jumpTargets.length-1 ){
							particle.jumpTargetCount++;
						}else{
							particle.jumpTargetCount = 0;
						}
							
						particle.radian = Math.atan2( distanceY, distanceX );
						particle.angle = particle.radian*180/Math.PI ;
						if( particle.moveAngleSet){
							particle.moveAngle = Number(particle.moveAngleSet)*Math.PI/180;
							particle.radian = Math.atan2( distanceY, distanceX )+particle.moveAngle;
							particle.angle = particle.radian*180/Math.PI ;
						}
						
					}

					var distanceX = targetX - userX;
					var distanceY = targetY - userY;
					if(skill.meta.pointToTarget){
						particle.radian = Math.atan2( distanceY, distanceX );
						particle.angle = particle.radian*180/Math.PI ;
					}
					for( j=0 ; j < sxlSimpleABS.particle.length ; j++){
						var particle2 = sxlSimpleABS.particle[j]
						if (j != i ) {
							if( particle2 && particle2._stayTime>0 &&
								particle2.x > minX && particle2.x < maxX &&
								particle2.y > minY && particle2.y < maxY
								){

								if( particle.destroyParticle && !particle.cantDestroy && particle.faction != particle2.faction ){
									particle2._stayTime = 0;
								}
								if( particle.slowParticle && !particle.cantSlow && particle.faction != particle2.faction ){
									particle2.speed = particle2.skill.speed/sxlSimpleABS.skillSpeedBase * particle.slowParticle;
								}
								if( particle.reflectParticle && !particle.cantReflect && particle.faction != particle2.faction ){
									if(user == $gamePlayer || user._memberIndex){
										particle2.faction = 'player';
									}else{
										particle2.faction = 'enemy';
									}
									particle2.speed = particle2.skill.speed/sxlSimpleABS.skillSpeedBase*(-1);
								}
							}
						}
					}
					if(!particle.radian ){
						particle.radian = Math.atan2( distanceY, distanceX );
						particle.angle = particle.radian*180/Math.PI ;
						if( particle.moveAngleSet){
							particle.moveAngle = Number(particle.moveAngleSet)*Math.PI/180;
							particle.radian = Math.atan2( distanceY, distanceX )+particle.moveAngle;
							particle.angle = particle.radian*180/Math.PI ;
						}
					}

					if(skill.meta.followUser){
						particle.x = user.screenX();
						particle.y = user.screenY()-24;
					}else{
						if( !particle.addFrame){
							particle.x += Math.cos(particle.radian) * ( particle.speed );
							particle.y += Math.sin(particle.radian) * ( particle.speed );
						}
					}
					
					/* if( !particle.addFrame )  */particle._stayTime -- ;
					if(!particle.jumpCD ){
						particle.jumpCD = 0;
					}else if ( particle.jumpCD > 0){
						particle.jumpCD -- ;
					}
					if(particle.light){
						particle.light.radian = particle.radian;
						particle.light.x = particle.x+particle.light.offsetX;
						particle.light.y = particle.y+particle.light.offsetY;
					}
					if( particle.repeatTime>0){
						particle.repeatTime--;
					};
					if(skill.meta.trail ){
						particle.distanceX = (targetX - userX );
						particle.distanceY = (targetY - userY );
						particle.radian = Math.atan2( distanceY, distanceX );
						particle.angle = particle.radian*180/Math.PI ;
					}
					particle.nowdistX = (targetX - userX );
					particle.nowdistY = (targetY - userY );
					if(user == $gamePlayer){
						userId = $gameParty.members()[0];
					}else if (user in $gamePlayer._followers._data){
						userId = $gameParty.members()[user._memberIndex];
					}else{
						userId = user._battler
					}
					
					
					if(skill.meta.collide){
						var screenX = Math.floor($gameMap._displayX + particle.x/48)
						var screenY = Math.floor($gameMap._displayY + particle.y/48)
						if(!$gameMap.isPassable(screenX,screenY)){
							particle._stayTime = 0 ;
						}
					}
					if(skill.meta.moveFade){
						sxlSimpleABS.particle[i].opacity -= Number(skill.meta.moveFade);
					}
					
				}else{
					if(skill.meta.destroySkill && !particle.tirggerdesSkill){
						this.createParticle(user,target,particle.faction,$dataSkills[Number(skill.meta.destroySkill)],particle.x,particle.y)
						particle.tirggerdesSkill = true;
					}
					if(particle.nextSkillId){
						this.createParticle(user,target,particle.faction,$dataSkills[particle.nextSkillId],particle.x,particle.y)
						particle.tirggerdesSkill = true;
					}
					if( skill.meta.rotate ){
						var meta = skill.meta.rotate.split(',');
						var rotate = meta[0];
						var stopWhenDestroy = meta[1];
						if(stopWhenDestroy == 'true')
						particle.rotation = 0;
					}
					if(skill.meta.destroyAnim){
						if(sxlSimpleABS.particle[i].frameCount>1){
							sxlSimpleABS.particle[i].nowFrame ++;
							sxlSimpleABS.particle[i].frameCount = 0;
						}else{
							sxlSimpleABS.particle[i].frameCount ++
						}
						var anim = skill.meta.destroyAnim;
						sxlSimpleABS.particle[i].animSprite.opacity = 255;
						if(skill.meta.destroyAnimScale){
							sxlSimpleABS.particle[i].animSprite.scale.x = Number(skill.meta.destroyAnimScale);
							sxlSimpleABS.particle[i].animSprite.scale.y = Number(skill.meta.destroyAnimScale);
						}
						if(skill.meta.destroyAnimBlendMode){
							sxlSimpleABS.particle[i].animSprite.blendMode = Number(skill.meta.destroyAnimBlendMode);
						}
						sxlSimpleABS.particle[i].animSprite.anchor.x = 0.5;
						sxlSimpleABS.particle[i].animSprite.anchor.y = 0.5; 
						sxlSimpleABS.particle[i].animSprite.x = sxlSimpleABS.particle[i].x
						sxlSimpleABS.particle[i].animSprite.y = sxlSimpleABS.particle[i].y
						sxlSimpleABS.particle[i].animSprite.setFrame(sxlSimpleABS.particle[i].nowFrame % 5*192,Math.floor(sxlSimpleABS.particle[i].nowFrame / 5)*192,192,192);
						if(sxlSimpleABS.particle[i].nowFrame>5*Math.floor(sxlSimpleABS.particle[i].animSprite.bitmap.height/192)){
							this._tilemap.removeChild(sxlSimpleABS.particle[i].animSprite)
							sxlSimpleABS.particle[i].animSprite.destroy();
						}
					}
					if(skill.meta.destroyFade){
						sxlSimpleABS.particle[i].opacity -= Number(skill.meta.destroyFade);

					}else{
						sxlSimpleABS.particle[i].opacity = 0;
					}
					if( sxlSimpleABS.particle[i].opacity<=0 && 
						(skill.meta.destroyAnim?sxlSimpleABS.particle[i].nowFrame>5*Math.floor(sxlSimpleABS.particle[i].animSprite.bitmap.height/192):true)
						){
						if(sxlSimpleABS.particle[i].anim) sxlSimpleABS.particle[i].anim.destroy();
						if(particle.anim){
							this._tilemap.removeChild(particle.anim);
						}
						if(sxlSimpleABS.particle[i].light){
							this._tilemap.removeChild(sxlSimpleABS.particle[i].light);
							sxlSimpleABS.particle[i].light.destroy()
						}
						this._tilemap.removeChild(sxlSimpleABS.particle[i]);
						sxlSimpleABS.particle[i].destroy();

						sxlSimpleABS.particle.splice(i, 1);
						// sxlSimpleABS.users.splice(i, 1);
					}
					
				}
			}
		}
	}
};

Spriteset_Map.prototype.triggerParticle = function(){
	for( let p = 0 ; p < sxlSimpleABS.particle.length ; p ++ ){
		if(sxlSimpleABS.particle[p]){
			var particle = sxlSimpleABS.particle[p];
			var user = particle.user;
			var minX = particle.triggerMinX;
			var maxX = particle.triggerMaxX;
			var minY = particle.triggerMinY;
			var maxY = particle.triggerMaxY;
			if(particle.user && !particle.addFrame ){
				if(!particle.userMember){
					// if(user == $gamePlayer){
					// 	var userMember = $gameActors.actor($gameParty.members()[0]._actorId);
					// }else if (user._memberIndex && $gameParty.members()[user._memberIndex] ){
					// 	var userMember = $gameActors.actor($gameParty.members()[user._memberIndex]._actorId);
					// }else if (user._battler && user._battler._enemyId){
					// 	var userMember = user._battler;
					// }
					userMember = user.battler();
				}else{
					userMember = particle.userMember;
				}
				
				
				
				if( !user || !userMember){
					particle._stayTime = 0;
				}
				if(particle.target){
					var target = particle.target;
					var targetX = target.screenX();
					var targetY = target.screenY();
				}
				var skill = particle.skill;
				
				var jumpTimes = skill.meta.jumpTimes?Number(skill.meta.jumpTimes):2;
				if(!particle.faction){
					if(user.battler()._actorId) particle.faction = 'player';
					if(user.battler()._enemyId) particle.faction = 'enemy';
				}
				
				if(user.faction){
					particle.faction = user.faction;
				}
				if (particle.faction == 'enemy') {
					for( let i = 0 ; i < user._battler._aggro.length ; i ++ ){
						charTarget = $gamePlayer
						if(user._battler._aggro[i] && user._battler._aggro[i].type == 'actor'){
							charTarget = $gameActors.actor(user._battler._aggro[i].id).player;
						}
						if(user._battler._aggro[i] && user._battler._aggro[i].type == 'event'){
							charTarget = $gameMap.event(user._battler._aggro[i].id);
						}
						var charTargetX = charTarget.screenX();
						var charTargetY = charTarget.screenY();
						
						if( minX <= charTarget.screenX() + 24 && 
							minY <= charTarget.screenY() &&
							maxX >= charTarget.screenX() - 24 && 
							maxY >= charTarget.screenY() - 48){
							if( ( !particle.repeatTime || particle.repeatTime==0 ) && (charTarget.lastSkill.indexOf(particle)==-1) && particle.faction != charTarget.faction){
								if(skill.meta.oneTime){
									charTarget.lastSkill.push(particle);
									charTarget.lastSkillTimer.push(Number(particle._stayTime+10)+particle.addFrame);
								}
								
								if(skill.meta.damageInterval){
									charTarget.lastSkill.push(particle);
									charTarget.lastSkillTimer.push(Number(skill.meta.damageInterval));
								}
								sxlSimpleABS.enemySubject = user.battler();
								sxlSimpleABS.sceneMap.enemiesAttack(charTarget, user, skill);
								if(charTarget._battler && charTarget._battler._aggro){
									charTarget.target = user;
								}
								particle.addFrame = particle.skill.meta.hitAddFrame?Number(particle.skill.meta.hitAddFrame)+particle.addFrame:0;
								
								if(skill.meta.knockBack && charTarget){
										if( particle.knockBackType == 8 ){
											if(skill.meta.knockBack && charTarget){
												if( particle.x >= charTargetX ){
													charTarget._direction = 6 ; 
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill);
												}else{
													charTarget._direction = 4 ;
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill)
												}
												if( particle.y >= charTargetY ){
													charTarget._direction = 2 ;
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill);
												}else{
													charTarget._direction = 8 ;
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill)
												}
											}
										}else if (particle.knockBackType == 4){
											if( charTarget._direction == 4  ){
												if( particle.x >= charTargetX ){
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill, true);
												}else{
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill)
												}
											}
											if( charTarget._direction == 6  ){
												if( particle.x <= charTargetX ){
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill, true);
												}else{
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill)
												}
											}
											if( charTarget._direction == 2  ){
												if( particle.y <= charTargetY ){
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill, true);
												}else{
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill)
												}
											}
											if( charTarget._direction == 8  ){
												if( particle.y >= charTargetY ){
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill, true);
												}else{
													sxlSimpleABS.sceneMap.hitBack(charTarget, userMember, skill)
												}
											}
										}
									}
									if(skill.meta.hitHook && charTarget){
										sxlSimpleABS.sceneMap.hitHook(charTarget, userMember, skill);
									}
								particle.repeatTime = skill.meta.interval?Number( skill.meta.interval ):30 ;
								if( !skill.meta.through  && !skill.meta.jumpParticle){
									particle._stayTime = 0;
								}
								if(skill.meta.jumpParticle){
									particle._stayTime = 30;
								}
							}
						};
					};
				}else{
					for( let i = 0 ; i < $gameMap.events().length ; i++ ){
						
						if( $gameMap.events()[i]._battler && $gameMap.events()[i]._battler._hp > 0 ){
							var atarget = $gameMap.events()[i];
							var atargetX = atarget.screenX();
							var atargetY = atarget.screenY();
							
							if( minX <= atargetX + 24 && 
								minY <= atargetY &&
								maxX >= atargetX - 24 && 
								maxY >= atargetY - 48 ){
								
								if( ( !particle.repeatTime || particle.repeatTime==0 ) && (atarget.lastSkill.indexOf(particle)==-1)&& particle.faction != atarget.faction){
									if(skill.meta.oneTime){
										atarget.lastSkill.push(particle);
										atarget.lastSkillTimer.push(Number(particle._stayTime+10)+particle.addFrame);
									}
									if(skill.meta.damageInterval){
										atarget.lastSkill.push(particle);
										atarget.lastSkillTimer.push(Number(skill.meta.damageInterval)+particle.addFrame);
									}
									particle.counter = 1;
									sxlSimpleABS.sceneMap.playersAttack(atarget, userMember, user, skill);
									if(atarget._battler && atarget._battler._aggro){
										atarget.target = user;
									}
									particle.addFrame = particle.skill.meta.hitAddFrame?Number(particle.skill.meta.hitAddFrame):0;
									if(skill.meta.jumpParticle){
										for( event in $gameMap.events() ){
											if( event != i &&
												$gameMap.events()[event]._battler && 
												$gameMap.events()[event]._battler._hp > 0 && 
												!$gameMap.events()[event]._battler.isStateAffected(1) &&
												Math.abs(atargetX-$gameMap.events()[event].screenX()) < Number(skill.meta.jumpParticle)*48 &&
												Math.abs(atargetY-$gameMap.events()[event].screenY()) < Number(skill.meta.jumpParticle)*48 &&
												particle.jumpTargets.indexOf(Number(event))==-1){
												particle.jumpTargets.push(Number(event))
											}
										}
									}
									if(skill.meta.knockBack && atarget){
										if( particle.knockBackType == 8 ){
											if(skill.meta.knockBack && atarget){
												if( particle.x >= atargetX ){
													atarget._direction = 6 ; 
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill);
												}else{
													atarget._direction = 4 ;
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill)
												}
												if( particle.y >= atargetY ){
													atarget._direction = 2 ;
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill);
												}else{
													atarget._direction = 8 ;
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill)
												}
											}
										}else if (particle.knockBackType == 4){
											if( atarget._direction == 4  ){
												if( particle.x >= atargetX ){
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill, true);
												}else{
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill)
												}
											}
											if( atarget._direction == 6  ){
												if( particle.x <= atargetX ){
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill, true);
												}else{
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill)
												}
											}
											if( atarget._direction == 2  ){
												if( particle.y <= atargetY ){
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill, true);
												}else{
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill)
												}
											}
											if( atarget._direction == 8  ){
												if( particle.y >= atargetY ){
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill, true);
												}else{
													sxlSimpleABS.sceneMap.hitBack(atarget, userMember, skill)
												}
											}
										}
									}
									if(skill.meta.hitHook && atarget){
										sxlSimpleABS.sceneMap.hitHook(atarget, userMember, skill);
									}
									particle.repeatTime = skill.meta.interval?Number( skill.meta.interval ):30 ;
									
									if( !skill.meta.through && !skill.meta.jumpParticle){
										particle._stayTime = 0;
									}
									if(skill.meta.jumpParticle && particle.jumpTargets.length<2){
										particle._stayTime = 0;
									}
								}
							}
						}
					}
				}
			}
		}
	}
};