// ==============================
// 1. 變數定義 (Global Variables)
// ==============================

// --- 角色 1 (女角) 控制：左箭頭 / 右箭頭 / 特殊動作：SPACE ---
let orig_walkSheet;
const ORIG_WALK_FRAMES = 8;
let orig_walkFrameW = 0;
let orig_walkFrameH = 0;
let orig_runSheet;
const ORIG_RUN_FRAMES = 22;
let orig_runFrameW = 0;
let orig_runFrameH = 0;
let orig_xPos = 0;
let orig_yPos = 0;
let orig_baseY = 0; 
const ORIG_SPEED = 4;
let orig_dir = 1; 
let orig_isRunning = false;
let orig_runFrameIndex = 0;
const ORIG_RUN_BOB_AMPLITUDE = 30;
let orig_isMoving = false; 
let orig_walkFrameIndex = 0; 

// --- 角色 2 (男角1) 控制：A / D / 特殊動作：W ---
let new_walkSheet, new_runSheet; 
const NEW_WALK_FRAMES = 9;
const NEW_RUN_FRAMES = 12;
let new_walkFrameW = 0;
let new_walkFrameH = 0;
let new_runFrameW = 0;
let new_runFrameH = 0;
let new_xPos = 0;
let new_yPos = 0;
let new_baseY = 0; 
const NEW_SPEED = 4;
const NEW_RUN_BOB_AMPLITUDE = 20;
let new_dir = 1; 
let new_isRunning = false;
let new_runFrameIndex = 0;
let new_isMoving = false; 
let new_walkFrameIndex = 0; 

// --- 角色 3 (男角2) 控制：J / L / 特殊動作：I ---
let third_walkSheet, third_runSheet;
const THIRD_WALK_FRAMES = 8;
const THIRD_RUN_FRAMES = 5;
let third_walkFrameW = 0;
let third_walkFrameH = 0;
let third_runFrameW = 0;
let third_runFrameH = 0;
let third_xPos = 0;
let third_yPos = 0;
let third_baseY = 0;
const THIRD_SPEED = 4;
const THIRD_RUN_BOB_AMPLITUDE = 15;
let third_dir = 1; 
let third_isRunning = false;
let third_runFrameIndex = 0;
let third_isMoving = false; 
let third_walkFrameIndex = 0;

// --- 角色 special 動畫 (碰撞觸發的替換動畫) ---
let orig_happySheet; // 開心笑 (9 frames)
const ORIG_HAPPY_FRAMES = 9;
let orig_happyFrameW = 0;
let orig_happyFrameH = 0;
let orig_isHappy = false;
let orig_happyFrameIndex = 0;
let orig_happyPlayed = false;
const ORIG_HAPPY_STAY_FRAME = 5;
let orig_specialStay = false;

let new_stopCombSheet; // 男角1 停下來梳頭 (14 frames)
const NEW_STOPCOMB_FRAMES = 14;
let new_stopCombFrameW = 0;
let new_stopCombFrameH = 0;
let new_isStopComb = false;
let new_stopCombFrameIndex = 0;
let new_stopCombPlayed = false;
const NEW_STOPCOMB_STAY_FRAME = 13;
let new_specialStay = false;

let third_thinkSheet; // 男角2 思考 (14 frames)
const THIRD_THINK_FRAMES = 14;
let third_thinkFrameW = 0;
let third_thinkFrameH = 0;
let third_isThink = false;
let third_thinkFrameIndex = 0;
let third_thinkPlayed = false;
const THIRD_THINK_STAY_FRAME = 13;
let third_specialStay = false;

// --- 玩家角色 (Player) 控制：F / H / G / T ---
let player_leftRightSheet;     // 玩家左右走
let player_backSheet;           // 玩家向後走
let player_frontSheet;          // 玩家向前走

const PLAYER_LEFTRIGHT_FRAMES = 3;
const PLAYER_BACK_FRAMES = 4;
const PLAYER_FRONT_FRAMES = 3;

let player_leftRightFrameW = 0;
let player_leftRightFrameH = 0;
let player_backFrameW = 0;
let player_backFrameH = 0;
let player_frontFrameW = 0;
let player_frontFrameH = 0;

let player_xPos = 0;
let player_yPos = 0;
let player_baseY = 0;
let player_originalX = 0;  // 向前走開始位置
let player_originalY = 0;  // 向前走開始位置

const PLAYER_SPEED = 8; // 玩家速度加快

let player_dir = 1;  // 1 = 右, -1 = 左
let player_walkFrameIndex = 0;
let player_frontFrameIndex = 0;
let player_animationState = 'leftRight';  // 'leftRight', 'back', 'front'
let player_isMoving = false;
let player_isFrontWalking = false;  // 向前走進行中
let player_scale = 1;  // 縮放係數（與其他角色大小相符） 

// ==============================
// 問答、UI、計分相關變數
// ==============================
let score = 0;
const TARGET_SCORE = 30;
let gameState = 'playing'; // 'playing','success','fail'

// 問題庫（依角色分組）
const questions = {
  orig: [
    {q: '在 Alien Stage 的主要角色中，Mizi (美智) 喜歡的對象是誰？', a: ['Sua','秀雅'], hint: 'Mizi 總是對她特別關注，她的名字是以 S 開頭'},
    {q: '在《Alien Stage》中，根據其身體症狀（皮膚變色與異常），Luak (盧卡) 可能患有什麼疾病？', a: ['雷諾氏症','雷諾氏'], hint: '這種疾病會讓肢體末端 (如手指) 因為寒冷或壓力而缺血變色。'}
  ],
  new: [
    {q: '在日本動畫《蠟筆小新》中，小新最害怕、也最容易搞錯名字的幼稚園老師是哪一位？', a: ['松坂老師','松坂梅'], hint: '這位老師常常因為缺錢而煩惱，而且個性比較傲嬌'},
    {q: '小新喜歡模仿的、常在電視上出現的超級英雄角色的名字是什麼？', a: ['動感超人'], hint: '他的標誌性動作是發射動感光波。'}
  ],
  third: [
    {q: '《Fate/stay night》中，在第五次聖杯戰爭中，衛宮士郎的主要從者 (Servant) 職階是什麼？', a: ['Saber','劍士'], hint: '他的真實身份是一位傳說中的亞瑟王。'},
    {q: '衛宮士郎的固有結界叫做什麼？', a: ['無限劍製'], hint: '這是一個以 「劍」 為主題的 「製造」 空間類魔術。'}
  ]
};

// 已使用題目追蹤（避免重複直到循環）
let usedQuestions = {orig: [], new: [], third: []};
// 鏡頭偏移（用於視差）
let camX = 0;
// 遊戲是否開始（開始畫面控制）
let gameStarted = false;
let startOverlayDiv = null;
let infoButton = null;
let infoPanel = null;
let leftInfoPanel = null;

// UI 與互動物件
let activeDialog = null; // 存放目前的 DOM 元素群
let activeQuestion = null;
let orig_dialogShown = false;
let new_dialogShown = false;
let third_dialogShown = false;

// 幽靈提示資源及狀態
let ghost_leftRightSheet, ghost_frontSheet, ghost_backSheet;
let ghost_x = 100, ghost_y = 100;
let ghostActive = false; // 是否顯示幽靈

// 用於簡單視覺特效
let particles = [];

// ==============================
// 2. 預載入 (preload)
// ==============================
function preload() {
  orig_walkSheet = loadImage('圖片/走路/走路.png');
  orig_runSheet = loadImage('圖片/跑步/跑步.png');
  
  new_walkSheet = loadImage('圖片/男角1走路/男角1走路.png');
  new_runSheet = loadImage('圖片/男角1跑步/男角1跑步.png');
  
  third_walkSheet = loadImage('圖片/男角2走路/男角2走路.png');
  third_runSheet = loadImage('圖片/男角2跑步/男角2跑步.png');

  // 玩家角色圖檔
  player_leftRightSheet = loadImage('圖片/玩家左右走/玩家左右走.png');
  player_backSheet = loadImage('圖片/玩家向後走/玩家向後走.png');
  player_frontSheet = loadImage('圖片/玩家向前走/玩家向前走.png');
  
  // special 動畫圖檔
  orig_happySheet = loadImage('圖片/開心笑/開心笑.png');
  new_stopCombSheet = loadImage('圖片/男角1停下來梳頭/男角1停下來梳頭.png');
  third_thinkSheet = loadImage('圖片/男角2思考/男角2思考.png');
  // 幽靈提示圖檔
  ghost_leftRightSheet = loadImage('圖片/幽靈左右走/幽靈左右走.png');
  ghost_frontSheet = loadImage('圖片/幽靈向前走/幽靈向前走.png');
  ghost_backSheet = loadImage('圖片/幽靈向後走/幽靈向後走.png');
}// ==============================
// 3. 設定 (setup)
// ==============================
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  imageMode(CENTER);

  // --- 尺寸計算 (Calculate frame dimensions) ---
  if (orig_walkSheet) {
    orig_walkFrameW = floor(orig_walkSheet.width / ORIG_WALK_FRAMES);
    orig_walkFrameH = orig_walkSheet.height;
  }
  if (orig_runSheet) {
    orig_runFrameW = floor(orig_runSheet.width / ORIG_RUN_FRAMES);
    orig_runFrameH = orig_runSheet.height;
  }
  if (new_walkSheet) {
    new_walkFrameW = floor(new_walkSheet.width / NEW_WALK_FRAMES);
    new_walkFrameH = new_walkSheet.height;
  }
  if (new_runSheet) {
    new_runFrameW = floor(new_runSheet.width / NEW_RUN_FRAMES);
    new_runFrameH = new_runSheet.height;
  }
  if (third_walkSheet) {
    third_walkFrameW = floor(third_walkSheet.width / THIRD_WALK_FRAMES);
    third_walkFrameH = third_walkSheet.height;
  }
  if (third_runSheet) {
    third_runFrameW = floor(third_runSheet.width / THIRD_RUN_FRAMES);
    third_runFrameH = third_runSheet.height;
  }

  // special 動畫幀尺寸
  if (orig_happySheet) {
    orig_happyFrameW = floor(orig_happySheet.width / ORIG_HAPPY_FRAMES);
    orig_happyFrameH = orig_happySheet.height;
  }
  if (new_stopCombSheet) {
    new_stopCombFrameW = floor(new_stopCombSheet.width / NEW_STOPCOMB_FRAMES);
    new_stopCombFrameH = new_stopCombSheet.height;
  }
  if (third_thinkSheet) {
    third_thinkFrameW = floor(third_thinkSheet.width / THIRD_THINK_FRAMES);
    third_thinkFrameH = third_thinkSheet.height;
  }

  // --- 初始化位置 (Initial positions) ---
  let commonY = height / 2;
  let totalCharacterWidth = orig_walkFrameW + new_walkFrameW + third_walkFrameW + 100;
  let startX = width / 2 - totalCharacterWidth / 2;

  orig_xPos = startX + orig_walkFrameW / 2;
  orig_yPos = commonY;
  orig_baseY = orig_yPos;

  new_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW / 2;
  new_yPos = commonY;
  new_baseY = new_yPos;

  third_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW + 50 + third_walkFrameW / 2;
  third_yPos = commonY;
  third_baseY = third_yPos;

  // 玩家角色幀尺寸計算
  if (player_leftRightSheet) {
    player_leftRightFrameW = floor(player_leftRightSheet.width / PLAYER_LEFTRIGHT_FRAMES);  // 100 / 3
    player_leftRightFrameH = player_leftRightSheet.height;  // 64
  }
  if (player_backSheet) {
    player_backFrameW = floor(player_backSheet.width / PLAYER_BACK_FRAMES);  // 135 / 4
    player_backFrameH = player_backSheet.height;  // 63
  }
  if (player_frontSheet) {
    player_frontFrameW = floor(player_frontSheet.width / PLAYER_FRONT_FRAMES);  // 100 / 3
    player_frontFrameH = player_frontSheet.height;  // 64
  }

  // 玩家角色縮放（與角色1大小的一半）
  player_scale = (orig_walkFrameW / player_leftRightFrameW) * 0.5;

  // 玩家角色初始位置（畫布中央左方）
  player_xPos = width * 0.15;
  player_yPos = height / 2;
  player_baseY = player_yPos;
  player_originalX = player_xPos;
  player_originalY = player_yPos;
  // 建立開始畫面（半透明全螢幕規則說明）
  createStartOverlay();
}// ==============================
// 4. 繪製 (draw) - 遊戲循環主體
// ==============================
function draw() {
  // 計算鏡頭偏移（依玩家位置左右移動，並限制最大位移）
  const maxOffset = width * 0.25;
  camX = constrain((player_xPos - width * 0.5) * 0.5, -maxOffset, maxOffset);
  drawBackground(camX);

  // === 角色 1 (Original) 控制：箭頭鍵 ===
  orig_isMoving = keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW);
  if (keyIsDown(LEFT_ARROW)) {
    orig_xPos -= ORIG_SPEED;
    orig_dir = -1;
  } else if (keyIsDown(RIGHT_ARROW)) {
    orig_xPos += ORIG_SPEED;
    orig_dir = 1;
  }
	// 按鍵持續控制：按著 SPACE 就持續跑，放開就結束（若正在移動則無法跑）
	orig_isRunning = keyIsDown(32) && !orig_isMoving;
	if (!orig_isRunning) {
		orig_runFrameIndex = 0;
		orig_yPos = orig_baseY;
	}


  // === 角色 2 (男角1) 控制：A/D 鍵 ===
  new_isMoving = keyIsDown('A'.charCodeAt(0)) || keyIsDown('D'.charCodeAt(0));
  if (keyIsDown('A'.charCodeAt(0))) {
      new_xPos -= NEW_SPEED;
      new_dir = -1;
  } else if (keyIsDown('D'.charCodeAt(0))) {
      new_xPos += NEW_SPEED;
      new_dir = 1;
  }
	// 按鍵持續控制：按著 W 就持續跑，放開就結束（若正在移動則無法跑）
	new_isRunning = keyIsDown('W'.charCodeAt(0)) && !new_isMoving;
	if (!new_isRunning) {
		new_runFrameIndex = 0;
		new_yPos = new_baseY;
	}


  // === 角色 3 (男角2) 控制：J/L 鍵 ===
  // 判斷是否有按鍵 (但實際移動要視是否在思考或停留而定)
  const thirdPressedLeft = keyIsDown('J'.charCodeAt(0));
  const thirdPressedRight = keyIsDown('L'.charCodeAt(0));
  const thirdPressed = thirdPressedLeft || thirdPressedRight;

  // 若正在思考或 special 停留中，禁止移動
  if (!third_isThink && !third_specialStay) {
    third_isMoving = thirdPressed;
    if (thirdPressedLeft) {
      third_xPos -= THIRD_SPEED;
      third_dir = -1;
    } else if (thirdPressedRight) {
      third_xPos += THIRD_SPEED;
      third_dir = 1;
    }
  } else {
    // 在思考或 special 停留時，確保不算作移動
    third_isMoving = false;
  }

  // 按鍵持續控制：按著 I 就持續跑，放開就結束（若正在移動則無法跑）
  third_isRunning = keyIsDown('I'.charCodeAt(0)) && !third_isMoving && !third_isThink && !third_specialStay;
  if (!third_isRunning) {
    third_runFrameIndex = 0;
    third_yPos = third_baseY;
  }

  // === 玩家角色控制：F/H 移動，G 向後走，T 向前走 ===
  player_isMoving = keyIsDown('F'.charCodeAt(0)) || keyIsDown('H'.charCodeAt(0));
  
  if (keyIsDown('F'.charCodeAt(0))) {
    // F 鍵向左移動
    player_xPos -= PLAYER_SPEED;
    player_dir = -1;
  } else if (keyIsDown('H'.charCodeAt(0))) {
    // H 鍵向右移動
    player_xPos += PLAYER_SPEED;
    player_dir = 1;
  }

  // G 鍵切換到向後走動畫
  if (keyIsDown('G'.charCodeAt(0)) && !player_isFrontWalking) {
    player_animationState = 'back';
  }

  // T 鍵觸發向前走動畫（一次性播放，播完後回到原位）
  if (keyIsDown('T'.charCodeAt(0)) && !player_isFrontWalking && player_animationState !== 'back') {
    player_isFrontWalking = true;
    player_frontFrameIndex = 0;
    player_animationState = 'front';
    player_originalX = player_xPos;
    player_originalY = player_yPos;
    // 幽靈預設顯示
    ghostActive = true;
  }

  // 沒有按 F/H 鍵且不在向後走時，回到左右走靜止（第 0 幀）
  if (!player_isMoving && !player_isFrontWalking && player_animationState !== 'back') {
    player_walkFrameIndex = 0;
    player_animationState = 'leftRight';
  }

  // 限制三個角色位置不超出畫布
  orig_xPos = constrain(orig_xPos, 50, width - 50);
  new_xPos = constrain(new_xPos, 50, width - 50);
  third_xPos = constrain(third_xPos, 50, width - 50);
  // 玩家移動邊界（考慮縮放後的寬度）
  let player_displayW = player_leftRightFrameW * player_scale / 2;
  player_xPos = constrain(player_xPos, player_displayW + 10, width - player_displayW - 10);
  
    
  // ==============================
  // 碰撞檢查：玩家與三個角色
  // 使用中心點 AABB 判定
  let pW = player_leftRightFrameW * player_scale;
  let pH = player_leftRightFrameH * player_scale;

  // 原角
  if (!orig_isHappy && !orig_specialStay) {
    let dx = abs(player_xPos - orig_xPos);
    let dy = abs(player_yPos - orig_baseY);
    if (dx < (pW/2 + orig_walkFrameW/2) && dy < (pH/2 + orig_walkFrameH/2)) {
      orig_isHappy = true;
      orig_happyFrameIndex = 0;
    }
  }
  // 男角1
  if (!new_isStopComb && !new_specialStay) {
    let dx = abs(player_xPos - new_xPos);
    let dy = abs(player_yPos - new_baseY);
    if (dx < (pW/2 + new_walkFrameW/2) && dy < (pH/2 + new_walkFrameH/2)) {
      new_isStopComb = true;
      new_stopCombFrameIndex = 0;
    }
  }
  // 男角2
  if (!third_isThink && !third_specialStay) {
    let dx = abs(player_xPos - third_xPos);
    let dy = abs(player_yPos - third_baseY);
    if (dx < (pW/2 + third_walkFrameW/2) && dy < (pH/2 + third_walkFrameH/2)) {
      third_isThink = true;
      third_thinkFrameIndex = 0;
    }
  }

  // 如果 special 已經停留但玩家離開，恢復為走路第 0 幀
  // 原角
  if (orig_specialStay) {
    let dx = abs(player_xPos - orig_xPos);
    let dy = abs(player_yPos - orig_baseY);
    if (!(dx < (pW/2 + orig_walkFrameW/2) && dy < (pH/2 + orig_walkFrameH/2))) {
      orig_specialStay = false;
      orig_happyFrameIndex = 0;
    }
  }
  // 男角1
  if (new_specialStay) {
    let dx = abs(player_xPos - new_xPos);
    let dy = abs(player_yPos - new_baseY);
    if (!(dx < (pW/2 + new_walkFrameW/2) && dy < (pH/2 + new_walkFrameH/2))) {
      new_specialStay = false;
      new_stopCombFrameIndex = 0;
    }
  }
  // 男角2
  if (third_specialStay) {
    let dx = abs(player_xPos - third_xPos);
    let dy = abs(player_yPos - third_baseY);
    if (!(dx < (pW/2 + third_walkFrameW/2) && dy < (pH/2 + third_walkFrameH/2))) {
      third_specialStay = false;
      third_thinkFrameIndex = 0;
    }
  }

  // 如果玩家已經移離角色範圍，且對話框正在顯示，則自動關閉對話框
  // 使用與碰撞相同的判斷，但反向處理
  // 原角
  {
    let dx = abs(player_xPos - orig_xPos);
    let dy = abs(player_yPos - orig_baseY);
    const touching = (dx < (pW/2 + orig_walkFrameW/2) && dy < (pH/2 + orig_walkFrameH/2));
    if (!touching && orig_dialogShown) {
      clearDialog();
      orig_dialogShown = false;
    }
  }
  // 男角1
  {
    let dx = abs(player_xPos - new_xPos);
    let dy = abs(player_yPos - new_baseY);
    const touching = (dx < (pW/2 + new_walkFrameW/2) && dy < (pH/2 + new_walkFrameH/2));
    if (!touching && new_dialogShown) {
      clearDialog();
      new_dialogShown = false;
    }
  }
  // 男角2
  {
    let dx = abs(player_xPos - third_xPos);
    let dy = abs(player_yPos - third_baseY);
    const touching = (dx < (pW/2 + third_walkFrameW/2) && dy < (pH/2 + third_walkFrameH/2));
    if (!touching && third_dialogShown) {
      clearDialog();
      third_dialogShown = false;
    }
  }

  // ==============================
  // 呼叫繪製函式
  // ==============================
  drawOriginalCharacter();
  drawNewCharacter();
  drawThirdCharacter();
  drawPlayerCharacter();
  // 顯示題目對話框：當 special 停留且尚未顯示對話時觸發
  if (orig_specialStay && !orig_dialogShown && gameState === 'playing') {
    showQuestionFor('orig');
    orig_dialogShown = true;
  }
  if (new_specialStay && !new_dialogShown && gameState === 'playing') {
    showQuestionFor('new');
    new_dialogShown = true;
  }
  if (third_specialStay && !third_dialogShown && gameState === 'playing') {
    showQuestionFor('third');
    third_dialogShown = true;
  }

  // 顯示分數與提示幽靈
  drawScoreOverlay();
  drawGhost();
  // 特效粒子系統（支援多種類型）
  if (particles && particles.length > 0) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (p.type === 'confetti') {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.angle += p.va;
        push();
        translate(p.x, p.y);
        rotate(p.angle);
        noStroke();
        fill(p.c);
        rectMode(CENTER);
        rect(0, 0, p.w, p.h);
        pop();
        if (p.y > height + 50) particles.splice(i,1);
      } else if (p.type === 'spark') {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.life -= 1;
        noStroke();
        fill(red(p.c), green(p.c), blue(p.c), map(p.life,0,p.initLife,0,255));
        ellipse(p.x, p.y, p.size);
        if (p.life <= 0) particles.splice(i,1);
      } else if (p.type === 'rain') {
        p.x += p.vx;
        p.y += p.vy;
        stroke(p.c);
        strokeWeight(2);
        line(p.x, p.y, p.x - p.vx*3, p.y - p.vy*0.8);
        if (p.y > height + 20) particles.splice(i,1);
      } else if (p.type === 'cloud') {
        p.x += p.vx;
        p.alpha = p.alpha || 180;
        noStroke();
        fill(30,30,40,p.alpha);
        ellipse(p.x, p.y, p.w, p.h);
        if (p.x > width + 200) particles.splice(i,1);
      } else if (p.type === 'firework') {
        // firework shell rises until vy > -1 then explode
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.ay;
        stroke(p.c);
        strokeWeight(3);
        point(p.x, p.y);
        if (p.vy >= 0 && !p.exploded) {
          // explode into sparks
          p.exploded = true;
          const count = 24 + floor(random(8));
          for (let k=0;k<count;k++) {
            const ang = random(TWO_PI);
            const spd = random(1,6);
            const col = color(random(200,255), random(120,255), random(120,255));
            particles.push({type:'spark', x:p.x, y:p.y, vx:cos(ang)*spd, vy:sin(ang)*spd*0.8, c:col, size:random(2,5), life:60, initLife:60});
          }
          // remove the shell
          particles.splice(i,1);
        }
      } else {
        // fallback simple particle
        p.x += p.vx || 0;
        p.y += p.vy || 0;
        noStroke(); fill(p.c || '#fff'); rect(p.x, p.y, 4, 8);
        if (p.y > height + 50) particles.splice(i,1);
      }
    }
  }
}

function createStartOverlay() {
  if (startOverlayDiv) startOverlayDiv.remove();
  startOverlayDiv = createDiv('').style('position','fixed').style('left','0').style('top','0').style('width','100%').style('height','100%').style('background','rgba(0,0,0,0.45)').style('display','flex').style('align-items','center').style('justify-content','center').style('z-index','10000');
  const box = createDiv('').parent(startOverlayDiv).style('background','rgba(255,255,255,0.95)').style('padding','28px').style('border-radius','12px').style('max-width','760px').style('text-align','left');
  createDiv('遊戲規則').parent(box).style('font-size','28px').style('font-weight','700').style('margin-bottom','10px');
  const rules = '- 操作：玩家使用 F(左) / H(右) 移動；G 向後走；T 向前走\n- 碰到不同角色會觸發題目；每答對 +10 分，答錯 -5 分\n- 達到 30 分為挑戰成功；分數降至 -10 為挑戰失敗\n- 可按提示顯示幽靈與提示文字';
  createP(rules).parent(box).style('line-height','1.4').style('margin','6px 0 14px 0');
  const startBtn = createButton('開始遊戲').parent(box).style('padding','10px 18px').style('font-size','16px').style('border-radius','8px').style('background','#4caf50').style('color','#fff').style('border','none');
  startBtn.mousePressed(()=>{ if (startOverlayDiv) { startOverlayDiv.remove(); startOverlayDiv = null; } startGame(); });
}

function startGame() {
  gameStarted = true;
  ghostActive = true;
  if (!infoButton) {
    infoButton = createButton('說明').style('position','fixed').style('right','18px').style('top','18px').style('padding','8px 10px').style('border-radius','8px').style('background','rgba(255,255,255,0.85)').style('border','1px solid rgba(0,0,0,0.08)').style('z-index','9999');
    infoButton.mousePressed(()=>{ toggleInfoPanel(); });
  }
  // 左上角半透明人物與按鍵說明面板
  if (!leftInfoPanel) {
    leftInfoPanel = createDiv('').style('position','fixed').style('left','18px').style('top','18px').style('padding','10px').style('width','300px').style('background','rgba(255,255,255,0.85)').style('backdrop-filter','blur(4px)').style('border-radius','8px').style('z-index','9999');
    createDiv('角色與操作').parent(leftInfoPanel).style('font-weight','700').style('margin-bottom','6px');
    createP('女角 (原角): ← / → 移動，SPACE 跑步').parent(leftInfoPanel).style('margin','4px 0').style('line-height','1.25');
    createP('男角1: A / D 移動，W 跑步').parent(leftInfoPanel).style('margin','4px 0').style('line-height','1.25');
    createP('男角2: J / L 移動，I 跑步').parent(leftInfoPanel).style('margin','4px 0').style('line-height','1.25');
    createP('玩家: F 向左 / H 向右，G 向後走 (按住)，T 向前走(一次)').parent(leftInfoPanel).style('margin','4px 0').style('line-height','1.25');
  }
}

function toggleInfoPanel() {
  if (infoPanel) { infoPanel.remove(); infoPanel = null; return; }
  infoPanel = createDiv('').style('position','fixed').style('right','18px').style('top','60px').style('width','260px').style('background','rgba(255,255,255,0.95)').style('padding','12px').style('border-radius','8px').style('z-index','9999');
  createDiv('操作說明').parent(infoPanel).style('font-weight','700').style('margin-bottom','6px');
  createP('F: 向左  H: 向右\nG: 向後走（按住）  T: 向前走(一次性)').parent(infoPanel).style('margin','2px 0').style('line-height','1.3');
  createP('提示鍵: 觸發題目時點選「需要提示嗎？」').parent(infoPanel).style('margin','2px 0').style('line-height','1.3');
}
// ==============================
// 5. 繪製角色的獨立函式
// ==============================

// --- 函式：繪製原本的角色 ---
function drawOriginalCharacter() {
  // 如果 special 已經播放完並停留，顯示 special 第 0 幀
  if (orig_specialStay && orig_happySheet) {
    const sx = orig_happyFrameIndex * orig_happyFrameW;
    push();
    translate(orig_xPos, orig_baseY);
    scale(orig_dir, 1);
    image(orig_happySheet, 0, 0, orig_happyFrameW, orig_happyFrameH, sx, 0, orig_happyFrameW, orig_happyFrameH);
    pop();
    return;
  }
  // special: 開心笑（碰撞觸發）
  if (orig_isHappy && orig_happySheet) {
    const sx = orig_happyFrameIndex * orig_happyFrameW;
    push();
    translate(orig_xPos, orig_baseY);
    scale(orig_dir, 1);
    image(orig_happySheet, 0, 0, orig_happyFrameW, orig_happyFrameH, sx, 0, orig_happyFrameW, orig_happyFrameH);
    pop();

    orig_happyFrameIndex++;
    if (orig_happyFrameIndex >= ORIG_HAPPY_FRAMES) {
      orig_isHappy = false;
      // 播放完成後停留在指定幀
      orig_specialStay = true;
      orig_happyFrameIndex = ORIG_HAPPY_STAY_FRAME;
    }
    return;
  }
  // 1. 跑步動畫 (特殊動作，播完一次即停止)
  if (orig_isRunning && orig_runSheet) {
    const currentFrame = orig_runFrameIndex;
    const sx = currentFrame * orig_runFrameW;

    const progress = orig_runFrameIndex / ORIG_RUN_FRAMES;
    let drawY = orig_baseY + sin(progress * TWO_PI) * ORIG_RUN_BOB_AMPLITUDE; 

    push();
    translate(orig_xPos, drawY);
    scale(orig_dir, 1);
    image(orig_runSheet, 0, 0, orig_runFrameW, orig_runFrameH, sx, 0, orig_runFrameW, orig_runFrameH);
    pop();

		orig_runFrameIndex++;
		if (orig_runFrameIndex >= ORIG_RUN_FRAMES) {
			// 若按鍵仍然按著，則循環跑步動畫；否則在上一段已經把 runIndex 重設為 0
			orig_runFrameIndex = 0;
		}
  } 
  // 2. 走路/靜止 (按鍵移動或閒置)
  else if (orig_walkSheet) {
		// 移動時播放走路循環動畫；靜止時顯示第 0 幀（走路靜止）
		if (orig_isMoving) {
			orig_walkFrameIndex++;
			if (orig_walkFrameIndex >= ORIG_WALK_FRAMES) orig_walkFrameIndex = 0;
		} else {
			orig_walkFrameIndex = 0;
		}
		const sx = orig_walkFrameIndex * orig_walkFrameW;

    push();
    translate(orig_xPos, orig_baseY);
    scale(orig_dir, 1);
    image(orig_walkSheet, 0, 0, orig_walkFrameW, orig_walkFrameH, sx, 0, orig_walkFrameW, orig_walkFrameH);
    pop();
  }
}

// --- 函式：繪製男角1 ---
function drawNewCharacter() {
  // 如果 special 已經播放完並停留，顯示 special 第 0 幀
  if (new_specialStay && new_stopCombSheet) {
    const sx = new_stopCombFrameIndex * new_stopCombFrameW;
    push();
    translate(new_xPos, new_baseY);
    scale(new_dir, 1);
    image(new_stopCombSheet, 0, 0, new_stopCombFrameW, new_stopCombFrameH, sx, 0, new_stopCombFrameW, new_stopCombFrameH);
    pop();
    return;
  }

  // special: 男角1 停下來梳頭（碰撞觸發）
  if (new_isStopComb && new_stopCombSheet) {
    const sx = new_stopCombFrameIndex * new_stopCombFrameW;
    push();
    translate(new_xPos, new_baseY);
    scale(new_dir, 1);
    image(new_stopCombSheet, 0, 0, new_stopCombFrameW, new_stopCombFrameH, sx, 0, new_stopCombFrameW, new_stopCombFrameH);
    pop();

    new_stopCombFrameIndex++;
    if (new_stopCombFrameIndex >= NEW_STOPCOMB_FRAMES) {
      new_isStopComb = false;
      // 播放完成後停留在指定幀
      new_specialStay = true;
      new_stopCombFrameIndex = NEW_STOPCOMB_STAY_FRAME;
    }
    return;
  }
  // 1. 跑步動畫 (特殊動作，播完一次即停止)
  if (new_isRunning && new_runSheet) {
    const currentFrame = new_runFrameIndex;
    const sx = currentFrame * new_runFrameW;

    const progress = new_runFrameIndex / NEW_RUN_FRAMES;
    let drawY = new_baseY + sin(progress * TWO_PI) * NEW_RUN_BOB_AMPLITUDE;

    push();
    translate(new_xPos, drawY);
    scale(new_dir, 1);
    image(new_runSheet, 0, 0, new_runFrameW, new_runFrameH, sx, 0, new_runFrameW, new_runFrameH);
    pop();

		new_runFrameIndex++;
		if (new_runFrameIndex >= NEW_RUN_FRAMES) {
			// 若按鍵仍然按著，則循環跑步動畫；否則在 draw() 已重設 runIndex
			new_runFrameIndex = 0;
		}
  } 
  // 2. 走路/靜止 (按鍵移動或閒置)
  else if (new_walkSheet) {
		// 移動時播放走路循環動畫；靜止時顯示第 0 幀（走路靜止）
		if (new_isMoving) {
			new_walkFrameIndex++;
			if (new_walkFrameIndex >= NEW_WALK_FRAMES) new_walkFrameIndex = 0;
		} else {
			new_walkFrameIndex = 0;
		}
		const sx = new_walkFrameIndex * new_walkFrameW;

    push();
    translate(new_xPos, new_baseY);
    scale(new_dir, 1);
    image(new_walkSheet, 0, 0, new_walkFrameW, new_walkFrameH, sx, 0, new_walkFrameW, new_walkFrameH);
    pop();
  }
}

// --- 函式：繪製男角2 ---
function drawThirdCharacter() {
  // 如果 special 已經播放完並停留，顯示 special 第 0 幀
  if (third_specialStay && third_thinkSheet) {
    const sx = third_thinkFrameIndex * third_thinkFrameW;
    push();
    translate(third_xPos, third_baseY);
    scale(third_dir, 1);
    image(third_thinkSheet, 0, 0, third_thinkFrameW, third_thinkFrameH, sx, 0, third_thinkFrameW, third_thinkFrameH);
    pop();
    return;
  }

  // special: 男角2 思考（碰撞觸發）
  if (third_isThink && third_thinkSheet) {
    const sx = third_thinkFrameIndex * third_thinkFrameW;
    push();
    translate(third_xPos, third_baseY);
    scale(third_dir, 1);
    image(third_thinkSheet, 0, 0, third_thinkFrameW, third_thinkFrameH, sx, 0, third_thinkFrameW, third_thinkFrameH);
    pop();

    third_thinkFrameIndex++;
    if (third_thinkFrameIndex >= THIRD_THINK_FRAMES) {
      third_isThink = false;
      // 播放完成後停留在指定幀
      third_specialStay = true;
      third_thinkFrameIndex = THIRD_THINK_STAY_FRAME;
    }
    return;
  }
  // 1. 跑步動畫 (特殊動作，播完一次即停止)
  if (third_isRunning && third_runSheet) {
    const currentFrame = third_runFrameIndex;
    const sx = currentFrame * third_runFrameW;

    const progress = third_runFrameIndex / THIRD_RUN_FRAMES;
    let drawY = third_baseY + sin(progress * TWO_PI) * THIRD_RUN_BOB_AMPLITUDE;

    push();
    translate(third_xPos, drawY);
    scale(third_dir, 1);
    image(third_runSheet, 0, 0, third_runFrameW, third_runFrameH, sx, 0, third_runFrameW, third_runFrameH);
    pop();

		third_runFrameIndex++;
		if (third_runFrameIndex >= THIRD_RUN_FRAMES) {
			// 若按鍵仍然按著，則循環跑步動畫；否則在 draw() 已重設 runIndex
			third_runFrameIndex = 0;
		}
  } 
  // 2. 走路/靜止 (按鍵移動或閒置)
  else if (third_walkSheet) {
		// 移動時播放走路循環動畫；靜止時顯示第 0 幀（走路靜止）
		if (third_isMoving) {
			third_walkFrameIndex++;
			if (third_walkFrameIndex >= THIRD_WALK_FRAMES) third_walkFrameIndex = 0;
		} else {
			third_walkFrameIndex = 0;
		}
		const sx = third_walkFrameIndex * third_walkFrameW; 
      
    push();
    translate(third_xPos, third_baseY);
    scale(third_dir, 1);
    image(third_walkSheet, 0, 0, third_walkFrameW, third_walkFrameH, sx, 0, third_walkFrameW, third_walkFrameH);
    pop();
  }
}

// --- 函式：繪製玩家角色 ---
function drawPlayerCharacter() {
  if (player_animationState === 'front' && player_isFrontWalking && player_frontSheet) {
    // 1. 向前走動畫（一次性播放，播完後回到原位）
    const currentFrame = player_frontFrameIndex;
    const sx = currentFrame * player_frontFrameW;

    push();
    translate(player_xPos, player_yPos);
    scale(player_dir * player_scale, player_scale);
    image(player_frontSheet, 0, 0, player_frontFrameW, player_frontFrameH, sx, 0, player_frontFrameW, player_frontFrameH);
    pop();

    player_frontFrameIndex++;
    if (player_frontFrameIndex >= PLAYER_FRONT_FRAMES) {
      // 向前走播放完畢，回到原位並切回左右走動畫
      player_isFrontWalking = false;
      player_frontFrameIndex = 0;
      player_animationState = 'leftRight';
      player_xPos = player_originalX;
      player_yPos = player_originalY;
      player_walkFrameIndex = 0;
    }
  } else if (player_animationState === 'back' && player_backSheet) {
    // 2. 向後走動畫（按著 G 鍵持續，循環播放）
    if (keyIsDown('G'.charCodeAt(0))) {
      player_walkFrameIndex++;
      if (player_walkFrameIndex >= PLAYER_BACK_FRAMES) {
        player_walkFrameIndex = 0;
      }
    } else {
      // 沒有按 G 鍵則回到向後走第 0 幀
      player_walkFrameIndex = 0;
      player_animationState = 'leftRight';
    }

    const sx = player_walkFrameIndex * player_backFrameW;
    push();
    translate(player_xPos, player_yPos);
    scale(player_dir * player_scale, player_scale);
    image(player_backSheet, 0, 0, player_backFrameW, player_backFrameH, sx, 0, player_backFrameW, player_backFrameH);
    pop();
  } else if (player_leftRightSheet) {
    // 3. 左右走動畫（預設狀態）
    // 移動時播放走路循環動畫；靜止時顯示第 0 幀（走路靜止）
    if (player_isMoving && !player_isFrontWalking) {
      player_walkFrameIndex++;
      if (player_walkFrameIndex >= PLAYER_LEFTRIGHT_FRAMES) {
        player_walkFrameIndex = 0;
      }
    } else {
      player_walkFrameIndex = 0;
    }

    const sx = player_walkFrameIndex * player_leftRightFrameW;
    push();
    translate(player_xPos, player_yPos);
    scale(player_dir * player_scale, player_scale);
    image(player_leftRightSheet, 0, 0, player_leftRightFrameW, player_leftRightFrameH, sx, 0, player_leftRightFrameW, player_leftRightFrameH);
    pop();
  }
}

// ==============================
// 6. 鍵盤事件處理
// ==============================// --- 鍵盤事件：啟動特殊動作 (跑步) ---
function keyPressed() {
  // 角色 1 (Original) - SPACE
  if (key === ' ' || keyCode === 32) {
    if (!orig_isRunning && orig_runSheet) {
      orig_isRunning = true;
      orig_runFrameIndex = 0;
      orig_baseY = orig_yPos;
    }
  }
  
  // 角色 2 (男角1) - W
  if (key.toUpperCase() === 'W') {
    if (!new_isRunning && new_runSheet) {
      new_isRunning = true;
      new_runFrameIndex = 0;
      new_baseY = new_yPos;
    }
  }
  
  // 角色 3 (男角2) - I
  if (key.toUpperCase() === 'I') {
    if (!third_isRunning && third_runSheet) {
      third_isRunning = true;
      third_runFrameIndex = 0;
      third_baseY = third_yPos;
    }
  }
}

// ==============================
// ==============================
// 題庫與 UI 處理函式
// ==============================

function showQuestionFor(ch) {
  // 從題庫抽一題並建立對話框
  const q = pickRandomQuestion(ch);
  if (!q) return;
  activeQuestion = {ch: ch, q: q};
  createDialogUI(q, ch);
}

function pickRandomQuestion(ch) {
  const pool = questions[ch];
  if (!pool || pool.length === 0) return null;
  // 過濾已答對題目（只排除答對過的題目）
  const used = usedQuestions[ch] || [];
  let candidates = pool.filter(p => used.indexOf(p.q) === -1);
  if (candidates.length === 0) {
    // 若所有題目都已答對，回傳 null（沒有可出題）
    return null;
  }
  const idx = floor(random(candidates.length));
  return candidates[idx];
}

function createDialogUI(qObj, ch) {
  clearDialog();
  // 設定位置（避免覆蓋角色）：優先放在角色上方，若會重疊則放在左右側
  let cx = ch === 'orig' ? orig_xPos : (ch === 'new' ? new_xPos : third_xPos);
  let cy = ch === 'orig' ? orig_baseY : (ch === 'new' ? new_baseY : third_baseY);
  const dlgW = 300;
  const dlgH = 140;
  // 角色尺寸（用對應走路幀寬/高作為碰撞箱）
  let charW = ch === 'orig' ? orig_walkFrameW : (ch === 'new' ? new_walkFrameW : third_walkFrameW);
  let charH = ch === 'orig' ? orig_walkFrameH : (ch === 'new' ? new_walkFrameH : third_walkFrameH);
  // 初始嘗試放上方
  let dlgX = cx - dlgW/2;
  let dlgY = cy - charH/2 - dlgH - 10;
  // 若超出畫布，修正
  if (dlgX < 10) dlgX = 10;
  if (dlgX + dlgW > width - 10) dlgX = width - dlgW - 10;
  if (dlgY < 10) {
    // 若放上方會超出，嘗試放在角色左側或右側
    let leftX = cx - charW/2 - dlgW - 10;
    let rightX = cx + charW/2 + 10;
    if (leftX >= 10) {
      dlgX = leftX;
      dlgY = cy - dlgH/2;
    } else if (rightX + dlgW <= width - 10) {
      dlgX = rightX;
      dlgY = cy - dlgH/2;
    } else {
      // 最後保留上方並限制到頂部
      dlgY = 10;
    }
  }

  const container = createDiv('').style('background','rgba(255,255,255,0.95)').style('padding','8px').style('border-radius','8px').style('width',dlgW+'px');
  container.position(dlgX, dlgY);
  container.id('qbox');
  // 題目與文字輸入（玩家自行輸入答案，不提供選項）
  // 美化對話框樣式
  container.style('box-shadow', '0 8px 24px rgba(0,0,0,0.25)');
  container.style('font-family', 'Arial, Helvetica, sans-serif');
  container.style('color', '#222');
  container.style('backdrop-filter', 'blur(4px)');
  const qText = createP(qObj.q).parent(container).style('margin','6px 0').style('font-size','16px').style('line-height','1.2');
  let inputEl = createInput('').parent(container).style('width','100%').style('padding','8px').style('border-radius','6px').style('border','1px solid rgba(0,0,0,0.12)');
  inputEl.attribute('placeholder', '請在此輸入答案');
  inputEl.style('box-sizing','border-box');
  inputEl.attribute('maxlength', '80');

  // 提示按鈕（先詢問是否需要提示）
  const hintBtn = createButton('需要提示嗎？').parent(container).style('margin','6px 8px 0 0').style('padding','6px 10px').style('border-radius','6px').style('background','#7daef5').style('color','#fff').style('border','none');
  hintBtn.mousePressed(()=>{
    // 建立小確認區域
    if (container._askDiv) container._askDiv.remove();
    const ask = createDiv('').parent(container).style('margin-top','8px');
    ask.html('<div style="margin-bottom:6px;font-size:14px;color:#333">是否要使用提示？</div>');
    const yes = createButton('是').parent(ask).style('margin-right','8px').style('padding','6px 10px').style('border-radius','6px').style('background','#4caf50').style('color','#fff').style('border','none');
    const no = createButton('否').parent(ask).style('padding','6px 10px').style('border-radius','6px').style('background','#e0e0e0').style('color','#333').style('border','none');
    container._askDiv = ask;
    yes.mousePressed(()=>{ if (container._askDiv) container._askDiv.remove(); showHint(qObj.hint, dlgX, dlgY-60); });
    no.mousePressed(()=>{ if (container._askDiv) container._askDiv.remove(); });
  });

  // 確認按鈕
  const confirmBtn = createButton('確認').parent(container).mousePressed(()=>{
    const val = (inputEl.elt.tagName === 'SELECT') ? inputEl.value() : inputEl.value();
    handleAnswer(val, qObj, ch);
  });
  confirmBtn.style('margin','10px 4px 0 0').style('padding','8px 12px').style('border-radius','6px').style('background','#ffcc66').style('color','#222').style('border','none');

  activeDialog = {container, inputEl, confirmBtn, hintBtn, x: dlgX, y: dlgY, w: dlgW};
}

function generateOptions(correct) {
  const pool = ['Sua','Luak','Mizi','Alex','Luna','Mika','松坂老師','動感超人','Saber','Archer'];
  const opts = [correct];
  while (opts.length < 4) {
    const c = random(pool);
    if (opts.indexOf(c) === -1) opts.push(c);
  }
  return shuffle(opts);
}

function clearDialog() {
  if (!activeDialog) return;
  activeDialog.container.remove();
  if (activeDialog.hintDiv) activeDialog.hintDiv.remove();
  activeDialog = null;
}

function handleAnswer(value, qObj, ch) {
  if (!value) return;
  // 支援多個正確答案（陣列）或單一字串
  const corrects = Array.isArray(qObj.a) ? qObj.a.map(s=>String(s).toLowerCase()) : [String(qObj.a).toLowerCase()];
  if (corrects.indexOf(String(value).toLowerCase()) !== -1) {
    // 答對
    score += 10;
    // 標記此題為已答對，避免之後重複出題
    if (!usedQuestions[ch]) usedQuestions[ch] = [];
    if (usedQuestions[ch].indexOf(qObj.q) === -1) usedQuestions[ch].push(qObj.q);
    checkEndCondition();
    // 若遊戲尚未結束，自動換題
    if (gameState === 'playing') {
      if (activeDialog) clearDialog();
      if (ch === 'orig') orig_dialogShown = false;
      if (ch === 'new') new_dialogShown = false;
      if (ch === 'third') third_dialogShown = false;
      // 稍微延遲讓畫面反應分數變化
      setTimeout(()=>{ showQuestionFor(ch); }, 300);
    }
  } else {
    // 答錯
    score -= 5;
    checkEndCondition();
    // 若遊戲尚未結束，自動換題（不顯示再作答按鈕）
    if (gameState === 'playing') {
      if (activeDialog) clearDialog();
      if (ch === 'orig') orig_dialogShown = false;
      if (ch === 'new') new_dialogShown = false;
      if (ch === 'third') third_dialogShown = false;
      setTimeout(()=>{ showQuestionFor(ch); }, 300);
    }
  }
}

function showHint(hintText, x, y) {
  ghostActive = true;
  ghost_x = x + 50;
  ghost_y = y - 40;
  // 顯示提示文字（幽靈旁）
  if (activeDialog) {
    if (activeDialog.hintDiv) activeDialog.hintDiv.remove();
    const hd = createDiv(hintText).parent(activeDialog.container).style('background','rgba(240,240,255,0.95)').style('padding','6px').style('border-radius','6px').style('margin-top','6px');
    activeDialog.hintDiv = hd;
  }
}

function drawScoreOverlay() {
  push();
  // 背景卡片
  const boxW = 220;
  const boxH = 56;
  const bx = width - boxW - 18;
  const by = 12;
  fill(255, 255, 255, 230);
  stroke(0,0,0,20);
  strokeWeight(1);
  rect(bx, by, boxW, boxH, 10);
  noStroke();
  fill(40);
  textSize(14);
  textAlign(LEFT, TOP);
  text('目前分數: ' + score, bx + 12, by + 8);
  text('目標: ' + TARGET_SCORE + '分', bx + 12, by + 28);
  // 進度條
  const pw = map(constrain(score,0,TARGET_SCORE), 0, TARGET_SCORE, 0, boxW - 24);
  fill(122, 200, 100);
  rect(bx + 12, by + boxH - 12, pw, 6, 6);
  pop();
}

function drawGhost() {
  if (!ghostActive) return;
  // 若遊戲開始，幽靈平滑跟隨玩家（同時保留按鍵微調）
  if (gameStarted) {
    const targetX = player_xPos + (player_dir * 60);
    const targetY = player_yPos - 60;
    ghost_x = lerp(ghost_x, targetX, 0.22);
    ghost_y = lerp(ghost_y, targetY, 0.22);
  }
  // 按鍵控制幽靈微調移動：X up, S down, Z left, C right
  if (keyIsDown('X'.charCodeAt(0))) ghost_y -= 2;
  if (keyIsDown('S'.charCodeAt(0))) ghost_y += 2;
  if (keyIsDown('Z'.charCodeAt(0))) ghost_x -= 2;
  if (keyIsDown('C'.charCodeAt(0))) ghost_x += 2;
  // 浮動動畫（在繪製時使用）
  const bob = sin(frameCount * 0.08) * 6;
  // 繪製幽靈（用向前走圖示），若未載入圖檔則畫占位符
  if (ghost_frontSheet && ghost_frontSheet.width > 0) {
    const fw = floor(ghost_frontSheet.width / 3);
    const fh = ghost_frontSheet.height;
    const frame = floor(frameCount / 6) % 3;
    push();
    translate(ghost_x, ghost_y + bob);
    // 光暈
    noStroke();
    fill(200,220,255,80);
    ellipse(0, 6, fw * 0.9, fh * 0.9);
    image(ghost_frontSheet, 0, 0, fw, fh, frame * fw, 0, fw, fh);
    pop();
  } else {
    // 占位幽靈
    push();
    translate(ghost_x, ghost_y + bob);
    noStroke();
    fill(200,220,255,220);
    ellipse(0, 0, 48, 60);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    fill(60);
    text('幽靈', 0, 0);
    pop();
  }
}

// ==============================
// 背景繪製 (responsive)
// ==============================
function drawBackground(offset) {
  offset = offset || 0;
  // 天空漸層
  noFill();
  for (let y = 0; y < height; y++) {
    const t = map(y, 0, height, 0, 1);
    const topCol = color(135, 206, 250); // 淺天空藍
    const botCol = color(240, 200, 150); // 接近地平線的暖色
    stroke(lerpColor(topCol, botCol, pow(t, 0.9)));
    line(0, y, width, y);
  }

  // 太陽（稍微跟視差移動）
  noStroke();
  const sunX = width * 0.85 - offset * 0.12;
  const sunY = height * 0.18;
  fill(255, 238, 120, 220);
  ellipse(sunX, sunY, min(width, height) * 0.15, min(width, height) * 0.15);

  // 雲（視差，較遠的雲移動較慢）
  fill(255, 255, 255, 230);
  drawCloud(width * 0.18 - offset * 0.22, height * 0.16, min(width, height) * 0.18);
  drawCloud(width * 0.5 - offset * 0.18, height * 0.12, min(width, height) * 0.22);
  drawCloud(width * 0.75 - offset * 0.12, height * 0.2, min(width, height) * 0.2);

  // 遠方山脈（中間視差層）
  fill(140, 180, 150);
  beginShape();
  vertex(-200 - offset * 0.5, height * 0.62);
  vertex(width * 0.12 - offset * 0.5, height * 0.5);
  vertex(width * 0.26 - offset * 0.5, height * 0.58);
  vertex(width * 0.4 - offset * 0.5, height * 0.48);
  vertex(width * 0.56 - offset * 0.5, height * 0.6);
  vertex(width * 0.72 - offset * 0.5, height * 0.5);
  vertex(width * 0.86 - offset * 0.5, height * 0.62);
  vertex(width + 200 - offset * 0.5, height * 0.55);
  vertex(width + 200 - offset * 0.5, height);
  vertex(-200 - offset * 0.5, height);
  endShape(CLOSE);

  // 地面與道路（近景隨鏡頭移動）
  fill(120, 90, 60);
  rect(-400 - offset * 0.9, height * 0.72, width + 800, height * 0.28);
  // 草地前景
  fill(80, 150, 90);
  rect(-400 - offset * 0.95, height * 0.68, width + 800, height * 0.06);

  // 簡單路面線條 (以不遮角色為主, 置於下方)
  stroke(200, 180, 160, 150);
  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    const y = height * 0.77 + i * 6;
    line(0, y, width, y);
  }

  // 小草點綴（前景，跟鏡頭較貼近）
  noStroke();
  for (let x = -200; x < width + 400; x += 36) {
    const gx = x - offset * 0.95 + (sin((frameCount + x) * 0.01) * 6);
    const gy = height * 0.68 + map(noise(x*0.01),0,1,-2,6);
    fill(60, 140 + (x % 50), 70);
    triangle(gx, gy, gx - 4, gy + 12, gx + 4, gy + 12);
  }
}

function drawCloud(cx, cy, w) {
  push();
  translate(cx, cy);
  const r = w * 0.28;
  ellipse(-r * 1.2, 0, r * 1.6, r);
  ellipse(-r * 0.3, -r * 0.1, r * 1.8, r * 1.1);
  ellipse(r * 0.6, 0, r * 1.4, r);
  pop();
}

function checkEndCondition() {
  if (score >= TARGET_SCORE) {
    gameState = 'success';
    showEndScreen(true);
  } else if (score <= -10) {
    gameState = 'fail';
    showEndScreen(false);
  }
}

function showEndScreen(success) {
  clearDialog();
  ghostActive = false;
  // 建立覆蓋層（會放置訊息與按鈕，但動畫在 canvas 上繪製）
  const cover = createDiv('').style('position','fixed').style('left','0').style('top','0').style('width','100%').style('height','100%').style('display','flex').style('flex-direction','column').style('align-items','center').style('justify-content','center');
  particles = [];
  if (success) {
    // 亮且有漸層的背景
    cover.style('background','linear-gradient(180deg, rgba(255,245,230,0.9), rgba(255,250,240,0.8))');
    const msg = createDiv('挑戰成功！').parent(cover).style('font-size','48px').style('color','#2a7f2a').style('font-weight','700').style('text-align','center').style('text-shadow','0 3px 12px rgba(0,0,0,0.15)');
    const sub = createDiv('你完成了挑戰 — 題目很難欸').parent(cover).style('font-size','18px').style('color','#333').style('margin-top','8px');
    // 產生大量彩帶與煙火殼
    for (let i=0;i<220;i++) {
      particles.push({type:'confetti', x:random(width), y:random(-400,0), vx:random(-2,2), vy:random(1,4), w:random(6,12), h:random(10,18), angle:random(TWO_PI), va:random(-0.15,0.15), c:color(random(255),random(255),random(255))});
    }
    // 發射數個煙火升空
    for (let i=0;i<6;i++) {
      particles.push({type:'firework', x:random(width*0.2, width*0.85), y:height+20, vx:random(-1,1), vy:random(-10,-6), ay:0.12, c:color(random(200,255), random(120,255), random(120,255)), exploded:false});
    }
  } else {
    // 失敗：深色雲層與下雨
    cover.style('background','rgba(0,0,0,0.45)');
    const msg = createDiv('挑戰失敗').parent(cover).style('font-size','44px').style('color','#fff').style('font-weight','700').style('text-shadow','0 3px 10px rgba(0,0,0,0.6)');
    const sub = createDiv('分數太低了，多加練習吧').parent(cover).style('font-size','18px').style('color','#ddd').style('margin-top','8px');
    // 產生雲層
    for (let i=0;i<5;i++) {
      particles.push({type:'cloud', x:random(-200, width), y:random(40, height*0.28), vx:random(0.2, 1.2), w:random(300,600), h:random(100,220), alpha:180});
    }
    // 產生雨滴
    for (let i=0;i<250;i++) particles.push({type:'rain', x:random(width), y:random(-height, height), vx:random(-0.5,0.5), vy:random(6,12), c:color(180,200,255,200)});
  }
  const btnWrap = createDiv('').parent(cover).style('margin-top','18px');
  const retry = createButton('在挑戰一次').parent(btnWrap).mousePressed(()=>{ particles=[]; cover.remove(); resetGame(); });
  retry.style('margin-top','8px').style('padding','10px 18px').style('border-radius','8px').style('background','#ffcc66').style('border','none');
}

function resetGame() {
  score = 0;
  gameState = 'playing';
  orig_dialogShown = new_dialogShown = third_dialogShown = false;
}

// ==============================
// 7. 視窗縮放處理
// ==============================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 重設位置
  let commonY = height / 2;
  let totalCharacterWidth = orig_walkFrameW + new_walkFrameW + third_walkFrameW + 100;
  let startX = width / 2 - totalCharacterWidth / 2;

  orig_xPos = startX + orig_walkFrameW / 2;
  orig_yPos = commonY;
  orig_baseY = orig_yPos;

  new_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW / 2;
  new_yPos = commonY;
  new_baseY = new_yPos;
  
  third_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW + 50 + third_walkFrameW / 2;
  third_yPos = commonY;
  third_baseY = third_yPos;
}