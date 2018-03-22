cd ~/Documents/mpv-context-menus-chrome-extension/
export DISPLAY=:0
export PATH=/usr/local/bin/:/usr/bin/
python3 mpv_server.py >> crontab_server.log 2>&1