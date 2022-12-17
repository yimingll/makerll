//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - System Window
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 系统窗口
 * @author 神仙狼
 *	
 * @help
 * 
 */



var SSMBS_Window_System = SSMBS_Window_System||{};

SSMBS_Window_System.hotkey = 'escape';

SSMBS_Window_System.titleFontSize = 16;
SSMBS_Window_System.windowTitle = ' · 主菜单 · '/* +' ( '+SSMBS_Window_System.hotkey.toUpperCase()+' ) ' */;
SSMBS_Window_System.titleColor = '#800000'
SSMBS_Window_System.position = 1; //0为角色位置 1为固定屏幕中央

SSMBS_Window_System.width = 96;
SSMBS_Window_System.height = 24;
SSMBS_Window_System.choiceColor = 7;
SSMBS_Window_System.choices = ['物品','装备','技能','任务','系统','返回','回到标题界面'];

SSMBS_Window_System.fontSize = 12;
SSMBS_Window_System.wordStartY = 6;
SSMBS_Window_System.backgroundOpacity = 255;
SSMBS_Window_System.addSpeed = 10;
SSMBS_Window_System.fixX = 24;
SSMBS_Window_System.preWidth = 8;
SSMBS_Window_System.preffix = ' · ';

SSMBS_Window_System.constStartY = 256; //固定模式下的起始Y
SSMBS_Window_System.constFontSize = 14;//固定模式下字体大小
SSMBS_Window_System.constLineWidth = 96; //固定模式下选项宽度
SSMBS_Window_System.constLineHeight = 30;//固定模式下选项高度



const _SSMBS_Window_System_mapLoad = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_SSMBS_Window_System_mapLoad.call(this);
	SSMBS_Window_System.XfixNow = 0;
	SSMBS_Window_System.isOpen = false;
	this.createSystemWindow();
};

const _SSMBS_Window_System_mapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_SSMBS_Window_System_mapUpdate.call(this);
	if(!SSMBS_Window_Option.changeKeyMode.state && Input.isTriggered(SSMBS_Window_System.hotkey)){
		SSMBS_Window_System.isOpen = !SSMBS_Window_System.isOpen;
	}
	if(SSMBS_Window_System.isOpen){
		
		if(SSMBS_Window_System.XfixNow<SSMBS_Window_System.fixX){
			SSMBS_Window_System.XfixNow++;
		}
		if(this.systemUIBKG.opacity<SSMBS_Window_System.backgroundOpacity){
			this.systemUIBKG.opacity+= SSMBS_Window_System.addSpeed/2;
		}
		this.systemUIText.opacity += SSMBS_Window_System.addSpeed;
		if(this.chooseBar.opacity<=SSMBS_Window_System.backgroundOpacity/2){
			this.chooseBar.opacity +=SSMBS_Window_System.addSpeed;
		}
	}else{
		if(SSMBS_Window_System.XfixNow>0){
			SSMBS_Window_System.XfixNow--;
		}
		this.systemUIBKG.opacity -= SSMBS_Window_System.addSpeed/2;
		this.systemUIText.opacity -= SSMBS_Window_System.addSpeed;
		this.chooseBar.opacity -=SSMBS_Window_System.addSpeed;
	}
	if(this.systemUIBKG.opacity){
		this.updateSystemWindow();
	}
	
};

Scene_Map.prototype.createSystemWindow = function(){
	this.systemUIBKG = new Sprite( new Bitmap( Graphics.width ,Graphics.height ));
	this.systemUIBKG.opacity = 0;
	this.systemUIBKG.blendMode = 2 ;
	this.addChild(this.systemUIBKG);
	this.chooseBar = new Sprite( new Bitmap( SSMBS_Window_System.constLineWidth*2 ,SSMBS_Window_System.constLineHeight ));
	this.chooseBar.blendMode = 1 ;
	this.chooseBar.opacity = 0;
	this.addChild(this.chooseBar);
	this.systemUIText = new Sprite( new Bitmap( Graphics.width ,Graphics.height ));
	this.systemUIText.bitmap.fontSize = SSMBS_Window_System.fontSize;
	this.systemUIText.opacity = 0;
	this.addChild(this.systemUIText);

};

Scene_Map.prototype.updateSystemWindow = function(){
	this.systemUIBKG.bitmap.clear();
	this.systemUIText.bitmap.clear();
	this.chooseBar.bitmap.clear();
	// this.systemUIBKG.bitmap.fillRect( Graphics.width - SSMBS_Window_System.width, 0 , SSMBS_Window_System.width , SSMBS_Window_System.height ,'#000000');
	let choice = SSMBS_Window_System.choices
	if(!SSMBS_Window_System.position){
		for( let i = 0 ; i < choice.length ; i ++ ){
			let xOffset = SSMBS_Window_System.XfixNow;
			let yOffset;
			if($gamePlayer.screenX()+48+SSMBS_Window_System.width>Graphics.width){
				xOffset = SSMBS_Window_System.position?Graphics.width/2:Graphics.width-SSMBS_Window_System.width - (SSMBS_Window_System.width/SSMBS_Window_System.preWidth)/2;
			}else{
				xOffset = SSMBS_Window_System.position?Graphics.width/2:$gamePlayer.screenX()+48 - (SSMBS_Window_System.width/SSMBS_Window_System.preWidth)/2;
			}
			
			yOffset =  SSMBS_Window_System.position? (Graphics.height/2):($gamePlayer.screenY()-24) 
			this.systemUIBKG.bitmap.gradientFillRect( xOffset+SSMBS_Window_System.XfixNow , yOffset - choice.length/2*(SSMBS_Window_System.height+1) + i*(SSMBS_Window_System.height+1) , SSMBS_Window_System.width , SSMBS_Window_System.height ,'#555555','#ffffff' );
			this.systemUIBKG.bitmap.fillRect( xOffset+SSMBS_Window_System.XfixNow-SSMBS_Window_System.width/SSMBS_Window_System.preWidth , yOffset - choice.length/2*(SSMBS_Window_System.height+1) + i*(SSMBS_Window_System.height+1) , SSMBS_Window_System.width/SSMBS_Window_System.preWidth , SSMBS_Window_System.height ,'#000000' );
			this.systemUIText.bitmap.drawText( SSMBS_Window_System.preffix+choice[i],xOffset+SSMBS_Window_System.XfixNow+SSMBS_Window_System.wordStartY , yOffset - choice.length/2*(SSMBS_Window_System.height+1) + i*(SSMBS_Window_System.height+1) , SSMBS_Window_System.width , SSMBS_Window_System.height);
			let choice_stX = this.systemUIBKG.x + xOffset+SSMBS_Window_System.XfixNow;
			let choice_stY = yOffset - choice.length/2*(SSMBS_Window_System.height+1) + i*(SSMBS_Window_System.height+1) ;
			let choice_edX = choice_stX+SSMBS_Window_System.width;
			let choice_edY = choice_stY+SSMBS_Window_System.height;
			if(ssmbsBasic.isTouching(choice_stX,choice_stY,choice_edX,choice_edY)){
				$gamePlayer.battler()._tp = 99;
				this.systemUIBKG.bitmap.gradientFillRect( xOffset+SSMBS_Window_System.XfixNow , yOffset - choice.length/2*(SSMBS_Window_System.height+1) + i*(SSMBS_Window_System.height+1) , SSMBS_Window_System.width , SSMBS_Window_System.height ,ColorManager.textColor(SSMBS_Window_System.choiceColor),'#ffffff' );
				this.systemUIBKG.bitmap.fillRect( xOffset+SSMBS_Window_System.XfixNow-SSMBS_Window_System.width/SSMBS_Window_System.preWidth , $gamePlayer.screenY()-24 - choice.length/2*(SSMBS_Window_System.height+1) + i*(SSMBS_Window_System.height+1) , SSMBS_Window_System.width/SSMBS_Window_System.preWidth , SSMBS_Window_System.height ,'#000000');
				if(TouchInput.isClicked()){
					SoundManager.playCursor();
					switch (choice[i]){
						case '物品':
							SSMBS_Window_Inventory.isOpen = true;
							break;
						case '装备':
							SSMBS_Window_Equip.isOpen = true;
							break;
						case '技能':
							SSMBS_Window_Skills.isOpen = true;
							break;
						case '任务':
							SSMBS_Window_Quest.isOpen = true;
							break;
						case '系统':
							SSMBS_Window_Option.isOpen = true;
							break;
						case '回到标题界面':
							SceneManager.push(Scene_Title);
							break;
					}
				}
				
			}
		}
	}else{
		let xPositon = Graphics.width/2;
		let yPositon = SSMBS_Window_System.constStartY;
		let lineHeight = SSMBS_Window_System.constLineHeight;
		SSMBS_Window_System.nowChoice;
		SSMBS_Window_System.nowChoiceNew;
		if(SSMBS_Window_System.nowChoice!=SSMBS_Window_System.nowChoiceNew){
			SSMBS_Window_System.nowChoice+=((SSMBS_Window_System.nowChoiceNew-SSMBS_Window_System.nowChoice))/10
		}
		
		for( let i = 0 ; i < choice.length ; i ++ ){
			let choose_stx = xPositon-SSMBS_Window_System.constLineWidth;
			let choose_sty = i * (lineHeight+1) + yPositon;
			let choose_edX = choose_stx+SSMBS_Window_System.constLineWidth*2;
			let choose_edY = choose_sty+SSMBS_Window_System.constLineHeight;
			if(ssmbsBasic.isTouching(choose_stx,choose_sty,choose_edX,choose_edY)){
				SSMBS_Window_System.nowChoiceNew = i;
				if(SSMBS_Window_System.nowChoice==undefined){
					SSMBS_Window_System.nowChoice = SSMBS_Window_System.nowChoiceNew;
				}
				$gamePlayer.battler()._tp = 99;
			}
			if(i===0){
				this.systemUIText.bitmap.fontSize = SSMBS_Window_System.titleFontSize ;
				this.systemUIText.bitmap.fontBold  = true;
				this.systemUIBKG.bitmap.gradientFillRect( xPositon , (i-1) * (lineHeight+1) + yPositon , SSMBS_Window_System.constLineWidth ,SSMBS_Window_System.constLineHeight ,SSMBS_Window_System.titleColor,'#ffffff' );
				this.systemUIBKG.bitmap.gradientFillRect( xPositon-SSMBS_Window_System.constLineWidth , (i-1) * (lineHeight+1) + yPositon , SSMBS_Window_System.constLineWidth ,SSMBS_Window_System.constLineHeight ,'#ffffff',SSMBS_Window_System.titleColor );
				this.systemUIBKG.bitmap.gradientFillRect( xPositon , i * (lineHeight+1) + yPositon , SSMBS_Window_System.constLineWidth ,SSMBS_Window_System.constLineHeight ,'#555555','#ffffff' );
				this.systemUIBKG.bitmap.gradientFillRect( xPositon-SSMBS_Window_System.constLineWidth , i * (lineHeight+1) + yPositon , SSMBS_Window_System.constLineWidth ,SSMBS_Window_System.constLineHeight ,'#ffffff','#555555' );
				this.systemUIText.bitmap.drawText( SSMBS_Window_System.windowTitle, xPositon-SSMBS_Window_System.constLineWidth,(i-1) * (lineHeight+1) + yPositon ,SSMBS_Window_System.constLineWidth*2 ,SSMBS_Window_System.constLineHeight , 'center');
			}
			this.systemUIText.bitmap.fontSize = SSMBS_Window_System.constFontSize ;
			this.systemUIText.bitmap.fontBold  = false;

			this.systemUIBKG.bitmap.gradientFillRect( xPositon , i * (lineHeight+1) + yPositon , SSMBS_Window_System.constLineWidth ,SSMBS_Window_System.constLineHeight ,'#555555','#ffffff' );
			this.systemUIBKG.bitmap.gradientFillRect( xPositon-SSMBS_Window_System.constLineWidth , i * (lineHeight+1) + yPositon , SSMBS_Window_System.constLineWidth ,SSMBS_Window_System.constLineHeight ,'#ffffff','#555555' );
			this.systemUIText.bitmap.drawText( choice[i], xPositon-SSMBS_Window_System.constLineWidth,i * (lineHeight+1) + yPositon ,SSMBS_Window_System.constLineWidth*2 ,SSMBS_Window_System.constLineHeight , 'center');
			this.chooseBar.bitmap.gradientFillRect( SSMBS_Window_System.constLineWidth , 0 , SSMBS_Window_System.constLineWidth ,SSMBS_Window_System.constLineHeight ,'#ffffff','#000000' );
			this.chooseBar.bitmap.gradientFillRect( 0 ,0 , SSMBS_Window_System.constLineWidth ,SSMBS_Window_System.constLineHeight ,'#000000','#ffffff');
			this.chooseBar.x = xPositon-SSMBS_Window_System.constLineWidth;
			this.chooseBar.y = SSMBS_Window_System.nowChoice * (lineHeight+1) + yPositon;
			
			if(TouchInput.isClicked()&&SSMBS_Window_System.isOpen==true){
				SSMBS_Window_System.isOpen = false;
				SoundManager.playCursor();
				switch (choice[SSMBS_Window_System.nowChoiceNew]){
					case '物品':
						SSMBS_Window_Inventory.isOpen = true;
						break;
					case '装备':
						SSMBS_Window_Equip.isOpen = true;
						break;
					case '技能':
						SSMBS_Window_Skills.isOpen = true;
						break;
					case '任务':
						SSMBS_Window_Quest.isOpen = true;
						break;
					case '系统':
						SSMBS_Window_Option.isOpen = true;
						break;
					case '返回':
						SSMBS_Window_System.isOpen = false;
						break;
					case '回到标题界面':
						SceneManager.push(Scene_Title);
						break;
				}
			}
		}
	}
	
};
