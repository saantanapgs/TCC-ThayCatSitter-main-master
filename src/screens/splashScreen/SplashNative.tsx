import React, { useEffect } from "react";

type Props = {
  navigation: {
    replace: (screen: string) => void;
  };
};

export default function SplashNative({ navigation }: Props) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("SplashLoading");
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return null;
}
