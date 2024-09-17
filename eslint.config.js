import js from "@eslint/js";

export default [
    js.configs.recommended,

    {
        rules: {
            "no-unused-vars": "error", //mendeteksi variable yang tidak digunakan
            "no-undef": "error", //mendeteksi variable yang tidak didefinisikan
            "no-unused-expressions": "error", //mendeteksi expression yang tidak digunakan
            "prefer-const": "error", //menganjurkan penulisan const pada variable constant
            "curly": ["error", "all"], //memaksa penggunaan {} pada (if, for, switch, dll)
            "comma-dangle": ["error", "never"], //melarang tanda (,) di akhir array/objek
            "use-isnan": "error", //mendeteksi penulisan NaN yang benar
            "no-var": "warn", //mendeteksi penulisan variable menggunakan var
            "semi": ["warn", "always"], //mengoreksi codingan tanpa tanda (;)
            "no-console": "warn" //mendeteksi penulisan console
        }
    }
];