import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const setSchema = Joi.object({
    setNumber: Joi.string().required(),
    name: Joi.string().required()
})

const paginationDefault = {
    amount: 10,
    page: 1
}

const getSet = async (req, res) => {
    try {
        const {id} = req.params
        const set = await prisma.set.findUnique({
            where: {id: Number(id)}
        });

        if (!set) {
            return res.status(200).json({ msg: `No Set with the ID: ${id} found` });
        }

        return res.json({ data: set });
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        });
    }
}

const getSets = async (req, res) => {
    try {
        const sortBy = req.query.sortBy || "name";
        const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

        const amount = req.query.amount || paginationDefault.amount;
        const page = req.query.page || paginationDefault.page;

        const query = {
            take: Number(amount),
            skip: (Number(page) - 1) * Number(amount),
            orderBy: {
                [sortBy]: sortOrder
            },
            include: {
                cards: true
            }
        }

        if (req.query.setNumber || req.query.name) {
            query.where = {
                setNumber: {
                    in: req.query.setNumber || undefined
                },
                name: {
                    in: req.query.name || undefined
                }
            }
        }

        const set = await prisma.set.findMany(query);

        if (set.length === 0) {
            return res.status(200).json({ msg: "No Sets found" });
        }

        const hasNextPage = set.length === Number(amount);

        return res.json({ data: set, nextPage: hasNextPage ? Number(page) + 1 : null });
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        });
    }
}

const createSet = async (req, res) => {
    try {
        const {error, value} = setSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                msg: error.details[0].message
            })
        }
        const { setNumber, name } = value;

        await prisma.set.create({
            data : {setNumber, name}
        });

        const newSet = await prisma.set.findMany({
            include: {
                cards: true
            }
        });

        return res.status(201).json({
            msg: "Set successfully created",
            data: newSet
        })
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}

const updateSet = async (req, res) => {
    try {
        const { id } = req.params;
        const { setNumber, name } = req.body;

        let set = await prisma.set.findUnique({
            where: { id: Number(id)}
        });

        if (!set) {
            return res.status(201).json({ msg: `No Set with the ID: ${id} found`})
        }

        set = await prisma.set.update({
            where: {id: Number(id)},
            data: {setNumber, name}
        })

        return res.json({
            msg: `Set with the ID: ${id} successfully updated`,
            data: set
        })
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}

const deleteSet = async (req, res) => {
    try {
        const {id} = req.params;

        const set = await prisma.set.findUnique({
            where: { id: Number(id) }
        });

        if (!set) {
            return res.status(200).json({ msg: `No set with the ID: ${id} found`})
        }

        await prisma.set.delete({
            where: { id: Number(id)}
        });

        return res.json({
            msg: `Set with the ID: ${id} successfully deleted`
        })
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}

export {
    getSets,
    getSet,
    createSet,
    updateSet,
    deleteSet
}