
"use strict";

var loadingDialog = null;
var gakuseki = null;
var url = null;
ons.ready(function() {

});

module.controller('AppController', function($scope,$http) {
  
    $scope.scan = function() {
        var onSuccess = function(result) {
            if (!result.cancelled) {
                alert("We got a barcode\n" +
                      "Result: " + result.text + "\n" +
                      "Format: " + result.format + "\n" +
                      "Cancelled: " + result.cancelled);
                
                //result.textには読み込んできた学籍番号が入っている
                gakuseki = result.text;
                        console.log("ログインファンクション");
                        url= "http://10.10.50.133:8080/Db/TestDb?st_id="+gakuseki;
                            $.ajax({
                                type: 'GET',
                                url: url,
                                dataType: 'text',
                                success: function(json){
                                    console.log("データベース接続成功");
                                    navi.pushPage('details.html');
                                    thread();
                                },error: function(XMLHttpRequest, textStatus, errorThrown) {
                                                        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                                                        console.log("textStatus : " + textStatus);
                                                        console.log("errorThrown : " + errorThrown.message);
                                                     }
                            });
               
            }
        };
        
        var onFailure = function(error) {
            ons.notification.alert({
                message: error,
                title: 'スキャンに失敗しました',
                buttonLabel: 'OK',
                animation: 'default', // もしくは'none'
            });
        };

        // バーコードをスキャンする
        plugins.barcodeScanner.scan(onSuccess, onFailure);
    };
});