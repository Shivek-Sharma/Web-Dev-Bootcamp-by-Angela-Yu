import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import _ from 'lodash';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

const itemsSchema = { name: String };

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

const item1 = new Item({ name: "Read book" });
const item2 = new Item({ name: "Practice coding" });
const item3 = new Item({ name: "Go Gym" });

const defaultItems = [item1, item2, item3];


app.get('/', async (req, res) => {
    await Item.find({})
        .then(async (items) => {
            if (items.length === 0) {
                await Item.insertMany(defaultItems)
                    .then(() => res.redirect('/'))
                    .catch((err) => console.error(err))
            } else {
                res.render('index.ejs', { listTitle: "To-Do", tasks: items });
            }
        })
        .catch((err) => console.error(err));
});

app.get('/:customListName', async (req, res) => {
    // https://lodash.com/docs/#capitalize
    const customListName = _.capitalize(req.params.customListName);

    await List.findOne({ name: customListName })
        .then((list) => {
            if (!list) {
                // Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });

                list.save();

                res.redirect('/' + customListName);
            } else {
                // Show an existing list
                res.render('index.ejs', { listTitle: customListName, tasks: list.items });
            }
        })
        .catch((err) => console.error(err));
});

app.post('/', async (req, res) => {
    const newTask = req.body.task;
    const listName = req.body.listName;

    const newItem = new Item({ name: newTask });

    if (listName === "To-Do") {
        newItem.save();
        res.redirect('/');
    } else {
        await List.findOne({ name: listName })
            .then((list) => {
                list.items.push(newItem);
                list.save();
                res.redirect('/' + listName);
            })
            .catch((err) => console.error(err));
    }
});

app.post('/delete', async (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "To-Do") {
        await Item.deleteOne({ _id: checkedItemId })
            .then(() => console.log("Item deleted successfully"))
            .catch((err) => console.error(err));

        res.redirect('/');
    } else {
        await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } })
            .then(() => console.log("Item deleted successfully"))
            .catch((err) => console.error(err));

        res.redirect('/' + listName);
    }
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});