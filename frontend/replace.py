import os
import re

directories = ['src/pages', 'src/components']
for directory in directories:
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                # Replace $ not followed by {
                new_content = re.sub(r'\$(?!\{)', '₹', content)
                
                if new_content != content:
                    with open(filepath, 'w') as f:
                        f.write(new_content)
                    print(f'Replaced in {filepath}')
