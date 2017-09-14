$(document).ready(function(){
    $.get('./articleConfig.json',function(data){
        var latest=data.latest;
        log(latest);
        for (let index in latest) {
            $.get('./resources/'+latest[index].fileName,function(md){
                let mdObj=dealMd(md);
                $('h2.titleH').eq(index).html(mdObj.title);
                $('p.articleContent').eq(index).html(marked(mdObj.text).substr(0,120)+'...');
                $('a.artileLink').eq(index).attr('href','./pages/article.html?aimId='+latest[index].id);
            });
        }
    });
});