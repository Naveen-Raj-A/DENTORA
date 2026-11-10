import React from "react";

export const TreatmentCard = ({
  image,
  title,
  description,
  ctaText = "Learn More",
  ctaLink = "#",
  icon,
  ...props
}) => {
  return (
    <div
      className="treatment-card rounded-2xl overflow-hidden border-b border-border-line transition-all duration-300"
      {...props}
    >
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </div>
      ) : (
        <div
          className="relative flex items-center h-48 justify-center border-2 border-border-line border-dashed"
        >
          {icon && (
            <div className="w-12 h-12 text-primary/60">{icon}</div>
          )}
          <p className="text-muted/50 text-sm">Treatment image</p>
        </div>
      )}

      <div className="p-6">
        <h3 className="font-playfair display-5 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-muted body-small line-clamp-3">
          {description}
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

export default TreatmentCard;