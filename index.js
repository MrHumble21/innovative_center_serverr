const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bodyParser = require("body-parser");
const axios = require("axios")
const port = 8000;
const https = require('follow-redirects').https;

const cors = require("cors");
const {
    UserSchema, ExamSchema, IeltsUserSchema,
} = require("./database/connection");
const app = express();
app.use(cors("*"));
app.use(bodyParser.json());

///////////////// CRUD for User /////////////////


app.post('/admin/login', function (req, res) {
    try {
        const {email, password} = req.body;
        if (email === "bakhodir@innovativecentre.org" && password === "Inno123-") {
            res.json({"admin": true,})
        } else {
            res.json({"admin": false})
        }
    } catch (e) {
        res.json({'error': 'Login failed please connect with Abdulboriy Malikov'})
    }

})

app.post('/api/delete_user', async function (req, res) {
    const {user_id} = req.body
    console.log(user_id)
    UserSchema.findByIdAndDelete(user_id).then((deletedUser) => {
        res.json({'status': "deleted"})
    })
        .catch((err) => {
            // handle error
        });
})

app.post('/api/delete_ielts_user', async function (req, res) {
    const {user_id} = req.body
    console.log(user_id)
    IeltsUserSchema.findByIdAndDelete(user_id).then((deletedUser) => {
        res.json({'status': "deleted"})
    })
        .catch((err) => {
            // handle error
            console.log(err)
        });
})

app.post('/api/delete_ielts_exam', async function (req, res) {
    const {exam_id} = req.body
    console.log(exam_id)
    ExamSchema.findByIdAndDelete(exam_id).then((deletedExam) => {
        console.log(deletedExam)
        res.json({'status': "deleted"})
    })
        .catch((err) => {
            console.log(err)
            // handle error
        });
})

app.post('/api/mark_as_paid', async function (req, res) {
    const {user_id, user} = req.body
    const {exam_type, phone} = user;
    const u = await UserSchema.findOneAndUpdate({_id: user_id}, {$set: {is_paid: true}})
    if (u) {
        // ----------------------------------------------------------------
        const url = 'https://notify.eskiz.uz/api/message/sms/send';
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM2NDMsInJvbGUiOm51bGwsImRhdGEiOnsiaWQiOjM2NDMsIm5hbWUiOiJcdTA0MWRcdTA0MWVcdTA0MjMgSW5ub3ZhdHNpb24gTWFza2FuIiwiZW1haWwiOiJiYWtob2RpckBpbm5vdmF0aXZlY2VudHJlLm9yZyIsInJvbGUiOm51bGwsImFwaV90b2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUp6ZFdJaU9qTTJORE1zSW5KdmJHVWlPaUoxYzJWeUlpd2laR0YwWVNJNmV5SnBaQ0k2TXpZME15d2libUZ0WlNJNklseDFNRFF4WkZ4MU1EUXhaVngxTURReU15QkpibTV2ZG1GMGMybHZiaUJOWVhOcllXNGlMQ0psYldGcGJDSTZJbUpoYTJodlpHbHlRR2x1Ym05MllYUnBkbVZqWlc1MGNtVXViM0puSWl3aWNtOXNaU0k2SW5WelpYSWlMQ0poY0dsZmRHOXJaVzRpT2lKbGVVb3daViIsInN0YXR1cyI6ImFjdGl2ZSIsInNtc19hcGlfbG9naW4iOiJlc2tpejIiLCJzbXNfYXBpX3Bhc3N3b3JkIjoiZSQkayF6IiwidXpfcHJpY2UiOjUwLCJ1Y2VsbF9wcmljZSI6MTE1LCJ0ZXN0X3VjZWxsX3ByaWNlIjowLCJiYWxhbmNlIjozMDQ4NTAsImlzX3ZpcCI6MCwiaG9zdCI6InNlcnZlcjEiLCJjcmVhdGVkX2F0IjoiMjAyMy0wMy0xMVQwNjo0Njo1Ny4wMDAwMDBaIiwidXBkYXRlZF9hdCI6IjIwMjMtMDMtMTdUMTY6Mzg6NDQuMDAwMDAwWiJ9LCJpYXQiOjE2NzkwNzM0MjEsImV4cCI6MTY4MTY2NTQyMX0.z4uKgXVBdO0s8eec2qcezW95AaWi-LbvF9Pm29rJzqg';

        const data = {
            "mobile_phone": phone.toString().substring(1),
            "message": `Dear Candidate,\n\nWe're pleased to tell you that your registration for ${exam_type} is now confirmed. \n\nInnovative Centre
            `,
            'from': "4546",
            'callback_url': "http://0000.uz/test.php"
        }

        await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // ----------------------------------------------------------------

    }
    res.json({"is_paid": true})
})
app.post('/api/mark_IELTS_as_paid', async function (req, res) {
    const {user_id, user} = req.body
    const {exam_type, phone} = user;
    const u = await IeltsUserSchema.findOneAndUpdate({_id: user_id}, {$set: {is_paid: true}})
    if (u) {
        // ----------------------------------------------------------------
        const url = 'https://notify.eskiz.uz/api/message/sms/send';
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM2NDMsInJvbGUiOm51bGwsImRhdGEiOnsiaWQiOjM2NDMsIm5hbWUiOiJcdTA0MWRcdTA0MWVcdTA0MjMgSW5ub3ZhdHNpb24gTWFza2FuIiwiZW1haWwiOiJiYWtob2RpckBpbm5vdmF0aXZlY2VudHJlLm9yZyIsInJvbGUiOm51bGwsImFwaV90b2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUp6ZFdJaU9qTTJORE1zSW5KdmJHVWlPaUoxYzJWeUlpd2laR0YwWVNJNmV5SnBaQ0k2TXpZME15d2libUZ0WlNJNklseDFNRFF4WkZ4MU1EUXhaVngxTURReU15QkpibTV2ZG1GMGMybHZiaUJOWVhOcllXNGlMQ0psYldGcGJDSTZJbUpoYTJodlpHbHlRR2x1Ym05MllYUnBkbVZqWlc1MGNtVXViM0puSWl3aWNtOXNaU0k2SW5WelpYSWlMQ0poY0dsZmRHOXJaVzRpT2lKbGVVb3daViIsInN0YXR1cyI6ImFjdGl2ZSIsInNtc19hcGlfbG9naW4iOiJlc2tpejIiLCJzbXNfYXBpX3Bhc3N3b3JkIjoiZSQkayF6IiwidXpfcHJpY2UiOjUwLCJ1Y2VsbF9wcmljZSI6MTE1LCJ0ZXN0X3VjZWxsX3ByaWNlIjowLCJiYWxhbmNlIjozMDQ4NTAsImlzX3ZpcCI6MCwiaG9zdCI6InNlcnZlcjEiLCJjcmVhdGVkX2F0IjoiMjAyMy0wMy0xMVQwNjo0Njo1Ny4wMDAwMDBaIiwidXBkYXRlZF9hdCI6IjIwMjMtMDMtMTdUMTY6Mzg6NDQuMDAwMDAwWiJ9LCJpYXQiOjE2NzkwNzM0MjEsImV4cCI6MTY4MTY2NTQyMX0.z4uKgXVBdO0s8eec2qcezW95AaWi-LbvF9Pm29rJzqg';

        const data = {
            "mobile_phone": phone.toString().substring(1),
            "message": `Dear Candidate,\n\nWe're pleased to tell you that your registration for IELTS Mock is now confirmed. \n\nInnovative Centre
            `,
            'from': "4546",
            'callback_url': "http://0000.uz/test.php"
        }

        await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // ----------------------------------------------------------------

    }
    res.json({"is_paid": true})
})

app.post('/api/mark_as_not_paid', async function (req, res) {
    const {user_id, user} = req.body
    console.log(user)

    const u = await UserSchema.findOneAndUpdate({_id: user_id}, {$set: {is_paid: false}})
    res.json({"is_paid": false})
})

app.post('/api/mark_IELTS_as_not_paid', async function (req, res) {
    const {user_id, user} = req.body
    console.log(user)

    const u = await IeltsUserSchema.findOneAndUpdate({_id: user_id}, {$set: {is_paid: false}})
    res.json({"is_paid": false})
})

app.post("/api/user", async (req, res) => {
    try {
        const user = await UserSchema.create(req.body);
        console.log({user});
        const {phone, exam_type, exam_date} = req.body
        console.log(phone);
        // ----------------------------------------------------------------
        const url = 'https://notify.eskiz.uz/api/message/sms/send';
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM2NDMsInJvbGUiOm51bGwsImRhdGEiOnsiaWQiOjM2NDMsIm5hbWUiOiJcdTA0MWRcdTA0MWVcdTA0MjMgSW5ub3ZhdHNpb24gTWFza2FuIiwiZW1haWwiOiJiYWtob2RpckBpbm5vdmF0aXZlY2VudHJlLm9yZyIsInJvbGUiOm51bGwsImFwaV90b2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUp6ZFdJaU9qTTJORE1zSW5KdmJHVWlPaUoxYzJWeUlpd2laR0YwWVNJNmV5SnBaQ0k2TXpZME15d2libUZ0WlNJNklseDFNRFF4WkZ4MU1EUXhaVngxTURReU15QkpibTV2ZG1GMGMybHZiaUJOWVhOcllXNGlMQ0psYldGcGJDSTZJbUpoYTJodlpHbHlRR2x1Ym05MllYUnBkbVZqWlc1MGNtVXViM0puSWl3aWNtOXNaU0k2SW5WelpYSWlMQ0poY0dsZmRHOXJaVzRpT2lKbGVVb3daViIsInN0YXR1cyI6ImFjdGl2ZSIsInNtc19hcGlfbG9naW4iOiJlc2tpejIiLCJzbXNfYXBpX3Bhc3N3b3JkIjoiZSQkayF6IiwidXpfcHJpY2UiOjUwLCJ1Y2VsbF9wcmljZSI6MTE1LCJ0ZXN0X3VjZWxsX3ByaWNlIjowLCJiYWxhbmNlIjozMDQ4NTAsImlzX3ZpcCI6MCwiaG9zdCI6InNlcnZlcjEiLCJjcmVhdGVkX2F0IjoiMjAyMy0wMy0xMVQwNjo0Njo1Ny4wMDAwMDBaIiwidXBkYXRlZF9hdCI6IjIwMjMtMDMtMTdUMTY6Mzg6NDQuMDAwMDAwWiJ9LCJpYXQiOjE2NzkwNzM0MjEsImV4cCI6MTY4MTY2NTQyMX0.z4uKgXVBdO0s8eec2qcezW95AaWi-LbvF9Pm29rJzqg';

        const data = {
            "mobile_phone": phone.toString().substring(1),
            "message": `Dear Candidate,\n\nThank you for choosing to take ${exam_type} exam with Innovative Centre. Your exam is on ${exam_date}. Complete your payment as soon as possible.\n\nInnovative Centre`,
            'from': "4546",
            'callback_url': "http://0000.uz/test.php"
        }

        await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // ----------------------------------------------------------------

        res.json({user: user});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error});
    }
});

app.post("/api/ielts_user", async (req, res) => {
    try {
        const ielts_user = await IeltsUserSchema.create(req.body);
        const {phone, exam_date} =req.body
        // ----------------------------------------------------------------
        const url = 'https://notify.eskiz.uz/api/message/sms/send';
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM2NDMsInJvbGUiOm51bGwsImRhdGEiOnsiaWQiOjM2NDMsIm5hbWUiOiJcdTA0MWRcdTA0MWVcdTA0MjMgSW5ub3ZhdHNpb24gTWFza2FuIiwiZW1haWwiOiJiYWtob2RpckBpbm5vdmF0aXZlY2VudHJlLm9yZyIsInJvbGUiOm51bGwsImFwaV90b2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUp6ZFdJaU9qTTJORE1zSW5KdmJHVWlPaUoxYzJWeUlpd2laR0YwWVNJNmV5SnBaQ0k2TXpZME15d2libUZ0WlNJNklseDFNRFF4WkZ4MU1EUXhaVngxTURReU15QkpibTV2ZG1GMGMybHZiaUJOWVhOcllXNGlMQ0psYldGcGJDSTZJbUpoYTJodlpHbHlRR2x1Ym05MllYUnBkbVZqWlc1MGNtVXViM0puSWl3aWNtOXNaU0k2SW5WelpYSWlMQ0poY0dsZmRHOXJaVzRpT2lKbGVVb3daViIsInN0YXR1cyI6ImFjdGl2ZSIsInNtc19hcGlfbG9naW4iOiJlc2tpejIiLCJzbXNfYXBpX3Bhc3N3b3JkIjoiZSQkayF6IiwidXpfcHJpY2UiOjUwLCJ1Y2VsbF9wcmljZSI6MTE1LCJ0ZXN0X3VjZWxsX3ByaWNlIjowLCJiYWxhbmNlIjozMDQ4NTAsImlzX3ZpcCI6MCwiaG9zdCI6InNlcnZlcjEiLCJjcmVhdGVkX2F0IjoiMjAyMy0wMy0xMVQwNjo0Njo1Ny4wMDAwMDBaIiwidXBkYXRlZF9hdCI6IjIwMjMtMDMtMTdUMTY6Mzg6NDQuMDAwMDAwWiJ9LCJpYXQiOjE2NzkwNzM0MjEsImV4cCI6MTY4MTY2NTQyMX0.z4uKgXVBdO0s8eec2qcezW95AaWi-LbvF9Pm29rJzqg';

        const data = {
            "mobile_phone": phone.toString().substring(1),
            "message": `Dear Candidate,\n\nThank you for choosing to take IELTS Mock exam with Innovative Centre. Your exam is on ${exam_date}. Complete your payment as soon as possible.\n\nInnovative Centre`,
            'from': "4546",
            'callback_url': "http://0000.uz/test.php"
        }

        await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // ----------------------------------------------------------------
        res.json({ielts_user: ielts_user});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error});
    }
});

app.get("/api/allUsers", async (req, res) => {
    const mix = await UserSchema.find({});
    const ielts = await IeltsUserSchema.find({});
    const users = [...mix, ...ielts];

    res.json({users: users});
});

app.get("/api/allExams", async (req, res) => {
    const exams = await ExamSchema.find({});
    console.log(exams);
    res.json({exams});
});

///////////////// CRUD for Exam /////////////////
app.post("/api/exam", async (req, res) => {
    try {
        console.log(req.body);
        const exam = await ExamSchema.create(req.body);
        res.json({'status': 'success'});
    } catch (error) {
        console.log(error);
    }
});
app.post("/api/exam/get_date", async (req, res) => {
    try {
        const date = ExamSchema.find({exam_type: req.body.exam_type})
            .exec().then((result) => res.json(result)).catch((err) => console.log(err))
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/exams", async (req, res) => {
    const exams = await ExamSchema.find({});
    res.json({exams: exams});
});

app.put("/api/exams/edit", async (req, res) => {
    try {
        console.log(req.body);
        const _id = req.body._id;
        const exam = req.body.exam;
        ExamSchema.replaceOne({_id: _id}, exam, // If `new` isn't true, `findOneAndUpdate()` will return the
            // document as it was _before_ it was updated.
            {new: true});
    } catch (error) {
        console.log(error);
    }
});

app.delete("/api/exam/:id", (req, res) => {
    ExamSchema.findOneAndRemove({_id: req.params._id})
        .then((exam) => {
            if (!exam) {
                res.status(400).send(req.params._id + " was not found");
            } else {
                res.status(200).send(req.params._id + " was deleted.");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

app.listen(port, (err) => {
    console.log("server listening on port" + port);
});
