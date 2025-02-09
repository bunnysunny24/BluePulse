import mysql.connector
from mysql.connector import Error
from typing import List, Dict

def create_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Bunny',
            database='bluepulse'
        )
        if connection.is_connected():
            print("Successfully connected to the database")
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

# Fetch table data from MySQL
def fetch_table_data(table_name: str) -> List[Dict]:
    connection = create_connection()
    if connection:
        cursor = connection.cursor(dictionary=True)
        query = f"SELECT * FROM {table_name}"  # Query to fetch all data from the table
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        connection.close()
        return rows
    return []

