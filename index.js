const express = require("express")
const cors = require('cors')
const { sequelize, Classes, Books, Students, BookStudents, CommonStudentBook } = require('./models');
const app = express()

app.use(express.text())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


app.post('/classes', async (req, res) => {
    const { name } = req.body;
    try {
        const output = await Classes.create({ name });
        return res.json(output)
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.get('/classes', async (req, res) => {
    try {
        const output = await Classes.findAll();
        return res.json(output)
    } catch (e) {
        return res.status(500).json(e)
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/students', async (req, res) => {
    const { name, rollNo, classUuid } = req.body;
    try {
        const clas = await Classes.findOne({
            where: {
                uuid: classUuid
            }
        });
        const student = await Students.create({ name, rollNo, classId: clas.id })
        return res.json(student)
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.get('/students', async (req, res) => {
    try {
        const posts = await Students.findAll({ include: 'class' })

        return res.json(posts)
    } catch (e) {
        return res.status(500).json(e)
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/books', async (req, res) => {
    const { name, author } = req.body;
    try {
        const book = await Books.create({ name, author });
        return res.json(book)
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.get('/books', async (req, res) => {
    try {
        const output = await Books.findAll();
        return res.json(output)
    } catch (e) {
        return res.status(500).json(e)
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/borrow', async (req, res) => {
    const { stdUuid, bookUuid } = req.body;
    try {
        const book = await Books.findOne({
            where: {
                uuid: bookUuid
            }
        });
        const student = await Students.findOne({
            where: {
                uuid: stdUuid
            }
        });
        const output = await BookStudents.create({ BookId: book.id, StudentId: student.id });
        return res.json(output)
    } catch (e) {
        console.log("erorrrrr", e)
        return res.status(500).json(e)
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/borrowbycommontablebyme', async (req, res) => {
    const { stdUuid, bookUuid } = req.body;
    try {
        const book = await Books.findOne({
            where: {
                uuid: bookUuid
            }
        });
        const student = await Students.findOne({
            where: {
                uuid: stdUuid
            }
        });
        const output = await CommonStudentBook.create({ bookId: book.id, studentId: student.id });
        return res.json(output)
    } catch (e) {
        console.log("erorrrrr", e)
        return res.status(500).json(e)
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////


app.listen(8080, async () => {
    try {
        // await sequelize.sync({ force: true });
        await sequelize.authenticate();
        console.log("sequelize connected")
    }
    catch (err) {
        console.log("error is", err)
    }
    console.log(`Server is running on port 8080`);
});