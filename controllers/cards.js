import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCard = async (req, res) => {
    try {
        const {id} = req.params
        const card = await prisma.card.findUnique({
            where: {id: Number(id)}
        });

        if (!card) {
            return res.status(200).json({ msg: `No Card with the ID: ${id} found` });
        }

        return res.json({ data: card });
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        });
    }
}

const getCards = async (req, res) => {
    try {
        const card = await prisma.card.findMany();

        if (card.length === 0) {
            return res.status(200).json({ msg: "No Cards found" });
        }

        return res.json({ data: card });
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        });
    }
}

const createCard = async (req, res) => {
    try {
        const { cardNumber, name, grade, nation, race, clan, type, ability, persona, power, shield, critical, effect } = req.body;

        await prisma.card.create({
            data : {cardNumber, name, grade, nation, race, clan, type, ability, persona, power, shield, critical, effect}
        });

        const newCard = await prisma.card.findMany();

        return res.status(201).json({
            msg: "Card successfully created",
            data: newCard
        })
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}

const updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { cardNumber, name, grade, nation, race, clan, type, ability, persona, power, shield, critical, effect } = req.body;

        let card = await prisma.card.findUnique({
            where: { id: Number(id)}
        });

        if (!card) {
            return res.status(201).json({ msg: `No Card with the ID: ${id} found`})
        }

        card = await prisma.card.update({
            where: {id: Number(id)},
            data: {cardNumber, name, grade, nation, race, clan, type, ability, persona, power, shield, critical, effect}
        })

        return res.json({
            msg: `Card with the ID: ${id} successfully updated`,
            data: card
        })
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}

const deleteCard = async (req, res) => {
    try {
        const {id} = req.params;

        const card = await prisma.card.findUnique({
            where: { id: Number(id) }
        });

        if (!card) {
            return res.status(200).json({ msg: `No Card with the ID: ${id} found`})
        }

        await prisma.card.delete({
            where: { id: Number(id)}
        });

        return res.json({
            msg: `Card with the ID: ${id} successfully deleted`
        })
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}

export {
    getCard,
    getCards,
    createCard,
    updateCard,
    deleteCard
}