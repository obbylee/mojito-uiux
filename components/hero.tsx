"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import "@/lib/gsap";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(
    () => {
      // Create a main timeline for all hero animations
      const masterTl = gsap.timeline();

      // Split and animate the title and subtitle
      const heroSplit = new SplitText(".title", { type: "chars" });
      const subtitleSplit = new SplitText(".subtitle", { type: "lines" });

      // Title Animation
      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
      masterTl.from(heroSplit.chars, {
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
      });

      // Subtitle Animation
      masterTl.from(subtitleSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        delay: 1,
      });

      // Parallax animation for leaves and arrow
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(".right-leaf", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0)
        .to(".arrow", { y: 100 }, 0);

      // Video animation with ScrollTrigger
      const startValue = isMobile ? "top 50%" : "center 60%";
      const endValue = isMobile ? "120% top" : "bottom top";

      const videoTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoRef.current,
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
        },
      });

      if (videoRef.current) {
        // Use a more robust check and an event listener
        const onMetadataLoaded = () => {
          videoTl.to(videoRef.current, {
            currentTime: videoRef.current!.duration,
          });
        };
        videoRef.current.addEventListener("loadedmetadata", onMetadataLoaded);

        // Cleanup the event listener on unmount
        return () => {
          if (videoRef.current) {
            videoRef.current.removeEventListener(
              "loadedmetadata",
              onMetadataLoaded
            );
          }
        };
      }
    },
    { scope: heroSectionRef, dependencies: [isMobile] }
  );

  return (
    <>
      <section id="hero" className="noisy" ref={heroSectionRef}>
        <h1 className="title">MOJITO</h1>

        <div className="left-leaf">
          <Image
            alt="left-leaf"
            src="/images/hero-left-leaf.png"
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>

        <div className="right-leaf">
          <Image
            src="/images/hero-right-leaf.png"
            alt="right-leaf"
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>

        <div className="body">
          <Image
            src="/images/arrow.png"
            alt="arrow"
            className="arrow"
            width={25}
            height={25}
          />
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video ref={videoRef} muted playsInline preload="auto">
          <source src="/videos/output.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default Hero;
