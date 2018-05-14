module.exports = {
  "extends": "airbnb",
  // Allows to use global variables from browser, e.g. window
  "env": {
    "browser": true,
  },
  // Fixes problem of React Routers Links triggers an error
  // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/340
  "rules": {
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ]
    }],
    "no-underscore-dangle": 0,
    "react/prop-types": 0,
    "no-param-reassign": 1,
  }
};