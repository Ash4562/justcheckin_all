import React, { useEffect, useRef, useState } from 'react';

const DriveVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Handle video load and initial autoplay
  useEffect(() => {
    const video = videoRef.current;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      if (shouldPlay) {
        video.play().catch(() => {
          video.muted = true;
          video.play();
        });
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.pause();
    };
  }, []);

  // Intersection observer to detect when video enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsNearViewport(isVisible);

        if (isVisible) {
          setShouldPlay(true);
          if (!videoLoaded) {
            videoRef.current.load();
          }
        } else {
          setShouldPlay(false);
        }
      },
      {
        root: null,
        rootMargin: '50% 0px',
        threshold: 0.5
      }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [videoLoaded]);

  // Attempt to play video when shouldPlay changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      if (!shouldPlay) return;

      try {
        if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
          await new Promise(resolve => video.addEventListener('canplay', resolve, { once: true }));
        }

        video.muted = false;
        await video.play();
      } catch (err) {
        video.muted = true;
        try {
          await video.play();
        } catch (fallbackError) {
          console.warn('Autoplay failed (even muted):', fallbackError);
        }
      }
    };

    tryPlay();

    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [shouldPlay]);

  // Unmute and play on first user interaction (to allow audio)
  useEffect(() => {
    const unmuteAndPlay = () => {
      const video = videoRef.current;
      if (video && shouldPlay) {
        video.muted = false;
        video.play().catch(() => {});
      }
      window.removeEventListener('click', unmuteAndPlay);
    };

    window.addEventListener('click', unmuteAndPlay);

    return () => {
      window.removeEventListener('click', unmuteAndPlay);
    };
  }, [shouldPlay]);

  return (
    <div
      className="mx-10 my-5"
      ref={containerRef}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        // minHeight: '50vh'
      }}
    >
      <video
        ref={videoRef}
        loop
        playsInline
        muted={!shouldPlay}
        preload={isNearViewport ? 'auto' : 'none'}
        poster="/Video/vdo-poster.jpg"
        className="custom-video"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          opacity: shouldPlay ? 1 : 0.7,
          transform: `scale(${shouldPlay ? 1 : 0.98})`,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: shouldPlay
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            : 'none',
          willChange: 'transform, opacity'
,
display: 'block', // important
margin: '0 auto'  // center it          
        }}
      >
        <source
          src="/vdo.mp4"
          type="video/mp4"
          media="(min-width: 600px)"
        />
        <source
          src="/vdo.mp4"
          type="video/mp4"
          media="(max-width: 599px)"
        />
        Your browser does not support the video tag.
      </video>

      {/* Inline mobile-specific styles */}
      <style>{`
        @media (max-width: 640px) {
          .custom-video {
             background-size: cover;
  background-position: center;
          }
        }
      `}</style>
    </div>
  );
};

export default DriveVideo;
