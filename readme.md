#setting up mongolab

sign up for free acount
create a new database
add a user
get the database uri
    mongodb://dbuser:dbpassword@ds059957.mongolab.com:59957/loc8r-dev
heroku config:set MONGOLAB_URI = db_rui

#pushing the data

create tmp folder
    mkdir -p ~/tmp/mongodump
dump the data from the development database
    mongodump -h localhost:27017 -d dbname -o ~/tmp/mongodump
restore the data to live enviroment
    mongorestore -h ds059957.mongolab.com:59957 -d dbname -u username -p password ~/tmp/mongodump/dbname
testing the live database
    mongo ds033669.mongolab.com:33669/heroku_app20110907 -u heroku_app20110907 -p 4rqhlidfdqq6vgdi06c15jrlpf

#setting the node_env

heroku config:set NODE_ENV=production

#pushing to heroku
git add .
git commit -m ""
git push heroku master

heroku logs