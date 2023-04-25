const deviceSize = {
  fold: "280px",
  mobile: "320px",
  tablet: "768px",
  laptop: "1024px",
};

export const devices = {
  fold: `(min-width: ${deviceSize.fold})`,
  mobile: `(min-width: ${deviceSize.mobile})`,
  tablet: `(min-width: ${deviceSize.tablet})`,
  laptop: `(min-width: ${deviceSize.laptop})`,
};
