// 时间表
var t_getup = 7;
var t_morning = 8;
var t_noon = 12;
var t_afternoon = 13;
var t_dinner = 18;
var t_evening = 19;
var t_night = 22;
var t_sleep = 23;

// 使用pi转换
function piT(hour) {
    return Math.PI*hour/12  
};
// 补0
function addPreZero(sec) {
    if (sec<10) {
        return '0'+ sec;
    } else {
        return sec;
    }
};

var myClock = document.getElementById('myClock');
var c = myClock.getContext('2d');
function clock(){
    // 获取当前时间参数
    var data = new Date();
    // 夜间效果
    // var data = new Date(2018, 12, 13, 3, 59, 27, 19)
    // 白天效果
    // var data = new Date(2018, 12, 13, 13, 30, 16, 20)

    var sec =data.getSeconds();
    var min =data.getMinutes();
    var hour=data.getHours();   

    // 当前时间
    time_text = addPreZero(hour) + ':'+ addPreZero(min);
    time_sec = ' : '+ addPreZero(sec)+' \'\'';

    // 当前时间角度换算
    current_time_rotate = Math.PI/12*hour+Math.PI/12*min/60+Math.PI/12*sec/3600

    // 清楚所有当前设置
    c.clearRect(0,0,400,400);
    c.save();
    c.translate(200,200);
    c.rotate(-Math.PI/2);

    // 如果始终在白天,则显示绿色,否则显示红色,其他显示 break
    if (hour >= t_getup && hour < t_sleep){
        desc_tag = '昼';
        // 背景设置为白色
        background_color="#ddd";
        // 表盘色设置为白色
        panel_color = '#333';
        addition_desc = '< ' + (t_sleep - hour)+ 'h';
        addition_desc_color = "#009900";
        // 环色开始结束点
        circle_start = current_time_rotate;
        circle_end = piT(t_sleep);
        pre_circle_start = piT(t_getup);
        pre_circle_end = current_time_rotate;
        // 环色
        circle_color = '#009900';
    }else{
        desc_tag = '夜';
        // 背景设置为黑色
        background_color="#333";
        // 表盘色设置为白色
        panel_color = '#ddd';
        // 调整睡眠时间显示
        if (hour >= t_sleep) {
            addition_desc = '> ' + (hour - t_sleep)+ 'h';
        } else {
            addition_desc = '> -' + (hour - t_sleep+24)+ 'h';
        }   
        addition_desc_color = "#FF0000";
        // 环色开始结束点
        circle_start = piT(t_sleep);
        circle_end = current_time_rotate;
        pre_circle_start = current_time_rotate;
        pre_circle_end = piT(t_getup);
        circle_color = "#CC0000";       
    };

    // 设置背景色
    document.body.style.background = background_color;

    //时钟刻度线
    for(var i=0;i<24;i++){  //画12个刻度线           
        c.beginPath();
        c.strokeStyle = panel_color;                
        c.lineWidth = 1 ;
        c.moveTo(115,0);
        c.lineTo(120,0);
        c.stroke();
        c.rotate(Math.PI/12); //每个30deg画一个时钟刻度线
        c.closePath();
    };

    // 过去的时间
    c.beginPath();
    c.strokeStyle = circle_color;
    c.arc(0,0,140,pre_circle_start,pre_circle_end);
    c.lineWidth = 1;
    c.stroke();  

    // 19~23绿线
    c.beginPath();
    c.strokeStyle = circle_color;
    c.arc(0,0,145,circle_start,circle_end);
    c.lineWidth = 12 ;
    c.stroke(); 
    c.closePath();
    c.restore();
    // 设置字体等
    c.textBaseline = 'middle';
    c.fillStyle = panel_color
    c.font = 'bold 48px Helvetica';
    c.fillText(desc_tag, 140, 200);
    c.font = 'bold 24px Helvetica';
    c.fillText(time_text, 200, 190);
    c.font = '12px Helvetica';
    c.fillText(time_sec, 262, 193);
    c.font = 'bold 14px Helvetica';
    c.fillStyle = addition_desc_color;
    c.fillText(addition_desc, 200, 215);
    c.restore();
}
clock();
setInterval(clock,1000);