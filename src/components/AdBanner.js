import React from "react";

import adBanner from "../assets/hobbee_ad.png";
import { useSelector } from "react-redux";

export function AdBanner() {
  const user = useSelector((state) => state.user);

  return (
    <div style={{ width: 300, display: "flex", position: "relative" }}>
      {user.authReady && (!user.isLoggedIn || !user.user.premium.active) && (
        <a
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
          href={"/premium"}
          target="_blank"
        >
          <img
            style={{ maxWidth: 300, height: "auto", position: "fixed" }}
            src={adBanner}
            alt="ad"
          />
        </a>
      )}
    </div>
  );
}
