module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  plugins: ["react", "react-hooks", "prettier", "@typescript-eslint"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".tsx"]
      }
    ],
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-fragments": "error",
    "react/button-has-type": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "global-require": "off",
    "quotes": ["warn", "backtick"],
    "no-param-reassign": "warn",
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: true,
          object: true
        },
        AssignmentExpression: {
          array: false,
          object: false
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    "arrow-body-style": ["warn", "as-needed"],
    "no-unused-expressions": [
      "error",
      {
        "allowTaggedTemplates": true,
        "allowShortCircuit": true
      }
    ],
    "spaced-comment": "off",
    "import/no-extraneous-dependencies": "error",
    "import/prefer-default-export": "off",
    "import/no-unresolved": ["error", { ignore: ["aws-lambda"]}],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        mjs: "never",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    // for .js files
    // "plugin:@typescript-eslint/recommended" overwrites this rule
    "no-unused-vars": "off",
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "local",
        args: "none"
      }
    ],
    "@typescript-eslint/interface-name-prefix": ["warn", "always"],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": "warn"
  },
  overrides: [
    {
      // enable rules specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/no-var-requires": "error"
      }
    }
  ]
};
