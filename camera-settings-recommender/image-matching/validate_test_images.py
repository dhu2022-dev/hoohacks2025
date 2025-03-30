import os
from utils.similarity import find_best_match

TEST_DIR = "test_images"

def validate_all_tests():
    print(f"{'Test Image':<25} {'Matched Image':<25} {'Similarity':<10}")
    print("-" * 60)

    for filename in os.listdir(TEST_DIR):
        if not filename.lower().endswith((".jpg", ".jpeg", ".png")):
            continue

        image_path = os.path.join(TEST_DIR, filename)
        result = find_best_match(image_path)

        print(f"{filename:<25} {result['match_filename']:<25} {result['similarity']:.4f}")

if __name__ == "__main__":
    validate_all_tests()
