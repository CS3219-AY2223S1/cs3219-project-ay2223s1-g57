import json


def main():
    updated_questions = []

    with open("questions.json", "r") as f:
        questions = json.load(f)

        for question in questions:
            updated_qn = {}
            updated_qn["title"] = question["title"]
            updated_qn["url"] = question["url"]
            updated_qn["difficulty"] = question["difficulty"]
            updated_qn["prompt"] = question["prompt"]
            updated_qn["examples"] = []

            for example in question["examples"]:
                updated_example = "\n".join(example)
                updated_qn["examples"].append(updated_example)

            updated_qn["constraints"] = question["constraints"]
            updated_qn["related_topics"] = question["related_topics"]
            updated_qn["similar_questions"] = question["similar_questions"]

            updated_questions.append(updated_qn)

    with open("questions.json", "w") as f:
        json.dump(updated_questions, f)


if __name__ == "__main__":
    main()
