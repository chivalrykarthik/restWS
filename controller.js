let fs = require('fs');
let db = './db.json';
let utils = {};
utils.schemaValidation = function(req){
    return new Promise((res,rej)=>{
        let schema = {"id":"string","name":"string","age":"string","country":"string"};
        let err;
        for(let key in req){
            if(!schema[key]){
                err = "Some fields not present in schema";
            }
        }
        if(err)
            return rej(err);
        return res(req);
    });
};

utils.generateUniqID = function () {
    let a = new Date().getTime();
    let random = Math.floor(Math.random() * Math.floor(100));
    let uuid = a.toString().concat(random);
    return Promise.resolve(uuid);

};
utils.checkFileExist = function () {
    return new Promise((res, rej) => {
        fs.readFile(db, 'utf8', (err, content) => {
            if (err) {
                return rej("No Data")
            }
            content = JSON.parse(content);
            return res(content);
        })
    })
};
utils.createFile = function (cnt) {
    return new Promise((res, rej) => {
        fs.writeFile(db, JSON.stringify(cnt), err => {
            if (err) {
                return rej(err);
            }
            return res('Updated Successfully');
        })
    });
}
class Users {
    async getUser(req, resp) {
        let result;
        try {
            let users = await utils.checkFileExist();
            result = { resp: users };

        } catch (e) {
            result = { err: e };
        }
        return resp.json(result);
    }
    getUserById(userID, resp) {
        let users = (usersList) => {
            let result = usersList.find(user => {
                return (userID === user.id);
            });
            return resp.json({ resp: result });

        };
        utils.checkFileExist().then(users)
            .catch((err) => resp.json({ err: err }));

    }
    async createUser(req, resp) {
        let uuid = await utils.generateUniqID();
        req.id = uuid;
        let appendContent = async (cnt) => {
            if (!cnt || !(cnt instanceof Array)) {
                cnt = [req];
            } else {
                cnt.push(req);
            }
            try {
                let resut = await utils.createFile(cnt);
                return resp.json({ resp: resut });
            } catch (e) {
                return resp.json({ err: e });
            }
        }
        utils.checkFileExist().then(appendContent)
            .catch(appendContent);
    }
    async updateUser(req, resp) {
        let users;
        try {
            users = await utils.checkFileExist();
        } catch (e) {
            return resp({ err: e });
        }
        if (!users && !users.length) {
            return resp({ err: "Source Invalid" });
        }
        let updUser = users.map((user) => {
            if (user.id === req.id) {
                user = req.body;
                user.id = req.id;
            }
            return user;
        });
        
        try{
            let result = await utils.createFile(updUser);
            return resp.json({resp:result})
        } catch(e){
            return resp.json({err:e})
        }

    }
}

module.exports = Users;