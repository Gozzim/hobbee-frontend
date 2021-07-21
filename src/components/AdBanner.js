import React from "react";
import { useLocation } from "react-router";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";

const banners = [banner1, banner2, banner3, banner4, banner5];

export function AdBanner() {
  const [shownBanner, setShownBanner] = React.useState(0);
  const location = useLocation();

  // Choose the next banner after any location change
  React.useEffect(() => {
    setShownBanner((i) => (i + 1) % banners.length);
  }, [location]);

  return (
    <a href={"#"} target="_blank">
      <img width={300} height={600} src={banners[shownBanner]} alt="" />
    </a>
  );
}
