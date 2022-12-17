
//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - window - MobileController
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 移动端控制
 * @author 神仙狼
 * 
 * @help 未完成，有兴趣可以测试
 */

var SSMBS_Mobile_Controller = SSMBS_Mobile_Controller||{};
SSMBS_Mobile_Controller.range = 600;
SSMBS_Mobile_Controller.size = 300;
SSMBS_Mobile_Controller.positionSize = 150;

SSMBS_Mobile_Controller.buttonSize = 128;

const _SSMBS_Window_controllerLoad = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_SSMBS_Window_controllerLoad.call(this);
	this.createController();
	this.mobileMode = false;
};


const _SSMBS_Window_controllerUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_SSMBS_Window_controllerUpdate.call(this);
	if(this.mobileMode){
		this.refreshController();
	}else{
		this.controllerPadding.opacity = 0;
		this.controllerPosition.opacity = 0;
		this.controllerButtons.opacity = 0;
	}
};

Scene_Map.prototype.createController = function() {
	this.controllerPadding = new Sprite(new Bitmap(SSMBS_Mobile_Controller.range,SSMBS_Mobile_Controller.range));
	this.addChild(this.controllerPadding);
	this.controllerPosition = new Sprite(new Bitmap(SSMBS_Mobile_Controller.range,SSMBS_Mobile_Controller.range));
	this.addChild(this.controllerPosition);
	this.controllerButtons = new Sprite(new Bitmap(Graphics.width,Graphics.height));
	this.addChild(this.controllerButtons);
};

Scene_Map.prototype.refreshController = function() {
	this.controllerPadding.bitmap.clear();
	this.controllerPosition.bitmap.clear();
	this.controllerButtons.bitmap.clear();

	this.controllerPadding.opacity = 72;
	this.controllerPadding.x = -128;
	this.controllerPadding.y = Graphics.height - SSMBS_Mobile_Controller.range + 128;

	this.controllerPadding.opacity = 72;
	this.controllerPosition.opacity = 128;
	this.controllerButtons.opacity = 128;

	if(TouchInput.isCancelled()){
		if($gamePlayer.battler()._tp >= 99){
			$gamePlayer.battler()._tp += 1
		}
		if($gamePlayer.battler()._tp >= 100 && !$gamePlayer.sequence.length > 0
		&& this.skillUsable($gamePlayer,$dataSkills[$gamePlayer.battler().attackSkillId()])){
			this.fixDirection($gamePlayer)
			sxlSimpleABS.useSkill($dataSkills[$gamePlayer.battler().attackSkillId()],$gamePlayer);
			for( let e = 0 ; e < $gamePlayer.battler().equips().length ; e ++ ){
				let equip = $gamePlayer.battler().equips()[e];
				if(equip && equip.meta.triggerSkill){
					let random = Math.random();
					let triggerSkill;
					if(equip.meta.triggerSkill.split(',')[1]){
						let length = equip.meta.triggerSkill.split(',').length-1;
						let randomSkill = Math.floor(Math.random()*length);
						triggerSkill = $dataSkills[Number(equip.meta.triggerSkill.split(',')[randomSkill+1])];
					}
					let triggerNumber = equip.meta.triggerSkill.split(',')[0]?Number(equip.meta.triggerSkill.split(',')[0]):1;
					if(random<triggerNumber){
						sxlSimpleABS.useSkill(triggerSkill,$gamePlayer)
					}
				}
			}
			$gamePlayer.battler()._tp -= 100;
		}
	}else{
		if($gamePlayer.battler()._tp>99){
			$gamePlayer.battler()._tp = 99;
		}
	}

	this.controllerPadding.bitmap.drawCircle(SSMBS_Mobile_Controller.range/2,SSMBS_Mobile_Controller.range/2,SSMBS_Mobile_Controller.size/2,'#000000');
	this.controllerPosition.x = this.controllerPadding.x;
	this.controllerPosition.y = this.controllerPadding.y;

	let padding_stX = this.controllerPadding.x+SSMBS_Mobile_Controller.range/2-SSMBS_Mobile_Controller.size/2;
	let padding_stY = this.controllerPadding.y+SSMBS_Mobile_Controller.range/2-SSMBS_Mobile_Controller.size/2;
	let padding_edX = padding_stX+SSMBS_Mobile_Controller.size;
	let padding_edY = padding_stY+SSMBS_Mobile_Controller.size;

	//绘制攻击按钮
	
	let actButtonSpacing = 128;
	this.controllerButtons.bitmap.drawCircle(Graphics.width-actButtonSpacing,Graphics.height-actButtonSpacing,SSMBS_Mobile_Controller.buttonSize/2,'#000000');
	let actBtn_stX = Graphics.width-actButtonSpacing-SSMBS_Mobile_Controller.buttonSize/2;
	let actBtn_stY = Graphics.height-actButtonSpacing-SSMBS_Mobile_Controller.buttonSize/2;
	let actBtn_edX = actBtn_stX + SSMBS_Mobile_Controller.buttonSize;
	let actBtn_edY = actBtn_stY + SSMBS_Mobile_Controller.buttonSize;
	if(ssmbsBasic.isTouching(actBtn_stX,actBtn_stY,actBtn_edX,actBtn_edY)){
		if(TouchInput.isPressed()){
			if($gamePlayer.battler()._tp==99){
				$gamePlayer.battler()._tp += 1;
			}
			
			if( !$gamePlayer.sequence.length > 0 ){
				if( $gamePlayer.battler()._tp >= 100){
					sxlSimpleABS.useSkill($dataSkills[$gamePlayer.battler().attackSkillId()],$gamePlayer)
					for( let e = 0 ; e < $gamePlayer.battler().equips().length ; e ++ ){
						let equip = $gamePlayer.battler().equips()[e];
						if(equip && equip.meta.triggerSkill){
							let random = Math.random();
							let triggerSkill;
							if(equip.meta.triggerSkill.split(',')[1]){
								let length = equip.meta.triggerSkill.split(',').length-1;
								let randomSkill = Math.floor(Math.random()*length);
								triggerSkill = $dataSkills[Number(equip.meta.triggerSkill.split(',')[randomSkill+1])];
							}
							let triggerNumber = equip.meta.triggerSkill.split(',')[0]?Number(equip.meta.triggerSkill.split(',')[0]):1;
							if(random<triggerNumber){
								sxlSimpleABS.useSkill(triggerSkill,$gamePlayer)
							}
						}
					}
					$gamePlayer.battler()._tp -= 100;
				}
			};
		}
	}else{

	}

	//点击事件触发
	for(let e = 0 ; e < $gameMap.events().length ; e ++ ){
		let e_stX = $gameMap.events()[e].screenX()-24;
		let e_stY = $gameMap.events()[e].screenY()-48;
		let e_edX = $gameMap.events()[e].screenX()+24;
		let e_edY = $gameMap.events()[e].screenY();
		let distX = Math.abs($gamePlayer.x - $gameMap.events()[e].x);
		let distY = Math.abs($gamePlayer.y - $gameMap.events()[e].y);
		if(ssmbsBasic.isTouching(e_stX,e_stY,e_edX,e_edY)){
			
			if(distX < 2 && distY < 2 && !$gameMap.events()[e]._battler){
				$gamePlayer.battler()._tp = 99;
			}
			if(TouchInput.isClicked() && distX < 2 && distY < 2){
				$gameMap.events()[e].clearStartingFlag();
				$gameMap._interpreter.setup($gameMap.events()[e].list(), $gameMap.events()[e].eventId());
			}
		}
		if(this.isPressingMobileControllerActBtn && distX < 2 && distY < 2){
			if($gameMap.events()[e].x == $gamePlayer.x){
				if( ($gameMap.events()[e].y > $gamePlayer.y && $gamePlayer._direction == 2) ||
					($gameMap.events()[e].y < $gamePlayer.y && $gamePlayer._direction == 8) ){
						$gameMap.events()[e].clearStartingFlag();
						$gameMap._interpreter.setup($gameMap.events()[e].list(), $gameMap.events()[e].eventId());
				}
			}
			if($gameMap.events()[e].y == $gamePlayer.y){
				if( ($gameMap.events()[e].x > $gamePlayer.x && $gamePlayer._direction == 6) ||
					($gameMap.events()[e].x < $gamePlayer.x && $gamePlayer._direction == 4) ){
						$gameMap.events()[e].clearStartingFlag();
						$gameMap._interpreter.setup($gameMap.events()[e].list(), $gameMap.events()[e].eventId());
				}
			}
		}
	};

	if(TouchInput.isHovered()||!TouchInput.isPressed()){
		$gamePlayer.isTriggerMobileOK = false;
	}

	if(ssmbsBasic.isTouching(padding_stX,padding_stY,padding_edX,padding_edY)){
		if(TouchInput.isPressed()){
			if($gamePlayer.battler()._tp>=100){
				$gamePlayer.battler()._tp--;
			}
			this.isTouchingMobileController = true;
		}
	}
	if(TouchInput.isHovered()||!TouchInput.isPressed()){
		this.isTouchingMobileController = false;
	}
	
	if(this.isTouchingMobileController){
		//计算摇杆位置
		let drawX;
		let drawY;
		let circleOX = this.controllerPosition.x+SSMBS_Mobile_Controller.range/2;
		let circleOY = this.controllerPosition.y+SSMBS_Mobile_Controller.range/2;
		if(ssmbsBasic.pointDistance(TouchInput.x,TouchInput.y,circleOX,circleOY)>SSMBS_Mobile_Controller.size/2){
			let angle = ssmbsBasic.pointAngle(TouchInput.x,TouchInput.y,circleOX,circleOY);
			drawX = circleOX + SSMBS_Mobile_Controller.size/2 * Math.cos(angle * Math.PI / 180)-this.controllerPosition.x;
			drawY = circleOY + SSMBS_Mobile_Controller.size/2 * Math.sin(angle * Math.PI / 180)-this.controllerPosition.y;
		}else{
			drawX = TouchInput.x-this.controllerPosition.x;
			drawY = TouchInput.y-this.controllerPosition.y;
		}
		let fixX = drawX;
		let fixY = drawY;
		this.mobileControllerAngle = ssmbsBasic.pointAngle(TouchInput.x,TouchInput.y,circleOX,circleOY);
		this.mobileControllerDist = ssmbsBasic.pointDistance(TouchInput.x,TouchInput.y,circleOX,circleOY);
		SSMBS_Mobile_Controller.mobileControllerAngle = this.mobileControllerAngle;
		this.controllerPosition.bitmap.drawCircle(fixX,fixY,SSMBS_Mobile_Controller.positionSize/2,'#000000');
		//调整朝向
		if(this.mobileControllerAngle>45&&this.mobileControllerAngle<135){
			$gamePlayer._direction=2;
		}else if(this.mobileControllerAngle>-45&&this.mobileControllerAngle<45){
			$gamePlayer._direction=6;
		}else if(this.mobileControllerAngle>-135&&this.mobileControllerAngle<-45){
			$gamePlayer._direction=8;
		}else{
			$gamePlayer._direction=4;
		}
		//行走
		if($gamePlayer.canMove() && $gamePlayer.battler()._tp < 100){
			$gamePlayer.dotMoveByDeg(this.mobileControllerAngle+90);
		}
	}
};


