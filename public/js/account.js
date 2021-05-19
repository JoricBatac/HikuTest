$(document).ready(function () {

    $('#usernameHolder').keyup(function () {

          var username = $('#usernameHolder').val();

        $.get('/getCheckUsername', {username: username}, function (result) {
            if(result.username != username) {
              $('#usernameHolder').css('background-color', '#9CD9BF');
              $('#changeUsername').prop('disabled', false);
              $('#error1').text('');
            }
            else {
              $('#usernameHolder').css('background-color', '#FF6A55');
              $('#changeUsername').prop('disabled', true);
              $('#error1').text('Username taken!');
            }
        });
    });
    $('#changeUsername').click(function () {

    if($('#usernameHolder').val()){
        var name = $('#usernameHolder').val();

        $.get('/changeName', {name: name}, function (result) {
            console.log('username changed to ' + name);
        });
    }
    else{
        $('#error1').text('Please fill up the field.');
    }
    });
    $('#userHead').click(function () {
        $('#usernameBox').css('height', '175px');
        $('#usernameBox').css('opacity', '1');
        $('#passwordBox').css('height', '60px');
        $('#passwordBox').css('opacity', '0.3');
        $('#statusBox').css('height', '60px');
        $('#statusBox').css('width', '300px');
        $('#statusBox').css('opacity', '0.3');

        if($('#usernameBox').height() > 60){
            $('#usernameBox').css('height', '60px');
            $('#usernameBox').css('opacity', '0.3');
        }
    });
    $('#passHead').click(function () {
        $('#usernameBox').css('height', '60px');
        $('#usernameBox').css('opacity', '0.3');
        $('#passwordBox').css('height', '175px');
        $('#passwordBox').css('opacity', '1');
        $('#statusBox').css('height', '60px');
        $('#statusBox').css('width', '300px');
        $('#statusBox').css('opacity', '0.3');
        if($('#passwordBox').height() > 60){
            $('#passwordBox').css('height', '60px');
            $('#passwordBox').css('opacity', '0.3');
        }
    });
    $('#statHead').click(function () {
        $('#usernameBox').css('height', '60px');
        $('#usernameBox').css('opacity', '0.3');
        $('#passwordBox').css('height', '60px');
        $('#passwordBox').css('opacity', '0.3');
        $('#statusBox').css('height', '175px');
        $('#statusBox').css('width', '500px');
        $('#statusBox').css('opacity', '1');
        if($('#statusBox').height() > 60){
            $('#statusBox').css('height', '60px');
            $('#statusBox').css('opacity', '0.3');
            $('#statusBox').css('width', '300px');
        }
    });
    $('#loadoutHead').click(function () {
        $('#loadoutBox').css('height', '585px');
        $('#loadoutBox').css('opacity', '1');
        if($('#loadoutBox').height() > 60){
            $('#loadoutBox').css('height', '60px');
            $('#loadoutBox').css('opacity', '0.3');
        }
    });

});
