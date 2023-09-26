# StaterKBImport
Files needed to import Stater data into Genesys Knowledge workbench

1. Ensure Nodejs is installed on the system
2. Format the input CSV (ChatBot Question & Answers - Venn.csv) for example using semicolons as opposed to commas as a delimiter. This might require changing of system settings
3. Create a folder where the input CSV, trainingData csv, as well as the scripts, are located
4. populate the two variables on lines 5 & 6 
5. Run part1.js (node part1.js). this will create a file as labeled on line 6 above
6. Open that file in Excel, and ensure that it is formatted appropriately. This means every new line equates to a unique row of data and there is no spillover
7. Open and populate part2.js lines 4,5,& 6
8. Run part2.js
9. Open the CSV created, and remove the numbers beside the title header phrasing(phrasing1...phrasing50, should simply become phrasing)
10. in the same opened file ensure that each new line in the CSV corresponds to unique row data
11. Save this file both as a CSV and xlsx.
12. In Genesys workbench import the file using xlsx format, this should give you detailed errors if there are any. Correct those and try reimport until successful
