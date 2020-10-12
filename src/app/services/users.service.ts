import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  databaseObj: SQLiteObject;
  readonly database_name: string = "incomeTracker.db";
  tables: String[];
  constructor(
    private sqlite: SQLite,
  ) {
    this.tables = [
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT  NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phoneNumber TEXT UNIQUE NOT NULL,
        pictureUrl TEXT  DEFAULT NULL,
        companyName TEXT  NOT NULL,
        companyAddress TEXT  NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );`,

      `CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY NOT NULL,
        companyName TEXT  NOT NULL,
        contactName TEXT  NOT NULL,
        contactNumber TEXT  NOT NULL,
        status TEXT  NOT NULL,
        comment TEXT  DEFAULT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
       );`,

      `CREATE TABLE IF NOT EXISTS quotations (
        id INTEGER PRIMARY KEY NOT NULL,
        salesPerson TEXT  DEFAULT NULL,
        quotationValidity int(11) NOT NULL,
        paymentTerms TEXT  DEFAULT NULL,
        refNumber TEXT  DEFAULT NULL,
        deliveryDate date DEFAULT NULL,
        currency TEXT  NOT NULL,
        subTotalJobCost int(11) NOT NULL,
        totalJobCost int(11) NOT NULL,
        profit int(11) NOT NULL,
        comment TEXT  NOT NULL,
        userId INTEGER NOT NULL,
        jobId INTEGER NOT NULL,
        FOREIGN KEY (jobId) REFERENCES jobs (id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
       );`,

      `CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY NOT NULL,
        paymentName TEXT  NOT NULL,
        paymentType TEXT  NOT NULL,
        amount int(11) NOT NULL,
        userId INTEGER NOT NULL,
        jobId INTEGER NOT NULL,
        quotationId INTEGER NOT NULL,
        FOREIGN KEY (jobId) REFERENCES jobs (id) ON DELETE CASCADE,
        FOREIGN KEY (quotationId) REFERENCES quotations (id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
       );`,

      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY NOT NULL,
        itemName TEXT  NOT NULL,
        UOM TEXT  NOT NULL,
        unitPrice int(11) NOT NULL,
        quantity int(11) NOT NULL,
        totalPrice int(11) NOT NULL,
        userId INTEGER NOT NULL,
        jobId INTEGER  NOT NULL,
        quotationId INTEGER NOT NULL,
        FOREIGN KEY (jobId) REFERENCES jobs (id) ON DELETE CASCADE,
        FOREIGN KEY (quotationId) REFERENCES quotations (id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
       );`,
    ]
  }
  initializeDB() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'incomeTracker.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          resolve("Successfull");
        })
        .catch(e => {
          console.log("error " + JSON.stringify(e));
          reject("Failed");
        });
    });
  }

  getStarted() {
    return new Promise((resolve, reject) => {
      this.initializeDB()
        .then(() => {
          this.createTable(this.tables, 0);
          resolve("Successfull");
        })
        .catch(e => {
          console.log(e);
          reject("Failed");
        });
    });

  }

  createTable(tables: String[], index: number) {
    if (index < tables.length) {
      this.databaseObj.executeSql(`${tables[index]}`, [])
        .then(() => {
          index++;
          this.createTable(tables, index);
        }).catch(e => console.log(e));
    }
  }

  fetchUserFromDatabase(email?) {
    return new Promise((resolve, reject) => {
      this.initializeDB().then(result => {
        let statement = `SELECT * FROM users`;
        this.databaseObj.executeSql(statement, [])
          .then((res) => {
            console.log(res);
            let user = res.rows.item(0);
            if (res.rows.length > 0) {
              this.databaseObj.executeSql(`SELECT COUNT(*) FROM jobs WHERE userId=${user.id}`, [])
                .then(tJobs => {
                  user.totalJobs = tJobs.rows.item(0)["COUNT(*)"];
                });
              this.databaseObj.executeSql(`SELECT COUNT(*) FROM jobs WHERE userId=${user.id} AND status == 'canceled'`, [])
                .then(cJobs => {
                  user.canceledJobs = cJobs.rows.item(0)["COUNT(*)"];
                });
              this.databaseObj.executeSql(`SELECT COUNT(*) FROM jobs WHERE userId=${user.id} AND status == 'completed'`, [])
                .then(sjobs => {
                  user.completedJobs = sjobs.rows.item(0)["COUNT(*)"];
                });
              this.databaseObj.executeSql(`SELECT COUNT(*) FROM jobs WHERE userId=${user.id} AND status != 'completed' AND status != 'canceled'`, [])
                .then(pjobs => {
                  user.pendingJobs = pjobs.rows.item(0)["COUNT(*)"];
                });
              resolve(user);
            }
            else {
              reject("User not registered");
            }
          }).catch(e => {
            console.log(e);
            reject("Account could not be fetched");
          });
      });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      try {
        let user = JSON.parse(localStorage.getItem('user'));
        resolve(user);
      }
      catch (e) {
        reject("User data could not be fetched");
      }
    });
  }

  signUpUser(user) {
    return new Promise((resolve, reject) => {
      this.initializeDB().then(result => {
        let statement = `INSERT INTO users(name, email, phoneNumber, pictureUrl, companyName, companyAddress) VALUES(?,?,?,?,?,?)`;
        this.databaseObj.executeSql(statement, [
          user.name,
          user.email,
          user.phoneNumber,
          user.pictureUrl,
          user.companyName,
          user.companyAddress
        ])
          .then((res) => {
            this.fetchUserFromDatabase(user.email).then(userDetails => {
              console.log(userDetails);
              localStorage.setItem('user', JSON.stringify(userDetails));
            });
            resolve("User account successfully created");
          }).catch(e => {
            console.log(e);
            reject("Account could not be created");
          });
      });
    });
  }

  updateUserDetails(user) {
    return new Promise((resolve, reject) => {
      this.initializeDB().then(result => {
        let statement = `UPDATE users SET name=?, email=?, phoneNumber=?, pictureUrl=?, companyName=?, companyAddress=? WHERE id=?`;
        console.log(statement);
        this.databaseObj.executeSql(statement, [
          user.name,
          user.email,
          user.phoneNumber,
          user.pictureUrl,
          user.companyName,
          user.companyAddress,
          user.id
        ])
          .then((res) => {
            this.fetchUserFromDatabase(user.email).then(userDetails => {
              console.log(userDetails);
              localStorage.setItem('user', JSON.stringify(userDetails));
            });
            resolve("User account successfully updated");
          }).catch(e => {
            console.log(e);
            reject("Account could not be updated");
          });
      });
    });
  }
}
