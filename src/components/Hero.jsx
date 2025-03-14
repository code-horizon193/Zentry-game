import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const captions = [
  "g<b>a</b>ming",
  "ide<b>n</b>tity",
  "re<b>a</b>lity",
  "ag<b>e</b>ntic al",
];

const Hero = () => {
  const [currentVideo, setcurrentVideo] = useState(1);
  const [loadedVideo, setloadedVideo] = useState(0);
  const [loading, setloading] = useState(true);
  const [HasClicked, setHasClicked] = useState(false);
  const videoRef = useRef(null);
  const changAudio = useRef(new Audio("/audio/swap.wav"));
  changAudio.current.preload = "auto";
  const total = 4;

  //   set Loaded Videos
  const HandleLoadedVideo = () => {
    setloadedVideo((prev) => prev + 1);
  };

  //   Change the bg video index
  const HandleVideoClick = () => {
    setcurrentVideo((preVid) => (preVid % total) + 1);
    setHasClicked(true);
    changAudio.current.currentTime = 0;
    changAudio.current.play();
  };

  //   Set The Landing Effect
  useEffect(() => {
    if (loadedVideo === total - 1) {
      setloading(false);
    }
  }, [loadedVideo]);

  //   Click Animation
  useGSAP(
    () => {
      if (HasClicked) {
        gsap.set("#next-video", { autoAlpha: 1});
        gsap.to("#next-video", {
          transformOrigin: "center center",
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power2.inOut",
          onStart: () => videoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentVideo],
      revertOnUpdate: true,
    }
  );

  // Scroll Animation
  useGSAP(() => {
    gsap.set("#main-frame", {
      clipPath: "polygon(14% 0, 72% 0, 86% 90%, 0 95%)",
      borderRadius: "0% 0% 45% 15%",
    });
    gsap.from("#main-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#main-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  useEffect(() => {
    gsap.set(".animated", {
      opacity: 0,
      scale: 0,
      y: 100,
    });
    gsap.to(".animated", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: "power1.inOut",
    });
  }, [currentVideo]);

  //   video source by video index
  const videoSrc = (index) => `/videos/hero-${index}.mp4`;
  return (
    <div className="w-screnn min-h-dvh relative overflow-x-hidden rounded-md">
      {loading && (
        <div className="flex-center absolute z-[100] bg-black w-screen h-dvh overflow-hidden">
          <div class="loop cubes">
            <div class="item cubes"></div>
            <div class="item cubes"></div>
            <div class="item cubes"></div>
            <div class="item cubes"></div>
            <div class="item cubes"></div>
            <div class="item cubes"></div>
          </div>
        </div>
      )}
      <div
        id="main-frame"
        className="relative z-10 w-screen h-dvh overflow-hidden bg-blue-30"
      >
        <div>
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer rounded-lg overflow-hidden">
            <VideoPreview>
              <div
                className="size-64 scale-75 opacity-0 origin-center transition-all duration-500 hover:scale-125 hover:opacity-100"
                onClick={HandleVideoClick}
              >
                <video
                  ref={videoRef}
                  id="current-video"
                  src={videoSrc((currentVideo % total) + 1)}
                  muted
                  loop
                  className="size-64 object-center object-cover origin-center scale-150"
                  onLoadedData={HandleLoadedVideo}
                />
              </div>
            </VideoPreview>
          </div>
          <video
            ref={videoRef}
            id="next-video"
            src={videoSrc(currentVideo)}
            autoPlay
            loop
            muted
            className="absolute-center size-64 rounded-lg z-20 object-center origin-center object-cover opacity-0"
            onLoadedData={HandleLoadedVideo}
          />
          <video
            src={videoSrc(currentVideo === total - 1 ? 1 : currentVideo)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-center origin-center object-cover"
            onLoadedData={HandleLoadedVideo}
          />
        </div>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-9">
            <h1 className="hero-heading special-font text-violet-50">
              redefi<b>n</b>e
            </h1>

            <p className="max-w-64 mb-5 font-robert-regular text-violet-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              title="watch-trailer"
              id="watch-trailer"
              leftIcon={<TiLocationArrow />}
              styleClass="bg-yellow-20 flex-center gap-1"
            />
          </div>
        </div>
        <h1
          className="special-font absolute bottom-5 right-5 z-40 hero-heading select-none text-violet-50 animated"
          dangerouslySetInnerHTML={{ __html: captions[currentVideo - 1] }}
        />
      </div>
      <h1
        className="special-font animated absolute bottom-5 right-5 select-none hero-heading text-black"
        dangerouslySetInnerHTML={{ __html: captions[currentVideo - 1] }}
      />
    </div>
  );
};

export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Handles mouse movement over the container
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect();

    const xOffset = clientX - (rect.left + rect.width / 2);
    const yOffset = clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      // Move the container slightly in the direction of the cursor
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2,
        rotationX: -yOffset / 2,
        transformPerspective: 500,
        duration: 1,
        ease: "power1.out",
      });

      // Move the inner content in the opposite direction for a parallax effect
      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: "power1.out",
      });
    }
  };

  useEffect(() => {
    // Reset the position of the content when hover ends
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power2.inOut",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [isHovering]);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{
        perspective: "500px",
      }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Hero;
