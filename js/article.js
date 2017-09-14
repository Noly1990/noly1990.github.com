$(document).ready(function(){

    var reg = new RegExp('aimId', "i"); 
    var aimId;
    if (window.location.href.match(reg)) {
        let index=window.location.href.match(reg).index;
        let allUrl=window.location.href.match(reg).input;
        aimId=parseInt(allUrl.substr(index).replace('aimId','').replace('=','')); 
    }else {
        aimId=10000;
    }
    console.log(aimId);

    $.get('../articleConfig.json',function(json){
        var articlesNum=json.articlesNum;
        $('#titleNav').empty();
        for (let index=0;index<articlesNum;index++) {
            $.get('../resources/'+json.all[index].fileName,function(md){
                let mdObj=dealMd(md);
                let $a=$('<a></a>').addClass('nav-link').text(mdObj.title).attr('href','#').attr('aimId',json.all[index].id)
                //.attr('href','./article.html?aimId='+json.all[index].id);
                if (aimId===10000+index) {
                    $a.addClass('active');
                    $('#articleTitle').text(mdObj.title);
                    $('#articleTime').text(mdObj.date);
                    $('#articleContent').html(marked(mdObj.text));
                }

                $a.on('click',function(e){
                    let id=parseInt($(this).attr('aimId'));
                    let fileName=findId(id,json.all);
                    $('#titleNav li a').each(function(){
                        $(this).attr('class','nav-link');
                    })
                    $(this).addClass('active');
                    $.get('../resources/'+fileName,function(inmd){
                        let mdObj=dealMd(inmd);
                        
                        $('#articleTitle').text(mdObj.title);
                        $('#articleTime').text(mdObj.date);
                        $('#articleContent').html(marked(mdObj.text));
                    });
                });

                let $li=$('<li></li>').addClass('nav-item').append($a);
                $('#titleNav').append($li);
            });
        }
    });
});





