
$("#searchBtn").click(function () {
    const searchText = $("#searchTxt").val();

    if (!searchText) {
        alert("Enter a value!");
    } else {

        $('#result').children().remove();

        console.log(searchText);

        $.get("https://api.giphy.com/v1/gifs/search?api_key=5bROKS6CGk7upkhqxbHVkDEGl8mbhGko&q=" + searchText + "&limit=28&offset=0&rating=pg-13&lang=en", function (response) {
            $.each(response.data, function (index, value) {
                const imgSrc = value.images.downsized_large.url

                $('#result').append("<img src=" + imgSrc + " class='col-sm-12 col-md-6 col-lg-3 img-fluid image' data-toggle='modal' data-target='#gifModal' />");

            })
            $('#result').on('click', '.image', function () {

                $('.modal-title').text("GIF's similar to " + searchText + ": ");

                $('.modal-body').children().remove();

                $('.modal-body').append("<img src=" + this.src + " class='indImage' /> ").append("<h6>Rate this GIF: </h6> <div class='rating-stars text-center'><ul id='stars'><li class='star' title='Poor' data-value='1'> <i class='fa fa-star fa-fw'></i> </li> <li class='star' title='Fair' data-value='2'> <i class='fa fa-star fa-fw'></i></li><li class='star' title='Good' data-value='3'><i class='fa fa-star fa-fw'></i> </li> <li class='star' title='Excellent' data-value='4'> <i class='fa fa-star fa-fw'></i> </li> <li class='star' title='WOW!!!' data-value='5'> <i class='fa fa-star fa-fw'></i> </li> </ul> </div><span class='rated'></span>");

                /* 1. Visualizing things on Hover - See next part for action on click */
                $('#stars li').on('mouseover', function () {
                    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

                    // Now highlight all the stars that's not after the current hovered star
                    $(this).parent().children('li.star').each(function (e) {
                        if (e < onStar) {
                            $(this).addClass('hover');
                        }
                        else {
                            $(this).removeClass('hover');
                        }
                    });

                }).on('mouseout', function () {
                    $(this).parent().children('li.star').each(function (e) {
                        $(this).removeClass('hover');
                    });
                });


                /* 2. Action to perform on click */
                $('#stars li').on('click', function () {
                    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
                    var stars = $(this).parent().children('li.star');

                    $('.share').attr('data-bs-dismiss', 'modal');


                    for (i = 0; i < stars.length; i++) {
                        $(stars[i]).removeClass('selected');
                    }

                    for (i = 0; i < onStar; i++) {
                        $(stars[i]).addClass('selected');
                    }
                    const ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
                    $('.rated').text('You Rated: ' + ratingValue + ' stars');


                });

                $("#myModal").modal("show");



            });
        });
        $("#searchTxt").val('');
    }
});


// GIPHY API: 5bROKS6CGk7upkhqxbHVkDEGl8mbhGko