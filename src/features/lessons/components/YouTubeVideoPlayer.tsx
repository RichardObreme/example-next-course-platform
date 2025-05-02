"use client";

import YouTube from "react-youtube";

type YouTubeVideoPlayerProps = {
  videoId: string;
  onFinishedVideo?: () => void;
};

export default function YouTubeVideoPlayer({
  videoId,
  onFinishedVideo,
}: YouTubeVideoPlayerProps) {
  return (
    <YouTube
      videoId={videoId}
      className="w-full h-full"
      opts={{ width: "100%", height: "100%" }}
      onEnd={onFinishedVideo}
    ></YouTube>
  );
}
