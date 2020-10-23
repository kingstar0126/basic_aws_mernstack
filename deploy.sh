#!/bin/sh
git pull
sudo npm install
cd client
npm install
sudo npm run build
cd ..
sudo systemctl restart nginx
sudo pm2 restart all
