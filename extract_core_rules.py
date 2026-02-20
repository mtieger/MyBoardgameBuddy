import json, os, zipfile, shutil

# Find the PDF in the source material folder
source_dir = "Original Source Material"
pdf_file = None
for f in os.listdir(source_dir):
    if f.endswith('.pdf'):
        pdf_file = os.path.join(source_dir, f)
        break

print(f"Found: {pdf_file}")

# Extract it like a zip
extract_dir = "temp_core_extract"
os.makedirs(extract_dir, exist_ok=True)
with zipfile.ZipFile(pdf_file, 'r') as z:
    z.extractall(extract_dir)

files = os.listdir(extract_dir)
print(f"Extracted: {len(files)} files")

# Count pages
pages = [f for f in files if f.endswith('.jpeg')]
total_pages = len(pages)
print(f"Pages: {total_pages}")

# Copy images
img_dir = "rules/images/core_rules"
os.makedirs(img_dir, exist_ok=True)
for f in pages:
    shutil.copy(os.path.join(extract_dir, f), os.path.join(img_dir, f))

# Build JSON
result = {"id": "core_rules", "title": "Core Rulebook", "module": "core", "total_pages": total_pages, "rules": []}
for i in range(1, total_pages + 1):
    txt_path = os.path.join(extract_dir, f"{i}.txt")
    text = open(txt_path, errors='replace').read().strip() if os.path.exists(txt_path) else ""
    result["rules"].append({"id": f"p{i}", "title": f"Page {i}", "text": text, "page": i, "image": f"images/core_rules/{i}.jpeg", "module": "core", "cross_refs": []})

with open("rules/core_rules.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

# Cleanup
shutil.rmtree(extract_dir)
print("Done! rules/core_rules.json created.")
