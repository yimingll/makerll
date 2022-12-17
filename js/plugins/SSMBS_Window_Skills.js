//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - Skill Window
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 简单的技能窗口
 * @author 神仙狼
 *	
 * @help
 * $gamePlayer.battler().resetSkillPoints() 重置技能点数
 * $gamePlayer.battler().skillPoints 调取角色技能点数（加减技能点直接操作）;
 * 
 * 装备增加技能等级请在装备备注中输入，例如：
 * //(5号技能等级+20，6号技能等级+200)
 * 
 * //普通技能属性----------------------------
 * <slvEffectRush:1> //每等级增加1冲刺距离
 * <slvEffectHitBack:1> // 每等级增加1击退距离
 * <slvEffectHitHeight:0.2> //每级提升击飞高度
 * <slvEffectSpeed:3>//每等级提升速度
 * <slvEffectWaitSpell:1>  //技能等级影响waitSpell序列
 * <slvEffecParticleAmount:0.5> //每级提升0.5弹道数量,仅算整数
 * <slvEffectAngleAdjust:45> //每个弹道的角度间隔
 * //召唤生物属性----------------------------
 * <levelToHP:100> // 每技能等级生命
 * <levelToATK:10> // 每技能等级物理攻击力
 * <levelToDEF:10> // 每技能等级物理防御力
 * <levelToMAT:10> // 每技能等级魔法攻击力
 * <levelToMDF:10> // 每技能等级魔法攻击力
 * <levelToAGI:10> // 每技能等级敏捷
 * <levelToLUK:10> // 每技能等级幸运
 * <levelToAliveTime:60>//每技能等级时长（单位：帧）
 * 
 */



var SSMBS_Window_Skills = SSMBS_Window_Skills||{};

SSMBS_Window_Skills.hotkey = 'k';

SSMBS_Window_Skills.titleFontSize = 16;
SSMBS_Window_Skills.windowTitle = '技 能'+' ( '+SSMBS_Window_Skills.hotkey.toUpperCase()+' ) ';

SSMBS_Window_Skills.width = 298;
SSMBS_Window_Skills.height = 498;

SSMBS_Window_Skills.defaultX = 800;
SSMBS_Window_Skills.defaultY = 100;

SSMBS_Window_Skills.defaultGainSKPLevel = 1;

SSMBS_Window_Skills.fontSize = 12;
SSMBS_Window_Skills.startX = 96;
SSMBS_Window_Skills.wordStartX = 18;
SSMBS_Window_Skills.startY = 48;
SSMBS_Window_Skills.wordStartY = SSMBS_Window_Skills.height-SSMBS_Window_Skills.fontSize*3;;
SSMBS_Window_Skills.gridsSize = 32;
SSMBS_Window_Skills.gridsSpace = 18;
SSMBS_Window_Skills.gridsPerLine = 4;
SSMBS_Window_Skills.gridsLines = 12;

SSMBS_Window_Skills.SkillListButtonLine = 11.13;
SSMBS_Window_Skills.wordStartY = SSMBS_Window_Skills.SkillListButtonLine*SSMBS_Window_Skills.fontSize*3+SSMBS_Window_Skills.startY+6;
SSMBS_Window_Skills.SkillListSpace = 40;
SSMBS_Window_Skills.SkillListFirst = 0;

SSMBS_Window_Skills.drawWindowY = 32;

SSMBS_Window_Skills.nowSkillTree = 0;


const _SSMBS_Window_Skills_mapLoad = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_SSMBS_Window_Skills_mapLoad.call(this);
	this.createSkillWindow();
	SSMBS_Window_Skills.isOpen = false;
	for(i = 0 ; i < $gameParty.members().length ; i ++ ){
		this.loadSkillLevel($gameParty.members()[i]);
	};
	for(let i = 0 ; i < $gameParty.members().length ; i ++ ){
		if(!$gameParty.members()[i].usedSKP){
			$gameParty.members()[i].usedSKP = 0;
		}
	}
};

const _SSMBS_Window_Skills_mapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_SSMBS_Window_Skills_mapUpdate.call(this);
	if(SSMBS_Window_Skills.isOpen){
		this.updateSkillWindow();
		this.skillWindow.opacity = 255 ;
		this.skillWindowBlack.opacity = 72;
		this.skillIconBackGround.opacity = 255;
		this.skillIcon.opacity = 255;
		
	}else{
		this.skillWindow.opacity = 0 ;
		this.skillWindowBlack.opacity = 0;
		this.skillIconBackGround.opacity = 0;
		this.skillIcon.opacity = 0;
	}
	if(!SSMBS_Window_Option.changeKeyMode.state  && Input.isTriggered(SSMBS_Window_Skills.hotkey)){
		SoundManager.playCursor();
		SSMBS_Window_Skills.isOpen = !SSMBS_Window_Skills.isOpen;
	}
	if(!SSMBS_Window_Skills.clickCd ){
		SSMBS_Window_Skills.clickCd = 0;
	}
	if(SSMBS_Window_Skills.clickCd > 0 ){
		SSMBS_Window_Skills.clickCd --;
	}
	if(!$gameParty.members()[0].skillPoints){
		$gameParty.members()[0].skillPoints = 0;
	}
	if(TouchInput.isHovered()){
		this.isDrawing = false;
	}
	for(let i = 0 ; i < $gameParty.members()[0].skillLevelsPlus.length ; i ++ ){
		$gameParty.members()[0].skillLevelsPlus[i] = 0;
	}
	this.equipAddSkill();
	this.calcSkillLevel();
	
	
};

Scene_Map.prototype.createSkillWindow = function(){
	this.skillWindow = new Sprite( new Bitmap( SSMBS_Window_Skills.width ,SSMBS_Window_Skills.height ));
	this.addChild(this.skillWindow);
	this.skillWindowBlack = new Sprite( new Bitmap( SSMBS_Window_Skills.width ,SSMBS_Window_Skills.height ));
	this.skillWindowBlack.opacity = 72;
	this.addChild(this.skillWindowBlack);
	this.skillIconBackGround = new Sprite( new Bitmap( SSMBS_Window_Skills.width ,SSMBS_Window_Skills.height ));
	this.skillIconBackGround.setColorTone ([0,0,0,255]);
	this.addChild(this.skillIconBackGround);
	this.skillIcon = new Sprite( new Bitmap( SSMBS_Window_Skills.width ,SSMBS_Window_Skills.height ));
	this.addChild(this.skillIcon);
	this.skillWindow.x = $gameSystem.windowSkillX?$gameSystem.windowSkillX:SSMBS_Window_Skills.defaultX;
	this.skillWindow.y = $gameSystem.windowSkillY?$gameSystem.windowSkillY:SSMBS_Window_Skills.defaultY;
};

Scene_Map.prototype.loadSkillLevel = function( actor ){
	if(!actor.skillLevels){
		actor.skillLevels = [];
		for(let i = 0 ; i < $dataSkills.length ; i ++ ){
			actor.skillLevels.push(0);
		}
	}
	if(!actor.skillLevelsPlus){
		actor.skillLevelsPlus = [];
		for(let i = 0 ; i < $dataSkills.length ; i ++ ){
			actor.skillLevelsPlus.push(0);
		}
	}
	if(!actor.skillLevelsPoints){
		actor.skillLevelsPoints = [];
		for(let i = 0 ; i < $dataSkills.length ; i ++ ){
			actor.skillLevelsPoints.push(0);
		}
	}
};

Scene_Map.prototype.equipAddSkill = function(){
	
	for( let i = 0 ; i < $gameParty.members()[0].equips().length ; i ++ ){
		if($gameParty.members()[0].equips()[i].meta.skillLevel ){
			for(let s = 0 ; s <  $gameParty.members()[0].equips()[i].meta.skillLevel.split(',').length ; s ++ ){
				let skill = Number($gameParty.members()[0].equips()[i].meta.skillLevel.split(',')[s].split('+')[0]);
				let level = Number($gameParty.members()[0].equips()[i].meta.skillLevel.split(',')[s].split('+')[1]);
				$gameParty.members()[0].skillLevelsPlus[skill] += level;
			}
		}
	}
};

Scene_Map.prototype.calcSkillLevel = function(){
	for(let i = 0 ; i < $gameParty.members()[0].skillLevels.length ; i ++ ){
		$gameParty.members()[0].skillLevels[i]=$gameParty.members()[0].skillLevelsPlus[i]+$gameParty.members()[0].skillLevelsPoints[i];
	}
};

Scene_Map.prototype.updateSkillWindow = function(){
	this.skillWindow.bitmap.clear();
	this.skillIconBackGround.bitmap.clear();
	this.skillIcon.bitmap.clear();
	this.skillWindowBlack.bitmap.clear()
	this.skillWindowBlack.x = this.skillWindow.x;
	this.skillWindowBlack.y = this.skillWindow.y;
	this.skillIconBackGround.x = this.skillWindow.x;
	this.skillIconBackGround.y = this.skillWindow.y;
	this.skillIcon.x = this.skillWindow.x;
	this.skillIcon.y = this.skillWindow.y;
	this.skillWindow.bitmap.fontFace = $gameSystem.mainFontFace();
	this.skillWindow.bitmap.blt(
		ImageManager.loadSystem('window_black'),
		0,0, //切割坐标
		SSMBS_Window_Skills.width ,SSMBS_Window_Skills.height,//切割尺寸
		0, 0,// 绘制坐标
		SSMBS_Window_Skills.width ,SSMBS_Window_Skills.height //最终大小
	)
	
	if(ssmbsBasic.isTouching(this.skillWindow.x,this.skillWindow.y,this.skillWindow.x+SSMBS_Window_Skills.width,this.skillWindow.y+SSMBS_Window_Skills.height)){
		this.isTouchingSkillWindow = true;
		$gamePlayer.battler()._tp = 99;
	}else{
		this.isTouchingSkillWindow = false;
	}
	var meta = $dataActors[$gameParty.members()[0]._actorId].meta.skills.concat($dataClasses[$gameParty.members()[0]._classId].meta.skills);
	var metaName = $dataActors[$gameParty.members()[0]._actorId].meta.skillsName.concat($dataClasses[$gameParty.members()[0]._classId].meta.skillsName);
	if($gameParty.members()[0].extraSkillTrees!=undefined){
		meta = meta.concat($gameParty.members()[0].extraSkillTrees);
		metaName = metaName.concat($gameParty.members()[0].extraSkillTreesNames);
	}
	let skillTrees = meta.split('\n');
	let skillTreesName = metaName.split('\n');
	let lineheight = SSMBS_Window_Skills.fontSize*3;
	this.skillWindow.bitmap.fontSize = SSMBS_Window_Skills.titleFontSize;
	this.skillWindow.bitmap.drawText( SSMBS_Window_Skills.windowTitle,0,0,SSMBS_Window_Skills.width,36,'center' );
	this.skillWindow.bitmap.textColor = ColorManager.textColor(0);
	let stX = this.skillWindow.x + SSMBS_Window_Skills.width-32;
	let stY = this.skillWindow.y + SSMBS_Window_Skills.drawWindowY/2-SSMBS_Window_Skills.fontSize/2;
	let edX = stX + SSMBS_Window_Skills.fontSize;
	let edY = stY + SSMBS_Window_Skills.fontSize;
	
	if(ssmbsBasic.isTouching(stX,stY,edX,edY)){
		this.skillWindow.bitmap.textColor = ColorManager.textColor(8);
		if(TouchInput.isClicked()){
			SoundManager.playCursor();
			SSMBS_Window_Skills.isOpen = false;
			SoundManager.playCursor();
		}
	}
	// 关闭窗口
	this.skillWindow.bitmap.drawText( 'x', SSMBS_Window_Skills.width-32,SSMBS_Window_Skills.drawWindowY/2-SSMBS_Window_Skills.fontSize/2 ,SSMBS_Window_Skills.fontSize,SSMBS_Window_Skills.fontSize,'right' )
	this.skillWindow.bitmap.textColor = ColorManager.textColor(0);
	this.skillWindowBlack.bitmap.fillRect( SSMBS_Window_Skills.startX-6,SSMBS_Window_Skills.startY-6, SSMBS_Window_Skills.width-SSMBS_Window_Skills.startX-12+SSMBS_Window_Skills.wordStartX/2,SSMBS_Window_Skills.height-SSMBS_Window_Skills.startY-12,'#000000' );
	if(SSMBS_Window_Skills.nowSkillTree >= 0){
		this.skillWindowBlack.bitmap.fillRect( SSMBS_Window_Skills.wordStartX-6,SSMBS_Window_Skills.startY+SSMBS_Window_Skills.nowSkillTree*lineheight-6, SSMBS_Window_Skills.startX -SSMBS_Window_Skills.wordStartX ,lineheight,'#000000' )
	}else{
		this.skillWindowBlack.bitmap.fillRect( SSMBS_Window_Skills.wordStartX-6,SSMBS_Window_Skills.startY+SSMBS_Window_Skills.SkillListButtonLine*lineheight-6, SSMBS_Window_Skills.startX -SSMBS_Window_Skills.wordStartX ,lineheight,'#000000' )
	}
	//拖动窗口
	if( TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow &&
		TouchInput.x > this.skillWindow.x
		&& TouchInput.x < this.skillWindow.x+SSMBS_Window_Skills.width
		&& TouchInput.y > this.skillWindow.y
		&& TouchInput.y < this.skillWindow.y+SSMBS_Window_Skills.drawWindowY){
		this.isDrawing = true;
		this.drawingWindow = 'skill';
		if(!SSMBS_Window_Skills.xDelta) SSMBS_Window_Skills.xDelta = TouchInput.x - this.skillWindow.x;
		if(!SSMBS_Window_Skills.yDelta) SSMBS_Window_Skills.yDelta = TouchInput.y - this.skillWindow.y;
	}else if (TouchInput.isHovered()) {
		this.isDrawing = false;
		this.drawingWindow = null;
		SSMBS_Window_Skills.xDelta = 0;
		SSMBS_Window_Skills.yDelta = 0;
	}
	if(TouchInput.isPressed() && !this.nowPickedItem && this.drawingWindow == 'skill'){
		this.skillWindow.x += (TouchInput.x - this.skillWindow.x)-SSMBS_Window_Skills.xDelta;
		this.skillWindow.y += (TouchInput.y - this.skillWindow.y)-SSMBS_Window_Skills.yDelta;
		//防止出屏
		if(this.skillWindow.x <= 0 ){
			this.skillWindow.x = 0;
		}
		if(this.skillWindow.y <= 0 ){
			this.skillWindow.y = 0;
		}
		if(this.skillWindow.x + SSMBS_Window_Skills.width >= Graphics.width ){
			this.skillWindow.x = Graphics.width - SSMBS_Window_Skills.width;
		}
		if(this.skillWindow.y + SSMBS_Window_Skills.drawWindowY >= Graphics.height ){
			this.skillWindow.y = Graphics.height - SSMBS_Window_Skills.drawWindowY;
		}
		this.skillWindowBlack.x = this.skillWindow.x;
		this.skillWindowBlack.y = this.skillWindow.y;
		this.skillIconBackGround.x = this.skillWindow.x;
		this.skillIconBackGround.y = this.skillWindow.y;
		this.skillIcon.x = this.skillWindow.x;
		this.skillIcon.y = this.skillWindow.y;
		$gameSystem.windowSkillX = this.skillWindow.x;
		$gameSystem.windowSkillY = this.skillWindow.y;
	}
	// 绘制背景图标
	
	for( let t = 0 ; t < skillTrees.length ; t ++ ){
		this.skillIcon.bitmap.drawText(skillTreesName[t]?skillTreesName[t]:'技能树 '+ t , SSMBS_Window_Skills.wordStartX-6 , SSMBS_Window_Skills.startY+t*lineheight-6, SSMBS_Window_Skills.startX -SSMBS_Window_Skills.wordStartX , lineheight,'center');
		if(ssmbsBasic.isTouching(this.skillWindow.x+SSMBS_Window_Skills.wordStartX,this.skillWindow.y+SSMBS_Window_Skills.startY+t*lineheight-6,this.skillWindow.x+SSMBS_Window_Skills.wordStartX+SSMBS_Window_Skills.startX -SSMBS_Window_Skills.wordStartX ,this.skillWindow.y+SSMBS_Window_Skills.startY+t*lineheight+lineheight)){
			this.skillWindowBlack.bitmap.fillRect( SSMBS_Window_Skills.wordStartX-6,SSMBS_Window_Skills.startY+t*lineheight-6, SSMBS_Window_Skills.startX -SSMBS_Window_Skills.wordStartX ,lineheight,'#ffffff' )
			if(TouchInput.isClicked()){
				SSMBS_Window_Skills.nowSkillTree = t;
			}
		}
	}
	this.skillIcon.bitmap.drawText('技能列表' , SSMBS_Window_Skills.wordStartX-6 , SSMBS_Window_Skills.startY+SSMBS_Window_Skills.SkillListButtonLine*lineheight-6, SSMBS_Window_Skills.startX -SSMBS_Window_Skills.wordStartX , lineheight,'center');
	if(ssmbsBasic.isTouching(this.skillWindow.x+SSMBS_Window_Skills.wordStartX,this.skillWindow.y+SSMBS_Window_Skills.startY+SSMBS_Window_Skills.SkillListButtonLine*lineheight-6,this.skillWindow.x+SSMBS_Window_Skills.wordStartX+SSMBS_Window_Skills.startX -SSMBS_Window_Skills.wordStartX ,this.skillWindow.y+SSMBS_Window_Skills.startY+SSMBS_Window_Skills.SkillListButtonLine*lineheight+lineheight)){
		this.skillWindowBlack.bitmap.fillRect( SSMBS_Window_Skills.wordStartX-6,SSMBS_Window_Skills.startY+SSMBS_Window_Skills.SkillListButtonLine*lineheight-6, SSMBS_Window_Skills.startX -SSMBS_Window_Skills.wordStartX ,lineheight,'#ffffff' )
		if(TouchInput.isClicked()){
			SSMBS_Window_Skills.nowSkillTree = -1;
		}
	}
	if(SSMBS_Window_Skills.nowSkillTree >= 0){
		this.skillIcon.bitmap.drawText( '剩余技能点: '+$gameParty.members()[0].skillPoints,SSMBS_Window_Skills.startX-6,SSMBS_Window_Skills.wordStartY,SSMBS_Window_Skills.width-SSMBS_Window_Skills.startX-12+SSMBS_Window_Skills.wordStartX/2,SSMBS_Window_Skills.fontSize,'center' );
		for( let t = 0 ; t < skillTrees.length ; t ++ ){
			let skills = skillTrees[SSMBS_Window_Skills.nowSkillTree].split(',');
			for( let s = 0 ; s < skills.length ; s ++  ){
				let skill = Number(skills[s]);
				if(skill){ // skill是ID数字
					//描绘技能背景（黑白色）
					this.skillIconBackGround.bitmap.blt(
						ImageManager.loadSystem('IconSet'),
						$dataSkills[ skill ].iconIndex % 16*32,Math.floor($dataSkills[ skill ].iconIndex / 16)*32, //切割坐标
						32,	32,//切割尺寸
						SSMBS_Window_Skills.startX+(s%SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace),
						SSMBS_Window_Skills.startY+Math.floor(s/SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace),// 绘制坐标
						SSMBS_Window_Skills.gridsSize,	SSMBS_Window_Skills.gridsSize //最终大小
					)
					//如果学会技能则覆盖彩色图标
					if($gameParty.members()[0].hasSkill(skill)){
						this.skillIcon.bitmap.blt(
							ImageManager.loadSystem('IconSet'),
							$dataSkills[ skill ].iconIndex % 16*32,Math.floor($dataSkills[ skill ].iconIndex / 16)*32, //切割坐标
							32,	32,//切割尺寸
							SSMBS_Window_Skills.startX+(s%SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace),
							SSMBS_Window_Skills.startY+Math.floor(s/SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace),// 绘制坐标
							SSMBS_Window_Skills.gridsSize,	SSMBS_Window_Skills.gridsSize //最终大小
						)
					}
					if($gameParty.members()[0].skills()[i] && !$gameParty.members()[0].skills()[i].meta.hideInList){
						if($gameParty.members()[0].skills()[i].meta.iconUpperLayer){
							this.skillIcon.bitmap.blt(
								ImageManager.loadSystem('IconSet'),
								Number($gameParty.members()[0].skills()[i].meta.iconUpperLayer) % 16*32,Math.floor(Number($gameParty.members()[0].skills()[i].meta.iconUpperLayer) / 16)*32, //切割坐标
								32,	32,//切割尺寸
								SSMBS_Window_Skills.startX,
								SSMBS_Window_Skills.startY+line*lineHeight,// 绘制坐标
								SSMBS_Window_Skills.gridsSize,	SSMBS_Window_Skills.gridsSize //最终大小
							)
						}
					}
					this.skillIcon.bitmap.fontSize = SSMBS_Window_Skills.fontSize;
					let skillMaxLevel = $dataSkills[ skill ].meta.maxLevel?Number( $dataSkills[ skill ].meta.maxLevel ):1;
					
					let wordX = this.skillWindow.x+SSMBS_Window_Skills.startX+(s%SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace);
					let wordY = this.skillWindow.y+SSMBS_Window_Skills.startY+Math.floor(s/SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace)+SSMBS_Window_Skills.gridsSize;
					let wordMaxX = wordX+SSMBS_Window_Skills.gridsSize;
					let wordMaxY = wordY+SSMBS_Window_Skills.fontSize;
					if(ssmbsBasic.isTouching(wordX,wordY,wordMaxX,wordMaxY)){
						this.skillIcon.bitmap.drawText(
							'学习',
							SSMBS_Window_Skills.startX+(s%SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace),
							SSMBS_Window_Skills.startY+Math.floor(s/SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace)+SSMBS_Window_Skills.gridsSize,// 绘制坐标
							SSMBS_Window_Skills.gridsSize,	SSMBS_Window_Skills.fontSize, //限制长宽
							'center'
						)
						this.skillIcon.bitmap.drawText(
							$gameParty.members()[0].skillLevels[skill]+'/'+skillMaxLevel,
							SSMBS_Window_Skills.startX+(s%SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace),
							SSMBS_Window_Skills.startY+Math.floor(s/SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace)+SSMBS_Window_Skills.gridsSize-SSMBS_Window_Skills.fontSize,// 绘制坐标
							SSMBS_Window_Skills.gridsSize,	SSMBS_Window_Skills.fontSize, //限制长宽
							'center'
						)
						//学习技能
						if(
						($gameParty.members()[0].skillPoints>=(Number($dataSkills[skill].meta.skpCost)? Number($dataSkills[skill].meta.skpCost):1)) && 
						($dataSkills[skill].meta.needlevel? $gameParty.members()[0].level>=Number($dataSkills[skill].meta.needlevel) : true) &&
						($dataSkills[skill].meta.needSkill? $gameParty.members()[0].hasSkill(Number($dataSkills[skill].meta.needSkill)) : true)
						){
							let skpCost = $dataSkills[skill].meta.skpCost?Number($dataSkills[skill].meta.skpCost):1;
							if(TouchInput.isClicked() && SSMBS_Window_Skills.clickCd == 0){
								if( $gameParty.members()[0].skillLevelsPoints[skill] < skillMaxLevel ){
									$gameParty.members()[0].skillLevelsPoints[skill]+=1;
									$gameParty.members()[0].skillPoints-=skpCost;
									$gameParty.members()[0].usedSKP += skpCost;
									SSMBS_Window_Skills.clickCd = 1;
								}
								if( $gameParty.members()[0].skillLevelsPoints[skill]>0&&
									!$gameParty.members()[0].hasSkill(skill)){
									$gameParty.members()[0].learnSkill(skill);
								}
							}
						}
					}else{
						this.skillIcon.bitmap.drawText(
							$gameParty.members()[0].skillLevels[skill]+'/'+skillMaxLevel,
							SSMBS_Window_Skills.startX+(s%SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace),
							SSMBS_Window_Skills.startY+Math.floor(s/SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace)+SSMBS_Window_Skills.gridsSize,// 绘制坐标
							SSMBS_Window_Skills.gridsSize,	SSMBS_Window_Skills.fontSize, //限制长宽
							'center'
						)
					}
					//判断鼠标触碰技能
					let theX = this.skillWindow.x+SSMBS_Window_Skills.startX+(s%SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace);
					let theY = this.skillWindow.y+SSMBS_Window_Skills.startY+Math.floor(s/SSMBS_Window_Skills.gridsPerLine)*(SSMBS_Window_Skills.gridsSize+SSMBS_Window_Skills.gridsSpace);
					if( ssmbsBasic.isTouching(theX,theY,theX+SSMBS_Window_Skills.gridsSize,theY+SSMBS_Window_Skills.gridsSize)  ){
						if(!this.isDrawing){
							this.itemInform = $dataSkills[ skill ];
						}
						if($gameParty.members()[0].hasSkill(skill) && TouchInput.isPressed() && !this.nowPickedItem && !this.isDrawing && !$dataSkills[skill].meta.passive){
							this.isDrawing = true;
							this.nowPickedItem = $dataSkills[ skill ];
							this.touchIcon.item = $dataSkills[ skill ];
							this.isHandledItem = this.touchIcon;
							this.item = this.touchIcon.item;
							this.itemTypeDrawing = 'skill';
							this.isDrawingItem = true;
						}
					}
				}
			}
		};
	}else{
		let theX = this.skillWindow.x+SSMBS_Window_Skills.startX;
		let theY = this.skillWindow.y+SSMBS_Window_Skills.startY;
		let maxX = theX+SSMBS_Window_Skills.width-6-SSMBS_Window_Skills.startX;
		let maxY = theX+SSMBS_Window_Skills.height-6;
		this.skillIcon.bitmap.drawText( '当前条目: '+(SSMBS_Window_Skills.SkillListFirst+1),SSMBS_Window_Skills.startX-6,SSMBS_Window_Skills.wordStartY,SSMBS_Window_Skills.width-SSMBS_Window_Skills.startX-12+SSMBS_Window_Skills.wordStartX/2,SSMBS_Window_Skills.fontSize,'center' );
		if( ssmbsBasic.isTouching(theX,theY,maxX,maxY) ){
			if(TouchInput.wheelY < 0 && SSMBS_Window_Skills.SkillListFirst>0){
				SSMBS_Window_Skills.SkillListFirst -= 1;
			}
			if(TouchInput.wheelY > 0 ){
				SSMBS_Window_Skills.SkillListFirst ++;
			}
		}
		if( $gameParty.members()[0].skills().length>0 ){
			let line = 0 ;
			let lineHeight = SSMBS_Window_Skills.SkillListSpace;
			for( let i = SSMBS_Window_Skills.SkillListFirst ; i <  SSMBS_Window_Skills.SkillListFirst+10/* $gameParty.members()[0].skills().length */ ; i ++ ){
				if($gameParty.members()[0].skills()[i] && !$gameParty.members()[0].skills()[i].meta.hideInList){
					
					this.skillIcon.bitmap.blt(
						ImageManager.loadSystem('IconSet'),
						$gameParty.members()[0].skills()[i].iconIndex % 16*32,Math.floor($gameParty.members()[0].skills()[i].iconIndex / 16)*32, //切割坐标
						32,	32,//切割尺寸
						SSMBS_Window_Skills.startX,
						SSMBS_Window_Skills.startY+line*lineHeight,// 绘制坐标
						SSMBS_Window_Skills.gridsSize,	SSMBS_Window_Skills.gridsSize //最终大小
					)
					if($gameParty.members()[0].skills()[i].meta.iconUpperLayer){
						this.skillIcon.bitmap.blt(
							ImageManager.loadSystem('IconSet'),
							Number($gameParty.members()[0].skills()[i].meta.iconUpperLayer) % 16*32,Math.floor(Number($gameParty.members()[0].skills()[i].meta.iconUpperLayer) / 16)*32, //切割坐标
							32,	32,//切割尺寸
							SSMBS_Window_Skills.startX,
							SSMBS_Window_Skills.startY+line*lineHeight,// 绘制坐标
							SSMBS_Window_Skills.gridsSize,	SSMBS_Window_Skills.gridsSize //最终大小
						)
					}
					if($gameParty.members()[0].skillLevels[$gameParty.members()[0].skills()[i].id]>0){
						var text = ' (技能等级: '+$gameParty.members()[0].skillLevels[$gameParty.members()[0].skills()[i].id]+')';
					}else{
						var text = '';
					}
					if($gameParty.members()[0].skills()[i].meta.textColor){
						var color  = Number($gameParty.members()[0].skills()[i].meta.textColor);
					}else{
						var color  = 0;
					}
					if($gameParty.members()[0].skills()[i].meta.textColor2){
						var color2  = Number($gameParty.members()[0].skills()[i].meta.textColor2);
					}else{
						var color2  = color;
					}
					this.skillIcon.bitmap.drawTextGradient(
						$gameParty.members()[0].skills()[i].name+text,
						SSMBS_Window_Skills.startX+SSMBS_Window_Skills.gridsSize+8,
						SSMBS_Window_Skills.startY+line*lineHeight,// 绘制坐标
						SSMBS_Window_Skills.width,SSMBS_Window_Skills.gridsSize, //限制长宽
						'left',	ColorManager.textColor(color),ColorManager.textColor(color2)
					)
					let skillX = this.skillWindow.x + SSMBS_Window_Skills.startX;
					let skillY = this.skillWindow.y + SSMBS_Window_Skills.startY+line*lineHeight;
					let skillMaxX = skillX+SSMBS_Window_Skills.gridsSize;
					let skillMaxY = skillY+SSMBS_Window_Skills.gridsSize;
					
					if( ssmbsBasic.isTouching(skillX,skillY,skillMaxX,skillMaxY)){
						if(!this.isDrawing){
							this.itemInform = $gameParty.members()[0].skills()[i];
						}
						if(TouchInput.isPressed()  && !this.nowPickedItem && !this.isDrawing ){
							this.isDrawing = true;
							this.nowPickedItem =  $gameParty.members()[0].skills()[i];
							this.touchIcon.item = $gameParty.members()[0].skills()[i];
							this.isHandledItem = this.touchIcon;
							this.item = this.touchIcon.item;
							this.itemTypeDrawing = 'skill';
						}
					}
					line ++ ;
				}
			}
		}
	}
};

SSMBS_Window_Skills.levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
	SSMBS_Window_Skills.levelUp.call(this);
	let name = this._name;
	let level = this.level;
	let note = name+' 已达到等级 '+ level;
	SSMBS_Window_Notification.addNotification(note,0,null);
	if($gamePlayer.battler()==this){
		let gainSKP = $dataActors[this._actorId].meta.spPerLv?Number($dataActors[this._actorId].meta.spPerLv):SSMBS_Window_Skills.defaultGainSKPLevel;
		this.skillPoints += gainSKP;
		SSMBS_Window_Notification.addNotification(name+' 获得技能点 '+gainSKP,0,null);
	}
};

Game_Actor.prototype.resetSkillPoints = function() {
	for(let s = 0 ; s < this.skillLevelsPoints.length ; s++ ){
		if(this.skillLevelsPoints[s]>0){
			this.skillLevelsPoints[s] = 0;
			this.forgetSkill(s);
		}
	};
	this.skillPoints = this.skillPoints+this.usedSKP;
	this.usedSKP = 0;
};