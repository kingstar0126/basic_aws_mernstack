#!/bin/sh     
sudo git pull origin master
sudo npm install
cd client
npm install
sudo npm run build
cd ..
sudo systemctl restart nginx
sudo pm2 restart all
