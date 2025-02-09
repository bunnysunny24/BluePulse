import mysql.connector
import csv

# Establish a connection to the MySQL database
connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Bunny',
    database='bluepulse'
)

cursor = connection.cursor()

# Prepare the insert query
insert_query = """
INSERT INTO pipeline12 (Timestamp, InletFlow, OutletFlow)
VALUES (%s, %s, %s)
"""

# Open the CSV file and read the data
with open(r'D:\Bunny\newchennaihack\myapp\backend-ml\pipeline12.csv', 'r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)  # Skip the header row
    for row in csv_reader:
        cursor.execute(insert_query, (row[0], float(row[1]), float(row[2])))

# Commit the transaction and close the connection
connection.commit()
cursor.close()
connection.close()