npm run build
rm -r ../digimem/src/main/resources/static
cp -R build ../digimem/src/main/resources
mv ../digimem/src/main/resources/build ../digimem/src/main/resources/static
echo move files to server ... Success!
