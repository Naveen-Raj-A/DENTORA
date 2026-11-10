import React from "react";
import { FaUserMd } from "lucide-react";

export const DoctorCard = ({
  image,
  name,
  specialty,
  experience,
  ctaText = "View Profile",
  ctaLink = "#",
  ...props
}) => {
  return (
    <div
      className="doctor-card rounded-2xl overflow-hidden border-b border-border-line transition-all duration-300"
      {...props}
    >
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />
          <div
            className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-2xl p-4"
          >
            <h3 className="font-playfair text-xl text-dark mb-1">
              {name}
            </h3>
            <p className="text-muted text-sm">
              {specialty}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative h-48 flex items-center justify-center">
          <FaUserMd className="w-10 h-10 text-primary" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-playfair text-lg text-dark">
            {name}
          </h3>
          <span className="text-primary/80 text-sm">
            {experience}
          </span>
        </div>
        <p className="text-muted text-sm line-clamp-3">
          {specialty}
        </p>
      </div>

      <div className="p-6 border-t border-border-line">
        <a
          href={ctaLink}
          className="text-primary hover:text-secondary font-medium transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default DoctorCard;