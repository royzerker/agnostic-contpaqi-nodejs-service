sudo nano /etc/mongod.conf

replication:
replSetName: rs0

sudo systemctl restart mongod
rs.initiate()
rs.status()
