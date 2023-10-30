import { useEffect } from "react";

declare global {
  interface Window {
    particlesJS: any;
  }
}

/**
 * Hook to load the particles.js library.
 * @param elementId ID of the element to load the particles in it.
 * @param pathToConfigJSON Public path to the JSON file with the configuration, place it in the public folder.
 *
 * IMPORTANT: Need to have a div with the id as "particles" in the component if no elementId provided.
 */
const useParticles = (elementId?: string, pathToConfigJSON?: string) => {
  useEffect(() => {
    if (!window.particlesJS) {
      throw new Error("particles.js not included in the scripts.");
    }

    window.particlesJS.load(
      elementId || "particles",
      pathToConfigJSON || "particlesjs-config.json"
    );
  }, []);
};

export default useParticles;