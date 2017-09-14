function TouchDirection() {
    this.startx = 0;
    this.starty = 0;
    this.leftEvent = function () {
        console.log('left')
    }
    this.rightEvent = function () {
        console.log('right')
    }
    this.upEvent = function () {
        console.log('up')
    }
    this.downEvent = function () {
        console.log('down')
    }

    //手指接触屏幕
    document.addEventListener("touchstart", function (e) {
        this.startx = e.touches[0].pageX;
        this.starty = e.touches[0].pageY;
    }.bind(this), false);
    //手指离开屏幕
    document.addEventListener("touchend", function (e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(this.startx, this.starty, endx, endy);
        switch (direction) {
            case 0:
                console.log('only touch a momoent');
                break;
            case 1:
                this.upEvent();
                break;
            case 2:
                this.downEvent();
                break;
            case 3:
                this.leftEvent();
                break;
            case 4:
                this.rightEvent();
                break;
            default:
        }
    }.bind(this), false);
}

//获得角度
function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
    }

    var angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
        result = 1;
    } else if (angle > 45 && angle < 135) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    } else if (angle >= -45 && angle <= 45) {
        result = 4;
    }

    return result;
}


//easy console.log function
function log(sth){
    console.log(sth);
}


function dealMd(md) {
    var mdObj={};
    var titleIndex=md.search('title');
    var left=md.substring(titleIndex);
    var endIndex=left.search('---');
    var head=left.substr(0,endIndex-3);

    var dateIndex=head.search('date');

    var title=head.substring(0,dateIndex-1);
    var date=head.substring(dateIndex);

    var mainText=md.substring(endIndex+3);

    mdObj.text=mainText;
    mdObj.title=title.replace('title: ','');
    mdObj.date=date.replace('date: ','');
    return mdObj;
}

function findId(id,all){
    for (var index in all) {
        if (id===all[index].id) {
            return all[index].fileName;
        }
    }
}