$(function(){
  // get data
  $('#get-button').on('click', function() {
        $.ajax({
            url: '/userinfo/getdata',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.products.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product._id + '</td>\
                            <td><input type="text" rows="4" cols="50" class="name" value="' + product.name + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });


    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');

        $.ajax({
            url: '/userinfo/createdata',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                console.log(response.resp);
                createInput.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
   $('table').on('click', '.update-button', function() {
       var rowEl = $(this).closest('tr');
       var id = rowEl.find('.id').text();
       var newName = rowEl.find('.name').val();

       $.ajax({
           url: '/userinfo/update/' + id,
           method: 'PUT',
           contentType: 'application/json',
           data: JSON.stringify({ newName: newName }),
           success: function(response) {
               console.log(response);
               $('#get-button').click();
           }
       });
   });

   // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/userinfo/delete/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });


});
