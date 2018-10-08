var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};
var $loginBtn = $('#login-btn');
var $accountInput = $('#account-input');
var $passwordInput = $('#password-input');
$(function () {
    $accountInput.bind('keydown', enterSubmit);
    $passwordInput.bind('keydown', enterSubmit);
    $loginBtn.bind('click', formSubmit);
});

function enterSubmit(ev) {
    if(ev.keyCode == 13){
        formSubmit(ev);
    }
}

function formSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    var username = $accountInput.val();
    var password = $passwordInput.val();
    // 判空
    if(username === '') {
        showMessage('账号不能为空！', '#account-input', 1);
        return;
    } else if(password === '') {
        showMessage('密码不能为空！', '#password-input', 1);
        return;
    }
    var postData = {
        "params" : {
            "username": username,
            "password": password
        }
    }
    $.ajax({
        type:'post',
        url:'/user/login',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data: JSON.stringify(postData),
        success:function(res){
            switch(res.success){
                case false:
                    new PNotify({
                        title: '登录失败',
                        text: res.msg,
                        type: 'error',
                        delay: 3000,
                        addclass: "stack-bottomright",
                        stack: stack_bottomright
                    });
                    break;
                case true:
                    new PNotify({
                        title: '登录成功',
                        text: res.msg,
                        type: 'success',
                        delay: 3000,
                        addclass: "stack-bottomright",
                        stack: stack_bottomright
                    });
                    sessionStorage.setItem("userInfo", JSON.stringify(res.data));
                    window.location.href = '/admin';
                    break;
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            new PNotify({
                title: '登录失败',
                text: '服务器内部出错，或网络出错！',
                type: 'error',
                delay: 3000,
                addclass: "stack-bottomright",
                stack: stack_bottomright
            });
        }
    });
}
// 不能为空的提示
function showMessage(msg, selector, type) {
    layer.tips(msg, selector, {
        tips: type
    });
}
