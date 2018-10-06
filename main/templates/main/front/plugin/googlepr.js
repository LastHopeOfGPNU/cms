function getGoogleprRpcUrl() {
    var urls = ['http://phprpc-gpr.appspot.com/',
                'http://phprpc-gpr1.appspot.com/',
                'http://phprpc-gpr2.appspot.com/',
                'http://phprpc-gpr3.appspot.com/',
                'http://phprpc-gpr4.appspot.com/',
                'http://phprpc-gpr5.appspot.com/',
                'http://phprpc-gpr6.appspot.com/',
                'http://phprpc-gpr7.appspot.com/',
                'http://phprpc-gpr8.appspot.com/',
                'http://phprpc-gpr9.appspot.com/']
    return urls[Math.floor(Math.random() * urls.length)];
}

var googlepr_rpc = new PHPRPC_Client(getGoogleprRpcUrl(), ['googlepr']);

function showGooglePR(result) {
    var googlepr_container = document.getElementById('googlepr_container');
    var googlepr_bar = document.getElementById('googlepr_bar');
    var googlepr_rank = document.getElementById('googlepr_rank');
    googlepr_container.title = googlepr_bar.title = "PageRank: " + (result == 0 ? 'unranked' : result) + " | Powered by PHPRPC";
    googlepr_rank.style.width = (result << 2) + "px";
}

function googlePR() {
    googlepr_rpc.googlepr(location.href, function (result) {
        result = parseInt(result);
        if (isNaN(result)) return;
        showGooglePR(result);
        googlepr_rpc.dispose();
        googlepr_rpc = null;
    });
}