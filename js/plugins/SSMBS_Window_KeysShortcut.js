
//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - window - KeysShortcut
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 快捷栏
 * @author 神仙狼
 * 
 * 
 */


var SSMBS_Window_KeysShortcut = SSMBS_Window_KeysShortcut||{};

SSMBS_Window_KeysShortcut.gauge = true;

SSMBS_Window_KeysShortcut.keysAmount = 8;
SSMBS_Window_KeysShortcut.keysAmountMobile = 4;
SSMBS_Window_KeysShortcut.keySpace = 2;
SSMBS_Window_KeysShortcut.gridSize = 32;
SSMBS_Window_KeysShortcut.gridSizeMobile = 64;
SSMBS_Window_KeysShortcut.gridOpacity = 128;
SSMBS_Window_KeysShortcut.ovarlayerOpacity = 192;

SSMBS_Window_KeysShortcut.width = SSMBS_Window_KeysShortcut.keysAmount * (SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace);
SSMBS_Window_KeysShortcut.height = SSMBS_Window_KeysShortcut.gridSize;

SSMBS_Window_KeysShortcut.defaultFontSize = 12;
SSMBS_Window_KeysShortcut.positions = [];

//角色属性栏
//属性栏整体设置
SSMBS_Window_KeysShortcut.fontSize = 9;
SSMBS_Window_KeysShortcut.statesInformationFontSize = 12;
SSMBS_Window_KeysShortcut.gaugeX = 414;
SSMBS_Window_KeysShortcut.gaugeY = 651;
SSMBS_Window_KeysShortcut.gaugeWidth = 450;
SSMBS_Window_KeysShortcut.gaugeHeight = 64;

//hp/mp/exp栏的调整，调整的坐标是以整体设置为基础的
SSMBS_Window_KeysShortcut.hpX = 91;
SSMBS_Window_KeysShortcut.hpY = 4;
SSMBS_Window_KeysShortcut.hpWidth = 132;
SSMBS_Window_KeysShortcut.hpHeight = 14;

SSMBS_Window_KeysShortcut.mpX = 227;
SSMBS_Window_KeysShortcut.mpY = 4;
SSMBS_Window_KeysShortcut.mpWidth = 132;
SSMBS_Window_KeysShortcut.mpHeight = 14;

SSMBS_Window_KeysShortcut.expX = 91;
SSMBS_Window_KeysShortcut.expY = 56;
SSMBS_Window_KeysShortcut.expWidth = 268;
SSMBS_Window_KeysShortcut.expHeight = 4;

//角色升级提示的坐标
SSMBS_Window_KeysShortcut.hintForLV_X= 471;
SSMBS_Window_KeysShortcut.hintForLV_Y= 672;
SSMBS_Window_KeysShortcut.hintForLVWidth = 32;
SSMBS_Window_KeysShortcut.hintForLVHeigth = 32;
SSMBS_Window_KeysShortcut.hintForSkill_X= 777;
SSMBS_Window_KeysShortcut.hintForSkill_Y= 672;
SSMBS_Window_KeysShortcut.hintForSkillWidth = 32;
SSMBS_Window_KeysShortcut.hintForSkillHeigth = 32;


const _SSMBS_Window_KeysShortcut_mapLoad = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_SSMBS_Window_KeysShortcut_mapLoad.call(this);
	this.createKeysGirds();
	SSMBS_Window_KeysShortcut.isOpen = true;
	this.longPressCD = 0;
}

const _SSMBS_Window_KeysShortcut_mapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_SSMBS_Window_KeysShortcut_mapUpdate.call(this);
	this.isTouchingKeysShortcut = false;
	if(this.longPressCD>0){
		this.longPressCD -- ;
	}
	// if(this.mobileMode){
		
	// 	SSMBS_Window_KeysShortcut.gridSize = SSMBS_Window_KeysShortcut.gridSizeMobile;
	// 	SSMBS_Window_KeysShortcut.keysAmount = SSMBS_Window_KeysShortcut.keysAmountMobile;
	// 	SSMBS_Window_KeysShortcut.width = SSMBS_Window_KeysShortcut.keysAmount * (SSMBS_Window_KeysShortcut.gridSizeMobile + SSMBS_Window_KeysShortcut.keySpace);
	// 	SSMBS_Window_KeysShortcut.height = SSMBS_Window_KeysShortcut.gridSizeMobile;
	// 	this.keysGeneral.bitmap.resize(SSMBS_Window_KeysShortcut.width,SSMBS_Window_KeysShortcut.height)
	// 	this.keysIcons.bitmap.resize(SSMBS_Window_KeysShortcut.width,SSMBS_Window_KeysShortcut.height)
	// 	this.keysIconsTexts.bitmap.resize(SSMBS_Window_KeysShortcut.width,SSMBS_Window_KeysShortcut.height)
	// 	this.keysIconsOvarlayer.bitmap.resize(SSMBS_Window_KeysShortcut.width,SSMBS_Window_KeysShortcut.height)
	// }
	if(!$gameParty.triggerKeys){
		$gameParty.triggerKeys = ['q','e','r','f','1','2','3','4'];
	}
	if(!$gameParty.triggerKeysCooldown){
		$gameParty.triggerKeysCooldown = [];
		for( let i = 0 ; i < SSMBS_Window_KeysShortcut.keysAmount ; i ++ ){
			$gameParty.triggerKeysCooldown.push(0);
		}
	}
	for( let i = 0 ; i < $gameParty.triggerKeysCooldown.length ; i ++ ){
		if($gameParty.triggerKeysCooldown[i]>0){
			$gameParty.triggerKeysCooldown[i]--;
		}
	}

	if(!$gameParty.shortcutGirdItems){
		$gameParty.shortcutGirdItems = [];
		for( let i = 0 ; i < SSMBS_Window_KeysShortcut.keysAmount ; i ++ ){
			$gameParty.shortcutGirdItems.push(null);
		}
	};
	//转换为档案数据
	for( let i = 0 ; i < $gameParty.shortcutGirdItems.length ; i ++ ){
		if($gameParty.shortcutGirdItems[i]){
			if($gameParty.shortcutGirdItems[i].itypeId){
				$gameParty.shortcutGirdItems[i] = $dataItems[$gameParty.shortcutGirdItems[i].id];
			}
			if($gameParty.shortcutGirdItems[i].atypeId ){
				$gameParty.shortcutGirdItems[i] = $dataArmors[$gameParty.shortcutGirdItems[i].id];
			}
			if($gameParty.shortcutGirdItems[i].wtypeId){
				$gameParty.shortcutGirdItems[i] = $dataWeapons[$gameParty.shortcutGirdItems[i].id];
			}
			if($gameParty.shortcutGirdItems[i].stypeId){
				$gameParty.shortcutGirdItems[i] = $dataSkills[$gameParty.shortcutGirdItems[i].id];
			}
		}
	}
	if(SSMBS_Window_KeysShortcut.positions.length < SSMBS_Window_KeysShortcut.keysAmount){
		for( let i = 0 ; i < SSMBS_Window_KeysShortcut.keysAmount ; i ++ ){	
			SSMBS_Window_KeysShortcut.positions.push( {x:i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace),y:0} );
		};
	};
	if(SSMBS_Window_KeysShortcut.hideAll === true){
		this.shortcutGauge.opacity = 0;
		this.keysGeneral.opacity = 0;
		this.keysIcons.opacity = 0
		this.keysIconsTexts.opacity = 0
		this.keysIconsOvarlayer.opacity = 0;
	}else{
		if(SSMBS_Window_KeysShortcut.isOpen && SSMBS_Window_KeysShortcut.positions.length == SSMBS_Window_KeysShortcut.keysAmount){
			this.refreshKeysGirds();
			this.keysGeneral.opacity = SSMBS_Window_KeysShortcut.gridOpacity;
			this.keysIcons.opacity = 255;
			this.keysIconsTexts.opacity = 255;
			this.keysIconsOvarlayer.opacity = SSMBS_Window_KeysShortcut.ovarlayerOpacity;
			if(SSMBS_Window_KeysShortcut.gauge){
				this.shortcutGauge.opacity = 255;
				this.refreshShortcutGauge();
			}
		}else{
			this.shortcutGauge.opacity = 0;
			this.keysGeneral.opacity = 0;
			this.keysIcons.opacity = 0
			this.keysIconsTexts.opacity = 0
			this.keysIconsOvarlayer.opacity = 0;
		}
	}
	

	
};

Scene_Map.prototype.createKeysGirds = function(){
	if(SSMBS_Window_KeysShortcut.gauge){
		this.shortcutGauge = new Sprite( new Bitmap( SSMBS_Window_KeysShortcut.gaugeWidth , SSMBS_Window_KeysShortcut.gaugeHeight ) );
		this.addChild(this.shortcutGauge);
		this.shortcutGaugeStates = new Sprite( new Bitmap( SSMBS_Window_KeysShortcut.gaugeWidth , SSMBS_Window_KeysShortcut.gaugeHeight+48 ) );
		this.addChild(this.shortcutGaugeStates);
		this.stateInformation = new Sprite( new Bitmap( Graphics.width , Graphics.height ) );
		this.addChild(this.stateInformation);
	}
	this.keysGeneral = new Sprite( new Bitmap( SSMBS_Window_KeysShortcut.width , SSMBS_Window_KeysShortcut.height ) );
	this.keysGeneral.opacity = SSMBS_Window_KeysShortcut.gridOpacity;
	this.addChild(this.keysGeneral);
	this.keysIcons = new Sprite( new Bitmap( SSMBS_Window_KeysShortcut.width , SSMBS_Window_KeysShortcut.height ) );
	this.addChild(this.keysIcons);
	this.keysIconsTexts = new Sprite( new Bitmap( SSMBS_Window_KeysShortcut.width , SSMBS_Window_KeysShortcut.height ) );
	this.addChild(this.keysIconsTexts);
	this.keysIconsOvarlayer = new Sprite( new Bitmap( SSMBS_Window_KeysShortcut.width , SSMBS_Window_KeysShortcut.height ) );
	this.keysIconsOvarlayer.opacity = SSMBS_Window_KeysShortcut.ovarlayerOpacity;
	this.addChild(this.keysIconsOvarlayer);
	this.hintForLVPoint = new Sprite( new Bitmap( SSMBS_Window_KeysShortcut.hintForLVWidth , SSMBS_Window_KeysShortcut.hintForLVHeigth ) );
	this.hintForLVPoint.opacity = 0;
	this.addChild(this.hintForLVPoint);
	this.hintForSkillPoint = new Sprite( new Bitmap( SSMBS_Window_KeysShortcut.hintForSkillWidth , SSMBS_Window_KeysShortcut.hintForSkillHeigth ) );
	this.hintForSkillPoint.opacity = 0;
	this.addChild(this.hintForSkillPoint);
	this.menu = new Sprite( new Bitmap( 32 , 32 ) );
	this.menu.opacity = 255;
	this.menu.bitmap = ImageManager.loadSystem('buttonOption');
	this.addChild(this.menu);
	
	
	
};
Scene_Map.prototype.refreshShortcutGauge = function(){
	this.shortcutGauge.bitmap.clear();
	this.shortcutGaugeStates.bitmap.clear();
	this.stateInformation.bitmap.clear();
	this.shortcutGauge.bitmap.fontSize = SSMBS_Window_KeysShortcut.fontSize;
	this.shortcutGaugeStates.bitmap.fontSize = SSMBS_Window_KeysShortcut.fontSize;
	this.stateInformation.bitmap.fontSize = SSMBS_Window_KeysShortcut.statesInformationFontSize;
	this.shortcutGauge.bitmap.fontFace = $gameSystem.mainFontFace();
	this.shortcutGaugeStates.bitmap.fontFace = $gameSystem.mainFontFace();
	this.stateInformation.bitmap.fontFace = $gameSystem.mainFontFace();
	this.shortcutGauge.x = SSMBS_Window_KeysShortcut.gaugeX;
	this.shortcutGauge.y = SSMBS_Window_KeysShortcut.gaugeY;
	this.shortcutGaugeStates.x = this.shortcutGauge.x;
	this.shortcutGaugeStates.y = this.shortcutGauge.y-48;
	if(!this.mobileMode){
		this.shortcutGauge.bitmap.blt( 
			ImageManager.loadSystem('actorGauge_backGround'),
			0,0, //切割坐标
			SSMBS_Window_KeysShortcut.gaugeWidth ,SSMBS_Window_KeysShortcut.gaugeHeight,//切割尺寸
			0, 0,// 绘制坐标
			SSMBS_Window_KeysShortcut.gaugeWidth ,SSMBS_Window_KeysShortcut.gaugeHeight //最终大小
		);
	};
	if(ssmbsBasic.isTouching(this.menu.x,this.menu.y,this.menu.x+32,this.menu.y+32)){
		if(TouchInput.isClicked()){
			SSMBS_Window_System.isOpen = !SSMBS_Window_System.isOpen;
		};
		// if(TouchInput.isLongPressed() && this.longPressCD == 0){
		// 	if(this.longPressCD == 0 ){
		// 		this.longPressCD = 30;
		// 	}
			
		// 	this.mobileMode = !this.mobileMode;
		// };
		
	}
	

	let rateHp = $gamePlayer.battler()._hp/$gamePlayer.battler().mhp;
	if(rateHp>0){
		var rateDamageHp = $gamePlayer.battler().damageHp / $gamePlayer.battler().mhp;
		this.shortcutGauge.bitmap.blt( 
			ImageManager.loadSystem('actorGauge_hp'),
			0,0, //切割坐标
			SSMBS_Window_KeysShortcut.hpWidth ,SSMBS_Window_KeysShortcut.hpHeight,//切割尺寸
			SSMBS_Window_KeysShortcut.hpX, SSMBS_Window_KeysShortcut.hpY,// 绘制坐标
			SSMBS_Window_KeysShortcut.hpWidth*rateHp ,SSMBS_Window_KeysShortcut.hpHeight //最终大小
		)
		this.shortcutGauge.bitmap.fillRect(SSMBS_Window_KeysShortcut.hpX+SSMBS_Window_KeysShortcut.hpWidth*rateHp , SSMBS_Window_KeysShortcut.hpY , SSMBS_Window_KeysShortcut.hpWidth*rateDamageHp , SSMBS_Window_KeysShortcut.hpHeight ,'#FFFFFF');
		this.shortcutGauge.bitmap.drawText( Math.round($gamePlayer.battler()._hp)+'/'+$gamePlayer.battler().mhp,SSMBS_Window_KeysShortcut.hpX,SSMBS_Window_KeysShortcut.hpY,SSMBS_Window_KeysShortcut.hpWidth,SSMBS_Window_KeysShortcut.hpHeight,'center' );
		if($gamePlayer.battler().hrg>0){
			this.shortcutGauge.bitmap.drawText( '(+'+Math.floor($gamePlayer.battler().hrg*100)+') ',SSMBS_Window_KeysShortcut.hpX,SSMBS_Window_KeysShortcut.hpY,SSMBS_Window_KeysShortcut.hpWidth,SSMBS_Window_KeysShortcut.hpHeight,'right' );
		}
		if($gamePlayer.battler().hrg<0){
			this.shortcutGauge.bitmap.drawText( Math.floor($gamePlayer.battler().hrg*100)+') ',SSMBS_Window_KeysShortcut.hpX,SSMBS_Window_KeysShortcut.hpY,SSMBS_Window_KeysShortcut.hpWidth,SSMBS_Window_KeysShortcut.hpHeight,'right' );
		}
	}
	
	let rateMp = $gamePlayer.battler()._mp/$gamePlayer.battler().mmp;
	if(rateMp>0){
		var rateDamageMp = $gamePlayer.battler().damageMp / $gamePlayer.battler().mmp;
		this.shortcutGauge.bitmap.blt( 
			ImageManager.loadSystem('actorGauge_mp'),
			0,0, //切割坐标
			SSMBS_Window_KeysShortcut.mpWidth ,SSMBS_Window_KeysShortcut.mpHeight,//切割尺寸
			SSMBS_Window_KeysShortcut.mpX, SSMBS_Window_KeysShortcut.mpY,// 绘制坐标
			SSMBS_Window_KeysShortcut.mpWidth*rateMp ,SSMBS_Window_KeysShortcut.mpHeight //最终大小
		)
	}
	this.shortcutGauge.bitmap.fillRect(SSMBS_Window_KeysShortcut.mpX+SSMBS_Window_KeysShortcut.hpWidth*rateMp , SSMBS_Window_KeysShortcut.mpY , SSMBS_Window_KeysShortcut.hpWidth*rateDamageMp , SSMBS_Window_KeysShortcut.mpHeight ,'#FFFFFF');
	this.shortcutGauge.bitmap.drawText( Math.round($gamePlayer.battler()._mp)+'/'+$gamePlayer.battler().mmp,SSMBS_Window_KeysShortcut.mpX,SSMBS_Window_KeysShortcut.mpY,SSMBS_Window_KeysShortcut.mpWidth,SSMBS_Window_KeysShortcut.mpHeight,'center' );
	if($gamePlayer.battler().mrg>0){
		this.shortcutGauge.bitmap.drawText( '(+'+Math.floor($gamePlayer.battler().mrg*100)+') ',SSMBS_Window_KeysShortcut.mpX,SSMBS_Window_KeysShortcut.mpY,SSMBS_Window_KeysShortcut.mpWidth,SSMBS_Window_KeysShortcut.mpHeight,'right' );
	}
	if($gamePlayer.battler().mrg<0){
		this.shortcutGauge.bitmap.drawText( Math.floor($gamePlayer.battler().mrg*100)+') ',SSMBS_Window_KeysShortcut.mpX,SSMBS_Window_KeysShortcut.mpY,SSMBS_Window_KeysShortcut.mpWidth,SSMBS_Window_KeysShortcut.mpHeight,'right' );
	}
	let rateExp = ($gamePlayer.battler().currentExp() - $gamePlayer.battler().currentLevelExp()) / ($gamePlayer.battler().nextLevelExp() - $gamePlayer.battler().currentLevelExp());
	if(rateExp>0){
		this.shortcutGauge.bitmap.blt( 
			ImageManager.loadSystem('actorGauge_exp'),
			0,0, //切割坐标
			SSMBS_Window_KeysShortcut.expWidth ,SSMBS_Window_KeysShortcut.expHeight,//切割尺寸
			SSMBS_Window_KeysShortcut.expX, SSMBS_Window_KeysShortcut.expY,// 绘制坐标
			SSMBS_Window_KeysShortcut.expWidth*rateExp ,SSMBS_Window_KeysShortcut.expHeight //最终大小
		)
	}
	
	for(let s = 0 ; s < $gameParty.members()[0].states().length ; s ++){
		let state = $gameParty.members()[0].states()[s];
		let iconPos = 0;
		let showX = SSMBS_Window_KeysShortcut.hpX+iconPos*32;
		let showY = 18;
		let size = 24;
		let informationWidth = 400;
		if(state.iconIndex>0 && !state.meta.hide){
			iconPos++;
			this.shortcutGaugeStates.bitmap.blt( 
				ImageManager.loadSystem('IconSet'),
				Number(state.iconIndex)% 16*32,	Math.floor(Number(state.iconIndex) / 16)*32, //切割坐标
				32 ,32,//切割尺寸
				showX, showY,// 绘制坐标
				size ,size //最终大小
			)
			this.shortcutGaugeStates.bitmap.drawText(ssmbsBasic.convertNumber($gamePlayer.battler()._stateTurns[Number(state.id)],'second'),showX,showY,size,size,'center');
			let stX = showX + this.shortcutGaugeStates.x;
			let stY = showY + this.shortcutGaugeStates.y;
			let edX = stX+size;
			let edY = stY+size;
			if(ssmbsBasic.isTouching(stX,stY,edX,edY)){
				let line = 0;
				let lineHeight=SSMBS_Window_KeysShortcut.statesInformationFontSize+2;
				let textAll = $dataStates[state.id].meta.desc;
				let showInformationY = 48;
				if(textAll){
					for( let t = textAll.split('\n').length ; t > 0 ; t -- ){
						if(textAll.split('\n')[t]!=undefined){
							this.stateInformation.bitmap.drawText(textAll.split('\n')[t],stX-informationWidth/2+size/2,stY-line*lineHeight-showInformationY,informationWidth,(textAll.split('\n').length+2)*lineHeight,'center');
							line++
						}
					}
					this.stateInformation.bitmap.drawText(state.name,stX-informationWidth/2+size/2,stY-line*lineHeight-showInformationY,informationWidth,(textAll.split('\n').length+2)*lineHeight,'center');
				}
			}
		}
	}
	this.hintForLVPoint.x = SSMBS_Window_KeysShortcut.hintForLV_X;
	this.hintForLVPoint.y = SSMBS_Window_KeysShortcut.hintForLV_Y;
	this.hintForSkillPoint.x = SSMBS_Window_KeysShortcut.hintForSkill_X;
	this.hintForSkillPoint.y = SSMBS_Window_KeysShortcut.hintForSkill_Y;
	this.hintForLVPoint.bitmap.blt( 
		ImageManager.loadSystem('paramPointsHint'),
		0,0, //切割坐标
		SSMBS_Window_KeysShortcut.hintForLVWidth ,SSMBS_Window_KeysShortcut.hintForLVHeigth,//切割尺寸
		0, 0,// 绘制坐标
		SSMBS_Window_KeysShortcut.hintForLVWidth ,SSMBS_Window_KeysShortcut.hintForLVHeigth //最终大小
	)
	this.hintForSkillPoint.bitmap.blt( 
		ImageManager.loadSystem('skillPointsHint'),
		0,0, //切割坐标
		SSMBS_Window_KeysShortcut.hintForLVWidth ,SSMBS_Window_KeysShortcut.hintForLVHeigth,//切割尺寸
		0, 0,// 绘制坐标
		SSMBS_Window_KeysShortcut.hintForLVWidth ,SSMBS_Window_KeysShortcut.hintForLVHeigth //最终大小
	)
	if(SSMBS_Window_KeysShortcut.hideAll === true){
		this.hintForLVPoint.opacity = 0;
		this.hintForSkillPoint.opacity = 0;
	}else{
		if($gameParty.members()[0].paramPoints>0){
			this.hintForLVPoint.opacity+=20;
		}else{
			this.hintForLVPoint.opacity-=20;
		}
		if($gameParty.members()[0].skillPoints>0){
			this.hintForSkillPoint.opacity+=20;
		}else{
			this.hintForSkillPoint.opacity-=20;
		}
	}
	
	let lv_stx = this.hintForLVPoint.x;
	let lv_sty = this.hintForLVPoint.y;
	let lv_edx = lv_stx+SSMBS_Window_KeysShortcut.hintForLVWidth;
	let lv_edy = lv_sty+SSMBS_Window_KeysShortcut.hintForLVHeigth;
	if($gameParty.members()[0].paramPoints>0 && ssmbsBasic.isTouching(lv_stx,lv_sty,lv_edx,lv_edy)){
		this.hintForLVPoint.opacity = 200;
		$gamePlayer.battler()._tp = 99;
		if(TouchInput.isClicked()){
			SoundManager.playCursor();
			SSMBS_Window_Equip.isOpen = true;
		}
	}
	let skill_stx = this.hintForSkillPoint.x;
	let skill_sty = this.hintForSkillPoint.y;
	let skill_edx = skill_stx+SSMBS_Window_KeysShortcut.hintForLVWidth;
	let skill_edy = skill_sty+SSMBS_Window_KeysShortcut.hintForLVHeigth;
	if($gameParty.members()[0].skillPoints>0 && ssmbsBasic.isTouching(skill_stx,skill_sty,skill_edx,skill_edy)){
		this.hintForSkillPoint.opacity = 200;
		$gamePlayer.battler()._tp = 99;
		if(TouchInput.isClicked()){
			SoundManager.playCursor();
			SSMBS_Window_Skills.isOpen = true;
		}
	}
};

Scene_Map.prototype.refreshKeysGirds = function(){
	this.keysGeneral.x = Graphics.width/2 - SSMBS_Window_KeysShortcut.width/2;
	this.keysGeneral.y = Graphics.height-48;
	this.keysIcons.x = this.keysGeneral.x;
	this.keysIcons.y = this.keysGeneral.y;
	this.keysIconsOvarlayer.x = this.keysGeneral.x;
	this.keysIconsOvarlayer.y = this.keysGeneral.y;
	this.keysIconsTexts.x = this.keysGeneral.x;
	this.keysIconsTexts.y = this.keysGeneral.y;
	this.keysGeneral.bitmap.clear();
	this.keysIcons.bitmap.clear();
	this.keysIconsOvarlayer.bitmap.clear();
	this.keysIconsTexts.bitmap.clear();
	this.keysIconsTexts.bitmap.fontFace = $gameSystem.mainFontFace();
	this.keysIconsTexts.fontSize = SSMBS_Window_KeysShortcut.defaultFontSize;
	//绘制图标
	for( let i = 0 ; i < SSMBS_Window_KeysShortcut.keysAmount ; i ++ ){
		//键位
		if(!this.mobileMode){
			this.keysIconsTexts.bitmap.fontSize = SSMBS_Window_KeysShortcut.defaultFontSize;
			this.keysIconsTexts.bitmap.fontBold = true;
			this.keysIconsTexts.bitmap.drawText( $gameParty.triggerKeys[i].toUpperCase(),i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace)+2, 2, SSMBS_Window_KeysShortcut.defaultFontSize, SSMBS_Window_KeysShortcut.defaultFontSize,'left' );
			this.keysIconsTexts.bitmap.fontBold = false;
		}
		
		//绘制格子背景
		this.keysGeneral.bitmap.fillRect( i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), 0, SSMBS_Window_KeysShortcut.gridSize, SSMBS_Window_KeysShortcut.gridSize, '#000000' );
		if( $gameParty.shortcutGirdItems[i]){
			// 图标背景
			let item = $gameParty.shortcutGirdItems[i];
			if(item.meta.bkgIcon){
				var bkgIcon = Number(item.meta.bkgIcon)
			}else{
				for( color in sxlSimpleItemList.rareColorIcon){
					if(Number(item.meta.textColor) == sxlSimpleItemList.rareColor[color]){
						var bkgIcon = sxlSimpleItemList.rareColorIcon[color];
					}
					if(!item.meta.textColor){
						var bkgIcon = sxlSimpleItemList.rareColorIcon[0];
					}
				}
			}
			this.keysIcons.bitmap.blt(
				ImageManager.loadSystem('IconSet'),
				Number(bkgIcon)% 16*32,
				Math.floor(Number(bkgIcon) / 16)*32, //切割坐标
				32,	32,//切割尺寸
				SSMBS_Window_KeysShortcut.positions[i].x, 
				SSMBS_Window_KeysShortcut.positions[i].y,// 绘制坐标
				SSMBS_Window_KeysShortcut.gridSize, SSMBS_Window_KeysShortcut.gridSize //最终大小
			)
			//图标
			this.keysIcons.bitmap.blt(
				ImageManager.loadSystem('IconSet'),
				$gameParty.shortcutGirdItems[i].iconIndex % 16*32,Math.floor($gameParty.shortcutGirdItems[i].iconIndex / 16)*32, //切割坐标
				32,	32,//切割尺寸
				SSMBS_Window_KeysShortcut.positions[i].x, 
				SSMBS_Window_KeysShortcut.positions[i].y,// 绘制坐标
				SSMBS_Window_KeysShortcut.gridSize,
				SSMBS_Window_KeysShortcut.gridSize //最终大小
			)
			if($gameParty.shortcutGirdItems[i].meta.iconUpperLayer){
				this.keysIcons.bitmap.blt(
					ImageManager.loadSystem('IconSet'),
					Number($gameParty.shortcutGirdItems[i].meta.iconUpperLayer) % 16*32,Math.floor(Number($gameParty.shortcutGirdItems[i].meta.iconUpperLayer) / 16)*32, //切割坐标
					32,	32,//切割尺寸
					SSMBS_Window_KeysShortcut.positions[i].x, 
					SSMBS_Window_KeysShortcut.positions[i].y,// 绘制坐标
					SSMBS_Window_KeysShortcut.gridSize,
					SSMBS_Window_KeysShortcut.gridSize //最终大小
				)
			}
			//右键图标
			if(i == $gamePlayer.rightClickShortCut){
				this.keysIcons.bitmap.blt(
					ImageManager.loadSystem('mouseRight'),
					0,0, //切割坐标
					32,	32,//切割尺寸
					SSMBS_Window_KeysShortcut.positions[i].x, 
					SSMBS_Window_KeysShortcut.positions[i].y,// 绘制坐标
					SSMBS_Window_KeysShortcut.gridSize,
					SSMBS_Window_KeysShortcut.gridSize //最终大小
				)
			}
			//耐久
			if( sxlSimpleItemList.durabilityAllowed && item.etypeId && !item.meta.unbreakable ){
				let type = item.wtypeId?$gameParty.durabilityWeapons:$gameParty.durabilityArmors;
				let maxDura = item.meta.durability?Number(item.meta.durability):100;
				this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(24);
				if(Math.round((type[item.id-1]/maxDura)*100)<20){
					this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(25);
				}
				this.keysIconsTexts.bitmap.fontSize = SSMBS_Window_KeysShortcut.defaultFontSize-2;
				this.keysIconsTexts.bitmap.drawText(
				Math.round((type[item.id-1]/maxDura)*100)+'%',
				i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), 
				(SSMBS_Window_KeysShortcut.gridSize - SSMBS_Window_KeysShortcut.defaultFontSize),
				SSMBS_Window_KeysShortcut.gridSize,
				SSMBS_Window_KeysShortcut.defaultFontSize,
				'center'
				)
				this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(0);
			}
			if(item.mpCost>0&&item.meta.hpCost){
				this.keysIconsTexts.bitmap.fontSize = SSMBS_Window_KeysShortcut.defaultFontSize-2;
				let hpCost =  Number($gameParty.shortcutGirdItems[i].meta.hpCost);
				if($gameParty.shortcutGirdItems[i].meta.slvEffectHpCost){
					hpCost-=Number($gameParty.shortcutGirdItems[i].meta.slvEffectHpCost);
				}
				hpCost=hpCost.clamp(0,Infinity);
				hpCost=Math.round(hpCost);
				this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(2);
				this.keysIconsTexts.bitmap.drawText(
					hpCost,
					i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace)-0.5, 
					(SSMBS_Window_KeysShortcut.gridSize - SSMBS_Window_KeysShortcut.defaultFontSize),
					SSMBS_Window_KeysShortcut.gridSize/2,
					SSMBS_Window_KeysShortcut.defaultFontSize,
					'right'
					)
				this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(0);
				let mpCost =  $gameParty.shortcutGirdItems[i].mpCost*$gamePlayer.battler().mcr;
				if($gameParty.shortcutGirdItems[i].meta.slvEffectMpCost){
					mpCost-=Number($gameParty.shortcutGirdItems[i].meta.slvEffectMpCost);
				}
				mpCost=mpCost.clamp(0,Infinity);
				mpCost=Math.round(mpCost);
				this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(4);
				this.keysIconsTexts.bitmap.drawText(
					hpCost,
					i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace)+SSMBS_Window_KeysShortcut.gridSize/2+0.5, 
					(SSMBS_Window_KeysShortcut.gridSize - SSMBS_Window_KeysShortcut.defaultFontSize),
					SSMBS_Window_KeysShortcut.gridSize/2,
					SSMBS_Window_KeysShortcut.defaultFontSize,
					'left'
					)
				
				if( ($gamePlayer.battler().mp<mpCost && $gameParty.triggerKeysCooldown[i]<=0)||$gamePlayer.battler().hp<hpCost && $gameParty.triggerKeysCooldown[i]<=0 ){
					this.keysIconsOvarlayer.bitmap.fillRect( i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), SSMBS_Window_KeysShortcut.gridSize, SSMBS_Window_KeysShortcut.gridSize, -SSMBS_Window_KeysShortcut.gridSize, ColorManager.textColor(7));
				}
				this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(0);
			}else{
				//蓝耗
				if(item.mpCost>0){
					this.keysIconsTexts.bitmap.fontSize = SSMBS_Window_KeysShortcut.defaultFontSize-2;
					let mpCost =  $gameParty.shortcutGirdItems[i].mpCost*$gamePlayer.battler().mcr;
					if($gameParty.shortcutGirdItems[i].meta.slvEffectMpCost){
						mpCost-=Number($gameParty.shortcutGirdItems[i].meta.slvEffectMpCost);
					}
					mpCost=mpCost.clamp(0,Infinity);
					mpCost=Math.round(mpCost);
					this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(4);
					this.keysIconsTexts.bitmap.drawText(
					mpCost,
					i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), 
					(SSMBS_Window_KeysShortcut.gridSize - SSMBS_Window_KeysShortcut.defaultFontSize),
					SSMBS_Window_KeysShortcut.gridSize,
					SSMBS_Window_KeysShortcut.defaultFontSize,
					'center'
					)
					this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(0);
					if( $gamePlayer.battler().mp<mpCost && $gameParty.triggerKeysCooldown[i]<=0 ){
						this.keysIconsOvarlayer.bitmap.fillRect( i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), SSMBS_Window_KeysShortcut.gridSize, SSMBS_Window_KeysShortcut.gridSize, -SSMBS_Window_KeysShortcut.gridSize, ColorManager.textColor(7));
					}
				}
				//血耗
				if(item.meta.hpCost){
					this.keysIconsTexts.bitmap.fontSize = SSMBS_Window_KeysShortcut.defaultFontSize-2;
					let hpCost =  Number($gameParty.shortcutGirdItems[i].meta.hpCost);
					if($gameParty.shortcutGirdItems[i].meta.slvEffectHpCost){
						hpCost-=Number($gameParty.shortcutGirdItems[i].meta.slvEffectHpCost);
					}
					hpCost=hpCost.clamp(0,Infinity);
					hpCost=Math.round(hpCost);
					this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(2);
					this.keysIconsTexts.bitmap.drawText(
					hpCost,
					i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), 
					(SSMBS_Window_KeysShortcut.gridSize - SSMBS_Window_KeysShortcut.defaultFontSize),
					SSMBS_Window_KeysShortcut.gridSize,
					SSMBS_Window_KeysShortcut.defaultFontSize,
					'center'
					)
					this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(0);
					if( $gamePlayer.battler().hp<hpCost && $gameParty.triggerKeysCooldown[i]<=0 ){
						this.keysIconsOvarlayer.bitmap.fillRect( i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), SSMBS_Window_KeysShortcut.gridSize, SSMBS_Window_KeysShortcut.gridSize, -SSMBS_Window_KeysShortcut.gridSize, ColorManager.textColor(7));
					}
				}
			}
			
			
			//数量
			if(item.itypeId>0){
				this.keysIconsTexts.bitmap.fontSize = SSMBS_Window_KeysShortcut.defaultFontSize-2;
				let amount =  $gameParty.numItems(item);
				this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(0);
				this.keysIconsTexts.bitmap.drawText(
				'x'+amount,
				i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), 
				(SSMBS_Window_KeysShortcut.gridSize - SSMBS_Window_KeysShortcut.defaultFontSize),
				SSMBS_Window_KeysShortcut.gridSize,
				SSMBS_Window_KeysShortcut.defaultFontSize,
				'right'
				)
				this.keysIconsTexts.bitmap.textColor = ColorManager.textColor(0);
			}
			//冷却
			if($gameParty.triggerKeysCooldown[i]>0){
				let maxCD = $gameParty.shortcutGirdItems[i].meta.cooldown?Number($gameParty.shortcutGirdItems[i].meta.cooldown):30;
				let rateCD = $gameParty.triggerKeysCooldown[i]/maxCD
				this.keysIconsOvarlayer.bitmap.fillRect( i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), SSMBS_Window_KeysShortcut.gridSize, SSMBS_Window_KeysShortcut.gridSize, -SSMBS_Window_KeysShortcut.gridSize*rateCD, '#000000' );
				this.keysIconsOvarlayer.bitmap.textColor = ColorManager.textColor(17);
				this.keysIconsOvarlayer.bitmap.fontSize += 6;
				this.keysIconsOvarlayer.bitmap.fontBold = true;
				this.keysIconsOvarlayer.bitmap.drawText(
				ssmbsBasic.convertNumber($gameParty.triggerKeysCooldown[i],'second'),
				i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), 
				0,
				SSMBS_Window_KeysShortcut.gridSize,
				SSMBS_Window_KeysShortcut.gridSize,
				'center'
				)
				this.keysIconsOvarlayer.bitmap.fontSize -= 6;
				this.keysIconsOvarlayer.bitmap.fontBold = false;
				this.keysIconsOvarlayer.bitmap.textColor = ColorManager.textColor(0);
			}
		}
	}
	//绑定格子
	for( let i = 0 ; i < SSMBS_Window_KeysShortcut.keysAmount ; i ++ ){
		let stX = this.keysGeneral.x + SSMBS_Window_KeysShortcut.positions[i].x;
		let stY = this.keysGeneral.y + SSMBS_Window_KeysShortcut.positions[i].y;
		let edX = stX + SSMBS_Window_KeysShortcut.gridSize;
		let edY = stY + SSMBS_Window_KeysShortcut.gridSize;
		let mobileControl = this.mobileMode&&ssmbsBasic.isTouching(stX,stY,edX,edY)&&TouchInput.isTriggered();
		//使用快捷栏
		if((Input.isTriggered($gameParty.triggerKeys[i]) || mobileControl) && $gameParty.shortcutGirdItems[i]&&$gameParty.triggerKeysCooldown[i]<=0&&SSMBS_Window_Option.changeKeyMode.state==false){
			$gameParty.lastUsedKeyShortcut = i;
			if( $gameParty.shortcutGirdItems[i].stypeId ){
				let mpCost =  $gameParty.shortcutGirdItems[i].mpCost*$gamePlayer.battler().mcr;
				if($gameParty.shortcutGirdItems[i].meta.slvEffectMpCost){
					mpCost-=Number($gameParty.shortcutGirdItems[i].meta.slvEffectMpCost);
				}
				mpCost=mpCost.clamp(0,Infinity);
				if($gamePlayer.battler()._mp>=mpCost && ($gamePlayer._jumpCount<=0||$gameParty.shortcutGirdItems[i].meta.jumpingSkill)){
					sxlSimpleABS.useSkill($gameParty.shortcutGirdItems[i],$gamePlayer);
				};
			}
			if( $gameParty.shortcutGirdItems[i].itypeId || $gameParty.shortcutGirdItems[i].etypeId ){
				let store;
				if( $gameParty.shortcutGirdItems[i].etypeId && $gamePlayer.battler().canEquip($gameParty.shortcutGirdItems[i]) ){
					store = $gamePlayer.battler().equips()[$gameParty.shortcutGirdItems[i].etypeId - 1] ;
				}
				sxlSimpleABS.useItem($gameParty.shortcutGirdItems[i],$gamePlayer);
				if(store){
					if(store.meta.hide){
						$gameParty.shortcutGirdItems[i] = null;
					}else{
						$gameParty.shortcutGirdItems[i] = store;
					}
					
					store = null;
				}
				
			}
		}
		//触摸格子
		if(ssmbsBasic.isTouching(stX,stY,edX,edY)){
			//高亮触摸格子
			this.keysGeneral.bitmap.fillRect( i*(SSMBS_Window_KeysShortcut.gridSize + SSMBS_Window_KeysShortcut.keySpace), 0, SSMBS_Window_KeysShortcut.gridSize, SSMBS_Window_KeysShortcut.gridSize, '#aaaaaa' );
			//正在触碰格子
			this.isTouchingKeysShortcut = true;
			if(!this.isDrawing){
				this.itemInform = $gameParty.shortcutGirdItems[i];
			}
			if(TouchInput.isPressed()  && !this.nowPickedItem && !this.isDrawing ){
				this.isDrawing = true;
				this.nowPickedItem =  $gameParty.shortcutGirdItems[i];
				this.touchIcon.item = this.nowPickedItem;
				this.isHandledItem = this.touchIcon;
				this.item = this.nowPickedItem;
				this.itemTypeDrawing = 'shortCut';
			}
			if(TouchInput.isCancelled()  && !this.nowPickedItem && !this.isDrawing ){
				SoundManager.playCursor();
				$gamePlayer.rightClickShortCut = i;
			}
			if( this.touchIcon.item && TouchInput.isReleased() ){
				SoundManager.playEquip();
				//替换
				for( let j = 0 ; j < SSMBS_Window_KeysShortcut.keysAmount ; j ++ ){
					SSMBS_Window_KeysShortcut.changeAllowed = true;
					if($gameParty.shortcutGirdItems[j]==this.touchIcon.item){
						if( $gameParty.triggerKeysCooldown[j] <=0 && 
							$gameParty.triggerKeysCooldown[i]<=0){
							$gameParty.shortcutGirdItems[j] = null;
							SSMBS_Window_KeysShortcut.changeAllowed = true;
							break;
						}else{
							SSMBS_Window_KeysShortcut.changeAllowed = false;
						}
						
					};
				};
				if(SSMBS_Window_KeysShortcut.changeAllowed&&$gameParty.triggerKeysCooldown[i]<=0&&!this.touchIcon.item.meta.noShortcut){
					$gameParty.shortcutGirdItems[i] = this.touchIcon.item;
				}
			}
		}
		if($gameParty.shortcutGirdItems[i] && $gameParty.shortcutGirdItems[i].stypeId){
			if($gamePlayer.battler().skills().indexOf($dataSkills[$gameParty.shortcutGirdItems[i].id])<=-1){
				$gameParty.shortcutGirdItems[i] = null;
			}
		}
	};
	
	//清空单个快捷键
	if( this.isDrawing&&this.nowPickedItem&&this.itemTypeDrawing == 'shortCut'&&
		!ssmbsBasic.isTouching( this.keysGeneral.x-24,
								this.keysGeneral.y-24,
								this.keysGeneral.x+SSMBS_Window_KeysShortcut.width+24,
								this.keysGeneral.y+SSMBS_Window_KeysShortcut.height+24))
	{
		for( let j = 0 ; j < SSMBS_Window_KeysShortcut.keysAmount ; j ++ ){
			this.isDrawing = false;
			if($gameParty.shortcutGirdItems[j]==this.nowPickedItem){
				$gameParty.shortcutGirdItems[j] = null;
				if(TouchInput.isReleased()){
					SoundManager.playMiss();
				}
			};
		};
	};
};