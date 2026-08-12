"use client";

import { useLottie } from "lottie-react";

type LottieAnimationProps = {
  animationData: object;
};

const LottieAnimation = ({ animationData }: LottieAnimationProps) => {
  const { View } = useLottie({
    animationData,
    autoplay: true,
    loop: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  return View;
};

export default LottieAnimation;
