function clearData(s, className) {
  let classn = s + className;
  $(classn).children().remove();
}

$("#searchBtn").click(function () {
  const searchText = $("#searchTxt").val();

  if (!searchText) {
    alert("Enter a value!");
  } else {
    clearData("#", "result");

    console.log(searchText);

    $.get(
      "https://api.giphy.com/v1/gifs/search?api_key=5bROKS6CGk7upkhqxbHVkDEGl8mbhGko" +
        searchText +
        "&limit=28&offset=0&rating=pg-13&lang=en",
      function (response) {
        $.each(response.data, function (index, value) {
          const imgSrc = value.images.downsized_large.url;
          const gifs =
            "<img src=" +
            imgSrc +
            " class='col-sm-12 col-md-6 col-lg-3 img-fluid image' data-toggle='modal' data-target='#gifModal' />";

          $("#result").append(gifs);
        });
        $("#result").on("click", ".image", function () {
          let individualGif = "<img src=" + this.src + " class='indImage' /> ";
          const ratingHtml =
            "<h6>Rate this GIF: </h6> <div class='rating-stars text-center'><ul id='stars'><li class='star' title='Poor' data-value='1'> <i class='fa fa-star fa-fw'></i> </li> <li class='star' title='Fair' data-value='2'> <i class='fa fa-star fa-fw'></i></li><li class='star' title='Good' data-value='3'><i class='fa fa-star fa-fw'></i> </li> <li class='star' title='Excellent' data-value='4'> <i class='fa fa-star fa-fw'></i> </li> <li class='star' title='WOW!!!' data-value='5'> <i class='fa fa-star fa-fw'></i> </li> </ul> </div><span class='rated'></span>";

          $(".modal-title").text("GIF's similar to " + searchText + ": ");

          clearData(".", "modal-body");

          $(".modal-body").append(individualGif + ratingHtml);

          $("#stars li")
            .on("mouseover", function () {
              var onStar = parseInt($(this).data("value"), 10);

              $(this)
                .parent()
                .children("li.star")
                .each(function (e) {
                  if (e < onStar) {
                    $(this).addClass("hover");
                  } else {
                    $(this).removeClass("hover");
                  }
                });
            })
            .on("mouseout", function () {
              $(this)
                .parent()
                .children("li.star")
                .each(function (e) {
                  $(this).removeClass("hover");
                });
            });

          $("#stars li").on("click", function () {
            var onStar = parseInt($(this).data("value"), 10);
            var stars = $(this).parent().children("li.star");

            $(".share").attr("data-bs-dismiss", "modal");

            for (i = 0; i < stars.length; i++) {
              $(stars[i]).removeClass("selected");
              $(this).addClass("hover");
            }

            for (i = 0; i < onStar; i++) {
              $(stars[i]).addClass("selected");
            }
            const ratingValue = parseInt(
              $("#stars li.selected").last().data("value"),
              10
            );
            $(".rated").text("You Rated: " + ratingValue + " stars");
          });

          $("#myModal").modal("show");
        });
      }
    );
    $("#searchTxt").val("");
  }
});
