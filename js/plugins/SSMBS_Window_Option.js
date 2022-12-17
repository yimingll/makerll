//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - Option Window
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 设置窗口
 * @author 神仙狼
 *	
 * @help
 * 
 */



var SSMBS_Window_Option = SSMBS_Window_Option||{};
SSMBS_Window_Option.width = 298;
SSMBS_Window_Option.height = 498;
SSMBS_Window_Option.drawWindowY = 32;

SSMBS_Window_Option.hotkey = 'o';
SSMBS_Window_Option.title = '设 置' + ' ( '+SSMBS_Window_Option.hotkey.toUpperCase()+' ) ';
SSMBS_Window_Option.titleFontSize = 16;

SSMBS_Window_Option.defaultX = 200;
SSMBS_Window_Option.defaultY = 100;

SSMBS_Window_Option.defaultFontSize = 12;
SSMBS_Window_Option.startY = 48;
SSMBS_Window_Option.startX = 32;
SSMBS_Window_Option.lineHeight = 20;


SSMBS_Window_Option.volumeWidth = 128;
SSMBS_Window_Option.volumeHeight = 12;
SSMBS_Window_Option.volumeXoffset = 64;
SSMBS_Window_Option.volumeYoffset = 4;

SSMBS_Window_Option.dashingButton = 'shift';
SSMBS_Window_Option.showLoot = 'alt';
SSMBS_Window_Option.showLabel = 'v';
SSMBS_Window_Option.pickALL = 'z';


const _SSMBS_Window_optionLoad = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_SSMBS_Window_optionLoad.call(this);
	SSMBS_Window_Option.isOpen = false;
	if(SSMBS_Window_Option.helmetSwitch===undefined){
		SSMBS_Window_Option.helmetSwitch = true;
	}
	this.createOptionWindow();
	SSMBS_Window_Option.changeKeyMode = {state:false,id:-1}
	SSMBS_Window_Option.keysMapper = [];
	for( i in Input.keyMapper ){
		SSMBS_Window_Option.keysMapper[i]=Input.keyMapper[i];
	}
};


const _SSMBS_Window_optionUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_SSMBS_Window_optionUpdate.call(this);
	if(SSMBS_Window_Option.isOpen){
		SSMBS_Window_Option.window.opacity = 255;
		this.refreshOptionWindow();
	}else{
		SSMBS_Window_Option.window.opacity = 0;
	}
	if(!SSMBS_Window_Option.changeKeyMode.state && Input.isTriggered( SSMBS_Window_Option.hotkey )){
		SSMBS_Window_Option.isOpen = !SSMBS_Window_Option.isOpen;
	}
	if(!SSMBS_Window_Option.isOpen){
		SSMBS_Window_Option.changeKeyMode.state=false;
		SSMBS_Window_Option.changeKeyMode.id=-1;
	}
};

Scene_Map.prototype.createOptionWindow = function() {
	SSMBS_Window_Option.window = new Sprite(new Bitmap(SSMBS_Window_Option.width,SSMBS_Window_Option.height));
	SSMBS_Window_Option.window.x = $gameSystem.windowOptionX?$gameSystem.windowOptionX:SSMBS_Window_Option.defaultX;
	SSMBS_Window_Option.window.y = $gameSystem.windowOptionY?$gameSystem.windowOptionY:SSMBS_Window_Option.defaultY;
	this.addChild(SSMBS_Window_Option.window);
	SSMBS_Window_Option.windowChooser = new Sprite(new Bitmap(SSMBS_Window_Option.width,SSMBS_Window_Option.height));
	SSMBS_Window_Option.windowChooser.x = $gameSystem.windowOptionX?$gameSystem.windowOptionX:SSMBS_Window_Option.defaultX;
	SSMBS_Window_Option.windowChooser.y = $gameSystem.windowOptionY?$gameSystem.windowOptionY:SSMBS_Window_Option.defaultY;
	SSMBS_Window_Option.windowChooser.opacity = 100;
	this.addChild(SSMBS_Window_Option.windowChooser);
};

Scene_Map.prototype.refreshOptionWindow = function() {
	SSMBS_Window_Option.window.bitmap.clear();
	SSMBS_Window_Option.windowChooser.bitmap.clear();
	SSMBS_Window_Option.windowChooser.x = SSMBS_Window_Option.window.x;
	SSMBS_Window_Option.windowChooser.y = SSMBS_Window_Option.window.y;
	SSMBS_Window_Option.window.bitmap.fontFace = $gameSystem.mainFontFace();
	SSMBS_Window_Option.window.bitmap.blt(
		ImageManager.loadSystem('window_black'),
		0, 0, //切割坐标
		SSMBS_Window_Option.width ,SSMBS_Window_Option.height,//切割尺寸
		0, 0,// 绘制坐标
		SSMBS_Window_Option.width ,SSMBS_Window_Option.height //最终大小
	);
	SSMBS_Window_Option.window.bitmap.fontSize = SSMBS_Window_Option.titleFontSize;
	SSMBS_Window_Option.window.bitmap.drawText( SSMBS_Window_Option.title,0,0,SSMBS_Window_Option.width,36,'center' );
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if( TouchInput.x > SSMBS_Window_Option.window.x + SSMBS_Window_Option.width-32
		&& TouchInput.x < SSMBS_Window_Option.window.x + SSMBS_Window_Option.width-32+SSMBS_Window_Option.defaultFontSize
		&& TouchInput.y > SSMBS_Window_Option.window.y + SSMBS_Window_Option.drawWindowY/2-SSMBS_Window_Option.defaultFontSize/2
		&& TouchInput.y < SSMBS_Window_Option.window.y + SSMBS_Window_Option.drawWindowY/2-SSMBS_Window_Option.defaultFontSize/2+SSMBS_Window_Option.defaultFontSize){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(8);
		if(TouchInput.isClicked()){
			SSMBS_Window_Option.isOpen = false;
			SoundManager.playCursor();
		}
	}
	SSMBS_Window_Option.window.bitmap.drawText( 'x', SSMBS_Window_Option.width-32,SSMBS_Window_Option.drawWindowY/2-SSMBS_Window_Option.defaultFontSize/2 ,SSMBS_Window_Option.defaultFontSize,SSMBS_Window_Option.defaultFontSize,'right' );
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	//拖动窗口
	if( TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow &&
		TouchInput.x > SSMBS_Window_Option.window.x
		&& TouchInput.x < SSMBS_Window_Option.window.x+SSMBS_Window_Option.width
		&& TouchInput.y > SSMBS_Window_Option.window.y
		&& TouchInput.y < SSMBS_Window_Option.window.y+SSMBS_Window_Option.drawWindowY){
		this.isDrawing = true;
		this.drawingWindow = 'option';
		if(!SSMBS_Window_Option.xDelta) SSMBS_Window_Option.xDelta = TouchInput.x - SSMBS_Window_Option.window.x;
		if(!SSMBS_Window_Option.yDelta) SSMBS_Window_Option.yDelta = TouchInput.y - SSMBS_Window_Option.window.y;
	}else if (TouchInput.isHovered()) {
		this.isDrawing = false;
		this.drawingWindow = null;
		SSMBS_Window_Option.xDelta = 0;
		SSMBS_Window_Option.yDelta = 0;
	}
	if(TouchInput.isPressed() && !this.nowPickedItem && this.drawingWindow == 'option'){
		SSMBS_Window_Option.window.x += (TouchInput.x - SSMBS_Window_Option.window.x)-SSMBS_Window_Option.xDelta;
		SSMBS_Window_Option.window.y += (TouchInput.y - SSMBS_Window_Option.window.y)-SSMBS_Window_Option.yDelta;
		//防止出屏
		if(SSMBS_Window_Option.window.x <= 0 ){
			SSMBS_Window_Option.window.x = 0;
		}
		if(SSMBS_Window_Option.window.y <= 0 ){
			SSMBS_Window_Option.window.y = 0;
		}
		if(SSMBS_Window_Option.window.x + SSMBS_Window_Option.width >= Graphics.width ){
			SSMBS_Window_Option.window.x = Graphics.width - SSMBS_Window_Option.width;
		}
		if(SSMBS_Window_Option.window.y + SSMBS_Window_Option.drawWindowY >= Graphics.height ){
			SSMBS_Window_Option.window.y = Graphics.height - SSMBS_Window_Option.drawWindowY;
		}
		$gameSystem.windowOptionX = SSMBS_Window_Option.window.x;
		$gameSystem.windowOptionY = SSMBS_Window_Option.window.y;
	}
	//判定指针位置在窗口内
	let window_stX = SSMBS_Window_Option.window.x;
	let window_stY = SSMBS_Window_Option.window.y;
	let window_edX = window_stX+SSMBS_Window_Option.width;
	let window_edY = window_stY+SSMBS_Window_Option.height;
	if(ssmbsBasic.isTouching(window_stX,window_stY,window_edX,window_edY)){
		$gamePlayer.battler()._tp = 99 ;
	} 
	//ConfigManager['bgmVolume']
	let line = 0;
	SSMBS_Window_Option.window.bitmap.fontSize = SSMBS_Window_Option.defaultFontSize+2;
	SSMBS_Window_Option.window.bitmap.drawText( '音量设置', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight , SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'center' );
	line += 1.2 ;
	SSMBS_Window_Option.window.bitmap.fontSize = SSMBS_Window_Option.defaultFontSize;
	SSMBS_Window_Option.window.bitmap.drawText( TextManager.bgmVolume, SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight , SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	SSMBS_Window_Option.window.bitmap.fillRect( SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset , SSMBS_Window_Option.volumeWidth  , SSMBS_Window_Option.volumeHeight,'#111111' );
	SSMBS_Window_Option.bgmRate = Number(ConfigManager['bgmVolume']) / 100;
	SSMBS_Window_Option.window.bitmap.fillRect( SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset , (SSMBS_Window_Option.volumeWidth)*SSMBS_Window_Option.bgmRate, SSMBS_Window_Option.volumeHeight,'#ffffff' );
	SSMBS_Window_Option.window.bitmap.drawText( ConfigManager['bgmVolume'] + '%', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight , SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
	
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset + SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset + SSMBS_Window_Option.lineHeight ){
		if(TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow ){
			if(TouchInput.x - (SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset)>SSMBS_Window_Option.bgmRate*SSMBS_Window_Option.volumeWidth){
				ConfigManager['bgmVolume'] ++ ;
			}
			if(TouchInput.x - (SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset)<SSMBS_Window_Option.bgmRate*SSMBS_Window_Option.volumeWidth){
				ConfigManager['bgmVolume'] -- ;
			}
			ConfigManager['bgmVolume'] = ConfigManager['bgmVolume'].clamp(0,100);
		}
	};
	
	line ++ ;
	SSMBS_Window_Option.window.bitmap.drawText( TextManager.bgsVolume, SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	SSMBS_Window_Option.window.bitmap.fillRect( SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset , SSMBS_Window_Option.volumeWidth  , SSMBS_Window_Option.volumeHeight,'#111111' );
	SSMBS_Window_Option.bgsRate = Number(ConfigManager['bgsVolume']) / 100;
	SSMBS_Window_Option.window.bitmap.fillRect( SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset , (SSMBS_Window_Option.volumeWidth)*SSMBS_Window_Option.bgsRate, SSMBS_Window_Option.volumeHeight,'#ffffff' );
	SSMBS_Window_Option.window.bitmap.drawText( ConfigManager['bgsVolume'] + '%', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight , SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
	
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset + SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset + SSMBS_Window_Option.lineHeight ){
		if(TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow ){
			if(TouchInput.x - (SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset)>SSMBS_Window_Option.bgsRate*SSMBS_Window_Option.volumeWidth){
				ConfigManager['bgsVolume'] ++ ;
			}
			if(TouchInput.x - (SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset)<SSMBS_Window_Option.bgsRate*SSMBS_Window_Option.volumeWidth){
				ConfigManager['bgsVolume'] -- ;
			}
			ConfigManager['bgsVolume'] = ConfigManager['bgsVolume'].clamp(0,100);
		}
	};

	line ++ ;
	SSMBS_Window_Option.window.bitmap.drawText( TextManager.meVolume, SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	SSMBS_Window_Option.window.bitmap.fillRect( SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset , SSMBS_Window_Option.volumeWidth  , SSMBS_Window_Option.volumeHeight,'#111111' );
	SSMBS_Window_Option.meRate = Number(ConfigManager['meVolume']) / 100;
	SSMBS_Window_Option.window.bitmap.fillRect( SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset , (SSMBS_Window_Option.volumeWidth)*SSMBS_Window_Option.meRate, SSMBS_Window_Option.volumeHeight,'#ffffff' );
	SSMBS_Window_Option.window.bitmap.drawText( ConfigManager['meVolume'] + '%', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight , SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
	
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset + SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset + SSMBS_Window_Option.lineHeight ){
		if(TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow ){
			if(TouchInput.x - (SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset)>SSMBS_Window_Option.meRate*SSMBS_Window_Option.volumeWidth){
				ConfigManager['meVolume'] ++ ;
			}
			if(TouchInput.x - (SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset)<SSMBS_Window_Option.meRate*SSMBS_Window_Option.volumeWidth){
				ConfigManager['meVolume'] -- ;
			}
			ConfigManager['meVolume'] = ConfigManager['meVolume'].clamp(0,100);
		}
	};
	
	line ++ ;
	SSMBS_Window_Option.window.bitmap.drawText( TextManager.seVolume, SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	SSMBS_Window_Option.window.bitmap.fillRect( SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset , SSMBS_Window_Option.volumeWidth  , SSMBS_Window_Option.volumeHeight,'#111111' );
	SSMBS_Window_Option.seRate = Number(ConfigManager['seVolume']) / 100;
	SSMBS_Window_Option.window.bitmap.fillRect( SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset , (SSMBS_Window_Option.volumeWidth)*SSMBS_Window_Option.seRate, SSMBS_Window_Option.volumeHeight,'#ffffff' );
	SSMBS_Window_Option.window.bitmap.drawText( ConfigManager['seVolume'] + '%', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight , SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
	
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset + SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.volumeYoffset + SSMBS_Window_Option.lineHeight ){
		if(TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow ){
			if(TouchInput.x - (SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset)>SSMBS_Window_Option.seRate*SSMBS_Window_Option.volumeWidth){
				ConfigManager['seVolume'] ++ ;
			}
			if(TouchInput.x - (SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.volumeXoffset)<SSMBS_Window_Option.seRate*SSMBS_Window_Option.volumeWidth){
				ConfigManager['seVolume'] -- ;
			}
			ConfigManager['seVolume'] = ConfigManager['seVolume'].clamp(0,100);
		}
	};
	
	line += 1.5 ;
	SSMBS_Window_Option.window.bitmap.fontSize = SSMBS_Window_Option.defaultFontSize+2;
	SSMBS_Window_Option.window.bitmap.drawText( '按键设置', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight , SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'center' );
	SSMBS_Window_Option.window.bitmap.fontSize = SSMBS_Window_Option.defaultFontSize;
	line += 1.2 ;
	for(let i = 0 ; i < $gameParty.triggerKeys.length/2 ; i ++ ){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
		if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id==i){
			SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
		}
		SSMBS_Window_Option.window.bitmap.drawText( '快捷栏按键 '+(i+1)+': [ '+$gameParty.triggerKeys[i].toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
		if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX &&
			TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
			TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('快捷栏按键 '+(i+1)+': [ '+$gameParty.triggerKeys[i].toUpperCase()+' ] ') && 
			TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
			SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.startX,SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('快捷栏按键 '+(i+1)+': [ '+$gameParty.triggerKeys[i].toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
			if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
				SoundManager.playCursor();
				SSMBS_Window_Option.changeKeyMode.state=true;
				SSMBS_Window_Option.changeKeyMode.id=i;
			}
		};
		line++
	}
	for(let i = $gameParty.triggerKeys.length/2 ; i < $gameParty.triggerKeys.length ; i ++ ){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
		if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id==i){
			SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
		}
		SSMBS_Window_Option.window.bitmap.drawText( '快捷栏按键 '+(i+1)+': [ '+$gameParty.triggerKeys[i].toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + (line-$gameParty.triggerKeys.length/2) * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
		if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('快捷栏按键 '+(i+1)+': [ '+$gameParty.triggerKeys[i].toUpperCase()+' ] '))&&
			TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + (line-$gameParty.triggerKeys.length/2) * SSMBS_Window_Option.lineHeight &&
			TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - SSMBS_Window_Option.startX && 
			TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + (line-$gameParty.triggerKeys.length/2) * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight ){
			SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('快捷栏按键 '+(i+1)+': [ '+$gameParty.triggerKeys[i].toUpperCase()+' ] ')),SSMBS_Window_Option.startY + (line-$gameParty.triggerKeys.length/2) * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('快捷栏按键 '+(i+1)+': [ '+$gameParty.triggerKeys[i].toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
			if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
				SoundManager.playCursor();
				SSMBS_Window_Option.changeKeyMode.state=true;
				SSMBS_Window_Option.changeKeyMode.id=i;
			}
		};
		line++
	}
	line-=3.5;
	
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='dashing'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '奔跑冲刺' + ': [ '+SSMBS_Window_Option.dashingButton.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('奔跑冲刺' + ': [ '+SSMBS_Window_Option.dashingButton.toUpperCase()+' ] ') && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.startX,SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('奔跑冲刺' + ': [ '+SSMBS_Window_Option.dashingButton.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='dashing';
		}
	};
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='showLoot'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '显示掉落' + ': [ '+SSMBS_Window_Option.showLoot.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('显示掉落' + ': [ '+SSMBS_Window_Option.showLoot.toUpperCase()+' ] '))&&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - SSMBS_Window_Option.startX && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('显示掉落' + ': [ '+SSMBS_Window_Option.showLoot.toUpperCase()+' ] ')),SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('显示掉落' + ': [ '+SSMBS_Window_Option.showLoot.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='showLoot';
		}
	};
	line++;
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='showLabel'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '显示称号' + ': [ '+SSMBS_Window_Option.showLabel.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('显示称号' + ': [ '+SSMBS_Window_Option.showLabel.toUpperCase()+' ] ') && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.startX,SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('显示称号' + ': [ '+SSMBS_Window_Option.showLabel.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='showLabel';
		}
	};
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='pickALL'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '拾起所有' + ': [ '+SSMBS_Window_Option.pickALL.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('拾起所有' + ': [ '+SSMBS_Window_Option.pickALL.toUpperCase()+' ] '))&&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - SSMBS_Window_Option.startX && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('拾起所有' + ': [ '+SSMBS_Window_Option.pickALL.toUpperCase()+' ] ')),SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('拾起所有' + ': [ '+SSMBS_Window_Option.pickALL.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='pickALL';
		}
	};
	line+=1.5;
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='inventory'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '物品窗口' + ': [ '+SSMBS_Window_Inventory.hotkey.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('物品窗口' + ': [ '+SSMBS_Window_Inventory.hotkey.toUpperCase()+' ] ') && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.startX,SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('物品窗口' + ': [ '+SSMBS_Window_Inventory.hotkey.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='inventory';
		}
	};
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='equips'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '装备窗口' + ': [ '+SSMBS_Window_Equip.hotkey.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('装备窗口' + ': [ '+SSMBS_Window_Equip.hotkey.toUpperCase()+' ] '))&&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - SSMBS_Window_Option.startX && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('装备窗口' + ': [ '+SSMBS_Window_Equip.hotkey.toUpperCase()+' ] ')),SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('装备窗口' + ': [ '+SSMBS_Window_Equip.hotkey.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='equips';
		}
	};
	line++;
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='skills'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '技能窗口' + ': [ '+SSMBS_Window_Skills.hotkey.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('技能窗口' + ': [ '+SSMBS_Window_Skills.hotkey.toUpperCase()+' ] ') && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.startX,SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('技能窗口' + ': [ '+SSMBS_Window_Skills.hotkey.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='skills';
		}
	};
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='quests'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '任务窗口' + ': [ '+SSMBS_Window_Quest.hotkey.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('任务窗口' + ': [ '+SSMBS_Window_Quest.hotkey.toUpperCase()+' ] '))&&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - SSMBS_Window_Option.startX && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('任务窗口' + ': [ '+SSMBS_Window_Quest.hotkey.toUpperCase()+' ] ')),SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('任务窗口' + ': [ '+SSMBS_Window_Quest.hotkey.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='quests';
		}
	};
	line++;
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='options'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '设置窗口' + ': [ '+SSMBS_Window_Option.hotkey.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('设置窗口' + ': [ '+SSMBS_Window_Option.hotkey.toUpperCase()+' ] ') && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.startX,SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('设置窗口' + ': [ '+SSMBS_Window_Option.hotkey.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='options';
		}
	};
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true&&SSMBS_Window_Option.changeKeyMode.id=='system'){
		SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(24);
	}
	SSMBS_Window_Option.window.bitmap.drawText( '主菜单栏' + ': [ '+SSMBS_Window_System.hotkey.toUpperCase()+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight, SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'right' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('主菜单栏' + ': [ '+SSMBS_Window_System.hotkey.toUpperCase()+' ] '))&&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.width - SSMBS_Window_Option.startX && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.width - (SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('主菜单栏' + ': [ '+SSMBS_Window_System.hotkey.toUpperCase()+' ] ')),SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('主菜单栏' + ': [ '+SSMBS_Window_System.hotkey.toUpperCase()+' ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.changeKeyMode.state=true;
			SSMBS_Window_Option.changeKeyMode.id='system';
		}
	};
	line++;
	SSMBS_Window_Option.window.bitmap.textColor = ColorManager.textColor(0);
	if(SSMBS_Window_Option.changeKeyMode.state==true){
		for(i in SSMBS_Window_Option.keysMapper){
			if(Input.isTriggered(SSMBS_Window_Option.keysMapper[i])){
				SoundManager.playOk();
				if(typeof(SSMBS_Window_Option.changeKeyMode.id)==='string'){
					switch(SSMBS_Window_Option.changeKeyMode.id){
						case 'inventory':
							SSMBS_Window_Inventory.hotkey = SSMBS_Window_Option.keysMapper[i];
						break;
						case 'equips':
							SSMBS_Window_Equip.hotkey = SSMBS_Window_Option.keysMapper[i];
						break;
						case 'skills':
							SSMBS_Window_Skills.hotkey = SSMBS_Window_Option.keysMapper[i];
						break;
						case 'quests':
							SSMBS_Window_Quest.hotkey = SSMBS_Window_Option.keysMapper[i];
						break;
						case 'options':
							SSMBS_Window_Option.hotkey = SSMBS_Window_Option.keysMapper[i];
						break;
						case 'system':
							SSMBS_Window_System.hotkey = SSMBS_Window_Option.keysMapper[i];
						break;
						case 'dashing':
							SSMBS_Window_Option.dashingButton = SSMBS_Window_Option.keysMapper[i];
						break;
						case 'showLoot':
							SSMBS_Window_Option.showLoot =  SSMBS_Window_Option.keysMapper[i];
						break;
						case 'showLabel':
							SSMBS_Window_Option.showLabel =  SSMBS_Window_Option.keysMapper[i];
						break;
						case 'pickALL':
							SSMBS_Window_Option.pickALL =  SSMBS_Window_Option.keysMapper[i];
						break;
					}
				}else{
					$gameParty.triggerKeys[SSMBS_Window_Option.changeKeyMode.id] = SSMBS_Window_Option.keysMapper[i];
				}
				
				SSMBS_Window_Option.changeKeyMode.state=false;
				SSMBS_Window_Option.changeKeyMode.id=-1;
			}
		}
	}
	line += 1.5 ;
	SSMBS_Window_Option.window.bitmap.fontSize = SSMBS_Window_Option.defaultFontSize+2;
	SSMBS_Window_Option.window.bitmap.drawText( '其他设置', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight , SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'center' );
	SSMBS_Window_Option.window.bitmap.fontSize = SSMBS_Window_Option.defaultFontSize;
	line += 1.2 ;
	
	let text = '显示';
	if(!SSMBS_Window_Option.helmetSwitch){
		text = '隐藏';
	};
	SSMBS_Window_Option.window.bitmap.drawText( '显示头盔: [ '+text+' ] ', SSMBS_Window_Option.startX, SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight , SSMBS_Window_Option.width - SSMBS_Window_Option.startX*2 ,SSMBS_Window_Option.lineHeight,'left' );
	if( TouchInput.x >= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX &&
		TouchInput.y >= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight &&
		TouchInput.x <= SSMBS_Window_Option.window.x + SSMBS_Window_Option.startX + SSMBS_Window_Option.window.bitmap.measureTextWidth('显示头盔: [ '+text+'  ] ') && 
		TouchInput.y <= SSMBS_Window_Option.window.y + SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight + SSMBS_Window_Option.lineHeight){
		SSMBS_Window_Option.windowChooser.bitmap.fillRect(SSMBS_Window_Option.startX,SSMBS_Window_Option.startY + line * SSMBS_Window_Option.lineHeight,SSMBS_Window_Option.window.bitmap.measureTextWidth('显示头盔: [ '+text+'  ] '),SSMBS_Window_Option.lineHeight,'#FFFFFF');
		if(TouchInput.isTriggered() && !this.isDrawing && !this.drawingWindow ){
			SoundManager.playCursor();
			SSMBS_Window_Option.helmetSwitch = !SSMBS_Window_Option.helmetSwitch;
		}
	};
};