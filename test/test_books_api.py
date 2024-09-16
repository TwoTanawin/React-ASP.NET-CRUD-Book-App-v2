import requests
import unittest

class TestBooksAPI(unittest.TestCase):
    BASE_URL = 'http://localhost:8080/api/Books'  # Replace with your API URL

    def test_post_book(self):
        # Define the book data
        new_book = {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "year": 1925
        }

        # Send the POST request
        response = requests.post(self.BASE_URL, json=new_book)

        # Assert the response status code
        self.assertEqual(response.status_code, 201)

        # Optionally, check the response content
        response_json = response.json()
        self.assertIn("title", response_json)
        self.assertEqual(response_json["title"], new_book["title"])
        self.assertIn("author", response_json)
        self.assertEqual(response_json["author"], new_book["author"])
        self.assertIn("year", response_json)
        self.assertEqual(response_json["year"], new_book["year"])

if __name__ == '__main__':
    unittest.main()
