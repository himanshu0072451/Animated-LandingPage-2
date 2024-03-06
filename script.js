const locoScroll = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
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
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};
locoScroll();
const CursorAnimation = () => {
  let cursor = document.getElementById("cursor");
  let page1Content = document.getElementById("page1-content");
  page1Content.addEventListener("mousemove", function (val) {
    gsap.to(cursor, {
      x: val.x,
      y: val.y,
    });
  });
  page1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, { scale: 1, opacity: 1 });
  });
  page1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, { scale: 0, opacity: 0 });
  });
};
CursorAnimation();

const page2Animation = () => {
  gsap.from(".page2-content h1", {
    duration: 1.5,
    yPercent: 100,
    ease: "power4",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#page-2",
      scroller: "#main",
      start: "top 57%",
      end: "top 27%",
      scrub: 2,
    },
  });
};
page2Animation();

const loaderAnimation = () => {
  var tm = gsap.timeline();

  tm.from(".loader h3", {
    x: 50,
    opacity: 0,
    duration: 2,
    stagger: 0.3,
  });
  tm.to(".loader h3", {
    opacity: 0,
    x: -10,
    duration: 2,
    stagger: 0.2,
  });
  tm.to(".loader", {
    opacity: 0,
  });
  tm.to(".loader", {
    display: "none",
  });
  tm.from(".page1-content h1 span", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
  });
};
loaderAnimation();

