//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - Enhance
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 强化物品窗口
 * @author 神仙窗口
 *	
 */


var SSMBS_Window_Enhance = SSMBS_Window_Enhance||{};
SSMBS_Window_Enhance.windowTitle = '强 化';
SSMBS_Window_Enhance.titleFontSize = 16;

SSMBS_Window_Enhance.width = 298;
SSMBS_Window_Enhance.height = 498;
SSMBS_Window_Enhance.defaultX = Number(640-SSMBS_Window_Enhance.width/2);
SSMBS_Window_Enhance.defaultY = Number(360-SSMBS_Window_Enhance.height/2);
SSMBS_Window_Enhance.iconSize = 32;
SSMBS_Window_Enhance.drawWindowY = 32

SSMBS_Window_Enhance.iconX = SSMBS_Window_Enhance.width/2-SSMBS_Window_Enhance.iconSize/2;
SSMBS_Window_Enhance.iconY = 134;

SSMBS_Window_Enhance.wordWidth = SSMBS_Window_Enhance.width-48;
SSMBS_Window_Enhance.wordHeight = 240;
SSMBS_Window_Enhance.wordX = SSMBS_Window_Enhance.width/2-SSMBS_Window_Enhance.wordWidth/2;
SSMBS_Window_Enhance.wordY = 192;

SSMBS_Window_Enhance.enhanceWindowUpperLayerOpacity = 100;
SSMBS_Window_Enhance.enhanceWindowUpperLayerSpeed = 0.05;

SSMBS_Window_Enhance.linearColor = '#555555';
SSMBS_Window_Enhance.costGoldLine = 11.5;
 
SSMBS_Window_Enhance.waitTime = 30;
SSMBS_Window_Enhance.defaultFontSize = 14;

SSMBS_Window_Enhance.enhanceWorkingSound = 'Magic4'; 
SSMBS_Window_Enhance.successSound = 'Heal7';
SSMBS_Window_Enhance.failureSound = 'Break';
SSMBS_Window_Enhance.protectItemSound = 'Barrier'; 
SSMBS_Window_Enhance.forceSucceedSound = 'Float1'; 


SSMBS_Window_Enhance.protectItemId = 49;
SSMBS_Window_Enhance.forceSucceedItemId = 50; 

const _SSMBS_Window_Enhance_mapLoad = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_SSMBS_Window_Enhance_mapLoad.call(this);
	SSMBS_Window_Enhance.scene = this;
	SSMBS_Window_Enhance.enhanceWait=0;
	this.enhanceWindowUpperLayerSpeed = SSMBS_Window_Enhance.enhanceWindowUpperLayerSpeed;
	SSMBS_Window_Enhance.item = null;
	this.createEnhanceWindow();
	if($gameParty.enhanceWeapons){
		for(let i = 0 ; i < $dataWeapons.length ; i++){
			if(i!=0){
				if(!$gameParty.enhanceWeapons[$dataWeapons[i].id-1].additionalStates){
					$gameParty.enhanceWeapons[$dataWeapons[i].id-1].additionalStates = [];
				}
			}
		}
		for(let i = 0 ; i < $dataArmors.length ; i++){
			if(i!=0){
				if(!$gameParty.enhanceArmors[$dataArmors[i].id-1].additionalStates){
					$gameParty.enhanceArmors[$dataArmors[i].id-1].additionalStates = [];
				}
			}
		}
	}
	
};
const _SSMBS_Window_Enhance_mapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_SSMBS_Window_Enhance_mapUpdate.call(this);
	if(SSMBS_Window_Enhance.isOpen){
		if(SSMBS_Window_Enhance.finishReload==false){
			SSMBS_Window_Enhance.reloadImg();
			SSMBS_Window_Enhance.finishReload = true;
		}else{
			this.refreshEnhanceWindow();
			this.enhanceIsActing();
		}
	}else{
		SSMBS_Window_Enhance.finishReload=false;
		this.enhanceWindow.opacity = 0;
		this.enhanceWindowUpperLayer.opacity = 0;
		this.enhanceWindowDarker.opacity = 0;
		this.enhanceWindoWords.opacity = 0;
		this.enhanceWindowIcon.opacity = 0;
	};
	if(!$gameParty.enhanceWeapons && !$gameParty.enhanceArmors){
		$gameParty.enhanceWeapons = [];
		$gameParty.enhanceArmors = [];
		this.loadUpgradeData();
	};
	if(SSMBS_Window_Enhance.enhanceWait>0){
		SSMBS_Window_Enhance.enhanceWait--;
	}
	for(let i = 0 ; i < $gamePlayer.battler().equips().length ; i ++ ){
		if( $gamePlayer.battler().equips()[i].wtypeId ){
			for(let s = 0 ; s < $gameParty.enhanceWeapons[$gamePlayer.battler().equips()[i].id-1].additionalStates.length ; s++){
				$gamePlayer.battler().addState($gameParty.enhanceWeapons[$gamePlayer.battler().equips()[i].id-1].additionalStates[s]);
			}
		}else{
			for(let s = 0 ; s < $gameParty.enhanceArmors[$gamePlayer.battler().equips()[i].id-1].additionalStates.length ; s++){
				$gamePlayer.battler().addState($gameParty.enhanceArmors[$gamePlayer.battler().equips()[i].id-1].additionalStates[s]);
			}
		}
	};
	
};

//创建强化数据
Scene_Map.prototype.loadUpgradeData = function(){
	for( let i = 0 ; i < $dataWeapons.length ; i ++ ){
		if( i != 0 ){
			$gameParty.enhanceWeapons.push(
				{	id:$dataWeapons[i].id,
					name:$dataWeapons[i].name,
					enhanceTimes:0,
					mhp:$dataWeapons[i].meta.upgradeMHP?Number($dataWeapons[i].meta.upgradeMHP):0,
					mmp:$dataWeapons[i].meta.upgradeMMP?Number($dataWeapons[i].meta.upgradeMMP):0,
					atk:$dataWeapons[i].meta.upgradeATK?Number($dataWeapons[i].meta.upgradeATK):Math.round(Number($dataWeapons[i].params[2])*0.1),
					def:$dataWeapons[i].meta.upgradeDEF?Number($dataWeapons[i].meta.upgradeDEF):0,
					mat:$dataWeapons[i].meta.upgradeMAT?Number($dataWeapons[i].meta.upgradeMDF):Math.round(Number($dataWeapons[i].params[4])*0.1),
					mdf:$dataWeapons[i].meta.upgradeMDF?Number($dataWeapons[i].meta.upgradeMDF):0,
					agi:$dataWeapons[i].meta.upgradeAGI?Number($dataWeapons[i].meta.upgradeAGI):0,
					luk:$dataWeapons[i].meta.upgradeLUK?Number($dataWeapons[i].meta.upgradeLUK):0,
					additionalStates:[]
				}
			)
		}
	}
	for( let i = 0 ; i < $dataArmors.length ; i ++ ){
		if( i != 0){
			$gameParty.enhanceArmors.push(
				{	id:$dataArmors[i].id,
					name:$dataArmors[i].name,
					enhanceTimes:0,
					mhp:$dataArmors[i].meta.upgradeMHP?Number($dataArmors[i].meta.upgradeMHP):0,
					mmp:$dataArmors[i].meta.upgradeMMP?Number($dataArmors[i].meta.upgradeMMP):0,
					atk:$dataArmors[i].meta.upgradeATK?Number($dataArmors[i].meta.upgradeATK):0,
					def:$dataArmors[i].meta.upgradeDEF?Number($dataArmors[i].meta.upgradeDEF):Math.round(Number($dataArmors[i].params[3])*0.1),
					mat:$dataArmors[i].meta.upgradeMAT?Number($dataArmors[i].meta.upgradeMAT):0,
					mdf:$dataArmors[i].meta.upgradeMDF?Number($dataArmors[i].meta.upgradeMDF):Math.round(Number($dataArmors[i].params[5])*0.1),
					agi:$dataArmors[i].meta.upgradeAGI?Number($dataArmors[i].meta.upgradeAGI):0,
					luk:$dataArmors[i].meta.upgradeLUK?Number($dataArmors[i].meta.upgradeLUK):0,
					additionalStates:[]
				}
			)
		}
	}
};

Scene_Map.prototype.createEnhanceWindow = function(){
	this.enhanceWindow = new Sprite( new Bitmap( SSMBS_Window_Enhance.width ,SSMBS_Window_Enhance.height ));
	
	this.enhanceWindow.x = $gameSystem.windowEnhanceX?$gameSystem.windowEnhanceX:SSMBS_Window_Enhance.defaultX;
    
	this.enhanceWindow.y = $gameSystem.windowEnhanceY?$gameSystem.windowEnhanceY:SSMBS_Window_Enhance.defaultY;
	this.addChild(this.enhanceWindow);
	this.enhanceWindowUpperLayer = new Sprite( new Bitmap( SSMBS_Window_Enhance.width ,SSMBS_Window_Enhance.width ));
	this.enhanceWindowUpperLayer.x = this.enhanceWindow.x+SSMBS_Window_Enhance.width/2;
	this.enhanceWindowUpperLayer.y = this.enhanceWindow.y+149;
	this.enhanceWindowUpperLayer.anchor.x = 0.5;
	this.enhanceWindowUpperLayer.anchor.y = 0.5;
	this.enhanceWindowUpperLayer.opacity = SSMBS_Window_Enhance.enhanceWindowUpperLayerOpacity;
	this.addChild(this.enhanceWindowUpperLayer)
	this.enhanceWindowDarker = new Sprite( new Bitmap( SSMBS_Window_Enhance.width ,SSMBS_Window_Enhance.height ));
	this.enhanceWindowDarker.x = this.enhanceWindow.x;
	this.enhanceWindowDarker.y = this.enhanceWindow.y;
	this.addChild(this.enhanceWindowDarker)
	this.enhanceWindoWords = new Sprite( new Bitmap( SSMBS_Window_Enhance.width ,SSMBS_Window_Enhance.height ));
	this.enhanceWindoWords.x = this.enhanceWindow.x;
	this.enhanceWindoWords.y = this.enhanceWindow.y;
	this.addChild(this.enhanceWindoWords)
	this.enhanceWindowIcon = new Sprite( new Bitmap( SSMBS_Window_Enhance.width ,SSMBS_Window_Enhance.height ));
	this.enhanceWindowIcon.x = this.enhanceWindow.x;
	this.enhanceWindowIcon.y = this.enhanceWindow.y;
	this.addChild(this.enhanceWindowIcon)
};

Scene_Map.prototype.refreshEnhanceWindow = function(){
	this.enhanceWindow.bitmap.clear();
	this.enhanceWindowUpperLayer.bitmap.clear();
	this.enhanceWindowIcon.bitmap.clear();
	this.enhanceWindowDarker.bitmap.clear();
	this.enhanceWindoWords.bitmap.clear();
	this.enhanceWindow.bitmap.fontFace = $gameSystem.mainFontFace();
	this.enhanceWindoWords.bitmap.fontFace = $gameSystem.mainFontFace();
	this.enhanceWindowUpperLayer.x = this.enhanceWindow.x+SSMBS_Window_Enhance.width/2;
	this.enhanceWindowUpperLayer.y = this.enhanceWindow.y+149;
	this.enhanceWindowDarker.x = this.enhanceWindow.x;
	this.enhanceWindowDarker.y = this.enhanceWindow.y;
	this.enhanceWindowIcon.x = this.enhanceWindow.x;
	this.enhanceWindowIcon.y = this.enhanceWindow.y;
	this.enhanceWindoWords.x = this.enhanceWindow.x;
	this.enhanceWindoWords.y = this.enhanceWindow.y;
	this.enhanceWindowUpperLayer.angle += this.enhanceWindowUpperLayerSpeed;
	//绘制窗口图像
	this.enhanceWindow.bitmap.blt( 
		ImageManager.loadSystem('window_black'),
		0,0, //切割坐标
		SSMBS_Window_Enhance.width ,SSMBS_Window_Enhance.height,//切割尺寸
		0, 0,// 绘制坐标
		SSMBS_Window_Enhance.width ,SSMBS_Window_Enhance.height //最终大小
	)
	this.enhanceWindowUpperLayer.bitmap.blt( 
		ImageManager.loadSystem('enhance_upperLayer'),
		0,0, //切割坐标
		SSMBS_Window_Enhance.width ,SSMBS_Window_Enhance.height,//切割尺寸
		0, 0,// 绘制坐标
		SSMBS_Window_Enhance.width ,SSMBS_Window_Enhance.height //最终大小
	)
	let windowStX = this.enhanceWindow.x;
	let windowStY = this.enhanceWindow.y;
	let windowEdX = windowStX+SSMBS_Window_Enhance.width;
	let windowEdY = windowStY+SSMBS_Window_Enhance.height;
	//鼠标是否在窗口内
	if(ssmbsBasic.isTouching(windowStX,windowStY,windowEdX,windowEdY)){
		//限制角色攻击
		$gamePlayer.battler()._tp = 0;
		this.enhanceWindow.bitmap.textColor = ColorManager.textColor(0);
		if( TouchInput.x > this.enhanceWindow.x + SSMBS_Window_Enhance.width-32
			&& TouchInput.x < this.enhanceWindow.x + SSMBS_Window_Enhance.width-32+SSMBS_Window_Enhance.defaultFontSize
			&& TouchInput.y > this.enhanceWindow.y + SSMBS_Window_Enhance.drawWindowY/2-SSMBS_Window_Enhance.defaultFontSize/2
			&& TouchInput.y < this.enhanceWindow.y + SSMBS_Window_Enhance.drawWindowY/2-SSMBS_Window_Enhance.defaultFontSize/2+SSMBS_Window_Enhance.defaultFontSize){
			this.enhanceWindow.bitmap.textColor = ColorManager.textColor(8);
			if(TouchInput.isClicked()){
				SSMBS_Window_Enhance.isOpen = false;
				SoundManager.playCursor();
			}
		}
	}
	//描绘关闭按钮
	this.enhanceWindow.bitmap.drawText( 'x', SSMBS_Window_Enhance.width-32,SSMBS_Window_Enhance.drawWindowY/2-SSMBS_Window_Enhance.defaultFontSize/2 ,SSMBS_Window_Enhance.defaultFontSize,SSMBS_Window_Enhance.defaultFontSize,'right' )
	this.enhanceWindow.bitmap.textColor = '#ffffff';
	//拖动窗口
	if( TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow &&
		TouchInput.x > this.enhanceWindow.x
		&& TouchInput.x < this.enhanceWindow.x+SSMBS_Window_Enhance.width
		&& TouchInput.y > this.enhanceWindow.y
		&& TouchInput.y < this.enhanceWindow.y+SSMBS_Window_Enhance.drawWindowY){
		this.isDrawing = true;
		this.drawingWindow = 'enhance';
		if(!SSMBS_Window_Enhance.xDelta) SSMBS_Window_Enhance.xDelta = TouchInput.x - this.enhanceWindow.x;
		if(!SSMBS_Window_Enhance.yDelta) SSMBS_Window_Enhance.yDelta = TouchInput.y - this.enhanceWindow.y;
	}else if (TouchInput.isHovered()) {
		this.isDrawing = false;
		this.drawingWindow = null;
		SSMBS_Window_Enhance.xDelta = 0;
		SSMBS_Window_Enhance.yDelta = 0;
	}
	if(TouchInput.isPressed() && !this.nowPickedItem && this.drawingWindow == 'enhance'){
		this.enhanceWindow.x += (TouchInput.x - this.enhanceWindow.x)-SSMBS_Window_Enhance.xDelta;
		this.enhanceWindow.y += (TouchInput.y - this.enhanceWindow.y)-SSMBS_Window_Enhance.yDelta;
		//防止出屏
		if(this.enhanceWindow.x <= 0 ){
			this.enhanceWindow.x = 0;
		}
		if(this.enhanceWindow.y <= 0 ){
			this.enhanceWindow.y = 0;
		}
		if(this.enhanceWindow.x + SSMBS_Window_Equip.width >= Graphics.width ){
			this.enhanceWindow.x = Graphics.width - SSMBS_Window_Equip.width;
		}
		if(this.enhanceWindow.y + SSMBS_Window_Equip.drawWindowY >= Graphics.height ){
			this.enhanceWindow.y = Graphics.height - SSMBS_Window_Equip.drawWindowY;
		}
		this.enhanceWindowUpperLayer.x = this.enhanceWindow.x+SSMBS_Window_Enhance.width/2;
		this.enhanceWindowUpperLayer.y = this.enhanceWindow.y+149;
		this.enhanceWindowDarker.x = this.enhanceWindow.x;
		this.enhanceWindowDarker.y = this.enhanceWindow.y;
		this.enhanceWindowIcon.x = this.enhanceWindow.x;
		this.enhanceWindowIcon.y = this.enhanceWindow.y;
		this.enhanceWindoWords.x = this.enhanceWindow.x;
		this.enhanceWindoWords.y = this.enhanceWindow.y;
		$gameSystem.windowEnhanceX = this.enhanceWindow.x;
		$gameSystem.windowEnhanceY = this.enhanceWindow.y;
	}

	//绘制标题文字
	this.enhanceWindow.bitmap.fontSize = SSMBS_Window_Enhance.titleFontSize;
	this.enhanceWindow.bitmap.drawText( SSMBS_Window_Enhance.windowTitle,0,0,SSMBS_Window_Enhance.width,36,'center' );
	//绘制文字背景
	this.enhanceWindowDarker.bitmap.fillRect( SSMBS_Window_Enhance.wordX,SSMBS_Window_Enhance.wordY, SSMBS_Window_Enhance.wordWidth, SSMBS_Window_Enhance.wordHeight,'#000000');
	if(SSMBS_Window_Enhance.item){
		let item = SSMBS_Window_Enhance.item;
		let enhanceData;
		if( item.wtypeId ){
			enhanceData = $gameParty.enhanceWeapons[Number(item.id)-1];
			SSMBS_Window_Enhance.enhanceData = enhanceData;
		}
		if( item.atypeId ){
			enhanceData = $gameParty.enhanceArmors[Number(item.id)-1];
			SSMBS_Window_Enhance.enhanceData = enhanceData;
		}
		this.enhanceWindowIcon.bitmap.blt(
			ImageManager.loadSystem('IconSet'),
			item.iconIndex % 16*32,
			Math.floor(item.iconIndex / 16)*32, //切割坐标
			32,	32,//切割尺寸
			SSMBS_Window_Enhance.iconX+SSMBS_Window_Enhance.iconRandomX, 
			SSMBS_Window_Enhance.iconY+SSMBS_Window_Enhance.iconRandomY,// 绘制坐标
			SSMBS_Window_Enhance.iconSize,  SSMBS_Window_Enhance.iconSize //最终大小
		)
		//文字框显示内容
		let color1 = 0;
		let color2 = color1;
		if(item.meta.textColor){
			color1 = Number(item.meta.textColor);
		}
		if(item.meta.textColor2){
			color2 = Number(item.meta.textColor2);
		}else{
			color2 = color1
		}
		color1 = ColorManager.textColor(color1);
		color2 = ColorManager.textColor(color2);
		let line = 0;
		let lineHeight = SSMBS_Window_Enhance.defaultFontSize+4;
		let startY = SSMBS_Window_Enhance.wordY+12;
		let linearStartX = 6;
		this.enhanceWindoWords.bitmap.fontSize = SSMBS_Window_Enhance.defaultFontSize+4;
		let elv = enhanceData.enhanceTimes?'+'+enhanceData.enhanceTimes:'';
		this.enhanceWindoWords.bitmap.drawTextGradient( item.name+elv,0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center',color1,color2 );
		line += 1 ;
		this.enhanceWindoWords.bitmap.fontSize = SSMBS_Window_Enhance.defaultFontSize;
		this.enhanceWindoWords.bitmap.drawTextGradient( '强化等级: '+(Number(enhanceData.enhanceTimes))+' → ' + (Number(enhanceData.enhanceTimes)+1),0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center','#ffffff','#ffffff' );
		this.enhanceWindowDarker.bitmap.fillRect( SSMBS_Window_Enhance.wordX + linearStartX,startY+(line+1)*lineHeight,SSMBS_Window_Enhance.wordWidth-linearStartX*2,1,SSMBS_Window_Enhance.linearColor );
		line += 1.2;
		let paramId = 0;
		let param = enhanceData.mhp;
		let basicParam = item.params[paramId];
		let finalParamNow = basicParam+param*enhanceData.enhanceTimes;
		let finalParamNext = basicParam+param*(enhanceData.enhanceTimes+1);
		//强化属性文字描述
		if(enhanceData.mhp>0){
			paramId = 0;
			param = enhanceData.mhp;
			basicParam = item.params[paramId];
			finalParamNow = basicParam+param*enhanceData.enhanceTimes;
			finalParamNext = basicParam+param*(enhanceData.enhanceTimes+1);
			this.enhanceWindoWords.bitmap.drawTextGradient( TextManager.param(paramId)+': '+(finalParamNow)+' → ' + (finalParamNext),0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center','#ffffff','#ffffff' );
			line += 1;
		};
		if(enhanceData.mmp>0){
			paramId = 1;
			param = enhanceData.mmp;
			basicParam = item.params[paramId];
			finalParamNow = basicParam+param*enhanceData.enhanceTimes;
			finalParamNext = basicParam+param*(enhanceData.enhanceTimes+1);
			this.enhanceWindoWords.bitmap.drawTextGradient( TextManager.param(paramId)+': '+(finalParamNow)+' → ' + (finalParamNext),0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center','#ffffff','#ffffff' );
			line += 1;
		};
		if(enhanceData.atk>0){
			paramId = 2;
			param = enhanceData.atk;
			basicParam = item.params[paramId];
			finalParamNow = basicParam+param*enhanceData.enhanceTimes;
			finalParamNext = basicParam+param*(enhanceData.enhanceTimes+1);
			this.enhanceWindoWords.bitmap.drawTextGradient( TextManager.param(paramId)+': '+(finalParamNow)+' → ' + (finalParamNext),0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center','#ffffff','#ffffff' );
			line += 1;
		};
		if(enhanceData.def>0){
			paramId = 3;
			param = enhanceData.def;
			basicParam = item.params[paramId];
			finalParamNow = basicParam+param*enhanceData.enhanceTimes;
			finalParamNext = basicParam+param*(enhanceData.enhanceTimes+1);
			this.enhanceWindoWords.bitmap.drawTextGradient( TextManager.param(paramId)+': '+(finalParamNow)+' → ' + (finalParamNext),0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center','#ffffff','#ffffff' );
			line += 1;
		};
		if(enhanceData.mat>0){
			paramId = 4;
			param = enhanceData.mat;
			basicParam = item.params[paramId];
			finalParamNow = basicParam+param*enhanceData.enhanceTimes;
			finalParamNext = basicParam+param*(enhanceData.enhanceTimes+1);
			this.enhanceWindoWords.bitmap.drawTextGradient( TextManager.param(paramId)+': '+(finalParamNow)+' → ' + (finalParamNext),0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center','#ffffff','#ffffff' );
			line += 1;
		};
		if(enhanceData.mdf>0){
			paramId = 5;
			param = enhanceData.mdf;
			basicParam = item.params[paramId];
			finalParamNow = basicParam+param*enhanceData.enhanceTimes;
			finalParamNext = basicParam+param*(enhanceData.enhanceTimes+1);
			this.enhanceWindoWords.bitmap.drawTextGradient( TextManager.param(paramId)+': '+(finalParamNow)+' → ' + (finalParamNext),0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center','#ffffff','#ffffff' );
			line += 1;
		};
		if(enhanceData.agi>0){
			paramId = 6;
			param = enhanceData.agi;
			basicParam = item.params[paramId];
			finalParamNow = basicParam+param*enhanceData.enhanceTimes;
			finalParamNext = basicParam+param*(enhanceData.enhanceTimes+1);
			this.enhanceWindoWords.bitmap.drawTextGradient( TextManager.param(paramId)+': '+(finalParamNow)+' → ' + (finalParamNext),0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center','#ffffff','#ffffff' );
			line += 1;
		};
		if(enhanceData.luk>0){
			paramId = 7;
			param = enhanceData.luk;
			basicParam = item.params[paramId];
			finalParamNow = basicParam+param*enhanceData.enhanceTimes;
			finalParamNext = basicParam+param*(enhanceData.enhanceTimes+1);
			this.enhanceWindoWords.bitmap.drawTextGradient( TextManager.param(paramId)+': '+(finalParamNow)+' → ' + (finalParamNext),0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center','#ffffff','#ffffff' );
			line += 1;
		};
		//描绘强化消耗
		let enhanceCost = item.meta.enhanceCost?Number(item.meta.enhanceCost):item.price;
		enhanceCost = enhanceCost*(enhanceData.enhanceTimes+1);
		line = SSMBS_Window_Enhance.costGoldLine;
		let fixLine = line-0.25;
		let goldColor =  ColorManager.textColor(0);
		if($gameParty.gold()<enhanceCost){
			goldColor =  ColorManager.textColor(7);
		}
		this.enhanceWindoWords.bitmap.drawTextGradient( '强化消耗金币: '+ssmbsBasic.convertNumber(enhanceCost,'thousand')+'(拥有: '+ssmbsBasic.convertNumber($gameParty.gold(),'thousand')+')',0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center',goldColor,goldColor );
		if( item.meta.enhanceCostItem ){
			fixLine --;
			let costItemId = item.meta.enhanceCostItem.split(',')[0];
			let costItemAmont = item.meta.enhanceCostItem.split(',')[1]?Number(item.meta.enhanceCostItem.split(',')[1]):1;
			let hasColor = ColorManager.textColor(0);
			costItemAmont = costItemAmont*(enhanceData.enhanceTimes+1);
			if($gameParty.numItems($dataItems[costItemId])<costItemAmont){
				hasColor = ColorManager.textColor(7);
			}
			this.enhanceWindoWords.bitmap.drawTextGradient( '强化消耗 '+$dataItems[Number(costItemId)].name+': '+costItemAmont+'(拥有: '+$gameParty.numItems($dataItems[costItemId])+')',0,startY+(line-1)*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center',hasColor,hasColor );
		}
		this.enhanceWindowDarker.bitmap.fillRect( SSMBS_Window_Enhance.wordX + linearStartX,startY+(fixLine)*lineHeight,SSMBS_Window_Enhance.wordWidth-linearStartX*2,1,SSMBS_Window_Enhance.linearColor );
	}else{
		let line = 0;
		let lineHeight = SSMBS_Window_Enhance.defaultFontSize+4;
		let startY = SSMBS_Window_Enhance.wordY+12;
		let linearStartX = 6;
		this.enhanceWindoWords.bitmap.drawTextGradient( '暂无物品',0,startY+line*lineHeight,SSMBS_Window_Enhance.width,SSMBS_Window_Enhance.defaultFontSize,'center',ColorManager.textColor(7),ColorManager.textColor(7) );
	}
	//描绘强化按钮
	let buttonHeight = 28;
	let startButtonY =SSMBS_Window_Enhance.wordHeight+SSMBS_Window_Enhance.wordY;
	let buttonOffsetY = 6;
	
	this.enhanceWindowDarker.bitmap.fillRect( SSMBS_Window_Enhance.wordX,startButtonY+buttonOffsetY,SSMBS_Window_Enhance.wordWidth,buttonHeight,'#000000' );
	this.enhanceWindoWords.bitmap.fontSize = SSMBS_Window_Enhance.defaultFontSize+2;
	
	if(SSMBS_Window_Enhance.item){
		let sucRate = Math.round((1/(SSMBS_Window_Enhance.enhanceData.enhanceTimes+1))*10000)/100+'%'
		this.enhanceWindoWords.bitmap.drawTextGradient( ' 强化 '+'(成功率:'+sucRate+')',0,startButtonY+buttonOffsetY,SSMBS_Window_Enhance.width,buttonHeight,'center','#FFFFFF','#FFFFFF' );
	}else{
		this.enhanceWindoWords.bitmap.drawTextGradient( ' 请拖入待强化的武器/防具 ',0,startButtonY+buttonOffsetY,SSMBS_Window_Enhance.width,buttonHeight,'center',ColorManager.textColor(7),ColorManager.textColor(7) );
	}
	let buttonStX = this.enhanceWindow.x+SSMBS_Window_Enhance.wordX;
	let buttonStY = this.enhanceWindow.y+startButtonY+buttonOffsetY;
	let buttonEdX = buttonStX+SSMBS_Window_Enhance.wordWidth;
	let buttonEdY = buttonStY+buttonHeight;
	if(ssmbsBasic.isTouching(buttonStX,buttonStY,buttonEdX,buttonEdY)){
		this.enhanceWindowDarker.bitmap.fillRect( SSMBS_Window_Enhance.wordX,startButtonY+buttonOffsetY,SSMBS_Window_Enhance.wordWidth,buttonHeight,'#555555' );
		if(TouchInput.isClicked()){
			SoundManager.playCursor();
			//点击强化按钮
			if(SSMBS_Window_Enhance.item){
				//判定强化条件
				let enhanceCost = SSMBS_Window_Enhance.item.meta.enhanceCost?Number(SSMBS_Window_Enhance.item.meta.enhanceCost):SSMBS_Window_Enhance.item.price;
				enhanceCost = enhanceCost*(SSMBS_Window_Enhance.enhanceData.enhanceTimes+1);
				let costItemId;
				let costItemAmont;
				if(SSMBS_Window_Enhance.item.meta.enhanceCostItem){
					costItemId = SSMBS_Window_Enhance.item.meta.enhanceCostItem.split(',')[0]
					costItemAmont = SSMBS_Window_Enhance.item.meta.enhanceCostItem.split(',')[1]?Number(SSMBS_Window_Enhance.item.meta.enhanceCostItem.split(',')[1]):1;
					costItemAmont = costItemAmont*(SSMBS_Window_Enhance.enhanceData.enhanceTimes+1);
				}
				let canEnhanceGold = $gameParty.gold()>=enhanceCost;
				let canEnhanceItem = ($gameParty.numItems( costItemId )>=costItemAmont||!SSMBS_Window_Enhance.item.meta.enhanceCostItem);
				if(canEnhanceGold&&canEnhanceItem){
					AudioManager.playSe(
						{name:SSMBS_Window_Enhance.enhanceWorkingSound,
						volume:90,
						pitch:100}
					);
					if(!SSMBS_Window_Enhance.enhanceWait){
						$gameParty.loseItem($dataItems[costItemId],1);
						$gameParty.loseGold(enhanceCost);
					}
					SSMBS_Window_Enhance.enhanceWait = SSMBS_Window_Enhance.waitTime+(SSMBS_Window_Enhance.enhanceData.enhanceTimes)*5;
				}else{
					SoundManager.playBuzzer();
					if(!canEnhanceGold){
						SSMBS_Window_Notification.addNotification('金币不足，无法开始强化',10,null);
					}
					if(!canEnhanceItem){
						SSMBS_Window_Notification.addNotification($dataItems[costItemId].name+'不足，无法开始强化',10,$dataItems[costItemId]);
					}

				}
			}else{
				SoundManager.playBuzzer();
				SSMBS_Window_Notification.addNotification('请放入待强化的武器/防具',10,null);
			}
		}
	}
	let stX = this.enhanceWindow.x;
	let stY = this.enhanceWindow.y;
	let edX = this.enhanceWindow.x+SSMBS_Window_Enhance.width;
	let edY = this.enhanceWindow.y+SSMBS_Window_Enhance.height;
	if(ssmbsBasic.isTouching(stX,stY,edX,edY)){
		this.isTouchingEnhanceWindow = true;
		if(this.item && TouchInput.isReleased()){
			if((!this.item.meta.cannotUpgrade&&!this.item.meta.cannotEnhance)&&(this.item.wtypeId || this.item.atypeId)){
				SSMBS_Window_Enhance.item = this.item;
			}else{
				let color = this.item.meta.textColor?(this.item.meta.textColor):0;
				SSMBS_Window_Notification.addNotification('无法强化 '+this.item.name,color,this.item)
			}
			
		}
	}else{
		this.isTouchingEnhanceWindow = false;
	}
};

//强化
Scene_Map.prototype.enhance = function(item,itemEnhanceData){
	let rate = Math.random()*(itemEnhanceData.enhanceTimes+1);
	let color = item.meta.textColor?Number(item.meta.textColor):0;
	if(rate<=1){
		AudioManager.playSe(
			{name:SSMBS_Window_Enhance.successSound,
			volume:90,
			pitch:100}
		);
		SSMBS_Window_Notification.addNotification('强化 '+item.name+'+'+(itemEnhanceData.enhanceTimes+1)+' 成功',color,item);
		itemEnhanceData.enhanceTimes+=1;
	}else{
		SSMBS_Window_Notification.addNotification('强化 '+item.name+'+'+(itemEnhanceData.enhanceTimes+1)+' 失败',color,item);
		if(!$gameParty.hasItem($dataItems[SSMBS_Window_Enhance.forceSucceedItemId])){
			AudioManager.playSe(
				{name:SSMBS_Window_Enhance.failureSound,
				volume:90,
				pitch:100}
			);
			if(!$gameParty.hasItem($dataItems[SSMBS_Window_Enhance.protectItemId])){
				if(itemEnhanceData.enhanceTimes>3&&itemEnhanceData.enhanceTimes<6){
					itemEnhanceData.enhanceTimes--;
				}
				if(itemEnhanceData.enhanceTimes>=6&&itemEnhanceData.enhanceTimes<9){
					itemEnhanceData.enhanceTimes=0;
				}
				if(itemEnhanceData.enhanceTimes>=9&&itemEnhanceData.enhanceTimes<12){
					itemEnhanceData.enhanceTimes=0;
					$gameParty.loseItem(item,1,true);
				}
				if(itemEnhanceData.enhanceTimes>12){
					itemEnhanceData.enhanceTimes=0;
					$gameParty.loseItem(item,$gameParty.numItems(item),true);
				}
			}else{
				AudioManager.playSe(
					{name:SSMBS_Window_Enhance.protectItemSound,
					volume:90,
					pitch:100}
				);
				let protectColor = $dataItems[SSMBS_Window_Enhance.protectItemId].meta.textColor?Number($dataItems[SSMBS_Window_Enhance.protectItemId].meta.textColor):0;
				SSMBS_Window_Notification.addNotification($dataItems[SSMBS_Window_Enhance.protectItemId].name+' 保全了物品',protectColor,$dataItems[SSMBS_Window_Enhance.protectItemId]);
				$gameParty.loseItem($dataItems[SSMBS_Window_Enhance.protectItemId],1);
			}
		}else{
			AudioManager.playSe(
				{name:SSMBS_Window_Enhance.forceSucceedSound,
				volume:90,
				pitch:100}
			);
			let successItem = $dataItems[SSMBS_Window_Enhance.forceSucceedItemId].meta.textColor?Number($dataItems[SSMBS_Window_Enhance.forceSucceedItemId].meta.textColor):0;
			SSMBS_Window_Notification.addNotification($dataItems[SSMBS_Window_Enhance.forceSucceedItemId].name+' 使强化成功',successItem,$dataItems[SSMBS_Window_Enhance.forceSucceedItemId]);
			itemEnhanceData.enhanceTimes+=1;
			$gameParty.loseItem($dataItems[SSMBS_Window_Enhance.forceSucceedItemId],1);
		}
	}
};

//强化过程
Scene_Map.prototype.enhanceIsActing = function(){
	
	if(SSMBS_Window_Enhance.enhanceWait==1){
		
		this.enhance(SSMBS_Window_Enhance.item,SSMBS_Window_Enhance.enhanceData);
		this.enhanceWindowIcon.setColorTone([0,0,0,0]);
	}else{
		if(SSMBS_Window_Enhance.enhanceWait>1){
			SSMBS_Window_Enhance.iconRandomX = (Math.random()-0.5)*5;
			SSMBS_Window_Enhance.iconRandomY = (Math.random()-0.5)*5;
			this.enhanceWindowUpperLayerSpeed += 0.1;
			this.enhanceWindowUpperLayer.opacity += 1;
			let R = this.enhanceWindowIcon.getColorTone()[0]+5;
			let G = this.enhanceWindowIcon.getColorTone()[1]+5;
			let B = this.enhanceWindowIcon.getColorTone()[2]+5;
			let Gray = this.enhanceWindowIcon.getColorTone()[3];
			this.enhanceWindowIcon.setColorTone([R,G,B,Gray]);
		}
		if(SSMBS_Window_Enhance.enhanceWait==0){
			SSMBS_Window_Enhance.iconRandomX = 0;
			SSMBS_Window_Enhance.iconRandomY = 0;
			if(this.enhanceWindowUpperLayerSpeed>SSMBS_Window_Enhance.enhanceWindowUpperLayerSpeed){
				this.enhanceWindowUpperLayerSpeed-=(this.enhanceWindowUpperLayerSpeed-SSMBS_Window_Enhance.enhanceWindowUpperLayerSpeed)/30;
			}
			if(this.enhanceWindowUpperLayer.opacity>SSMBS_Window_Enhance.enhanceWindowUpperLayerOpacity){
				this.enhanceWindowUpperLayer.opacity-=(this.enhanceWindowUpperLayer.opacity-SSMBS_Window_Enhance.enhanceWindowUpperLayerOpacity)/30;
			}
		}
		
	}
}

SSMBS_Window_Enhance.reloadImg = function(){
	SSMBS_Window_Enhance.scene.enhanceWindow.opacity = 255;
	SSMBS_Window_Enhance.scene.enhanceWindowDarker.opacity = 255;
	SSMBS_Window_Enhance.scene.enhanceWindoWords.opacity = 255;
	SSMBS_Window_Enhance.scene.enhanceWindowIcon.opacity = 255;
	SSMBS_Window_Enhance.scene.enhanceWindowUpperLayer.opacity = SSMBS_Window_Enhance.enhanceWindowUpperLayerOpacity;
	SSMBS_Window_Enhance.scene.enhanceWindowDarker.opacity = SSMBS_Window_Enhance.scene.enhanceWindow.opacity/2;
};

//角色属性读取
Game_BattlerBase.prototype.param = function(paramId) {
	var value =
		this.paramBasePlus(paramId) *
		this.paramRate(paramId) *
		this.paramBuffRate(paramId);
	if(this._equips && $gameParty.enhanceWeapons && $gameParty.enhanceArmors ){
		for( let i = 0 ; i < this._equips.length ; i ++ ){
			if( this == $gamePlayer.battler() && this._equips[i]._itemId != 0 ){
				let item = this._equips[i]._dataClass == 'weapon'?$dataWeapons[this._equips[i]._itemId]:$dataArmors[this._equips[i]._itemId];
				let itemEnhanceData = this._equips[i]._dataClass == 'weapon'?$gameParty.enhanceWeapons[this._equips[i]._itemId-1]:$gameParty.enhanceArmors[this._equips[i]._itemId-1];
				switch(paramId){
					case 0 :
						value += itemEnhanceData.mhp * itemEnhanceData.enhanceTimes;
						break;
					case 1 :
						value += itemEnhanceData.mmp * itemEnhanceData.enhanceTimes;
						break;
					case 2 :
						value += itemEnhanceData.atk * itemEnhanceData.enhanceTimes;
						break;
					case 3 :
						value += itemEnhanceData.def * itemEnhanceData.enhanceTimes;
						break;
					case 4 :
						value += itemEnhanceData.mat * itemEnhanceData.enhanceTimes;
						break;
					case 5 :
						value += itemEnhanceData.mdf * itemEnhanceData.enhanceTimes;
						break;
					case 6 :
						value += itemEnhanceData.agi * itemEnhanceData.enhanceTimes;
						break;
					case 7 :
						value += itemEnhanceData.luk * itemEnhanceData.enhanceTimes;
						break;
				}
			}
		}
	}
	if(this._equips ){
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
		for(let i = 0 ; i < this.states().length ; i ++ ){
			if(this.states()[i].meta.mhp && paramId==0) {value+=Number(this.states()[i].meta.mhp)};
			if(this.states()[i].meta.mmp && paramId==1) {value+=Number(this.states()[i].meta.mmp)};
			if(this.states()[i].meta.atk && paramId==2) {value+=Number(this.states()[i].meta.atk)};
			if(this.states()[i].meta.def && paramId==3) {value+=Number(this.states()[i].meta.def)};
			if(this.states()[i].meta.mat && paramId==4) {value+=Number(this.states()[i].meta.mat)};
			if(this.states()[i].meta.mdf && paramId==5) {value+=Number(this.states()[i].meta.mdf)};
			if(this.states()[i].meta.agi && paramId==6) {value+=Number(this.states()[i].meta.agi)};
			if(this.states()[i].meta.luk && paramId==7) {value+=Number(this.states()[i].meta.luk)};
		}
	}
	var maxValue = this.paramMax(paramId);
	var minValue = this.paramMin(paramId);
	return Math.round(value.clamp(minValue, maxValue));
};