var express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
var app = express();


app.set("view engine", "ejs");
const mysql = require('mysql');

app.use(express.static(__dirname + '/public'));
app.set('views', (__dirname + '/views'));

//this is the user variable
var retard = "";
var hacker = "";
var gameplay = "";
var dev = "";

const mySqlConnection = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12329522",
    password: "wRSw2QQDiR",
    database: "sql12329522",
    port:3306
});

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'seCReT',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}));

// Register and login are ejs to use alert boxes in browser

app.get('/register', (req, res) => {
    if (!req.session.user) {
        res.render("Register", {
            fields: false
        });
    } else {
        res.sendFile(__dirname + '/logout.html')
    }
})

app.get('/sponsor', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/sponsorUser.html');
    } else {
        res.sendFile(__dirname + '/sponsor.html');
    }
})

app.get('/misfit', (req, res) => {
    res.sendFile(__dirname + '/team.html')
})

app.post('/authReg', (req, res) => {

    var name = req.body.email;
    var password1 = req.body.password;

    var pwd = bcrypt.hashSync(password1, 10);

    let errors = [];

    if (!name || !pwd) {
        res.render("Register", {
            fields: true
        });
    }

    const values = [
        [name, pwd],
    ]
    mySqlConnection.query('INSERT INTO users (username,pwd) VALUES ?', [values], function (err) {
        if (err) res.status(500).send(err)
        else {
            res.render("index", {
                alarm: false,
                success: true
            });
        }
    })
})

app.get("/login", (req, res) => {
    if (!req.session.user)
        res.render("index", {
            alarm: false,
            success: false
        });
    else res.sendFile(__dirname + '/logout.html')
})

// THIS THE INSERTION IN THE DATABASE

app.post('/auth', (req, res) => {
    var name = req.body.email;
    var pwd = req.body.password;
    console.log(name);
    console.log(pwd);
    var user = "";
    if (name && pwd) {

        mySqlConnection.query('SELECT * FROM users WHERE username=?', [name], (err, rows) => {
            if (err) res.status(500).send(err)
            user = rows[0]
            if (user) {
                const result = bcrypt.compareSync(pwd, user.pwd)
                if (result) {
                    req.session.loggedin = true;
                    req.session.user = name;
                    res.redirect('/dashboard');
                } else {
                    res.render("index", {
                        alarm: true,
                        success: false
                    });
                }

            } else {
                res.render("index", {
                    alarm: true,
                    success: false
                });
            }
        });
    } else {
        res.render("index", {
            alarm: true,
            success: false
        });
    }
});

// ALMOST ALL PAGES WERE DIVIDED INTO 2 BASED ON IF USER HAS LOGIN
// the team page
app.get('/misfit', (req, res) => {
    res.sendFile(__dirname + '/team.html');
})

app.get('/home', function (request, response) {
    if (!request.session.user) {
        response.sendFile(__dirname + '/FrontPage/home.html');
    } else {
        response.sendFile(__dirname + '/FrontPageUser/home.html');
    }

});

// the events page

app.get('/events', (req, res) => {
    if (!req.session.user) {
        res.sendFile(__dirname + '/EventPage/EventPage.html');
    } else {
        res.sendFile(__dirname + '/EventPageUser/EventPage.html');
    }
})

// about event page
app.get('/about', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + "/AboutIfUSer.html")
    } else {
        res.sendFile(__dirname + "/About.html")
    }
})

// user dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        retard = req.session.user;
        var vlaues = [
            [retard]
        ]
        hacker = false;
        dev = false;
        gameplay = false;
        mySqlConnection.query("SELECT * FROM hack WHERE user = ?", [vlaues], (err1, results) => {
            if (err1) {
                console.log(err1);
            }
            mySqlConnection.query("SELECT * FROM gamer WHERE user = ?", [vlaues], (err2, results1) => {
                if (err2) {
                    console.log(err2);
                }
                mySqlConnection.query("SELECT * FROM gamecre WHERE user = ?", [vlaues], (err3, results2) => {
                    if (err3) {
                        console.log(err3);
                    }
                    if (results.length) {
                        hacker = true;
                        console.log("gennady");
                    }
                    if (results1.length) {
                        gameplay = true;
                        console.log("Fitz");

                    }
                    if (results2.length) {
                        dev = true;
                        console.log("dani");
                    }
                    console.log(hacker);
                    res.render("dash", {
                        bruhmail: retard,
                        Hacka: hacker,
                        DANIv: dev,
                        FITZ: gameplay
                    })
                });

            });
        });
    }

})

// to unregister from an event

app.get('/dashboard/dltGamer', (req, res) => {
    if (req.session.user) {
        retard = req.session.user;
        var vlaues = [
            [retard]
        ]
        mySqlConnection.query("DELETE FROM gamer WHERE user = ?", [vlaues], (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.length) {
                console.log("did it work? fitz");
            }
        });

        res.redirect('/dashboard');

    } else {
        res.sendFile(__dirname + '/dum.html');
    }
});

app.get('/dashboard/dltGameDev', (req, res) => {
    if (req.session.user) {
        retard = req.session.user;
        var vlaues = [
            [retard]
        ]
        mySqlConnection.query("DELETE FROM gamecre WHERE user = ?", [vlaues], (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.length) {
                console.log("did it work? dani");
            }
            res.redirect('/dashboard');
        })
    } else {
        res.sendFile(__dirname + '/dum.html');
    }
});

app.get('/dashboard/dltHack', (req, res) => {
    if (req.session.user) {
        retard = req.session.user;
        var vlaues = [
            [retard]
        ]
        mySqlConnection.query("DELETE FROM hack WHERE user = ?", [vlaues], (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.length) {
                console.log("did it work? asdsa");
            }
            res.redirect('/dashboard');
        })
    } else {
        res.sendFile(__dirname + '/dum.html');
    }
})

// the logout 

app.get('/logout', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/logout/logout.html');
    } else {
        res.send(err);
    }
})

// logging out user

app.get('/logoutR', (req, res) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.redirect('/home');
        })
    } else {
        res.render("index", {
            alarm: false
        });
    }
})

// the events

app.get('/gameLanding', (req, res) => {
    if (!req.session.user) {
        res.sendFile(__dirname + '/EventPage/gameLanding.html');
    } else {
        res.sendFile(__dirname + '/EventPageUser/gameLanding.html');
    }
})

app.get('/gamecreation', (req, res) => {
    if (!req.session.user) {
        res.sendFile(__dirname + '/EventPage/gamecreation.html');
    } else {
        res.sendFile(__dirname + '/EventPageUser/gamecreation.html');
    }
})

app.get('/HackLandindg', (req, res) => {
    if (!req.session.user) {
        res.sendFile(__dirname + '/EventPage/HackLandindg.html');
    } else {
        res.sendFile(__dirname + '/EventPageUser/HackLandindg.html');
    }
})

// Registering in an event

app.post('/regInGame', (req, res) => {

    if (req.session.user) {
        var username1 = req.session.user;
        var vlaues = [
            [username1]
        ]

        mySqlConnection.query("SELECT * FROM gamer WHERE user = ?", [vlaues], function (err, results) {
            if (err) {
                res.status(500).send(err)
            }

            if (results.length) {
                res.redirect('/dashboard');
            } else {
                mySqlConnection.query('INSERT INTO gamer (user) VALUES ?', [vlaues], function (err) {
                    if (err) res.status(500).send(err)
                    else {
                        res.redirect('/dashboard');
                    }
                })
            }
        })
    } else {
        res.sendFile(__dirname + '/ifnot.html');       
    };
})
// if the user tries to play with us intentionally the ifnot goes

app.post('/regInHack', (req, res) => {

    if (req.session.user) {
        var username1 = req.session.user;
        var vlaues = [
            [username1]
        ]


        mySqlConnection.query("SELECT * FROM hack WHERE user = ?", [vlaues], function (err, results) {
            if (err) {
                res.status(500).send(err)
            }

            if (results.length) {
                res.redirect('/dashboard');
            } else {
                mySqlConnection.query('INSERT INTO hack (user) VALUES ?', [vlaues], function (err) {
                    if (err) res.status(500).send(err)
                    else {
                        res.redirect('/dashboard');
                    }
                })
            }
        })
    } else {
        res.sendFile(__dirname + '/ifnot.html');
    };
})

app.post('/regInGameCre', (req, res) => {

    if (req.session.user) {
        var username1 = req.session.user;
        var vlaues = [
            [username1]
        ]




        mySqlConnection.query("SELECT * FROM gamecre WHERE user = ?", [vlaues], function (err, results) {
            if (err) {
                res.status(500).send(err)
            }

            if (results.length) {
                res.redirect('/dashboard');
            } else {
                mySqlConnection.query('INSERT INTO gamecre (user) VALUES ?', [vlaues], function (err) {
                    if (err) res.status(500).send(err)
                    else {
                        res.redirect('/dashboard');
                    }
                })
            }
        })
    } else {
        res.sendFile(__dirname + '/ifnot.html');
    };
})


app.listen(PORT, () => {
    console.log(PORT);
    console.log("connected!");
});
