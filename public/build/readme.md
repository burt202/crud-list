## Production Build Steps

Make sure you are in the project directory and run the following commands in the terminal:

CSS: lessc -x --include-path="public/css" public/css/imports.less > public/build/combined.css
JS: node public/build/r.js -o public/build/build.json

When this is done, alter configs/app.json and change type = 'production'