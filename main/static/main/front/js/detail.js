/**
 * Created by yjq on 2018/10/14.
 */
$(function () {
    var url = location.search;
    var id = url.split('=')[1];
    $.ajax({
        url: '/article/detail?id='+ id,
        type: 'get',
        dataType:'json',
        success:function (res) {
            console.log(res);
            var data = res.data;
            $('.single-meta>.time>a').text(data.in_date.replace('T',' '))
            $('.eye>a').text(data.view + ' views');
            $('.single-header>h1').text(data.title);
            $('#introduction>p').text(data.introduction);
            $('.single-main').append(data.content);
        },
        error: function (e) {
            console.log(e);
        }
    })
    $(".menu-button").click(function(e) {$(".menu-mini-nav").slideToggle(); } )
})
