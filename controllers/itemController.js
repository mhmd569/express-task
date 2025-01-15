const Item = require('../models/itemModel');

// Get all items
exports.getItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
};

// Get item by ID
exports.getItemById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        next(err);
    }
};

// Add new item
exports.addItem = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        // Validation
        if (!title || typeof title !== 'string' || title.length > 250) {
            return res.status(400).json({ error: 'Invalid title: must be a string and less than 250 characters' });
        }
        if (description && typeof description !== 'string') {
            return res.status(400).json({ error: 'Invalid description: must be a string' });
        }

        const newItem = new Item({ title, description });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        next(err);
    }
};

// Update item by ID
exports.updateItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Validation
        if (title && (typeof title !== 'string' || title.length > 250)) {
            return res.status(400).json({ error: 'Invalid title: must be a string and less than 250 characters' });
        }
        if (description && typeof description !== 'string') {
            return res.status(400).json({ error: 'Invalid description: must be a string' });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { title, description, updateDate: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (err) {
        next(err);
    }
};

// Delete item by ID
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
