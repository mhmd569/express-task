const Item = require('../models/itemModel');

exports.getItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
};

exports.addItem = async (req, res, next) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        next(err);
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (err) {
        next(err);
    }
};

exports.deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        next(err);
    }
};
