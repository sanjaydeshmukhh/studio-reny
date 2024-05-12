function Locos() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('.main'),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on('scroll', ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the '.main' element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy('.main', {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector('.main').style.transform
            ? 'transform'
            : 'fixed',
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
Locos();

    
 let mainContainer = document.querySelector(".main")

 mainContainer.addEventListener("wheeldown", function(){
    
 })




 function page1Animation(){
    gsap.to(".nav", {
        scrollTrigger: {
            trigger: ".page-1",
            scroller: ".main",
            start: "top top",
            end: "bottom top",
            scrub: true,
            // markers: true, // Remove this in production
            onEnter: function () {
                document.querySelector(".nav").classList.add("show");
            },
            onLeaveBack: function () {
                document.querySelector(".nav").classList.remove("show");
            },
        },
    });
 }

 page1Animation()



function splitTextIntoSpans(selector){
  var element = document.querySelector(selector);
  console.log(element);
  if(element) {
    var text = element.innerText;
    var splitText = text
      .split('')
      .map((char) => `<span>${char}</span>`)
      .join('');
    element.innerHTML = splitText;
  }
}

splitTextIntoSpans(".page-3 .right p")

function page3Animation(){
    gsap.to(".right p span", {
        color: "#F9EEDB",
        stagger: 0.6,
        scrollTrigger: {
            trigger: ".page-3",
            scroller: ".main",
            start: "top 60%",
            end: "top -30%",
            // markers: true,
            scrub: true,
        },
    });

    var pinImage = document.querySelector(".page-3 .left");

    gsap.to(pinImage, {
        y:50,
        scrollTrigger: {
            trigger: ".page-3 .left",
            scroller: ".main",
            start: "top center",
            end: "top 20%",
            // markers: true,
            scrub: true,
            pin: true
        }
    })
}

page3Animation()

function page5Animation(){
    var imgRow = document.querySelectorAll(".image-container")
     console.log(imgRow)

     imgRow.forEach(function(elem){
            console.log(elem.childNodes[1])
         let image = elem.childNodes[5]
         let imgRowCircle = elem.childNodes[1]
           elem.addEventListener("mouseenter", function(){
               gsap.to(image, { scale: 1.1, duration: 0.4, ease: "sine.inOut" });
               gsap.to(imgRowCircle, { opacity: 1, duration: 0.4 });
           })
           elem.addEventListener("mouseleave", function(){
               gsap.to(image, { scale: 1, duration: 0.4 });
               gsap.to(imgRowCircle, { opacity: 0, duration: 0.4 });
           })

           elem.addEventListener("mousemove", function (e) {
               let rect = elem.getBoundingClientRect();
               let x = e.clientX - rect.left;
               let y = e.clientY - rect.top;
               gsap.to(imgRowCircle, { left: x, top: y, duration: 0.1 });
               imgRowCircle.style.transform = "translate(-50%, -50%)"
           });
     })
}

page5Animation();

function page8Animation(){
    var textForCircle = document.querySelector("#footer-h3")
    var circle = document.querySelector(".circleFollower")

    textForCircle.addEventListener("mouseenter", function(){
        circle.style.display = "block"
    })

    textForCircle.addEventListener("mouseleave", function(){
        circle.style.display = "none"
    })

    textForCircle.addEventListener ("mousemove", function(e){
        let rect = textForCircle.getBoundingClientRect();
        var circleX = e.clientX - rect.left; // Center of the h3 element
        var circleY = e.clientY - rect.top;
        gsap.to(circle, { left: circleX, top: circleY, duration: 0.6, })
        circle.style.transform = "translate(-50%, -50%)"
    })

}

page8Animation()
