import React from "react";

export const TestimonialCard = ({
  name,
  review,
  treatment,
  rating = 5,
  image,
  ...props
}) => {
  const stars = Array.from({ length: rating }, (_, i) => i);

  return (
    <div
      className="testimonial-card rounded-xl border-b border-border-line p-6 transition-all duration-300"
      {...props}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mb-4"
        />
      ) : (
        <div
          className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15 6 18 10 15 14 12 18 9 14 6 10 3 6 12 2" />
          </svg>
        </div>
      )}

      <p className="text-muted/80 line-clamp-4 mb-4">
        {review}
      </p>

      <div className="flex items-center space-x-2">
        {stars.map((_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="var(--success)"
            stroke="none"
          >
            <polygon points="12 2 15 6 18 10 15 14 12 18 9 14 6 10 3 6 12 2" />
          </svg>
        ))}

        <span className="text-muted text-sm">
          {rating}+
        </span>
      </div>

      <p className="text-muted text-xs">
        {treatment}
      </p>
    </div>
  );
};

export default TestimonialCard;