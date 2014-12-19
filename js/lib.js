//manipulate window status in sync.json
function win_init(){
  var sync = {};
  sync.icon_win_is_open = false;
  sync.small_win_is_open = false;
  sync.query_string='';
  fs.writeFileSync('sync.json',JSON.stringify(sync),'utf-8');
  var stringBuf = fs.readFileSync('sync.json','utf-8');
};
//win_init();

function win_switch_on(){
  var stringBuf = fs.readFileSync('sync.json','utf-8');
  var sync = JSON.parse(stringBuf);
  sync.icon_win_is_open = true;
  fs.writeFile('sync.json',JSON.stringify(sync),'utf-8');
};

function win_switch_off(){
  var stringBuf = fs.readFileSync('sync.json','utf-8');
  var sync = JSON.parse(stringBuf);
  sync.icon_win_is_open = false;
  fs.writeFileSync('sync.json',JSON.stringify(sync),'utf-8');
};

function switch_on_small_win(){
  var stringBuf = fs.readFileSync('sync.json','utf-8');
  var sync = JSON.parse(stringBuf);
  sync.small_win_is_open = true;
  fs.writeFileSync('sync.json',JSON.stringify(sync),'utf-8');
};

function switch_off_small_win(){
  var stringBuf = fs.readFileSync('sync.json','utf-8');
  var sync = JSON.parse(stringBuf);
  sync.small_win_is_open = false;
  fs.writeFileSync('sync.json',JSON.stringify(sync),'utf-8');
};

function switch_off_icon_win(){
  var stringBuf = fs.readFileSync('sync.json','utf-8');
  var sync = JSON.parse(stringBuf);
  sync.icon_win_is_open = false;
  fs.writeFileSync('sync.json',JSON.stringify(sync),'utf-8');
};

function icon_can_be_open(){
  var stringBuf = fs.readFileSync('sync.json','utf-8');
  if(stringBuf=='undefined'){
    throw 'undefined sync file' ;
  };
  var sync = JSON.parse(stringBuf);
  return !sync.small_win_is_open;
};

function icon_is_open(){
  var stringBuf = fs.readFileSync('sync.json','utf-8');
  var sync = JSON.parse(stringBuf);
  return sync.icon_win_is_open;
};
