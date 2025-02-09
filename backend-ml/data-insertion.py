import mysql.connector
import csv

connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Bunny',
    database='bluepulse'
)

cursor = connection.cursor()

insert_query = """
INSERT INTO pipeline12 (Timestamp, InletFlow, OutletFlow)
VALUES (%s, %s, %s)
"""

with open(r'D:\Bunny\newchennaihack\myapp\backend-ml\pipeline12.csv', 'r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)  
    for row in csv_reader:
        cursor.execute(insert_query, (row[0], float(row[1]), float(row[2])))

connection.commit()
cursor.close()
connection.close()