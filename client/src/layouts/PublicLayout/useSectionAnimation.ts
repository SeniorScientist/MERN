import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useSectionAnimation = () => {
  const location = useLocation();
  const previousLocation = useRef(location);

  // useParticles();

  useEffect(() => {
    if (location.pathname === previousLocation.current.pathname) {
      return;
    }
    previousLocation.current = location;

    if (location.pathname === "/login") {
      document.querySelector(".public-form")?.classList.add("slide-to-right");
    }

    if (location.pathname === "/register") {
      document.querySelector(".public-form")?.classList.add("slide-to-left");
    }
  }, [location]);
};

export default useSectionAnimation;