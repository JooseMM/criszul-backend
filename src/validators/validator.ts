import { body } from "express-validator";

const sanitizeBody = [
  body("name")
    .trim()
    .isAlpha("es-ES")
    .isLength({ min: 2, max: 30 })
    .withMessage("Nombre invalido, solo se permiten letras y espacios"),
  body("email").trim().isEmail().withMessage("Email invalido").normalizeEmail(),
  body("message")
    .trim()
    .isLength({ min: 2, max: 240 })
    .matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñÜü0-9¡!.,\s¿?]+$/)
    .withMessage(
      "Mesaje invalido, solo se permiten palabras, numeros, espacios, signos de exclamacion, puntuacion e interrogativos",
    ),
];

export default sanitizeBody;
