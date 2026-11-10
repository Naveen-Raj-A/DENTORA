import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "lucide-react";

export const MobileMenu = ({
  isOpen,
  setIsOpen,
  onLinkClick,
}) => {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Treatments", href: "/treatments" },
    { name: "Doctors", href: "/doctors" },
    { name: "Patient Stories", href: "/patient-stories" },
    { name: "Contact", href: "/contact" },
  ];

  return isOpen ? (
    <div
      className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-start pt-24 gap-8"
      onClick={() => setIsOpen(false)}
    >
      <Icon
        name="x"
        className="absolute top-6 left-6 w-8 h-8 text-white hover:text-secondary"
        onClick={() => setIsOpen(false)}
      />

      <div className="w-full max-w-md text-center">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="block py-3 px-6 text-2xl font-playfair text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 w-full max-w-md">
        <Link
          to="/appointment"
          className="w-full bg-primary text-white py-3 rounded-md font-medium transition-all hover:bg-secondary"
        >
          Book Your Visit
        </Link>
      </div>
    </div>
  ) : null;
};