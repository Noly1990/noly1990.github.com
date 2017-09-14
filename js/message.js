
$(document).ready(function(){
    var E = window.wangEditor;
    var editor = new E('#editor');
    if (window.innerWidth>768) {
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
    }else if(window.innerWidth<768&&window.innerWidth>576) {
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'link',  // 插入链接
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
    }else {
        editor.customConfig.menus = [
            'head',
            'bold',
            'italic',
            'underline',
            'emoticon',  // 表情
        ]
    }
    editor.create();
    
        $('div.w-e-text-container').eq(0).css('height','150px').css('width','100%');
    $('#btnReset').on('click',function(){
        editor.txt.html('');
    });


    $('#submit').on('click',function(){
        var nickname=$('#nickname').val();
        if (nickname==='') {
            let $div=$('<div></div>').attr('class','alert alert-danger alert-dismissible fade show fixed-top').attr('role','alert').text('你的昵称没有输入，谢谢');
            let $btn=$('<button></button>').attr({
                'class':'close',
                'type':'button',
                'data-dismiss':'alert',
                'aria-label':'Close'
            });
            let $span=$('<span></span>').attr('aria-hidden','true').text('X');
            $btn.append($span);
            $div.append($btn);
            $('body').append($div);
        }else {
            let time=new Date();
            let hours=time.getHours();
            let minutes=time.getMinutes();
            let y=time.getFullYear();
            let m=time.getMonth();
            let d=time.getDay();
            let input=editor.txt.html();
           let template="<div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>"+nickname+"</h5><small class='text-muted'>"+y+'-'+m+'-'+d+"</small></div><p class='mb-1'>"+input+"</p><small class='text-muted'>"+hours+":"+minutes+"</small>";
            let $a=$('<a></a>').attr({
                'class':'list-group-item list-group-item-action flex-column align-items-start',
                'href':'#'
            }).html(template);
           $('#messageBox').append($a);

        }
    });
});

