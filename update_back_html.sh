npm run build
rm -r ../siteback/html
cp -R build ../siteback
mv ../siteback/build ../siteback/html
echo move files to server ... Success!