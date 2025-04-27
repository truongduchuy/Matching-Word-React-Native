export const randomBoldColor = () => {
    const hue = Math.floor(Math.random() * 360); // any color on color wheel
    return `hsl(${hue}, 90%, 50%)`; // High saturation (90%), medium lightness (50%)
  };