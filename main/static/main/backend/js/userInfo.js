/**
 * Created by yjq on 2018/10/14.
 */
$(function () {
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            url:'/user/info',
            type: 'get',
            success: function (res) {
                var data = res.data
                $('.user-avatar').attr('src',data.avatar_url);
                $('#avatar').val(data.avatar_url);
                $('#nick').val(data.nick);
                $('#qq').val(data.qq);
                $('#weibo').val(data.weibo);
                $('#weixin').val(data.weixin);
                $('#introduction').val(data.introduction);
            }
        })
    }
    $(document).on('change','input[type="file"]',function (e) {
        e.stopPropagation();
        var fileList = $(this).get(0).files;
        if(fileList.length == 0)return ;
        if(fileList[0].type.indexOf("image") < 0) {
            layer.msg("请上传图片格式文件");
            return;
        }
        var formData = new FormData();
        formData.append('file',fileList[0]);
        var xhr = getRequestObject();
        xhr.onload = function () {
            var data=JSON.parse(xhr.responseText);
            if(xhr.status===200){
                console.log(data);
            }else{
                layer.msg('文件上传失败');
            }
        }
    //    上传加载
        xhr.upload.onprogress= function(event) {

        }
        // 打开链接
        xhr.open('POST', '/user/upload_avatar', true);
        // 发送请求
        xhr.send(formData);
    })
})
//触发上传
function upLoading(selector){
    $(selector).click();
}
//xmlhttprequest初始化
function getRequestObject(){
    var xhr=null;
    if(window.XMLHttpRequest){
        try{
            xhr = new XMLHttpRequest();
        }catch(e){
            xhr=null;
        }
    }else if(window.ActiveXObject){
        try{
            xhr=new ActiveXObject('Microsoft.XMLHTTP');
        }catch(e){
            try{
                xhr=new ActiveXObject('Msxml2.XMLHTTP');
            }catch(e){
                xhr=null;
            }
        }
    }
    return xhr;
}