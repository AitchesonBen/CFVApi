import { Router } from "express";
// const express = require("express");
const router = Router()

import {
    getSet,
    getSets,
    createSet,
    updateSet,
    deleteSet
} from "../controllers/set.js"

router.route("/").get(getSets).post(createSet);
router.route("/:id").put(updateSet).delete(deleteSet).get(getSet);

export default router