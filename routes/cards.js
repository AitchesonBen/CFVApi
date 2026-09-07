import { Router } from "express";
const router = Router()

import {
    getCard,
    getCards,
    createCard,
    updateCard
} from "../controllers/cards.js"

router.route("/").get(getCards).post(createCard);
router.route("/:id").put(updateCard).get(getCard);

export default router