import React, { useEffect, useRef } from "react";
import type { Node } from "react";
import Typewriter from "../elements/Typewriter";
import HeroGraphic from "../../assets/svg-components/HeroGraphic";
import Portrait from "../../assets/svg-components/Portrait";
import useLocale from "../../locale";
import { useLocationInfo } from "../../utils";

function HeroSection(): Node {
  const t = useLocale;
  const locationInfo = useLocationInfo();
  const currentSection: string = locationInfo.current.replace(/\//g, "");
  const sectionRef = useRef();
  const strength = 80;

  const typewriterPrompts = [
    t(`home.${currentSection}.hero.typewriter_prompt_1`),
    t(`home.${currentSection}.hero.typewriter_prompt_2`),
    t(`home.${currentSection}.hero.typewriter_prompt_3`),
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const graphic = document
        .querySelector(".hero-graphic")
        .getBoundingClientRect();
      const calcX = -(e.clientY - graphic.y - graphic.height / 2) / strength;
      const calcY = (e.clientX - graphic.x - graphic.width / 2) / strength;

      if (document.documentElement) {
        document.documentElement.style.setProperty(
          "--hero-graphic-offsetX",
          calcX + "deg"
        );
        document.documentElement.style.setProperty(
          "--hero-graphic-offsetY",
          calcY + "deg"
        );
      }
    };

    const graphic = sectionRef.current;
    graphic.addEventListener("mousemove", handleMouseMove);

    return () => graphic.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} id="hero-wrapper">
      <div className="text-wrapper">
        <h1 className="hero-title">{t("home.common.hero.title")}</h1>
        <Typewriter
          messageStatic={t(`home.${currentSection}.hero.typewriter_static`)}
          prompts={typewriterPrompts}
        />
      </div>
      <Portrait className="hero-graphic" />
      <HeroGraphic className="hero-background" />
    </section>
  );
}

export default HeroSection;
