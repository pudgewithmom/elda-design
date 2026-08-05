const config = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['src/app/(payload)/**'],
  rules: {
    'custom-property-pattern': null,
    'selector-class-pattern': null,
  },
}

export default config
