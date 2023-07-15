import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ src, title }: { src: string; title: string }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title}
    />
  </div>
);

YoutubeEmbed.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
