(function () {
      const target = document.getElementById("flickity");
      const videos = target.getElementsByTagName("video");
      const videosLength = videos.length;

      const flickity = new Flickity(target, {
            wrapAround: true,
            autoPlay: false,
            lazyLoad: true,
            hash: true,
            on: {
                  ready: function () {
                        console.log("Flickity ready");
                        videos[0].play();
                  }
            }
      });



      for (let i = 0; i < videosLength; i++) {
            videos[i].addEventListener(


                  "loadedmetadata",
                  function () {
                        var roundedVideoTime = Math.round(videos[i].duration * 1000);
                        console.log("video #" + i + " is " + roundedVideoTime + " Milleseconds long");
                        var videoNumber = "#video_" + i;
                        var videoAlt = ("" + videoNumber + ": is " + roundedVideoTime + " Milleseconds long");
                        var videoTime = roundedVideoTime;
                        $(videoNumber).attr({
                              'data-Video-Length': videoTime,
                              alt: videoAlt
                        });

                  },
                  false
            );
            videos[i].addEventListener(
                  "ended",
                  function () {
                        flickity.next("true");
                  },
                  false
            );
      }
      // 


      flickity.on("change", changeSlide);

      function changeSlide(index) {
            for (let i = 0; i < videosLength; i++) {
                  videos[i].currentTime = 0;
                  videos[index].play();


                  //       ima stop break
            }
      }
})();

// init Flickity
var $carousel = $(".carousel").flickity({
      prevNextButtons: false
});
// Flickity instance
var flkty = $carousel.data("flickity");
// elements
var $cellButtonGroup = $(".button-group--cells");
var $cellButtons = $cellButtonGroup.find(".button");

// update selected cellButtons
$carousel.on("select.flickity", function () {
      $cellButtons.filter(".is-selected").removeClass("is-selected");
      $cellButtons.eq(flkty.selectedIndex).addClass("is-selected");
});

// select cell on button click
$cellButtonGroup.on("click", ".button", function () {
      var index = $(this).index();
      $carousel.flickity("select", index);
});
// previous
$(".button--previous").on("click", function () {
      $carousel.flickity("previous");
});
// next
$(".button--next").on("click", function () {
      $carousel.flickity("next");
});