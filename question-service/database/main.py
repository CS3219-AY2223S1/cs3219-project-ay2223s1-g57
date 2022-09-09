import json
import os
import psycopg2
from dotenv import load_dotenv
from datetime import datetime


def main():
    load_dotenv()

    DB_USER = str(os.getenv("DB_USER"))
    DB_NAME = str(os.getenv("DB_NAME"))
    DB_HOST = str(os.getenv("DB_HOST"))
    DB_PASSWORD = str(os.getenv("DB_PASSWORD"))

    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD)

    cursor = conn.cursor()

    with open("questions.json", "r") as f:
        questions = json.load(f)

        for question in questions:
            title = question["title"]
            url = question["url"]
            difficulty = question["difficulty"]
            prompt = question["prompt"]
            examples = question["examples"]
            constraints = question["constraints"]
            related_topics = question["related_topics"]
            similar_questions = list(
                map(lambda x: json.dumps(x), question["similar_questions"]))
            createdAt = updatedAt = datetime.now()

            cursor.execute("""INSERT INTO "Questions" (id, title, url, difficulty, prompt, examples, constraints, related_topics, similar_questions, "createdAt", "updatedAt") VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s::json[], %s, %s)""",
                           (title, url, difficulty, prompt, examples, constraints, related_topics, similar_questions, createdAt, updatedAt))

    # Persist changes in Postgres
    conn.commit()

    cursor.close()
    conn.close()
    print(conn)


if __name__ == "__main__":
    main()
