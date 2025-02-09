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

def fetch_hourly_data(table_name: str) -> List[Dict]:
    connection = create_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = f"""
                SELECT * FROM {table_name}
                WHERE Timestamp IN (
                    SELECT MIN(Timestamp) 
                    FROM {table_name}
                    GROUP BY DATE(Timestamp), HOUR(Timestamp)
                )
                ORDER BY Timestamp;
            """
            
            cursor.execute(query)  
            rows = cursor.fetchall()

            cursor.close()
            connection.close()
            return rows
        except Error as e:
            print(f"Database error: {e}")
            return []
    return []

