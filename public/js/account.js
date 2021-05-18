$(document).ready(function () {

    $('#usernameHolder').keyup(function () {

          var username = $('#usernameHolder').val();

        $.get('/getCheckUsername', {username: username}, function (result) {
            if(result.username != username) {
              $('#usernameHolder').css('background-color', '#9CD9BF');
              $('#changeUsername').prop('disabled', false);
            }
            else {
              $('#usernameHolder').css('background-color', '#FF6A55');
              $('#changeUsername').prop('disabled', true);
            }
        });
    });
    $('#changeUsername').click(function () {

    if($('#usernameHolder').val()){
        var username = $('#name').val();
        var refno = $('#refno').val();
        var amount = $('#amount').val();
        amount = Number.parseFloat(amount).toFixed(2);

        $.get('/add', {name: name , refno:refno, amount:amount}, function (result) {
            console.log('added ' + name);
        });

        var card = '<div class="card"><img src="/images/icon.webp" class="icon"><div class="info"><p class="text">' + name + '  </p><p class="text"> ' + refno + ' </p><p class="text"> Php '+ amount + ' </p></div><button class="remove"> X </button></div>'
        $('#cards').append(card);

        $('#name').val('');
        $('#refno').val('');
        $('#amount').val('');
    }
    else{
        $('#error').text('Fill up all fields.');
    }
  });
});
