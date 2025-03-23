import { body } from "express-validator";

const sanitizeBody = [
  body("name")
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Nombre inválido, solo se permiten letras y espacios")
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "Nombre inválido, no puede ser menor a 2 caracteres ni mayor a 30",
    ),
  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
  body("message")
    .trim()
    .isLength({ min: 2, max: 240 })
    .withMessage("Mensaje inválido: mínimo 2 caracteres, máximo 240")
    .matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñÜü0-9¡!.,\s¿?]+$/)
    .withMessage(
      "Mensaje inválido, solo se permiten palabras, números, espacios, signos de exclamación, puntuación e interrogativos",
    ),
];

export default sanitizeBody;
