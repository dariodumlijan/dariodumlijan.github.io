// @flow
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const strength: number = 80;

  const typewriterPrompts = [
    t(`home.${currentSection}.hero.typewriter_prompt_1`),
    t(`home.${currentSection}.hero.typewriter_prompt_2`),
    t(`home.${currentSection}.hero.typewriter_prompt_3`),
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      let wrapper = document.querySelector("#hero-wrapper");
      // $FlowFixMe
      wrapper = wrapper.getBoundingClientRect();

      if (!wrapper) return;
      let calcX = -(e.clientY - wrapper.height / 2) / strength;
      let calcY = (e.clientX - wrapper.width / 2) / strength;

      if (e.clientY > wrapper.height) {
        calcX = 0;
        calcY = 0;
      }

      if (document.documentElement) {
        document.documentElement.style.setProperty(
          "--hero-graphic-offsetX",
          calcX + "deg"
        );
        // $FlowFixMe
        document.documentElement.style.setProperty(
          "--hero-graphic-offsetY",
          calcY + "deg"
        );
      }
    };

    const graphic = sectionRef.current;
    // $FlowFixMe
    graphic.addEventListener("mousemove", handleMouseMove);

    // $FlowFixMe
    return () => graphic.removeEventListener("mousemove", handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} id="hero-wrapper">
      <div className="hero-container">
        <div className="text-wrapper">
          <h1 className="hero-title">{t("home.common.hero.title")}</h1>
          <Typewriter
            messageStatic={t(`home.${currentSection}.hero.typewriter_static`)}
            prompts={typewriterPrompts}
          />
        </div>
        <Portrait className="hero-graphic" isDesign={locationInfo.isDesign} />
      </div>
      <HeroGraphic className="hero-background" />
    </section>
  );
}

export default HeroSection;
