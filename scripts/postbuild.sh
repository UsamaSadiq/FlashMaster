# postbuild.sh
#!/bin/bash

HTML_FILE="dist/index.html"

# Replace type="module" crossorigin with nothing
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/type="module" crossorigin//g' "$HTML_FILE"
else
  sed -i 's/type="module" crossorigin//g' "$HTML_FILE"
fi

echo "✅ Removed type=\"module\" crossorigin from $HTML_FILE"
