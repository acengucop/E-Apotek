import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke posisi (0, 0) setiap kali pathname berubah
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}